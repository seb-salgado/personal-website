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
      <div className="text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
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
        className={`w-full rounded-xl bg-[var(--color-surface)] ${className ?? ""}`}
        style={{ height }}
        aria-hidden="true"
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full rounded-xl object-cover ${className ?? ""}`}
    />
  )
}

export function MetadataRow({
  items,
}: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span className="text-sm text-[var(--color-fg)]" style={{ opacity: 0.7 }}>
            {label}
          </span>
          <span className="text-sm text-[var(--color-fg)]">{value}</span>
        </div>
      ))}
    </div>
  )
}
