"use client"

import { useState, useRef, useLayoutEffect } from "react"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  animate,
} from "motion/react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Transition reused verbatim from the home-screen testimonials section
// (components/testimonials.tsx): a blur + fade + small directional slide.
const ease = [0.23, 1, 0.32, 1] as const

const variants = {
  initial: (dir: number) => ({
    x: dir * 16,
    filter: "blur(8px)",
    opacity: 0,
  }),
  animate: {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir * -16,
    filter: "blur(8px)",
    opacity: 0,
    transition: { duration: 0.25, ease },
  }),
}

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// Rubber-band drag constants (from testimonials).
const THRESHOLD = 50
const DRAG_RANGE = 160 // distance over which exit values are fully reached
const ELASTICITY = 0.3 // rubber-band feel: 0 = hard stop, 1 = no resistance

// Avatar images (dropped into /public/assets/voiced/). Set to a path once the
// asset exists; leave undefined to render a neutral placeholder circle.
const VOICED_AVATAR: string | undefined = "/assets/voiced/voiced-avatar.webp"
const DEFAULT_USER_AVATAR: string | undefined = "/assets/voiced/user-01.webp"

// The Voiced greeting is constant across every example.
const GREETING = "What’s on your mind?"

type ConversationExample = {
  userMessage: string
  before: string
  after: string
  userAvatar?: string
}

// Copy transcribed verbatim from Figma (node 255:2038, frames 01–04).
const EXAMPLES: ConversationExample[] = [
  {
    userMessage:
      "A colleague reviewed my work today and pointed out a few issues. They were polite about it, but I haven't been able to stop thinking about the conversation.",
    before:
      "It's normal to dwell on feedback; it shows you care about your work. Reflecting on this, it might be worth considering what specifically about their feedback has impacted you the most. What feelings come up when you think about their comments?",
    after:
      "That sounds frustrating to dwell on. What specific issues did they point out?",
    userAvatar: "/assets/voiced/user-01.webp",
  },
  {
    userMessage:
      "My partner and I were talking this morning and somehow I completely forgot an important date we'd planned. They're not angry, but I can tell they're a bit annoyed.",
    before:
      "It's natural to feel anxious when you sense disappointment. You mentioned forgetting an important date—how do you feel about their reaction?",
    after:
      "It must feel uncomfortable to sense that annoyance. What was the date you forgot?",
    userAvatar: "/assets/voiced/user-02.webp",
  },
  {
    userMessage:
      "I sent my partner a message earlier and they replied with just “okay.” Maybe I'm overthinking it, but it felt a bit different than usual.",
    before:
      "It's natural to feel uncertain in situations like this. You may be picking up on changes in communication patterns. How did their message make you feel about your connection with them?",
    after:
      "That feels a bit off. What was the message you sent that prompted their response?",
    userAvatar: "/assets/voiced/user-03.webp",
  },
  {
    userMessage:
      "My partner and I have been trying to plan a trip together. Somehow every conversation about it turns into a debate about where to go.",
    before:
      "It's common for couples to face disagreements over travel plans. It sounds like you're both invested in making this trip special. What do you think is at the root of these debates?",
    after:
      "It's tough when planning turns into a debate. What have been some of the places you've considered?",
    userAvatar: "/assets/voiced/user-04.webp",
  },
]

