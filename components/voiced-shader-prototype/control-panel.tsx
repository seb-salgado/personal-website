"use client"

import { MicOff } from "lucide-react"
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
      className={cn(
        "flex flex-col gap-5 rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-[var(--color-fg)] [--active:var(--color-fg)] [--background:var(--color-bg)] [--border:var(--color-border)] [--focus-ring:var(--color-fg)] [--foreground:var(--color-fg)] [--muted-foreground:var(--color-fg-muted)]",
        className
      )}
    >
      <section className="flex flex-col gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">
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
            className="rounded-xl"
          />
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">
          Colors
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {params.colors.map((color, i) => (
            <ColorPickerPopover
              key={i}
              value={color}
              onValueChange={(_, parsed) => onColorChange(i, rgbToHex(parsed.r, parsed.g, parsed.b))}
              triggerClassName="w-full rounded-xl"
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
  const labelClass =
    "absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:scale-100 motion-reduce:transition-none motion-reduce:[filter:none]"
  const visibleLabel = "scale-100 opacity-100 [filter:blur(0px)]"
  const hiddenLabel = "pointer-events-none scale-95 opacity-0 [filter:blur(2px)]"

  return (
    <button
      type="button"
      aria-pressed={voiceEnabled}
      aria-label={voiceEnabled ? "Voice On" : "Try Voice"}
      onClick={onToggleVoice}
      className={cn(
        "relative flex h-11 w-[116px] cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border border-transparent bg-[var(--color-fg)] text-base font-semibold text-[var(--color-bg)] transition-[background-color,border-color,opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-90 focus-visible:rounded-full active:scale-[0.98] motion-reduce:transition-none",
        className,
        voiceEnabled && "border-white bg-white/15 text-white hover:bg-white/15"
      )}
    >
      <span
        aria-hidden="true"
        // The idle pill is always white (it floats over the warm shader), so
        // "Try Voice" is pinned to the light-mode ink instead of var(--color-fg),
        // which would flip to a near-white and vanish on the pill in dark mode.
        className={cn(labelClass, voiceEnabled ? hiddenLabel : visibleLabel, "text-[#18191C]")}
      >
        Try Voice
      </span>
      <span
        aria-hidden="true"
        className={cn(labelClass, voiceEnabled ? visibleLabel : hiddenLabel)}
      >
        Voice On
      </span>
    </button>
  )
}

export function MicErrorNotice({ message }: { message: string }) {
  return (
    <p className="flex items-start gap-1.5 text-[12px] leading-snug text-[var(--color-fg-muted)]">
      <MicOff className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
