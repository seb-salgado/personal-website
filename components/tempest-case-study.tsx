"use client"

import Link from "next/link"
import { CaseStudyLayout } from "@/components/case-study-layout"
import { DirectionalUnderline } from "@/components/ui/directional-underline"
import {
  Reveal,
  TextSection,
  ImageBlock,
  MetadataRow,
} from "@/components/case-study-primitives"

const socials = [
  { label: "X/Twitter", href: "https://x.com/sebsalgado2" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sebastiao-sommer/" },
  { label: "GitHub", href: "https://github.com/sebastiaosommer-123" },
  { label: "Email", href: "mailto:hi@sebsalgado.com" },
]

export function TempestCaseStudy() {
  return (
    <CaseStudyLayout
      readTime="2 min read"
      breadcrumbPage="Tempest Browser"
    >
      {/* Narrative block (24px gaps throughout) */}
      <div className="flex flex-col gap-[40px]">
        {/* 01 — Hero image */}
        <Reveal index={1}>
          <ImageBlock
            src="/assets/tempest/hero.jpg"
            alt="Tempest Browser Privacy Panel hero"
            width={840}
            height={560}
          />
        </Reveal>

        {/* 02–04 — Title, metadata, and text sections (560px constrained) */}
        <div className="max-w-[560px] mx-auto flex flex-col gap-[24px]">
          {/* 02+03 — Title, intro, and metadata (16px gap between them) */}
          <div className="flex flex-col gap-[16px]">
            <Reveal index={2}>
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold text-[var(--color-fg)]">
                  Tempest Browser
                </h1>
                <p className="text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
                  Tempest was building a privacy focused search engine and browser
                  with a mission to let people live their digital lives on their
                  own terms.
                </p>
              </div>
            </Reveal>

            {/* 03 — Metadata row */}
            <Reveal index={3}>
              <MetadataRow
                items={[
                  { label: "Company", value: "Tempest" },
                  { label: "Platform", value: "Desktop, iOS" },
                  { label: "Year", value: "2023" },
                ]}
              />
            </Reveal>
          </div>

          {/* 04 — Three narrative text sections */}
          <Reveal index={4}>
            <TextSection heading="My Role">
              Senior Product Designer working across Tempest Browser and Tempest
              Search, partnering closely with product, engineering, and the VP of
              Design.
            </TextSection>
          </Reveal>

          <Reveal index={5}>
            <TextSection heading="Context">
              Tempest&apos;s strategy centered on two products: Tempest Search, a
              privacy focused search engine, and Tempest Browser, a browser
              designed to drive adoption of Tempest Search.
            </TextSection>
          </Reveal>

          <Reveal index={6}>
            <TextSection heading="The Challenge">
              Users want privacy, but aggressive blocking can break websites or
              create friction. Most browsers expose privacy controls through
              technical settings that feel intimidating and disconnected from the
              browsing experience. The goal was to make privacy protections easier
              to understand and control.
            </TextSection>
          </Reveal>
        </div>
      </div>

      <Reveal index={7}>
        <ImageBlock
          src="/assets/tempest/comparison.jpg"
          alt="Privacy Panel OFF vs ON comparison"
          width={840}
          height={442}
          className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
        />
      </Reveal>

      {/* 05 — Making Privacy Visible */}
      <Reveal index={8} className="flex flex-col gap-[40px]">
        <TextSection heading="Making Privacy Visible">
          One of the key initiatives was the Privacy Panel, a real time view of
          the protections being applied while users browsed the web. Instead of
          hiding privacy controls inside settings, we brought them directly into
          the browsing experience. Users could see blocked trackers, understand
          what protections were active, and adjust their preferences without
          leaving the page they were viewing.
        </TextSection>
        <ImageBlock
          src="/assets/tempest/ios.png"
          alt="Tempest Browser iOS app"
          width={840}
          height={618}
          className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
        />
        <div className="relative w-full rounded-lg overflow-hidden">
          <img src="/assets/tempest/desktop.png" alt="Tempest desktop app" className="w-full" />
          <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <img src="/assets/tempest/variations.png" alt="Tempest Privacy Panel variations" className="w-full" />
        </div>
      </Reveal>

      {/* 06 — Designing for Conflicting User Goals */}
      <Reveal index={9} className="flex flex-col gap-[40px]">
        <TextSection heading="Designing for Conflicting User Goals">
          One of the most interesting design challenges involved users who
          intentionally selected &ldquo;No Blocking.&rdquo; From a product
          perspective, we wanted users to understand the benefits of stronger
          privacy protections. From a user perspective, choosing &ldquo;No
          Blocking&rdquo; was a deliberate decision that needed to be respected.
          The challenge was finding ways to educate users without creating
          friction or undermining user choice.
        </TextSection>

      {/* 09 — Blocking Level section */}
      <div className="flex flex-col gap-[40px]">
        <div className="relative w-full rounded-lg overflow-hidden">
          <img src="/assets/tempest/desktop-blocking-level.png" alt="Tempest desktop blocking level" className="w-full" />
          <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
          {/* State 1 */}
          <div className="relative w-full rounded-lg overflow-hidden">
            <img src="/assets/tempest/grid-1.png" alt="Blocking level state 1" className="w-full" />
            <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
          </div>
          {/* State 2 */}
          <div className="relative w-full rounded-lg overflow-hidden">
            <img src="/assets/tempest/grid-2.png" alt="Blocking level state 2" className="w-full" />
            <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
          </div>
        </div>
      </div>
      </Reveal>

      {/* 11 — Outcome and Community Response */}
      <Reveal index={10} className="flex flex-col gap-[40px]">
        <TextSection heading="Outcome and Community Response">
          <p>
            Tempest Browser launched publicly in 2023 as part of the company&apos;s
            broader effort to build a privacy focused ecosystem around search and
            browsing. Shortly after launch, changes to a critical search partnership
            significantly impacted the viability of the search business. As a
            result, investment in the product was reduced and development was
            eventually discontinued.
          </p>
          <p>
            Following launch, the browser generated discussion within privacy and
            browser communities. While some users appreciated the product&apos;s
            privacy focused approach and user experience, others raised questions
            about transparency, open source practices, long term viability, and how
            Tempest differentiated itself from established competitors.
          </p>
        </TextSection>
        <div className="max-w-[560px] mx-auto w-full flex flex-col gap-[12px]">
          <ImageBlock
            src="/assets/tempest/outcome-1.png"
            alt="Tempest outcome 1"
            width={560}
            height={373}
            className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
          />
          <ImageBlock
            src="/assets/tempest/outcome-2.png"
            alt="Tempest outcome 2"
            width={560}
            height={373}
            className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
          />
          <ImageBlock
            src="/assets/tempest/outcome-3.png"
            alt="Tempest outcome 3"
            width={560}
            height={373}
            className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
          />
        </div>
      </Reveal>

      {/* 13 — Extending the Work Beyond Tempest */}
      <Reveal index={11}>
        <TextSection heading="Extending the Work Beyond Tempest">
          Several interaction patterns, design system foundations, and workflows
          developed during the project were later reused across Infinity Browsers,
          a new Tempest business unit. After leaving Tempest, I continued working
          on browser products at Hop Design, applying and evolving many of these
          foundations across projects for Ecosia and Startpage.
        </TextSection>
      </Reveal>

      {/* 12 — Next case study */}
      <Reveal index={12} className="max-w-[560px] mx-auto w-full flex flex-col mt-10 md:mt-0">
        <div className="h-px bg-[var(--color-border)]" />
        <div className="h-[80px]" />
        <Link href="/case-studies/voiced" className="group block">
          <article className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] cursor-pointer hover:bg-[var(--color-surface)] active:scale-[0.99] transition-colors">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-[var(--color-surface)]">
              <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                <source src="https://res.cloudinary.com/dcewfztrv/video/upload/q_auto:best,w_1120,c_limit,f_webm/v1784379494/voiced-voice-mode_ct713c.webm" type="video/webm" />
                <source src="https://res.cloudinary.com/dcewfztrv/video/upload/q_auto:best,w_1120,c_limit,f_mp4/v1784379494/voiced-voice-mode_ct713c.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <h2 className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
                Voiced: a voice-first conversation app
              </h2>
              <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
                Owning product design end to end, from system prompt to shipped App Store product.
              </p>
            </div>
          </article>
        </Link>
        <div className="flex justify-between gap-6 mt-[80px]">
          {socials.map((s) => (
            <DirectionalUnderline
              as="a"
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              className="group flex items-center text-base font-medium"
              style={{ lineHeight: 1.5, color: "var(--color-fg)" }}
            >
              {s.label}
              <svg
                className="ml-[0.3em] size-[0.55em]"
                fill="none"
                viewBox="-1 -1 12 12"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DirectionalUnderline>
          ))}
        </div>
      </Reveal>
    </CaseStudyLayout>
  )
}
