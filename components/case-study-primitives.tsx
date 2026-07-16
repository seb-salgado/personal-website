"use client"

import { useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { block, revealDelay } from "@/lib/reveal"

// One block in the page-load reveal chain. `index` is its position in that chain —
// see lib/reveal.ts for the delay schedule.
export function Reveal({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  // The hint is only worth paying for while the animation runs; left on, it would pin
  // a compositor layer per block for the life of the page.
  const [settled, setSettled] = useState(false)

  return (
    <motion.div
      {...block(revealDelay(index), shouldReduceMotion)}
      onAnimationComplete={() => setSettled(true)}
      className={className}
      style={{
        willChange: shouldReduceMotion || settled ? "auto" : "filter, opacity",
      }}
    >
      {children}
    </motion.div>
  )
}

export function TextSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <div className="max-w-[560px] mx-auto flex flex-col gap-1">
      <h2 className="text-base font-semibold text-[var(--color-fg)]">{heading}</h2>
      <div className="flex flex-col gap-2 text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
        {children}
      </div>
    </div>
  )
}

export function MediaCaption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-4 text-sm leading-[1.4em] text-[var(--color-fg-muted)]">
      {children}
    </figcaption>
  )
}

export function ImageBlock({
  src,
  alt,
  width,
  height,
  placeholder = false,
  className,
  caption,
}: {
  src?: string
  alt: string
  width: number
  height: number
  placeholder?: boolean
  className?: string
  caption?: ReactNode
}) {
  if (placeholder || !src) {
    const block = (
      <div
        className={`w-full rounded-lg bg-[var(--color-surface)] ${className ?? ""}`}
        style={{ height }}
        aria-hidden="true"
      />
    )
    if (!caption) return block
    return (
      <figure className="w-full">
        {block}
        <MediaCaption>{caption}</MediaCaption>
      </figure>
    )
  }
  const block = (
    <div className="relative w-full rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full object-cover"
      />
      {className && (
        <div className={`absolute inset-0 rounded-lg pointer-events-none ${className}`} />
      )}
    </div>
  )
  if (!caption) return block
  return (
    <figure className="w-full">
      {block}
      <MediaCaption>{caption}</MediaCaption>
    </figure>
  )
}

export function VideoBlock({ src, caption }: { src: string; caption?: ReactNode }) {
  const webmSrc = src
    .replace("/upload/", "/upload/q_auto,f_webm/")
    .replace(/\.mp4$/, ".webm")
  const mp4Src = src.replace("/upload/", "/upload/q_auto,f_mp4/")

  const block = (
    <div className="w-full rounded-lg overflow-hidden">
      <video autoPlay muted loop playsInline className="w-full h-auto block">
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  )
  if (!caption) return block
  return (
    <figure className="w-full">
      {block}
      <MediaCaption>{caption}</MediaCaption>
    </figure>
  )
}

export function MetadataRow({
  items,
}: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <div
      className="grid gap-y-3"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span className="text-base text-[var(--color-fg)]" style={{ opacity: 0.7 }}>
            {label}
          </span>
          <span className="text-base text-[var(--color-fg)]">{value}</span>
        </div>
      ))}
    </div>
  )
}
