"use client"

import { useReducedMotion } from "motion/react"
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"

type Review = {
  title: string
  body: string
  reviewer: string
  date: string
}

const reviews: Review[] = [
  {
    title: "So helpful",
    body: "I signed up because of the free trial never thinking I would keep with it, but I was desperate for some counseling and had tried traditional methods with not much luck. I find this app so handy. I just need to get a few minutes away and it will automatically give me some feedback and things to think about. I really love that it's not judgmental. It's always just a clinical yet seemingly heartfelt response.",
    reviewer: "Country_Roads",
    date: "12/01/2026",
  },
  {
    title: "Easy and fast",
    body: "I tend to think in bursts to having this voice note take notes of what I'm saying helps me like my thoughts are getting saved somewhere. I tell it anything that comes to mind and the follow up questions help me further explain. Low stakes, good follow ups and helping me express to my app what I struggle with saying in general.",
    reviewer: "Jameson Gann",
    date: "31/01/2026",
  },
  {
    title: "Reflecting on voiced",
    body: "As someone with my masters and counseling and my own therapist, I wondered how voice could help me. I found that it's really nice to have someone keep engaging you with more questions who you can just stop when you're done. I'll find this to be a very constructive tool to journal issues that are going on in my mind.",
    reviewer: "Peacesyne",
    date: "12/08/2025",
  },
  {
    title: "A true companion",
    body: "Honestly it's a really nice experience to be able to vent and rant and be guided in the right direction",
    reviewer: "Skipster1234",
    date: "25/09/2025",
  },
  {
    title: "Definitely recommend this app",
    body: "I've tried so many types of app. I got this as I like journal and chat go. This super easy to use... and gives valuable feedback to reflect on",
    reviewer: "Zoey andgg",
    date: "11/10/2025",
  },
  {
    title: "Transformative",
    body: "Actually, genuinely helpful. Therapeutic. Calming. Insightful. Much more helpful than any therapy sessions I've attended.",
    reviewer: "Simonemlee",
    date: "17/09/2025",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9.28259 3.1203C9.57606 2.52576 10.4239 2.52576 10.7173 3.1203L12.389 6.50693C12.5054 6.74281 12.7304 6.90638 12.9907 6.94442L16.7303 7.49102C17.3862 7.58689 17.6476 8.39317 17.1727 8.85569L14.4681 11.4901C14.2794 11.6739 14.1932 11.9388 14.2378 12.1984L14.8759 15.9191C14.988 16.5727 14.302 17.071 13.7151 16.7624L10.3723 15.0045C10.1392 14.8819 9.8607 14.8819 9.6276 15.0045L6.28486 16.7624C5.69796 17.071 5.01192 16.5727 5.12402 15.9191L5.76216 12.1984C5.80669 11.9388 5.72056 11.6739 5.53186 11.4901L2.82717 8.8557C2.3523 8.39317 2.61372 7.58689 3.26965 7.49102L7.00925 6.94442C7.26954 6.90638 7.49448 6.74281 7.61092 6.50693L9.28259 3.1203Z"
            fill="#FFCA3A"
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-[197px] w-[275px] shrink-0 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 md:w-[300px]">
      <Stars />
      <h3 className="mt-2 text-base font-medium leading-tight text-[var(--color-fg)]">
        {review.title}
      </h3>
      <p className="mt-0.5 overflow-hidden text-sm font-normal leading-[21px] text-[var(--color-fg-muted)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
        {review.body}
      </p>
      <div className="mt-auto flex items-center text-sm font-medium text-[var(--color-fg-muted)] opacity-60">
        <span>{review.reviewer}</span>
        <span className="mx-1 inline-block size-1 rounded-full bg-current" aria-hidden="true" />
        <span>{review.date}</span>
      </div>
    </article>
  )
}

export function VoicedAppStoreReviews() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative -mx-6 w-[calc(100%+48px)] overflow-hidden md:mx-0 md:w-full">
      {shouldReduceMotion ? (
        <div className="flex gap-4 overflow-x-auto">
          {reviews.map((review) => (
            <ReviewCard key={review.title} review={review} />
          ))}
        </div>
      ) : (
        <InfiniteSlider gap={16} speed={30} pauseOnHover pauseOnPress>
          {reviews.map((review) => (
            <ReviewCard key={review.title} review={review} />
          ))}
        </InfiniteSlider>
      )}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[100px] bg-gradient-to-r from-[var(--color-bg)] to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[100px] bg-gradient-to-l from-[var(--color-bg)] to-transparent md:block" />
    </div>
  )
}
