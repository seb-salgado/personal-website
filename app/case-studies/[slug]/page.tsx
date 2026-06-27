import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ImageBlock,
  MetadataRow,
  TextSection,
} from "@/components/case-study-primitives";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { CASE_STUDIES_COOKIE, verifyToken } from "@/lib/auth";
import { caseStudies, type CaseStudySection } from "@/lib/case-studies-data";

async function verifyAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CASE_STUDIES_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

function RenderSection({ section }: { section: CaseStudySection }) {
  if (section.type === "text") {
    return <TextSection heading={section.heading}>{section.content}</TextSection>;
  }

  if (section.type === "image") {
    return (
      <ImageBlock
        src={section.src}
        alt={section.alt}
        width={section.width}
        height={section.height}
        placeholder={!section.src}
        className="shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {section.items.map((item, index) => (
        <div key={`${item.alt}-${index}`} className="flex flex-col gap-3">
          <div className="aspect-[4/3] w-full rounded-xl bg-[var(--color-surface)]" aria-hidden="true" />
          <p className="text-base leading-[1.4em] text-[var(--color-fg-muted)]">
            {item.caption}
          </p>
        </div>
      ))}
    </div>
  );
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
  const study = caseStudies.find((item) => item.slug === slug && item.available);

  if (!study) {
    notFound();
  }

  return (
    <CaseStudyLayout
      readTime={study.readTime}
      backHref="/case-studies"
      backLabel="Case studies"
    >
      <div className="flex flex-col gap-[40px]">
        <div className="max-w-[560px] mx-auto flex flex-col gap-[16px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold text-[var(--color-fg)]">
              {study.title}
            </h1>
            <p className="text-base font-normal leading-[1.4em] text-[var(--color-fg)]">
              {study.description}
            </p>
          </div>
          <MetadataRow
            items={[
              { label: "Company", value: study.client },
              { label: "Product", value: study.product },
              { label: "Platform", value: study.platform },
              { label: "Year", value: study.year },
            ]}
          />
        </div>

        {study.sections.map((section, index) => (
          <RenderSection key={`${section.type}-${index}`} section={section} />
        ))}
      </div>
    </CaseStudyLayout>
  );
}
