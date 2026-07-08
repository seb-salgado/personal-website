"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"
import { fragmentShader, vertexShader } from "@/lib/voiced-shader/shader"
import { type ShaderParams, PARAM_CONFIG } from "@/lib/voiced-shader/defaults"
import { clamp, hexToVec3 } from "@/lib/voiced-shader/color"

export interface AudioLevels {
  rms: number
  centroidNorm: number
}

interface ShaderCanvasProps {
  params: ShaderParams
  audioLevelsRef: React.RefObject<AudioLevels>
  voiceEnabled: boolean
}

// How strongly voice pushes the shader beyond the slider baselines.
const CONTRAST_GAIN = 1.2
// Voice displaces the noise phase by up to this many units. Bounded (centroid
// is 0..1), so the reaction has the same magnitude at second 5 and second 500 —
// unlike scaling absolute time, which grew unboundedly the longer the page ran.
const VOICE_PHASE_GAIN = 2.0
const ATTACK_TAU = 0.05
const RELEASE_TAU = 0.35

const UNIFORM_NAMES = [
  "iTime",
  "iResolution",
  "uContrast",
  "uGrain",
  "uNoiseScale",
  "uColor1",
  "uColor2",
  "uColor3",
  "uColor4",
  "uColor5",
  "uColor6",
] as const

type UniformName = (typeof UNIFORM_NAMES)[number]

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function ShaderCanvas({
  params,
  audioLevelsRef,
  voiceEnabled,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paramsRef = useRef(params)
  paramsRef.current = params

  const voiceEnabledRef = useRef(voiceEnabled)
  voiceEnabledRef.current = voiceEnabled

  const reducedMotion = useReducedMotion()
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return

    let rafId = 0
    let running = false
    let visible = true
    let contextLost = false
    let lastTime = 0
    let shaderTime = 0
    let smoothedRms = 0
    let smoothedCentroid = 0
    let wasVoiceEnabled = voiceEnabledRef.current

    let gl: WebGLRenderingContext | null = null
    let program: WebGLProgram | null = null
    let positionBuffer: WebGLBuffer | null = null
    let uniforms: Partial<Record<UniformName, WebGLUniformLocation | null>> = {}

    function initGL() {
      if (!canvas) return false
      gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      })
      if (!gl) return false

      const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
      if (!vs || !fs) return false

      program = gl.createProgram()
      if (!program) return false
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program))
        return false
      }
      gl.useProgram(program)

      // Fullscreen triangle
      positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      )
      const aPosition = gl.getAttribLocation(program, "aPosition")
      gl.enableVertexAttribArray(aPosition)
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

      uniforms = {}
      for (const name of UNIFORM_NAMES) {
        uniforms[name] = gl.getUniformLocation(program, name)
      }
      return true
    }

    function resize() {
      if (!canvas || !container || !gl) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(container.clientWidth * dpr))
      const height = Math.max(1, Math.round(container.clientHeight * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    function frame(now: number) {
      if (!gl || !program || contextLost) return
      const dt = lastTime === 0 ? 0 : Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      const p = paramsRef.current
      const isVoiceEnabled = voiceEnabledRef.current
      if (isVoiceEnabled !== wasVoiceEnabled) {
        smoothedRms = 0
        smoothedCentroid = 0
        wasVoiceEnabled = isVoiceEnabled
      }
      const levels = isVoiceEnabled
        ? (audioLevelsRef.current ?? { rms: 0, centroidNorm: 0 })
        : { rms: 0, centroidNorm: 0 }

      // Asymmetric one-pole smoothing: fast attack, slow release.
      const smooth = (current: number, target: number) => {
        const tau = target > current ? ATTACK_TAU : RELEASE_TAU
        const k = 1 - Math.exp(-dt / tau)
        return current + (target - current) * k
      }
      smoothedRms = smooth(smoothedRms, levels.rms)
      smoothedCentroid = smooth(smoothedCentroid, levels.centroidNorm)

      const effectiveContrast = clamp(
        p.contrast + smoothedRms * CONTRAST_GAIN,
        PARAM_CONFIG.contrast.min,
        PARAM_CONFIG.contrast.max
      )

      // Ambient motion advances at the baseline speed only.
      if (!reducedMotionRef.current) {
        shaderTime += dt * p.speed
      }

      // Voice reaction: a bounded phase offset riding on top of the ambient
      // phase. Because it is an offset (not a time-scale), speaking shifts the
      // pattern by a fixed, repeatable amount regardless of elapsed time.
      const voicePhase = reducedMotionRef.current
        ? 0
        : smoothedCentroid * VOICE_PHASE_GAIN

      gl.uniform1f(uniforms.iTime ?? null, shaderTime + voicePhase)
      gl.uniform2f(
        uniforms.iResolution ?? null,
        gl.drawingBufferWidth,
        gl.drawingBufferHeight
      )
      gl.uniform1f(uniforms.uContrast ?? null, effectiveContrast)
      gl.uniform1f(uniforms.uGrain ?? null, p.grain)
      gl.uniform1f(uniforms.uNoiseScale ?? null, p.noiseScale)
      const colorUniforms: UniformName[] = [
        "uColor1",
        "uColor2",
        "uColor3",
        "uColor4",
        "uColor5",
        "uColor6",
      ]
      colorUniforms.forEach((name, i) => {
        const [r, g, b] = hexToVec3(p.colors[i])
        gl!.uniform3f(uniforms[name] ?? null, r, g, b)
      })

      gl.drawArrays(gl.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      if (running || !visible || contextLost || !gl) return
      running = true
      lastTime = 0
      rafId = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(rafId)
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      stop()
    }
    const handleContextRestored = () => {
      contextLost = false
      if (initGL()) {
        resize()
        start()
      }
    }
    canvas.addEventListener("webglcontextlost", handleContextLost)
    canvas.addEventListener("webglcontextrestored", handleContextRestored)

    if (!initGL()) return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      canvas.removeEventListener("webglcontextrestored", handleContextRestored)
    }

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)
    resize()

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(container)

    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      canvas.removeEventListener("webglcontextrestored", handleContextRestored)
      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer)
        if (program) gl.deleteProgram(program)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
