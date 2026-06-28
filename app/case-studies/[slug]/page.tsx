import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type React from "react"
import { TempestCaseStudy } from "@/components/tempest-case-study";
import { VoicedCaseStudy } from "@/components/voiced-case-study";
import { CASE_STUDIES_COOKIE, verifyToken } from "@/lib/auth";

async function verifyAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CASE_STUDIES_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

const CASE_STUDY_COMPONENTS: Record<string, React.ComponentType> = {
  "tempest-browser-privacy-panel": TempestCaseStudy,
  "voiced": VoicedCaseStudy,
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await verifyAccess())) {
    redirect("/");
  }

  const { slug } = await params;
  const Component = CASE_STUDY_COMPONENTS[slug]
  if (!Component) notFound()

  return <Component />
}
