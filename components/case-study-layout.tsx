import type { ReactNode } from "react"
import Link from "next/link"
import { DirectionalUnderline } from "@/components/ui/directional-underline"

type FooterLink = { label: string; href: string }

export function CaseStudyLayout({
  children,
  footerPrev,
  footerNext,
}: {
  children: ReactNode
  footerPrev?: FooterLink
  footerNext?: FooterLink
}) {
  return (
    <main className="min-h-screen flex items-start justify-center px-6 pt-10 md:pt-[60px] lg:pt-[80px] pb-10 md:pb-[60px] lg:pb-[80px]">
      <div className="relative w-full max-w-[840px] flex flex-col gap-[80px]">
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
