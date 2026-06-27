import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { TempestCaseStudy } from "@/components/tempest-case-study";
import { CASE_STUDIES_COOKIE, verifyToken } from "@/lib/auth";

async function verifyAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CASE_STUDIES_COOKIE)?.value;
  return token ? verifyToken(token) : false;
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

  if (slug !== "tempest-browser-privacy-panel") {
    notFound();
  }

  return <TempestCaseStudy />;
}
