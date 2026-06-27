// app/work/tempest-privacy-panel/page.tsx
"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { CaseStudyLayout } from "@/components/case-study-layout"
import {
  TextSection,
  ImageBlock,
  MetadataRow,
} from "@/components/case-study-primitives"

const EASE = [0.23, 1, 0.32, 1] as const
const DURATION = 0.28
const STAGGER = 0.06

function HeroItem({
  children,
  delay,
}: {
  children: ReactNode
  delay: number
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function TempestCaseStudy() {
  return (
    <CaseStudyLayout
      footerPrev={{ label: "Home", href: "/" }}
      footerNext={{ label: "Next case study", href: "/" }}
    >
      {/* ── Narrative block (24px gaps throughout) ─────────────────── */}
      <div className="flex flex-col gap-[24px]">
        {/* 01 — Hero image */}
        <HeroItem delay={0}>
          <ImageBlock
            alt="Tempest Browser Privacy Panel hero"
            width={840}
            height={560}
            placeholder
          />
        </HeroItem>

        {/* 02–04 — Title, metadata, and text sections (560px constrained) */}
        <div className="max-w-[560px] flex flex-col gap-[24px]">
          {/* 02 — Title + intro body */}
          <HeroItem delay={STAGGER}>
            <div className="flex flex-col gap-1">
              <h1 className="text-base font-semibold text-[var(--color-fg)]">
                Tempest Browser Privacy Panel
              </h1>
              <p className="text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
                Tempest Browser is a privacy-centric browser that redefines the
                way users interact with the web, by allowing users to adjust the
                intensity of tracking prevention, so they can strike the ideal
                balance between privacy and functionality.
              </p>
            </div>
          </HeroItem>

          {/* 03 — Metadata row */}
          <HeroItem delay={STAGGER * 2}>
            <MetadataRow
              items={[
                { label: "Company", value: "Tempest" },
                { label: "Product", value: "Tempest Browser" },
                { label: "Platform", value: "iOS and Desktop" },
                { label: "Year", value: "2023" },
              ]}
            />
          </HeroItem>

          {/* 04 — Four narrative text sections (NOT animated) */}
          <TextSection heading="Background">
            The rapid expansion of online tracking, aggressive advertising, and
            data harvesting practices has raised significant privacy issues for
            internet users. Conventional browsers lack transparency in displaying
            the extent of invasive content being blocked, leaving users in the
            dark about the true impact of their privacy settings.
          </TextSection>

          <TextSection heading="Problem">
            How can we strike a balance between fortifying users&apos; online
            safety and providing a seamless browsing experience?
          </TextSection>

          <TextSection heading="Solution">
            Design a privacy-centric browser that redefines the way users
            interact with the web, by allowing users to adjust the intensity of
            tracking prevention, so they can strike the ideal balance between
            privacy and functionality. Additionally, add a panel that displays
            the invasive threats that the browser is blocking in real time – from
            ads to trackers to cookies – ensuring user&apos;s feeling of online
            safety.
          </TextSection>

          <TextSection heading="Achievement">
            Successfully launched the browser, creating an impactful,
            privacy-first experience for users. Additionally, developed processes
            that paved the way for a new business unit at Tempest, Infinity
            Browsers, now producing white-label browsers for brands like Ecosia
            and Startpage.
          </TextSection>
        </div>
      </div>

      {/* ── Visual sections below (80px gaps from parent flex gap) ─── */}
    </CaseStudyLayout>
  )
}
