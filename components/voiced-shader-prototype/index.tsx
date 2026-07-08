"use client"

import { useCallback, useRef, useState } from "react"
import {
  DEFAULT_PARAMS,
  type NumericParam,
  type ShaderParams,
} from "@/lib/voiced-shader/defaults"
import { ShaderCanvas, type AudioLevels } from "./shader-canvas"
import { ControlPanel } from "./control-panel"
import { useVoiceAnalyser } from "./use-voice-analyser"

export function VoicedShaderPrototype() {
  const [params, setParams] = useState<ShaderParams>(DEFAULT_PARAMS)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const audioLevelsRef = useRef<AudioLevels>({ rms: 0, centroidNorm: 0 })

  const handleMicDenied = useCallback(() => setVoiceEnabled(false), [])
  const { error: micError } = useVoiceAnalyser(
    voiceEnabled,
    audioLevelsRef,
    handleMicDenied
  )

  const handleParamChange = useCallback((key: NumericParam, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleColorChange = useCallback((index: number, value: string) => {
    setParams((prev) => {
      const colors = [...prev.colors] as ShaderParams["colors"]
      colors[index] = value
      return { ...prev, colors }
    })
  }, [])

  const handleToggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => !prev)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#3B1C14] aspect-[3/4] sm:aspect-[4/3]">
      <ShaderCanvas params={params} audioLevelsRef={audioLevelsRef} />
      <ControlPanel
        params={params}
        onParamChange={handleParamChange}
        onColorChange={handleColorChange}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
        micError={micError}
        className="absolute bottom-4 right-4 top-4 hidden w-[248px] overflow-y-auto sm:flex"
      />
    </div>
  )
}