function Avatar({
  src,
  alt,
  className,
}: {
  src?: string
  alt: string
  className?: string
}) {
  return (
    <div className={cn("relative size-8 shrink-0 rounded-full", className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <div
          className="size-full rounded-full bg-[var(--color-surface)]"
          aria-hidden="true"
        />
      )}
      {/* Inset hairline ring: 7% black (light) / 7% white (dark). Overlaid so it
          stays visible on top of the image. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
      />
    </div>
  )
}

// Voiced avatar with a status badge (red ✕ for Before, green ✓ for After).
function VoicedAvatar({ status }: { status: "before" | "after" }) {
  const isBefore = status === "before"
  return (
    <div className="relative mb-1 shrink-0">
      <Avatar src={VOICED_AVATAR} alt="Voiced" />
      <span
        className="absolute -bottom-0.5 -right-0.5 flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[var(--color-bg)]"
        style={{ backgroundColor: isBefore ? "#ff3b3b" : "#68b22f" }}
      >
        {isBefore ? (
          <X size={12} strokeWidth={3} className="text-white" />
        ) : (
          <Check size={12} strokeWidth={3} className="text-white" />
        )}
      </span>
    </div>
  )
}

const labelClass = "text-sm font-medium text-[var(--color-fg-muted)]"
const bodyClass = "text-base leading-[1.45] text-[var(--color-fg)]"

function ConversationCard({ example }: { example: ConversationExample }) {
  return (
    <div className="flex flex-col px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-4">
        {/* Voiced greeting */}
        <div className="flex items-end gap-3">
          <Avatar src={VOICED_AVATAR} alt="Voiced" className="mb-1" />
          <div className="flex max-w-[492px] flex-col gap-0.5">
            <span className={labelClass}>Voiced</span>
            <p className={bodyClass}>{GREETING}</p>
          </div>
        </div>

        {/* User message */}
        <div className="flex items-end justify-end gap-3">
          <div className="flex max-w-[494px] flex-col gap-0.5 rounded-xl rounded-br-[4px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
            <span className={labelClass}>User</span>
            <p className={bodyClass}>{example.userMessage}</p>
          </div>
          <Avatar
            src={example.userAvatar ?? DEFAULT_USER_AVATAR}
            alt="User"
          />
        </div>

        {/* Voiced (Before) */}
        <div className="flex items-end gap-3">
          <VoicedAvatar status="before" />
          <div className="flex max-w-[492px] flex-col gap-0.5">
            <span className={labelClass}>Voiced (Before)</span>
            <p className={bodyClass}>{example.before}</p>
          </div>
        </div>

        {/* Voiced (After) */}
        <div className="flex items-end gap-3">
          <VoicedAvatar status="after" />
          <div className="flex max-w-[492px] flex-col gap-0.5">
            <span className={labelClass}>Voiced (After)</span>
            <p className={bodyClass}>{example.after}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fixed control bar reused verbatim from the home-screen testimonials section
// (components/testimonials.tsx): prev chevron pinned left, dots centered, next
// chevron pinned right. Rendered once outside the sliding cards so it never
// moves; only the active dot changes.
function CarouselControls({
  index,
  total,
  onPrev,
  onNext,
  onGoTo,
}: {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}) {
  const chevronButtonClass =
    "flex items-center justify-center transition-opacity duration-150 [@media(hover:hover)]:opacity-40 hover:opacity-100"
  return (
    <div className="flex w-full items-center justify-between px-4 pb-4 pt-6 sm:px-6 sm:pb-6">
      <button
        type="button"
        aria-label="Previous example"
        onClick={onPrev}
        className={chevronButtonClass}
        style={{ minHeight: 24, minWidth: 24, color: "var(--color-fg)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGoTo(i)}
            aria-label={`Go to example ${i + 1}`}
            className="flex items-center justify-center"
            style={{ minHeight: 24, minWidth: 6 }}
          >
            <div
              className="h-[6px] w-[6px] rounded-full transition-opacity duration-300"
              style={{
                background: i === index ? "var(--color-fg)" : "var(--color-border)",
                opacity: i === index ? 0.6 : 0.4,
              }}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next example"
        onClick={onNext}
        className={chevronButtonClass}
        style={{ minHeight: 24, minWidth: 24, color: "var(--color-fg)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 2.5L10 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export function VoicedConversationExamples() {
  const [index, setIndex] = useState(0)
  const total = EXAMPLES.length

  // Reserve the tallest card's height so the box never jumps between examples
  // (mode="wait" renders only the active card at a time).
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined)
  const measureRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!measureRef.current) return
    const heights = Array.from(measureRef.current.children).map(
      (el) => (el as HTMLElement).offsetHeight
    )
    setMinHeight(Math.max(...heights))
  }, [])

  const prefersReducedMotion = useReducedMotion()
  const direction = useRef(1)
  const pointerStartX = useRef(0)

  const dragX = useMotionValue(0)
  const dragOpacity = useMotionValue(1)
  const dragFilter = useMotionValue("blur(0px)")

  const resetDrag = (animate_: boolean) => {
    if (animate_) {
      animate(dragX, 0, { duration: 0.25, ease })
      animate(dragOpacity, 1, { duration: 0.25, ease })
      if (!prefersReducedMotion) {
        animate(dragFilter, "blur(0px)", { duration: 0.25, ease })
      }
    } else {
      dragX.set(0)
      dragOpacity.set(1)
      dragFilter.set("blur(0px)")
    }
  }

  const navigate = (dir: number) => {
    direction.current = dir
    setIndex((i) => (i + dir + total) % total)
  }

  const goTo = (i: number) => {
    resetDrag(false)
    direction.current = i > index ? 1 : -1
    setIndex(i)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return
    const delta = e.clientX - pointerStartX.current
    const absDelta = Math.abs(delta)
    // Progressive resistance: linear below threshold, asymptotic beyond it.
    const resistedDelta =
      absDelta <= THRESHOLD
        ? absDelta
        : THRESHOLD +
          THRESHOLD * (1 - Math.exp(-(absDelta - THRESHOLD) / THRESHOLD / ELASTICITY))
    const progress = resistedDelta / DRAG_RANGE

    if (!prefersReducedMotion) {
      dragX.set(Math.sign(delta) * progress * 16)
      dragFilter.set(`blur(${progress * 8}px)`)
    }
    dragOpacity.set(1 - progress)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - pointerStartX.current
    if (delta < -THRESHOLD) {
      navigate(1)
    } else if (delta > THRESHOLD) {
      navigate(-1)
    } else {
      resetDrag(true)
    }
  }

  const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[var(--color-bg)]">
      {/* Hidden measurement layer — renders all cards to find the tallest. */}
      <div
        ref={measureRef}
        aria-hidden
        className="invisible pointer-events-none absolute h-0 w-full overflow-hidden"
      >
        {EXAMPLES.map((example, i) => (
          <ConversationCard key={i} example={example} />
        ))}
      </div>

      <div style={{ minHeight }}>
        <motion.div style={{ filter: dragFilter }}>
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={direction.current}
            onExitComplete={() => dragFilter.set("blur(0px)")}
          >
            <motion.div
              key={index}
              custom={direction.current}
              variants={activeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease }}
              style={{ x: dragX, opacity: dragOpacity }}
              className="cursor-grab select-none active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => resetDrag(true)}
            >
              <ConversationCard example={EXAMPLES[index]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Controls stay fixed (outside the animating card) and read as the card
          footer inside the bordered container. */}
      <CarouselControls
        index={index}
        total={total}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onGoTo={goTo}
      />

      {/* The card outline lives on the container so it stays fixed. Hairline via
          inset shadow using the site border token (flips for light/dark). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-lg shadow-[inset_0_0_0_1px_var(--color-border)]"
      />
    </div>
  )
}
