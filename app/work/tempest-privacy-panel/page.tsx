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
  shouldReduceMotion,
}: {
  children: ReactNode
  delay: number
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      style={{ willChange: shouldReduceMotion ? "auto" : "filter, opacity" }}
      initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function TempestCaseStudy() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <CaseStudyLayout
      footerPrev={{ label: "Home", href: "/" }}
    >
      {/* ── Narrative block (24px gaps throughout) ─────────────────── */}
      <div className="flex flex-col gap-[24px]">
        {/* 01 — Hero image */}
        <HeroItem delay={0} shouldReduceMotion={shouldReduceMotion}>
          <ImageBlock
            src="/assets/tempest/hero.jpg"
            alt="Tempest Browser Privacy Panel hero"
            width={840}
            height={560}
          />
        </HeroItem>

        {/* 02–04 — Title, metadata, and text sections (560px constrained) */}
        <div className="max-w-[560px] mx-auto flex flex-col gap-[24px]">
          {/* 02+03 — Title, intro, and metadata (16px gap between them) */}
          <div className="flex flex-col gap-[16px]">
            <HeroItem delay={STAGGER} shouldReduceMotion={shouldReduceMotion}>
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
            <HeroItem delay={STAGGER * 2} shouldReduceMotion={shouldReduceMotion}>
              <MetadataRow
                items={[
                  { label: "Company", value: "Tempest" },
                  { label: "Product", value: "Tempest Browser" },
                  { label: "Platform", value: "iOS and Desktop" },
                  { label: "Year", value: "2023" },
                ]}
              />
            </HeroItem>
          </div>

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

      {/* 05 — iPhone comparison card */}
      <ImageBlock
        src="/assets/tempest/comparison.jpg"
        alt="Privacy Panel OFF vs ON comparison"
        width={840}
        height={442}
        className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
      />

      {/* 06 — Flowchart section */}
      <div className="flex flex-col gap-[32px]">
        <TextSection heading="Flowchart">
          The present flowchart displays all user flows that the privacy panel
          contains. By visually describing the relationships between
          pages/screens and show all interactive possibilities the collaboration
          with all stakeholders improved considerably.
        </TextSection>
        <ImageBlock
          alt="User flow flowchart for Tempest Privacy Panel"
          width={840}
          height={1131}
          placeholder
        />
      </div>

      {/* 07 — iOS App section */}
      <div className="flex flex-col gap-[24px]">
        <TextSection heading="iOS App">
          Designed Tempest browser for iOS, confronting technical limitations
          while upholding our commitment to a positive user experience.
        </TextSection>
        <ImageBlock
          src="/assets/tempest/ios.png"
          alt="Tempest Browser iOS app"
          width={840}
          height={618}
          className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
        />
      </div>

      {/* 08 — Desktop section (multi-state browser mockups) */}
      <div className="flex flex-col gap-[24px]">
        <TextSection heading="Desktop">
          Designed the privacy panel for the desktop app built on Chromium,
          harnessing its robust foundation while tailoring it to our vision.
        </TextSection>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
          {/* State 1 */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-xl bg-[var(--color-surface)]" />
            <p className="text-base text-[var(--color-fg-muted)] leading-[1.4em]">
              When a user who sat their preference to &ldquo;No blocking&rdquo;
              is browsing the web and intends to activate the privacy panel, it
              becomes imperative that the privacy panel&apos;s toggle remains
              perpetually accessible, since it&apos;s a critical event.
            </p>
          </div>
          {/* State 2 */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-xl bg-[var(--color-surface)]" />
            <p className="text-base text-[var(--color-fg-muted)] leading-[1.4em]">
              Once the user turns ON the toggle, this juncture becomes
              opportune to inquire whether they wish to reconsider their chosen
              blocking level.
            </p>
          </div>
          {/* State 3 */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-xl bg-[var(--color-surface)]" />
            <p className="text-base text-[var(--color-fg-muted)] leading-[1.4em]">
              If the user chooses not to make any adjustments, they are alerted
              that they can update their blocking level on settings.
            </p>
          </div>
          {/* State 4 */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-xl bg-[var(--color-surface)]" />
            <p className="text-base text-[var(--color-fg-muted)] leading-[1.4em]">
              A subsequent prompt will be presented on the tenth occasion they
              activate the privacy panel. This time, allowing the user to dismiss
              the inquiry permanently.
            </p>
          </div>
          {/* State 5 */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-xl bg-[var(--color-surface)]" />
            <p className="text-base text-[var(--color-fg-muted)] leading-[1.4em]">
              Should they opt for a modification, they are provided confirmation
              of the changes made and their settings are updated in the
              background.
            </p>
          </div>
        </div>
      </div>

      {/* 09 — Blocking Level section */}
      <div className="flex flex-col gap-[24px]">
        <TextSection heading="Blocking Level">
          An example where the design team effectively enhanced both user
          experience and upheld the company&apos;s core objectives revolved
          around refining the process of activating the privacy panel when the
          user&apos;s blocking level is set to &ldquo;No Blocking.&rdquo;
        </TextSection>
        <ImageBlock
          alt="Blocking level settings UI"
          width={840}
          height={736}
          placeholder
        />
      </div>
    </CaseStudyLayout>
  )
}
