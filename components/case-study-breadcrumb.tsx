import Link from "next/link"

import { DirectionalUnderline } from "@/components/ui/directional-underline"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function CaseStudyBreadcrumb({ currentPage }: { currentPage?: string }) {
  return (
    <Breadcrumb className="text-sm font-normal text-[var(--color-fg-muted)]">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <DirectionalUnderline>Home</DirectionalUnderline>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator> / </BreadcrumbSeparator>
        <BreadcrumbItem>
          {currentPage ? (
            <BreadcrumbLink asChild>
              <Link href="/case-studies">
                <DirectionalUnderline>Case studies</DirectionalUnderline>
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="font-normal text-[var(--color-fg-muted)]">
              Case studies
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {currentPage && (
          <>
            <BreadcrumbSeparator> / </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-normal text-[var(--color-fg-muted)]">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
