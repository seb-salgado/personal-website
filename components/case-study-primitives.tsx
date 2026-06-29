import type { ReactNode } from "react"

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

export function ImageBlock({
  src,
  alt,
  width,
  height,
  placeholder = false,
  className,
}: {
  src?: string
  alt: string
  width: number
  height: number
  placeholder?: boolean
  className?: string
}) {
  if (placeholder || !src) {
    return (
      <div
        className={`w-full rounded-lg bg-[var(--color-surface)] ${className ?? ""}`}
        style={{ height }}
        aria-hidden="true"
      />
    )
  }
  return (
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
}

export function VideoBlock({ src }: { src: string }) {
  const webmSrc = src
    .replace("/upload/", "/upload/q_auto,f_webm/")
    .replace(/\.mp4$/, ".webm")
  const mp4Src = src.replace("/upload/", "/upload/q_auto,f_mp4/")

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <video autoPlay muted loop playsInline className="w-full h-auto block">
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  )
}

export function MetadataRow({
  items,
}: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <div className="grid grid-cols-4 gap-y-3">
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
