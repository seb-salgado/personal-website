# Voiced

Voiced is an iOS emotional wellbeing companion where people can speak their mind and find clarity through conversation.

**Company:** Sounding | **App:** Voiced | **Year:** 2025–2026 | **Timeline:** 6 months

[image]

---

## My Role

As Sounding's first design hire and the sole product designer on Voiced, I led the product design from research through launch. My responsibilities included user research, product strategy, user experience, visual design, brand design, and App Store marketing assets.

I also contributed to the AI conversation experience by synthesizing user insights, refining the system prompt, collaborating on the first conversation flow, and testing prompt variants. In addition, I used AI coding tools to design and implement a custom shader for the chat interface that shipped in production.

---

## Outcomes

Voiced launched and, just five weeks later, became Sounding's primary product proof point at a16z Speedrun Demo Day and throughout the company's subsequent fundraising efforts, which led to an $8M seed round.

Following launch, I continued improving engagement through conversation quality experiments, onboarding refinements, prompt design, and feature iterations.

More detailed results are covered below, including a treatment that improved conversation retention and increased conversations per user, messages per user, and median session duration.

---

[image]

---

## Finding The Higher-Leverage Problem

After Demo Day, the team was focused on improving Voiced's path to profitability. Product data showed that more than half of users displayed signs of overwhelm during their first conversation, leading us to explore a dedicated experience for those users.

My initial proposal was a routing agent that could direct users to different conversational paths based on how the discussion evolved. But after reviewing product metrics and anonymized conversation quality signals, I became less convinced that overwhelm was the real problem.

What I saw was a broader issue. Across many conversations, the AI sometimes rushed into deep emotional exploration before earning it. It could miss important details from previous messages, lose track of the user's story, or respond with the wrong emotional weight. These issues weren't isolated to overwhelmed users. They affected the core experience itself.

I argued that improving the first conversation and the system prompt would be a higher leverage investment than building a separate overwhelmed user flow. It would improve every conversation, require less engineering effort, and more directly strengthen Voiced's core promise: helping people feel heard and gain clarity.

The CPO agreed, and we shifted focus.

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

---

[image]

---

## Experiment Readout

The experiment compared:

- **Control:** free-form Conversation 1 + old system prompt.
- **Treatment:** scripted Conversation 1 + improved system prompt.

| Metric | Control | Treatment | Change |
|---|---|---|---|
| Conversation 2→3 retention | 41.2% | 55.3% | +14.1pp |
| Avg conversations/user | 1.97 | 2.68 | +36% |
| Messages/user | 23.4 | 43.9 | +88% |
| Median session time | 3:04 | 5:08 | +68% |

---

[image]

---

## Additional Contributions

Beyond the conversation quality work, I contributed to several smaller improvements that emerged from user feedback and product exploration.

### Expanding voice options

User feedback consistently highlighted a desire for more voice options, particularly deeper male voices. I synthesized the feedback, advocated for prioritizing the work, and helped make voice selection part of the first time user experience. After launch, first conversation starts appeared to improve following voice selection. While the original metric source is no longer available, I view this as a promising activation signal rather than a validated retention improvement.

[image]

### Building a voice reactive shader

To explore the voice experience, I used AI coding tools to build a shader that responded dynamically to voice amplitude and frequency. The prototype proved effective enough that engineering adapted it for production, allowing us to explore and communicate interaction quality with much greater fidelity than static mocks alone.

[image]

---

## What Was Unresolved

Seven months after launch, Sounding decided to stop investing in Voiced and focus on other products with more promising metrics. ROAS on M13 never exceeded 80%, sustainable acquisition costs were difficult to find, and the team did not identify a sufficiently differentiated position against larger players in the category.

Even so, the project achieved its original goals. Voiced became Sounding's first shipped product, supported the company's Demo Day and fundraising efforts, helped establish internal product and AI workflows, and generated measurable improvements in conversation quality and engagement.

The outcome was ultimately mixed: Voiced was an important company milestone and learning vehicle, but not a proven long term business.

---

## Takeaway

Voiced was a lesson in designing under early-company ambiguity: shipping the first product quickly, making it credible enough for investor and market signal, then improving the core conversation loop through product judgment and measurable iteration.

The most important work was not simply designing the app's screens. It was recognizing when a planned feature was not the highest-leverage problem, helping redirect the team toward the core conversation experience, and improving that experience in a way that showed measurable user behavior change.
