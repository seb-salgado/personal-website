"use client"

import { useEffect, useRef, useState } from "react"
import { clamp } from "@/lib/voiced-shader/color"
import type { AudioLevels } from "./shader-canvas"

// Silence gate: below this RMS the spectral centroid is noise, not signal.
const SILENCE_RMS = 0.01
// Speech energy sits roughly between 200Hz and 3kHz.
const CENTROID_MIN_HZ = 200
const CENTROID_RANGE_HZ = 2800

interface VoiceAnalyserState {
  error: string | null
}

export function useVoiceAnalyser(
  enabled: boolean,
  levelsRef: React.RefObject<AudioLevels>,
  onDenied?: () => void
): VoiceAnalyserState {
  const [error, setError] = useState<string | null>(null)
  const onDeniedRef = useRef(onDenied)
  onDeniedRef.current = onDenied

  useEffect(() => {
    if (!enabled) return

    let cancelled = false
    let rafId = 0
    let stream: MediaStream | null = null
    let audioContext: AudioContext | null = null

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        })
      } catch (err) {
        if (cancelled) return
        const name = err instanceof DOMException ? err.name : ""
        setError(
          name === "NotFoundError"
            ? "No microphone found."
            : "Microphone access was denied. Check your browser permissions."
        )
        onDeniedRef.current?.()
        return
      }

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop())
        return
      }

      setError(null)
      audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 1024
      analyser.smoothingTimeConstant = 0.5
      source.connect(analyser)

      const timeData = new Float32Array(analyser.fftSize)
      const freqData = new Uint8Array(analyser.frequencyBinCount)
      const binHz = audioContext.sampleRate / analyser.fftSize

      const tick = () => {
        analyser.getFloatTimeDomainData(timeData)
        let sumSquares = 0
        for (let i = 0; i < timeData.length; i++) {
          sumSquares += timeData[i] * timeData[i]
        }
        const rms = Math.sqrt(sumSquares / timeData.length)

        let centroidNorm = 0
        if (rms >= SILENCE_RMS) {
          analyser.getByteFrequencyData(freqData)
          let weighted = 0
          let total = 0
          for (let i = 0; i < freqData.length; i++) {
            weighted += i * binHz * freqData[i]
            total += freqData[i]
          }
          if (total > 0) {
            const centroidHz = weighted / total
            centroidNorm = clamp(
              (centroidHz - CENTROID_MIN_HZ) / CENTROID_RANGE_HZ,
              0,
              1
            )
          }
        }

        levelsRef.current.rms = rms
        levelsRef.current.centroidNorm = centroidNorm
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      stream?.getTracks().forEach((t) => t.stop())
      audioContext?.close()
      levelsRef.current.rms = 0
      levelsRef.current.centroidNorm = 0
    }
  }, [enabled, levelsRef])

  return { error }
}
