"use client"

import { useRef, useState } from "react"
import { DEFAULT_PARAMS, type ShaderParams } from "@/lib/voiced-shader/defaults"
import { ShaderCanvas, type AudioLevels } from "./shader-canvas"

export function VoicedShaderPrototype() {
  const [params, setParams] = useState<ShaderParams>(DEFAULT_PARAMS)
  const audioLevelsRef = useRef<AudioLevels>({ rms: 0, centroidNorm: 0 })

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#3B1C14] aspect-[3/4] sm:aspect-[4/3]">
      <ShaderCanvas params={params} audioLevelsRef={audioLevelsRef} />
    </div>
  )
}
