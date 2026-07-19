"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/**
 * Interactive "Little moments" photo stack.
 *
 * Three fanned, overlapping cards. On hover a card is "picked up out of the
 * stack": it slides up, straightens toward 0deg, and deepens its shadow, while
 * its neighbours lean away to uncover it. Paint order (z) is FIXED on hover —
 * nothing ever reorders in depth, so the stack illusion is never broken.
 *
 * On CLICK a card expands: it straightens to 0deg, centres, grows to fill the
 * panel's height (minus a 16px top/bottom margin), and jumps to the front while
 * a subtle scrim dims the rest. Clicking the scrim (outside the photo) collapses
 * it back to its resting place. Reordering z here is deliberate — the peeve is
 * about hover, and a click is an explicit "bring this to the front" gesture.
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
const EXPANDED_SHADOW = "0 18px 44px rgba(0,0,0,0.24)"

// Breathing room above and below the expanded photo, in rendered px.
const EXPAND_MARGIN = 16
// Scrim: z above the resting cards (1–3) but below the expanded card (50), so
// neighbours are dimmed while the expanded photo stays crisp on top.
const SCRIM_Z = 40
const EXPANDED_Z = 50
const SCRIM_COLOR = "rgba(30,26,22,0.34)" // tuned to the #F5F1EE panel

export function LittleMomentsStack() {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  // How much to scale a resting frame so its RENDERED height fills the panel
  // (minus the 16px top/bottom margin). Measured, so it stays correct across
  // the responsive scale-[…] breakpoints without hard-coding numbers.
  const [expandScale, setExpandScale] = useState(1)
  // Scrim size in the wrapper's LOCAL units — once the wrapper's scale is
  // applied it lands exactly over the panel, dimming the neighbours.
  const [scrimSize, setScrimSize] = useState({ w: 0, h: 0 })

  const fieldRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Recompute the expand scale + scrim footprint from live geometry. The wrapper
  // is 0×0 (its children are absolutely positioned), so we read its CSS scale
  // straight off the computed transform matrix rather than its box.
  const measure = () => {
    const field = fieldRef.current
    const wrapper = wrapperRef.current
    if (!field || !wrapper) return
    const rect = field.getBoundingClientRect()
    const t = getComputedStyle(wrapper).transform
    const wrapperScale = t && t !== "none" ? parseFloat(t.slice(t.indexOf("(") + 1)) || 1 : 1
    setExpandScale((rect.height - 2 * EXPAND_MARGIN) / (CARD_H * wrapperScale))
    setScrimSize({ w: rect.width / wrapperScale, h: rect.height / wrapperScale })
  }

  // Keep the fill exact if the viewport crosses a scale-[…] breakpoint while a
  // photo is open (e.g. a rotate or a window resize).
  useEffect(() => {
    if (expanded === null) return
    const onResize = () => measure()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [expanded])

  const open = (i: number) => {
    measure()
    setHovered(null)
    setExpanded(i)
  }
  const close = () => setExpanded(null)

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-[#F5F1EE]">
      {/* Fixed-height field; cards are centred with headroom for the lift. */}
      <div ref={fieldRef} className="relative flex h-[360px] items-center justify-center sm:h-[460px]">
        <div ref={wrapperRef} className="relative scale-[0.6] min-[400px]:scale-[0.7] min-[480px]:scale-[0.86] sm:scale-100">
          {/* Visual layer — animated frames. pointer-events:none so the moving
              card never steals or drops the cursor (avoids the hover flicker).
              The expanded card is the exception: it captures clicks so tapping
              the photo itself doesn't fall through to the dismiss scrim. */}
          {CARDS.map((card, i) => {
            const isExpanded = expanded === i
            // Freeze hover while anything is expanded so neighbours don't lift
            // under the scrim.
            const active = prefersReducedMotion || expanded !== null ? null : hovered
            const isHovered = active === i
            const isNeighbour = active !== null && Math.abs(active - i) === 1

            const nudge = isNeighbour ? (i < (active as number) ? -NEIGHBOUR_NUDGE : NEIGHBOUR_NUDGE) : 0

            return (
              <motion.div
                key={`card-${i}`}
                onClick={isExpanded ? (e) => e.stopPropagation() : undefined}
                className="absolute rounded-[14px] border-[6px] border-white bg-white"
                style={{
                  // Centre each card on the pivot; the fan comes from rotation.
                  width: CARD_W,
                  height: CARD_H,
                  left: -CARD_W / 2,
                  top: -CARD_H / 2,
                  zIndex: isExpanded ? EXPANDED_Z : card.z,
                  pointerEvents: isExpanded ? "auto" : "none",
                  transformOrigin: "50% 100%",
                }}
                initial={false}
                animate={
                  isExpanded
                    ? {
                        x: 0,
                        // The frame pivots at its bottom edge (transformOrigin
                        // 50% 100%), so scaling grows it upward. Push it back
                        // down by half the added height to re-centre it.
                        y: (CARD_H / 2) * (expandScale - 1),
                        rotate: 0,
                        scale: expandScale,
                        boxShadow: EXPANDED_SHADOW,
                      }
                    : {
                        x: card.x + nudge,
                        y: card.y + (isHovered ? -LIFT : isNeighbour ? NEIGHBOUR_DROP : 0),
                        rotate: card.rotate,
                        scale: isHovered ? 1.02 : 1,
                        boxShadow: isHovered ? LIFTED_SHADOW : RESTING_SHADOW,
                      }
                }
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

          {/* Scrim — fades in behind the expanded photo to focus it and to catch
              the click-outside dismiss. Lives inside the wrapper so it can sit
              above the resting cards (dimming them) yet below the expanded card,
              all within the wrapper's single stacking context. */}
          <AnimatePresence>
            {expanded !== null && (
              <motion.div
                key="scrim"
                onClick={close}
                className="absolute"
                style={{
                  width: scrimSize.w,
                  height: scrimSize.h,
                  left: -scrimSize.w / 2,
                  top: -scrimSize.h / 2,
                  zIndex: SCRIM_Z,
                  background: SCRIM_COLOR,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Enter deliberately (sits in the spring's settle window); exit
                // ~20% faster so dismiss feels crisp once the user's leaving.
                exit={{ opacity: 0, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" } }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Hit-area layer — static footprints at each card's resting position.
              These own the hover + click handlers and never move, so a still
              cursor stays over the same card no matter how the visual lifts.
              Ordered by the same z as the visuals, so the front card wins in
              overlaps. While expanded, the scrim (z 40) covers them, so they
              can't be re-entered until dismiss. */}
          {CARDS.map((card, i) => (
            <div
              key={`hit-${i}`}
              onMouseEnter={() => expanded === null && setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onClick={(e) => {
                e.stopPropagation()
                open(i)
              }}
              className="absolute cursor-pointer rounded-[14px]"
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
