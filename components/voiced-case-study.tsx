"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { CaseStudyLayout } from "@/components/case-study-layout"
import { DirectionalUnderline } from "@/components/ui/directional-underline"
import {
  TextSection,
  ImageBlock,
  VideoBlock,
  MetadataRow,
} from "@/components/case-study-primitives"
import { PTable1 } from "@/components/ui/p-table-1"

const socials = [
  { label: "X/Twitter", href: "https://x.com/SebastiaoSommer" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sebastiao-sommer/" },
  { label: "GitHub", href: "https://github.com/sebastiaosommer-123" },
  { label: "Email", href: "mailto:hi@sebastiaosommer.com" },
]

const EASE = [0.23, 1, 0.32, 1] as const
const DURATION = 0.3
const STAGGER = 0.08

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

export function VoicedCaseStudy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <CaseStudyLayout readTime="4 min read" breadcrumbPage="Voiced">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[40px]">
          <HeroItem delay={STAGGER} shouldReduceMotion={shouldReduceMotion}>
            <VideoBlock src="https://res.cloudinary.com/dcewfztrv/video/upload/v1782694307/voiced-cover_p2calv.mp4" />
          </HeroItem>

          <div className="max-w-[560px] mx-auto flex flex-col gap-[16px]">
            <HeroItem delay={STAGGER * 2} shouldReduceMotion={shouldReduceMotion}>
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold text-[var(--color-fg)]">Voiced</h1>
                <p className="text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
                  Voiced is an iOS emotional wellbeing companion where people can speak their mind and find clarity through conversation.
                </p>
              </div>
            </HeroItem>

            <HeroItem delay={STAGGER * 3} shouldReduceMotion={shouldReduceMotion}>
              <MetadataRow
                items={[
                  { label: "Company", value: "Sounding" },
                  { label: "App", value: "Voiced" },
                  { label: "Year", value: "2025–2026" },
                  { label: "Timeline", value: "6 months" },
                ]}
              />
            </HeroItem>
          </div>
        </div>

        <TextSection heading="My Role">
          <p>
            As Sounding&apos;s first design hire and the sole product designer on Voiced, I led the product design from research through launch. My responsibilities included user research, product strategy, user experience, visual design, brand design, and App Store marketing assets.
          </p>
          <p>
            I also contributed to the AI conversation experience by synthesizing user insights, refining the system prompt, collaborating on the first conversation flow, and testing prompt variants. In addition, I used AI coding tools to design and implement a custom shader for the chat interface that shipped in production.
          </p>
        </TextSection>

        <TextSection heading="Outcomes">
          <p>
            Voiced launched and, just five weeks later, became Sounding&apos;s primary product proof point at a16z Speedrun Demo Day and throughout the company&apos;s subsequent fundraising efforts, which led to an $8M seed round.
          </p>
          <p>
            Following launch, I continued improving engagement through conversation quality experiments, onboarding refinements, prompt design, and feature iterations.
          </p>
          <p>
            More detailed results are covered below, including a treatment that improved conversation retention and increased conversations per user, messages per user, and median session duration.
          </p>
        </TextSection>
      </div>

      <VideoBlock src="https://res.cloudinary.com/dcewfztrv/video/upload/v1782693508/voiced-carousel_wektxt.mp4" />

      <TextSection heading="Finding The Higher-Leverage Problem">
        <p>
          After Demo Day, the team was focused on improving Voiced&apos;s path to profitability. Product data showed that more than half of users displayed signs of overwhelm during their first conversation, leading us to explore a dedicated experience for those users.
        </p>
        <p>
          My initial proposal was a routing agent that could direct users to different conversational paths based on how the discussion evolved. But after reviewing product metrics and anonymized conversation quality signals, I became less convinced that overwhelm was the real problem.
        </p>
        <p>
          What I saw was a broader issue. Across many conversations, the AI sometimes rushed into deep emotional exploration before earning it. It could miss important details from previous messages, lose track of the user&apos;s story, or respond with the wrong emotional weight. These issues weren&apos;t isolated to overwhelmed users. They affected the core experience itself.
        </p>
        <p>
          I argued that improving the first conversation and the system prompt would be a higher leverage investment than building a separate overwhelmed user flow. It would improve every conversation, require less engineering effort, and more directly strengthen Voiced&apos;s core promise: helping people feel heard and gain clarity.
        </p>
        <p>
          The CPO agreed, and we shifted focus.
        </p>
      </TextSection>

      <ImageBlock
        src="/assets/voiced/better-conversations.png"
        alt="Better conversations"
        width={2240}
        height={1680}
      />

      <TextSection heading="Designing Better Conversations">
        <p>
          Once we aligned on the problem, I focused on improving Conversation 1, one of the most important moments in the user journey. As part of the first time user experience, it played a critical role in activation, retention, and shaping a user&apos;s perception of Voiced.
        </p>
        <p>
          My clearest area of ownership was the system prompt. Before changing it, I used product data, anonymized conversation quality signals, and user feedback to define what a successful first conversation should achieve:
        </p>
        <ol className="list-decimal list-inside -mt-1">
          <li>Capture intent</li>
          <li>Build early momentum</li>
          <li>Create psychological safety</li>
          <li>Establish personal relevance</li>
          <li>Provide a reason to return</li>
        </ol>
        <p>
          These principles became the foundation for a rewritten system prompt. The goal was for Voiced to feel less like a therapist and more like a conversational partner: less generic, less eager to force deep exploration, and more grounded in what users were actually saying.
        </p>
        <p>
          In parallel, the CPO and I scripted the opening messages of Conversation 1 to create a lower pressure starting point and help users get talking. After the initial exchange, the conversation transitioned to the system prompt.
        </p>
        <p>
          We shipped the updated system prompt and scripted Conversation 1 experience together.
        </p>
      </TextSection>

      <TextSection heading="Experiment Readout">
        <p>
          The experiment compared:
        </p>
        <p>
          Control: free-form Conversation 1 + old system prompt.
          Treatment: scripted Conversation 1 + improved system prompt.
        </p>
        <PTable1
          columns={[
            { key: "metric", label: "Metric" },
            { key: "control", label: "Control", align: "right" },
            { key: "treatment", label: "Treatment", align: "right" },
            { key: "change", label: "Change", align: "right" },
          ]}
          rows={[
            { metric: "Conversation 2→3 retention", control: "41.2%", treatment: "55.3%", change: "+14.1pp" },
            { metric: "Avg conversations/user", control: "1.97", treatment: "2.68", change: "+36%" },
            { metric: "Messages/user", control: "23.4", treatment: "43.9", change: "+88%" },
            { metric: "Median session time", control: "3:04", treatment: "5:08", change: "+68%" },
          ]}
        />
      </TextSection>

      <TextSection heading="Additional Contributions">
        Beyond the conversation quality work, I contributed to several smaller improvements that emerged from user feedback and product exploration.
      </TextSection>

      <ImageBlock
        src="/assets/voiced/little-moments.png"
        alt="Little moments"
        width={2580}
        height={1545}
      />

      <TextSection heading="Expanding voice options">
          User feedback consistently highlighted a desire for more voice options, particularly deeper male voices. I synthesized the feedback, advocated for prioritizing the work, and helped make voice selection part of the first time user experience. After launch, first conversation starts appeared to improve following voice selection. While the original metric source is no longer available, I view this as a promising activation signal rather than a validated retention improvement.
        </TextSection>

      <TextSection heading="Building a voice reactive shader">
          To explore the voice experience, I used AI coding tools to build a shader that responded dynamically to voice amplitude and frequency. The prototype proved effective enough that engineering adapted it for production, allowing us to explore and communicate interaction quality with much greater fidelity than static mocks alone.
        </TextSection>

      <TextSection heading="What Was Unresolved">
        <p>
          Seven months after launch, Sounding decided to stop investing in Voiced and focus on other products with more promising metrics. ROAS on M13 never exceeded 80%, sustainable acquisition costs were difficult to find, and the team did not identify a sufficiently differentiated position against larger players in the category.
        </p>
        <p>
          Even so, the project achieved its original goals. Voiced became Sounding&apos;s first shipped product, supported the company&apos;s Demo Day and fundraising efforts, helped establish internal product and AI workflows, and generated measurable improvements in conversation quality and engagement.
        </p>
        <p>
          The outcome was ultimately mixed: Voiced was an important company milestone and learning vehicle, but not a proven long term business.
        </p>
      </TextSection>

      <TextSection heading="Takeaway">
        <p>
          Voiced was a lesson in designing under early-company ambiguity: shipping the first product quickly, making it credible enough for investor and market signal, then improving the core conversation loop through product judgment and measurable iteration.
        </p>
        <p>
          The most important work was not simply designing the app&apos;s screens. It was recognizing when a planned feature was not the highest-leverage problem, helping redirect the team toward the core conversation experience, and improving that experience in a way that showed measurable user behavior change.
        </p>
      </TextSection>

      <div className="max-w-[560px] mx-auto w-full flex flex-col">
        <div className="h-px bg-[var(--color-border)]" />
        <div className="h-[80px]" />
        <Link href="/case-studies/tempest-browser-privacy-panel" className="group block">
          <article className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] cursor-pointer hover:bg-[var(--color-surface)] active:scale-[0.99] transition-colors">
            <ImageBlock
              src="/assets/tempest/hero.jpg"
              alt="Tempest Browser Privacy Panel"
              width={840}
              height={473}
              className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] rounded-none"
            />
            <div className="flex flex-col gap-1 p-4">
              <h2 className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
                Tempest Browser Privacy Panel
              </h2>
              <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
                A privacy-focused browser experience for balancing tracking protection and usability.
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
      </div>
    </CaseStudyLayout>
  )
}
