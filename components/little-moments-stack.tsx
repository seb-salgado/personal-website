"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Interactive "Little moments" photo stack.
 *
 * Three fanned, overlapping cards. On hover a card is "picked up out of the
 * stack": it slides up, straightens toward 0deg, and deepens its shadow, while
 * its neighbours lean away to uncover it. Paint order (z) is FIXED — nothing
 * ever reorders in depth, so the stack illusion is never broken.
 *
 * The white frame (border + radius) is CSS; the photos are clean rectangles
 * (860×1200, ratio ~0.717), so the frame can animate without distortion.
 */

// Card frame size, in px. Width stays fixed (the mobile scaling is tuned to it);
// height matches the photos' 0.717 ratio → 180 / 0.717 ≈ 251.
const CARD_W = 180
const CARD_H = 251

type Card = {
  /** Resting rotation in degrees (creates the fan around a bottom pivot). */
  rotate: number
  /** Resting horizontal offset from centre, in px. */
  x: number
  /** Resting vertical offset, in px (negative = up). */
  y: number
  /** Fixed paint order — never changes. Higher = closer to the viewer. */
  z: number
  /** Photo source. */
  src: string
  /** Alt text. */
  alt: string
}

// Left → middle → right. Middle sits at the back; the outer cards overlap it.
const CARDS: Card[] = [
  { rotate: -15, x: -78, y: 0, z: 1, src: "/assets/voiced/stack-image-1.png", alt: "Sunlit sea foam" }, // bottom of stack
  { rotate: -1, x: 0, y: -14, z: 2, src: "/assets/voiced/stack-image-2.png", alt: "Open window at sunset" },
  { rotate: 14, x: 78, y: 0, z: 3, src: "/assets/voiced/stack-image-3.png", alt: "Wildflowers at golden hour" }, // front
]

// Tunable motion constants — the main things we'll dial in live.
const LIFT = 16 // px the hovered card rises
const NEIGHBOUR_NUDGE = 8 // px neighbours lean away
const NEIGHBOUR_DROP = 3 // px neighbours settle down
// Same character as { 300, 26 } (damping ratio ~0.75 — gentle onset + slight
// overshoot) but stiffer, so it settles ~20% faster without feeling snappier.
const TRANSITION = { type: "spring" as const, stiffness: 450, damping: 32 }

const RESTING_SHADOW = "0 4px 14px rgba(0,0,0,0.12)"
const LIFTED_SHADOW = "0 12px 30px rgba(0,0,0,0.18)"

export function LittleMomentsStack() {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#F5F1EE]">
      {/* Fixed-height field; cards are centred with headroom for the lift. */}
      <div className="relative flex h-[360px] items-center justify-center sm:h-[460px]">
        <div className="relative scale-[0.6] min-[400px]:scale-[0.7] min-[480px]:scale-[0.86] sm:scale-100">
          {/* Visual layer — animated frames. pointer-events:none so the moving
              card never steals or drops the cursor (avoids the hover flicker). */}
          {CARDS.map((card, i) => {
            const active = prefersReducedMotion ? null : hovered
            const isHovered = active === i
            const isNeighbour = active !== null && Math.abs(active - i) === 1

            const nudge = isNeighbour ? (i < (active as number) ? -NEIGHBOUR_NUDGE : NEIGHBOUR_NUDGE) : 0

            return (
              <motion.div
                key={`card-${i}`}
                className="pointer-events-none absolute rounded-[14px] border-[6px] border-white bg-white"
                style={{
                  // Centre each card on the pivot; the fan comes from rotation.
                  width: CARD_W,
                  height: CARD_H,
                  left: -CARD_W / 2,
                  top: -CARD_H / 2,
                  zIndex: card.z,
                  transformOrigin: "50% 100%",
                }}
                initial={false}
                animate={{
                  x: card.x + nudge,
                  y: card.y + (isHovered ? -LIFT : isNeighbour ? NEIGHBOUR_DROP : 0),
                  rotate: card.rotate,
                  scale: isHovered ? 1.02 : 1,
                  boxShadow: isHovered ? LIFTED_SHADOW : RESTING_SHADOW,
                }}
                transition={prefersReducedMotion ? { duration: 0 } : TRANSITION}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  draggable={false}
                  className="h-full w-full rounded-[8px] object-cover"
                />
              </motion.div>
            )
          })}

          {/* Hit-area layer — static footprints at each card's resting position.
              These own the hover handlers and never move, so a still cursor
              stays over the same card no matter how the visual lifts. Ordered by
              the same z as the visuals, so the front card wins in overlaps. */}
          {CARDS.map((card, i) => (
            <div
              key={`hit-${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="absolute rounded-[14px]"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: -CARD_W / 2,
                top: -CARD_H / 2,
                zIndex: card.z,
                transformOrigin: "50% 100%",
                transform: `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.rotate}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
