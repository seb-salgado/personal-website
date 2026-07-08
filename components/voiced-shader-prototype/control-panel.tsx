"use client"

import type { CSSProperties } from "react"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { rgbToHex } from "@/lib/voiced-shader/color"
import { SliderComfortable } from "@/components/ui/slider"
import { ColorPickerPopover } from "@/components/ui/color-picker"
import {
  PARAM_CONFIG,
  type NumericParam,
  type ShaderParams,
} from "@/lib/voiced-shader/defaults"

interface ControlPanelProps {
  params: ShaderParams
  onParamChange: (key: NumericParam, value: number) => void
  onColorChange: (index: number, value: string) => void
  voiceEnabled: boolean
  onToggleVoice: () => void
  micError: string | null
  showVoiceButton?: boolean
  className?: string
}

// The panel sits on the shader, so it is always dark regardless of site
// theme. The registry components read these theme variables.
const darkPanelVars = {
  "--color-bg": "#111213",
  "--color-fg": "#E8E9EB",
  "--color-fg-muted": "#A0A2A4",
  "--color-surface": "#242528",
  "--color-border": "rgba(255, 255, 255, 0.16)",
  "--color-ring": "rgba(232, 233, 235, 0.12)",
} as CSSProperties

const NUMERIC_PARAMS: NumericParam[] = [
  "speed",
  "contrast",
  "grain",
  "noiseScale",
]

function formatParam(key: NumericParam, value: number) {
  return value.toFixed(key === "grain" ? 3 : 2)
}

export function ControlPanel({
  params,
  onParamChange,
  onColorChange,
  voiceEnabled,
  onToggleVoice,
  micError,
  showVoiceButton = true,
  className,
}: ControlPanelProps) {
  return (
    <div
      style={darkPanelVars}
      className={cn(
        "flex flex-col gap-5 rounded-xl border border-white/10 bg-black/55 p-4 text-[#E8E9EB] backdrop-blur-md",
        className
      )}
    >
      <section className="flex flex-col gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/50">
          Parameters
        </h3>
        {NUMERIC_PARAMS.map((key) => (
          <SliderComfortable
            key={key}
            variant="scrubber"
            label={PARAM_CONFIG[key].label}
            value={params[key]}
            min={PARAM_CONFIG[key].min}
            max={PARAM_CONFIG[key].max}
            step={PARAM_CONFIG[key].step}
            formatValue={(v) => formatParam(key, v)}
            onChange={(value) => onParamChange(key, value)}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/50">
          Colors
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {params.colors.map((color, i) => (
            <ColorPickerPopover
              key={i}
              value={color}
              onValueChange={(_, parsed) => onColorChange(i, rgbToHex(parsed.r, parsed.g, parsed.b))}
              triggerLabel={`${i + 1}`}
              triggerClassName="w-full"
              hideEyedropper
            />
          ))}
        </div>
      </section>

      {showVoiceButton && (
        <div className="mt-auto flex flex-col gap-2">
          <VoiceToggleButton
            voiceEnabled={voiceEnabled}
            onToggleVoice={onToggleVoice}
          />
          {micError && <MicErrorNotice message={micError} />}
        </div>
      )}
    </div>
  )
}

export function VoiceToggleButton({
  voiceEnabled,
  onToggleVoice,
  className,
}: {
  voiceEnabled: boolean
  onToggleVoice: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={voiceEnabled}
      onClick={onToggleVoice}
      className={cn(
        "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-[13px] font-medium transition-colors duration-150",
        voiceEnabled
          ? "bg-[#E8E9EB] text-[#111213] hover:bg-white"
          : "bg-white/10 text-[#E8E9EB] hover:bg-white/15",
        className
      )}
    >
      {voiceEnabled ? (
        <>
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CC5930] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#CC5930]" />
          </span>
          Listening…
        </>
      ) : (
        <>
          <Mic className="size-4" aria-hidden="true" />
          Enable voice reaction
        </>
      )}
    </button>
  )
}

export function MicErrorNotice({ message }: { message: string }) {
  return (
    <p className="flex items-start gap-1.5 text-[12px] leading-snug text-white/60">
      <MicOff className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
