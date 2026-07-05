# Voiced

Voiced is an iOS emotional wellbeing companion where people can speak their mind and find clarity through conversation.

**Company:** Sounding | **App:** Voiced | **Year:** 2025–2026 | **Timeline:** 6 months

[VIDEO: voiced-cover — hero video]

---

## My Role

As Sounding's first design hire and the sole product designer on Voiced, I led the product design from research through launch. My responsibilities included user research, product strategy, user experience, visual design, brand design, and App Store marketing assets.

I also contributed to the AI conversation experience by synthesizing user insights, refining the system prompt, collaborating on the first conversation flow, and testing prompt variants. In addition, I used AI coding tools to design and implement a custom shader for the chat interface that shipped in production.

---

## Outcomes

Voiced launched and, just five weeks later, became Sounding's primary product proof point at a16z Speedrun Demo Day and throughout the company's subsequent fundraising efforts, which led to an $8M seed round.

Following launch, I continued improving engagement through conversation quality experiments, onboarding refinements, prompt design, and feature iterations.

More detailed results are covered below, including a treatment that improved conversation retention, a C2 suggestion screen that increased engagement depth, and a later home redesign with early directional evidence around activation, repeat conversations, and D1 retention.

---

[VIDEO: voiced-carousel — app feature showcase]

---

## Finding The Higher-Leverage Problem

After Demo Day, the team was focused on improving Voiced's first time user experience. Product data showed that more than half of users displayed signs of overwhelm during their first conversation, leading us to explore a dedicated experience for those users.

My initial proposal was a routing agent that could direct users to different conversational paths based on how the discussion evolved. But after reviewing product metrics and anonymized conversation quality signals, I became less convinced that overwhelm was the real problem.

What I saw was a broader issue. Across many conversations, the AI sometimes rushed into deep emotional exploration before earning it. It could miss important details from previous messages, lose track of the user's story, or respond with the wrong emotional weight. These issues weren't isolated to overwhelmed users. They affected the core experience itself.

I argued that improving the first conversation and the system prompt would be a higher leverage investment than building a separate overwhelmed user flow. It would improve every conversation, require less engineering effort, and more directly strengthen Voiced's core promise: helping people feel heard and gain clarity.

The CPO agreed, and we shifted focus.

---

[IMAGE: better-conversations.png]

---

## Designing Better Conversations

Once we aligned on the problem, I focused on improving Conversation 1, one of the most important moments in the user journey. As part of the first time user experience, it played a critical role in activation, retention, and shaping a user's perception of Voiced.

My clearest area of ownership was the system prompt. Before changing it, I used product data, anonymized conversation quality signals, and user feedback to define what a successful first conversation should achieve:

1. Capture intent
2. Build early momentum
3. Create psychological safety
4. Establish personal relevance
5. Provide a reason to return

These principles became the foundation for a rewritten system prompt. The goal was for Voiced to feel less like a therapist and more like a conversational partner: less generic, less eager to force deep exploration, and more grounded in what users were actually saying.

In parallel, the CPO and I scripted the opening messages of Conversation 1 to create a lower pressure starting point and help users get talking. After the initial exchange, the conversation transitioned to the system prompt.

We shipped the updated system prompt and scripted Conversation 1 experience together.

At this stage, we focused on conversation retention as our primary success metric. Our belief was that users who repeatedly returned for conversations were finding value in the product and were more likely to continue using it over time.

---

[IMAGE: chat-log.png]

---

### Designing Better Conversations

The experiment compared:

- **Control:** free-form Conversation 1 + old system prompt.
- **Treatment:** scripted Conversation 1 + improved system prompt.

| Metric | Control | Treatment | Change |
|---|---|---|---|
| Conversation 2→3 retention | 41.2% | 55.3% | +14.1pp |
| Avg conversations/user | 1.97 | 2.68 | +36% |
| Messages/user | 23.4 | 43.9 | +88% |
| Median session time | 3:04 | 5:08 | +68% |

