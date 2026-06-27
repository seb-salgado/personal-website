"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { CaseStudyBreadcrumb } from "@/components/case-study-breadcrumb"

const EASE = [0.23, 1, 0.32, 1] as const
const DURATION = 0.3

type CaseStudyIndexItem = {
  slug: string
  title: string
  description: string
  coverImage?: string
  available: boolean
}

function RevealItem({
  children,
  delay,
}: {
  children: ReactNode
  delay: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      style={{ willChange: shouldReduceMotion ? "auto" : "filter, opacity" }}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)" }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : DURATION,
        ease: EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

function CaseStudyCard({ study }: { study: CaseStudyIndexItem }) {
  const card = (
    <article
      className={`group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-[background-color,border-color,transform] duration-150 ${
        study.available
          ? "cursor-pointer hover:bg-[var(--color-surface)] active:scale-[0.99]"
          : "cursor-default opacity-55"
      }`}
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface)]">
        {study.coverImage ? (
          <img
            src={study.coverImage}
            alt=""
            className={`h-full w-full object-cover ${
              study.available
                ? "transition-transform duration-200 ease-out group-hover:scale-[1.015]"
                : ""
            }`}
          />
        ) : (
          <div
            className="h-full w-full opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
          {study.title}
        </h2>
        <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
          {study.description}
        </p>
      </div>
    </article>
  )

  if (!study.available) {
    return card
  }

  return (
    <Link href={`/case-studies/${study.slug}`} aria-label={study.title}>
      {card}
    </Link>
  )
}

export function CaseStudiesIndexContent({
  studies,
}: {
  studies: CaseStudyIndexItem[]
}) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8">
      <div className="flex flex-col gap-4">
        <RevealItem delay={0}>
          <CaseStudyBreadcrumb />
        </RevealItem>
        <RevealItem delay={0.08}>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold leading-[1.3] text-[var(--color-fg)]">
              Case studies
            </h1>
            <p className="text-base leading-[1.45] text-[var(--color-fg-muted)]">
              Selected product design work.
            </p>
          </div>
        </RevealItem>
      </div>

      <div className="flex flex-col gap-4">
        {studies.map((study, index) => (
          <RevealItem key={study.slug} delay={0.16 + index * 0.05}>
            <CaseStudyCard study={study} />
          </RevealItem>
        ))}
      </div>
    </div>
  )
}
