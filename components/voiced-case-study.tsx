"use client"

import Link from "next/link"
import { CaseStudyLayout } from "@/components/case-study-layout"
import { DirectionalUnderline } from "@/components/ui/directional-underline"
import {
  Reveal,
  TextSection,
  ImageBlock,
  VideoBlock,
  MetadataRow,
  MediaCaption,
} from "@/components/case-study-primitives"
import { PTable1 } from "@/components/ui/p-table-1"
import { VoicedAppStoreReviews } from "@/components/voiced-app-store-reviews"
import { VoicedShaderPrototype } from "@/components/voiced-shader-prototype"
import { VoicedConversationExamples } from "@/components/voiced-conversation-examples"
import { LittleMomentsStack } from "@/components/little-moments-stack"

const socials = [
  { label: "X/Twitter", href: "https://x.com/sebsalgado2" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sebastiao-salgado/" },
  { label: "GitHub", href: "https://github.com/sebastiaosommer-123" },
  { label: "Email", href: "mailto:hi@sebsalgado.com" },
]

export function VoicedCaseStudy() {
  return (
    <CaseStudyLayout readTime="10 min read" breadcrumbPage="Voiced">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[40px]">
          <Reveal index={1}>
            <VideoBlock
              src="https://res.cloudinary.com/dcewfztrv/video/upload/v1784398182/voiced-voice-mode-chat_upbhjc.mp4"
              priority
            />
          </Reveal>

          <div className="max-w-[560px] mx-auto flex flex-col gap-[16px]">
            <Reveal index={2}>
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold text-[var(--color-fg)]">Voiced: a voice-first conversation app</h1>
                <p className="text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
                  Voiced is an iOS app where people speak their mind and find clarity through conversation.
                </p>
              </div>
            </Reveal>

            <Reveal index={3}>
              <MetadataRow
                items={[
                  { label: "Company", value: "Sounding" },
                  { label: "App", value: "Voiced" },
                  { label: "Year", value: "2025–2026" },
                ]}
              />
            </Reveal>
          </div>
        </div>

        <Reveal index={4}>
        <TextSection heading="My Role">
          <p>
            As Sounding&apos;s first design hire and sole product designer on Voiced, I owned product design end to end — research, product strategy, UX, visual and brand design, and App Store assets — working closely with the CPO and a small engineering team.
          </p>
          <p>
            Beyond design, I shaped the AI conversation experience by synthesizing user insights, rewriting the system prompt, and testing prompt variants, and I drove the experiments that improved engagement. I also used AI coding tools to build a custom voice-reactive shader that shipped in production.
          </p>
        </TextSection>
        </Reveal>

        <Reveal index={5}>
        <TextSection heading="Outcomes">
          <p>
            Voiced launched and, five weeks later, became Sounding&apos;s primary product proof point at a16z Speedrun Demo Day and throughout the fundraising that led to an $8M seed round.
          </p>
          <p>
            Post-launch, I focused on the core conversation loop. My biggest experiment lifted Conversation 2→3 retention from 41% to 55% and nearly doubled messages per user, and a later home redesign showed early D1-retention gains (15% → 22%).
          </p>
        </TextSection>
        </Reveal>
      </div>

      <Reveal index={6}>
      <VideoBlock
        src="https://res.cloudinary.com/dcewfztrv/video/upload/v1784382159/voiced-mvp-home_ki1kn2.mp4"
        caption="Voiced&apos;s MVP home screen."
      />
      </Reveal>

      <Reveal index={7}>
      <TextSection heading="Finding The Higher-Leverage Problem">
        <p>
          After Demo Day, the team was focused on improving Voiced&apos;s first time user experience. Product data showed that more than half of users displayed signs of overwhelm during their first conversation, leading us to explore a dedicated experience for those users.
        </p>
        <p>
          My initial proposal was a routing agent that could direct users to different conversational paths based on how the discussion evolved. But after reviewing product metrics and anonymized conversation quality signals, I became less convinced that overwhelm was the real problem.
        </p>
        <p>
          What I saw was a broader issue. The clearest tell was frustration: across many conversations, users pushed back when the AI probed for emotional depth too early. The pattern ran deeper too, the AI could miss important details from previous messages, lose track of the user&apos;s story, or respond with the wrong emotional weight. These issues affected the core experience for all users.
        </p>
        <p>
          I argued that improving the first conversation and the system prompt would be a higher leverage investment than building a separate overwhelmed user flow. It would improve every conversation, require less engineering effort, and more directly strengthen Voiced&apos;s core promise: helping people feel heard and gain clarity.
        </p>
        <p>
          The CPO agreed, and we shifted focus.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={8}>
      <ImageBlock
        src="/assets/voiced/better-conversations.png"
        alt="Better conversations"
        width={2240}
        height={1680}
        caption="Close-up of the chat screen."
      />
      </Reveal>

      <Reveal index={9}>
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
        <p>
          At this stage, we focused on conversation retention as our primary success metric. Our belief was that users who repeatedly returned for conversations were finding value in the product and were more likely to continue using it over time.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={10}>
      <figure className="w-full">
        <VoicedConversationExamples />
        <MediaCaption>
          Before-and-after example conversations based on common user themes.
        </MediaCaption>
      </figure>
      </Reveal>

      <Reveal index={11} className="max-w-[560px] mx-auto flex flex-col gap-2 text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
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
        <p>
          Because the first conversation script and system prompt shipped together, I treated the result as a combined treatment. The strongest prompt-specific signal came from later conversations, where the scripted Conversation 1 opening no longer applied.
        </p>
      </Reveal>

      <Reveal index={12}>
      <TextSection heading="Designing for Continuity">
        <p>
          After improving Conversation 1, I looked at what happened when users returned.
        </p>
        <p>
          Analysis of 1,095 Conversation 1 and Conversation 2 pairs revealed meaningful continuity between conversations. Users often returned to related topics and emotional themes, even when they did not explicitly reference their previous discussion.
        </p>
        <p>
          To help users continue where they left off, I designed a screen that appeared after a user&apos;s first conversation, provided they had written at least 100 characters, suggesting three personalized topics for Conversation 2 based on their previous conversation and onboarding responses.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={13}>
      <ImageBlock
        src="/assets/voiced/c2-experiment.png"
        alt="Conversation 2 topic suggestion experiment"
        width={3360}
        height={2520}
        caption="Personalized topic suggestions helped users continue into Conversation 2 based on what they had already shared."
      />
      </Reveal>

      <Reveal index={14} className="max-w-[560px] mx-auto flex flex-col gap-2 text-base font-normal text-[var(--color-fg)] leading-[1.4em]">
        <p>
          The experiment increased engagement depth:
        </p>
        <PTable1
          columns={[
            { key: "metric", label: "Metric" },
            { key: "control", label: "Control", align: "right" },
            { key: "c2", label: "C2 topics", align: "right" },
            { key: "change", label: "Change", align: "right" },
          ]}
          rows={[
            { metric: "Conversation 1→2", control: "33.2%", c2: "39.4%", change: "+6.1pp" },
            { metric: "Words/user", control: "592", c2: "1,109", change: "+87%" },
            { metric: "User messages/user", control: "22.1", c2: "27.5", change: "+25%" },
            { metric: "Sessions with message/user", control: "1.73", c2: "2.30", change: "+33%" },
          ]}
        />
        <p>
          The experiment increased engagement depth across Conversation 2, helping users continue conversations and engage more meaningfully with the product.
        </p>
      </Reveal>

      <Reveal index={15}>
      <TextSection heading="Designing for Continuity at Scale">
        <p>
          The Conversation 2 topic suggestion experiment showed that users benefited from continuity between conversations. We explored how to extend that continuity beyond a single return session.
        </p>
        <p>
          I redesigned the home screen around a personalized conversation plan. Drawing from previous conversations, it suggested future topics and presented them in a calendar inspired view. The goal was to make users feel that Voiced remembered what they had shared, that conversations were connected, and that there was value in returning.
        </p>
        <p>
          We shipped the redesign in Voiced 1.0.30. Although the rollout was not a controlled A/B test, comparing the 1.0.29 baseline with 1.0.31 showed encouraging directional signals:
        </p>
        <PTable1
          columns={[
            { key: "metric", label: "Metric" },
            { key: "baseline", label: "1.0.29", align: "right" },
            { key: "v131", label: "1.0.31", align: "right" },
            { key: "change", label: "Change", align: "right" },
          ]}
          rows={[
            { metric: "Conversation 1 started", baseline: "71.7%", v131: "81.0%", change: "+9pp" },
            { metric: "Conversation 2 reached", baseline: "16.4%", v131: "22.2%", change: "+6pp" },
            { metric: "Conversation 3 reached", baseline: "4.0%", v131: "11.1%", change: "+7pp" },
            { metric: "D1 retention", baseline: "14.7%", v131: "21.6%", change: "+6.9pp" },
          ]}
        />
        <p>
          While not a controlled experiment, the results provided encouraging evidence that continuity and planning could strengthen activation and early retention.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={16}>
      <ImageBlock
        src="/assets/voiced/home-redesign.png"
        alt="Home redesign"
        width={3360}
        height={2520}
        caption="Redesigned home screen using a personalized conversation plan to promote continuity between sessions."
      />
      </Reveal>

      <Reveal index={17}>
      <TextSection heading="Additional Contributions">
        Alongside the larger product work, I contributed to several smaller improvements that emerged from user feedback and product exploration.
      </TextSection>
      </Reveal>

      <Reveal index={18}>
      <figure className="w-full">
        <LittleMomentsStack />
        <MediaCaption>
          Examples of AI-generated imagery created for Voiced&apos;s in-app visual language.
        </MediaCaption>
      </figure>
      </Reveal>

      <Reveal index={19}>
      <TextSection heading="Expanding Voice Options">
          User feedback consistently highlighted a desire for more voice options, particularly deeper male voices. I synthesized the feedback, advocated for prioritizing the work, and made voice selection part of the first-time user experience. Early post-launch data pointed to an uptick in first conversation starts.
        </TextSection>
      </Reveal>

      <Reveal index={20}>
      <ImageBlock
        src="/assets/voiced/voice-options.png"
        alt="Voice options"
        width={3360}
        height={2520}
        caption="Voice selection became part of onboarding, allowing users to preview options and choose the voice they preferred."
      />
      </Reveal>

      <Reveal index={21}>
      <TextSection heading="Building a Voice Reactive Shader">
          To explore the voice experience, I used AI coding tools to build a shader that responded dynamically to voice amplitude and frequency. The prototype proved effective enough that engineering adapted it for production, allowing us to explore and communicate interaction quality with much greater fidelity than static mocks alone.
        </TextSection>
      </Reveal>

      <Reveal index={22}>
      <figure className="w-full">
        <VoicedShaderPrototype />
        <MediaCaption>
          Try the interactive shader prototype to see how the visual responds to voice.
        </MediaCaption>
      </figure>
      </Reveal>

      <Reveal index={23}>
      <TextSection heading="Where It Landed">
        <p>
          Seven months after launch, Sounding decided to focus its resources on other products with more promising metrics.
        </p>
        <p>
          While Voiced did not become a long term business, many users found genuine value in the experience. The product received positive App Store reviews, users returned for multiple conversations, and several experiments showed meaningful improvements in engagement and continuity.
        </p>
        <p>
          Voiced became Sounding&apos;s first shipped product, supported the company&apos;s fundraising efforts, established internal AI product workflows, and generated valuable lessons around conversation quality, personalization, and retention.
        </p>
        <p>
          The outcome was mixed: Voiced resonated with users and proved many of our product hypotheses, but the business ultimately moved in a different direction.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={24}>
      <VoicedAppStoreReviews />
      </Reveal>

      <Reveal index={25}>
      <TextSection heading="Takeaway">
        <p>
          Voiced was a lesson in designing under early-company ambiguity: shipping the first product quickly, making it credible enough for investor and market signal, then improving the core conversation loop through product judgment and measurable iteration.
        </p>
        <p>
          The most important work was recognizing when a planned feature was not the highest-leverage problem, helping redirect the team toward the core conversation experience, and then extending that work into continuity and personalization experiments that changed how users came back.
        </p>
      </TextSection>
      </Reveal>

      <Reveal index={26} className="max-w-[560px] mx-auto flex flex-col gap-1 text-sm text-[var(--color-fg-muted)]">
        <h2 className="font-medium">Acknowledgments</h2>
        <p className="font-normal leading-[1.4em]">
          The work shown here was made alongside a small team I was lucky to work with: Will Wynne (CPO), and engineers Hakan Özdemir, Diego Rodriguez, Harris Kalash, and George Bakogiannis.
        </p>
      </Reveal>

      <Reveal index={27} className="max-w-[560px] mx-auto w-full flex flex-col mt-10 md:mt-0">
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
      </Reveal>
    </CaseStudyLayout>
  )
}