Because the first conversation script and system prompt shipped together, I treated the result as a combined treatment. The strongest prompt-specific signal came from later conversations, where the scripted Conversation 1 opening no longer applied.

---

### Designing for Continuity

After improving Conversation 1, I looked at what happened when users returned.

Analysis of 1,095 Conversation 1 and Conversation 2 pairs revealed meaningful continuity between conversations. Users often returned to related topics and emotional themes, even when they did not explicitly reference their previous discussion.

To help users continue where they left off, I designed a screen that appeared after a user's first conversation, provided they had written at least 100 characters, suggesting three personalized topics for Conversation 2 based on their previous conversation and onboarding responses.

I explored several concepts, including a single recommendation, multiple suggestions, and a fresh start option, before landing on the final design.

The experiment increased engagement depth:

| Metric | Control | C2 suggestions | Change |
|---|---|---|---|
| Conversation 1->2 | 33.2% | 39.4% | +6.1pp |
| Words/user | 592 | 1,109 | +87% |
| User messages/user | 22.1 | 27.5 | +25% |
| Sessions with message/user | 1.73 | 2.30 | +33% |

The experiment increased engagement depth across Conversation 2, helping users continue conversations and engage more meaningfully with the product.

---

### Designing for Continuity at Scale

The Conversation 2 topic suggestion experiment showed that users benefited from continuity between conversations. We explored how to extend that continuity beyond a single return session.

I redesigned the home screen around a personalized conversation plan. Drawing from previous conversations, it suggested future topics and presented them in a calendar inspired view. The goal was to make users feel that Voiced remembered what they had shared, that conversations were connected, and that there was value in returning.

We shipped the redesign in Voiced 1.0.30. Although the rollout was not a controlled A/B test, subsequent version level analysis showed encouraging directional signals:

| Metric | 1.0.29 baseline | 1.0.31 | Change |
|---|---|---|---|
| Conversation 1 started | 71.7% | 81.0% | +9pp |
| Conversation 2 reached | 16.4% | 22.2% | +6pp |
| Conversation 3 reached | 4.0% | 11.1% | +7pp |
| D1 retention | 14.7% | 21.6% | +6.9pp |

While not a controlled experiment, the results provided encouraging evidence that continuity and planning could strengthen activation and early retention.

---

[IMAGE: safe-space.png]

---

## Additional Contributions

Beyond the conversation quality work, I contributed to several smaller improvements that emerged from user feedback and product exploration.

---

[IMAGE: little-moments.png]

---

## Expanding Voice Options

User feedback consistently highlighted a desire for more voice options, particularly deeper male voices. I synthesized the feedback, advocated for prioritizing the work, and helped make voice selection part of the first time user experience. After launch, first conversation starts appeared to improve following voice selection. While the original metric source is no longer available, I view this as a promising activation signal rather than a validated retention improvement.

---

## Building a Voice Reactive Shader

To explore the voice experience, I used AI coding tools to build a shader that responded dynamically to voice amplitude and frequency. The prototype proved effective enough that engineering adapted it for production, allowing us to explore and communicate interaction quality with much greater fidelity than static mocks alone.

---

## What Was Unresolved

Seven months after launch, Sounding decided to focus its resources on other products with more promising metrics.

While Voiced did not become a long term business, many users found genuine value in the experience. The product received positive App Store reviews, users returned for multiple conversations, and several experiments showed meaningful improvements in engagement and continuity.

Voiced became Sounding's first shipped product, supported the company's fundraising efforts, established internal AI product workflows, and generated valuable lessons around conversation quality, personalization, and retention.

The outcome was mixed: Voiced resonated with users and proved many of our product hypotheses, but the business ultimately moved in a different direction.

---

## Takeaway

Voiced was a lesson in designing under early-company ambiguity: shipping the first product quickly, making it credible enough for investor and market signal, then improving the core conversation loop through product judgment and measurable iteration.

The most important work was not simply designing the app's screens. It was recognizing when a planned feature was not the highest-leverage problem, helping redirect the team toward the core conversation experience, and then extending that work into continuity and personalization experiments that changed how users came back.
