"use client"

import { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DEFAULT_PARAMS,
  type NumericParam,
  type ShaderParams,
} from "@/lib/voiced-shader/defaults"
import { ShaderCanvas, type AudioLevels } from "./shader-canvas"
import {
  ControlPanel,
  MicErrorNotice,
  VoiceToggleButton,
} from "./control-panel"
import { useVoiceAnalyser } from "./use-voice-analyser"

export function VoicedShaderPrototype() {
  const [params, setParams] = useState<ShaderParams>(DEFAULT_PARAMS)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [panelExpanded, setPanelExpanded] = useState(false)
  const audioLevelsRef = useRef<AudioLevels>({ rms: 0, centroidNorm: 0 })
  const reducedMotion = useReducedMotion()

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

  const controlProps = {
    params,
    onParamChange: handleParamChange,
    onColorChange: handleColorChange,
    voiceEnabled,
    onToggleVoice: handleToggleVoice,
    micError,
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#3B1C14] aspect-[3/4] sm:aspect-[4/3]">
      <ShaderCanvas params={params} audioLevelsRef={audioLevelsRef} />

      {/* Desktop: full floating panel */}
      <ControlPanel
        {...controlProps}
        className="absolute bottom-4 right-4 top-4 hidden w-[248px] overflow-y-auto sm:flex"
      />

      {/* Mobile: compact bar + expandable sheet */}
      <div className="sm:hidden">
        <AnimatePresence>
          {panelExpanded && (
            <motion.div
              key="mobile-sheet"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-3 bottom-[68px] top-3"
            >
              <ControlPanel
                {...controlProps}
                showVoiceButton={false}
                className="max-h-full overflow-y-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2">
          {micError && !panelExpanded && (
            <div className="rounded-lg bg-black/55 p-2 backdrop-blur-md">
              <MicErrorNotice message={micError} />
            </div>
          )}
          <div className="flex gap-2">
            <VoiceToggleButton
              voiceEnabled={voiceEnabled}
              onToggleVoice={handleToggleVoice}
              className={cn(
                "flex-1 border border-white/10 backdrop-blur-md",
                !voiceEnabled && "bg-black/55 hover:bg-black/70"
              )}
            />
            <button
              type="button"
              aria-expanded={panelExpanded}
              aria-label={
                panelExpanded ? "Hide shader controls" : "Show shader controls"
              }
              onClick={() => setPanelExpanded((prev) => !prev)}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-black/55 text-[#E8E9EB] backdrop-blur-md transition-colors duration-150 hover:bg-black/70"
            >
              {panelExpanded ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <SlidersHorizontal className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
