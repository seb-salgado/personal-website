"use client"

import { useCallback, useRef, useState } from "react"
import { DEFAULT_PARAMS } from "@/lib/voiced-shader/defaults"
import { ShaderCanvas, type AudioLevels } from "./shader-canvas"
import { MicErrorNotice, VoiceToggleButton } from "./control-panel"
import { useVoiceAnalyser } from "./use-voice-analyser"

export function VoicedShaderPrototype() {
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const audioLevelsRef = useRef<AudioLevels>({ rms: 0, centroidNorm: 0 })

  const handleMicDenied = useCallback(() => setVoiceEnabled(false), [])
  const { error: micError } = useVoiceAnalyser(
    voiceEnabled,
    audioLevelsRef,
    handleMicDenied
  )

  const handleToggleVoice = useCallback(() => {
    setVoiceEnabled((prev) => !prev)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#3B1C14] aspect-[3/4] sm:aspect-[4/3]">
      <ShaderCanvas
        params={DEFAULT_PARAMS}
        audioLevelsRef={audioLevelsRef}
        voiceEnabled={voiceEnabled}
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        {micError && (
          <div className="max-w-[min(320px,calc(100vw-48px))] rounded-lg bg-white px-3 py-2 shadow-sm">
            <MicErrorNotice message={micError} />
          </div>
        )}
        <VoiceToggleButton
          voiceEnabled={voiceEnabled}
          onToggleVoice={handleToggleVoice}
          className="bg-white text-[var(--color-fg)] shadow-sm hover:bg-white hover:opacity-90"
        />
      </div>
    </div>
  )
}
