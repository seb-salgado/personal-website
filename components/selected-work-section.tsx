"use client";

import { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

export const SelectedWorkSection = memo(function SelectedWorkSection() {
  const [expanded, setExpanded] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (expanded) {
      setArrowVisible(true);
      const id = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(id);
    }
  }, [expanded]);

  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(false), 1000);
    return () => clearTimeout(id);
  }, [error]);

  function collapse() {
    // Fire simultaneously — arrow is absolutely positioned so it doesn't
    // affect layout, allowing the container to shrink at the same time.
    setArrowVisible(false);
    setExpanded(false);
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/case-studies";
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  const layoutDuration = prefersReducedMotion ? 0 : 0.22;

  return (
    <div className="flex flex-col">
      <video
        className="w-full rounded-xl"
        src="https://res.cloudinary.com/dcewfztrv/video/upload/f_auto,q_auto/v1782644616/selected-work_egio2h.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Footer row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mt-3">
        {/* Left: title + description */}
        <div className="flex flex-col gap-0.5">
          <span
            className="font-medium text-base"
            style={{ lineHeight: 1.3, color: "var(--color-fg)" }}
          >
            Selected Work
          </span>
          <span
            className="text-sm"
            style={{ lineHeight: 1.4, color: "var(--color-fg-muted)" }}
          >
            To protect confidential work, a password is needed.
          </span>
        </div>

        {/* Right: morphing control */}
        <form onSubmit={handleSubmit} className="flex items-center shrink-0 self-start sm:self-center">
          {/*
            `relative` so the arrow button can be absolutely positioned —
            keeping it out of the flex flow so the container width is driven
            only by the input / Continue button, allowing simultaneous shrink + arrow exit.
          */}
          <motion.div
            layout
            className={`relative flex items-center rounded-[8px] [overflow:clip] ${expanded ? "bg-[var(--color-surface)]" : ""}`}
            style={{
              height: 34,
              boxShadow: `inset 0 0 0 1px ${error ? "#ef4444" : "var(--color-border)"}`,
              transition: "box-shadow 0.15s",
            }}
            transition={{ layout: { duration: layoutDuration, ease: EASE } }}
            whileTap={!expanded ? { scale: 0.97 } : undefined}
          >
            {/* `layout` on Continue counter-scales against the parent FLIP to prevent text distortion */}
            <AnimatePresence mode="popLayout" initial={false}>
              {!expanded ? (
                <motion.button
                  key="continue"
                  layout
                  type="button"
                  onClick={() => setExpanded(true)}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(3px)" }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, filter: "blur(0px)" }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.12, ease: EASE }}
                  className="h-full px-2 text-sm font-medium whitespace-nowrap cursor-pointer rounded-[7px] hover:bg-[var(--color-surface)] transition-colors duration-150"
                  style={{ color: "var(--color-fg)" }}

                >
                  Continue
                </motion.button>
              ) : (
                <motion.input
                  key="input"
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  disabled={loading}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(3px)" }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, filter: "blur(0px)" }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.12, delay: 0.08, ease: EASE }}
                  className="text-sm outline-none"
                  style={{
                    width: 140,
                    height: 34,
                    paddingLeft: 12,
                    paddingRight: 36,
                    color: "var(--color-fg)",
                    outline: "none",
                  }}
                  onBlur={() => { setTimeout(() => { if (!submittingRef.current) collapse(); submittingRef.current = false; }, 150); }}
                  onKeyDown={(e) => { if (e.key === "Escape") collapse(); }}
                />
              )}
            </AnimatePresence>

            {/* Arrow — absolutely positioned so it never affects container width */}
            <AnimatePresence>
              {arrowVisible && (
                <motion.button
                  key="arrow"
                  type="submit"
                  disabled={loading}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.8, transition: { duration: 0.1, ease: EASE } }
                  }
                  transition={{ duration: 0.16, delay: prefersReducedMotion ? 0 : 0.1, ease: EASE }}
                  onMouseDown={() => { submittingRef.current = true; }}
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    position: "absolute",
                    right: -1,
                    top: -1,
                    bottom: -1,
                    width: 35,
                    backgroundColor: "var(--color-fg)",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span
                        key="spinner"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.8, filter: "blur(3px)" }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, scale: 1, filter: "blur(0px)" }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.8, filter: "blur(3px)", transition: { duration: 0.1, ease: EASE } }
                        }
                        transition={{ duration: 0.15, ease: EASE }}
                        style={{ display: "flex" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="animate-spin"
                          style={{ animationDuration: "700ms" }}
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="5.5"
                            stroke="var(--color-bg)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="20 14"
                          />
                        </svg>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="arrow"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.8, filter: "blur(3px)" }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, scale: 1, filter: "blur(0px)" }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.8, filter: "blur(3px)", transition: { duration: 0.1, ease: EASE } }
                        }
                        transition={{ duration: 0.15, ease: EASE }}
                        style={{ display: "flex" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="var(--color-bg)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </form>
      </div>
    </div>
  );
});
