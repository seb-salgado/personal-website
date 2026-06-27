"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { DirectionalUnderline } from "@/components/ui/directional-underline"

const EASE = [0.23, 1, 0.32, 1] as const

type FooterLink = { label: string; href: string }

export function CaseStudyLayout({
  children,
  footerPrev,
  footerNext,
  readTime,
  backHref = "/",
  backLabel = "Home",
}: {
  children: ReactNode
  footerPrev?: FooterLink
  footerNext?: FooterLink
  readTime?: string
  backHref?: string
  backLabel?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <main className="min-h-screen flex items-start justify-center px-6 pt-10 md:pt-[60px] lg:pt-[80px] pb-10 md:pb-[60px] lg:pb-[80px]">
      <div className="relative w-full max-w-[840px] flex flex-col gap-[80px]">
        {readTime && (
          <motion.div
            style={{ willChange: shouldReduceMotion ? "auto" : "filter, opacity" }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: EASE, delay: 0 }}
            className="-mb-[40px] max-w-[560px] mx-auto w-full flex justify-between items-center text-base text-[var(--color-fg)]"
          >
            <Link href={backHref}>
              <DirectionalUnderline className="flex items-center gap-1.5">
                <ArrowLeft size={16} strokeWidth={1.5} />
                {backLabel}
              </DirectionalUnderline>
            </Link>
            <span className="opacity-70">{readTime}</span>
          </motion.div>
        )}
        {children}

        {(footerPrev || footerNext) && (
          <div className="max-w-[560px] mx-auto flex justify-between text-base text-[var(--color-fg)]">
            {footerPrev ? (
              <Link href={footerPrev.href}>
                <DirectionalUnderline>← {footerPrev.label}</DirectionalUnderline>
              </Link>
            ) : (
              <span />
            )}
            {footerNext && (
              <Link href={footerNext.href}>
                <DirectionalUnderline>{footerNext.label} →</DirectionalUnderline>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
