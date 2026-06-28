import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CaseStudiesIndexContent } from "@/components/case-studies-index-content";
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount";
import { CASE_STUDIES_COOKIE, verifyToken } from "@/lib/auth";
import { caseStudies } from "@/lib/case-studies-data";

async function verifyAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CASE_STUDIES_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

export default async function CaseStudiesPage() {
  if (!(await verifyAccess())) {
    redirect("/");
  }

  const studies = caseStudies.map(
    ({ slug, title, client, year, description, coverImage, available }) => ({
      slug,
      title,
      client,
      year,
      description,
      coverImage,
      available,
    })
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-6 py-10 md:py-[60px] lg:py-[80px]">
      <ScrollToTopOnMount />
      <CaseStudiesIndexContent studies={studies} />
    </main>
  );
}
