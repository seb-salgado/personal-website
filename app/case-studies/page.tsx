import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DirectionalUnderline } from "@/components/ui/directional-underline";
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
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="w-fit text-base text-[var(--color-fg)]">
            <DirectionalUnderline className="flex items-center gap-1.5">
              <ArrowLeft size={16} strokeWidth={1.5} />
              Home
            </DirectionalUnderline>
          </Link>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold leading-[1.3] text-[var(--color-fg)]">
              Case studies
            </h1>
            <p className="text-base leading-[1.45] text-[var(--color-fg-muted)]">
              Selected product design work.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {studies.map((study) => {
            const card = (
              <article
                className={`group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-[background-color,border-color,transform] duration-150 ${
                  study.available
                    ? "cursor-pointer hover:bg-[var(--color-surface)] active:scale-[0.99]"
                    : "cursor-default opacity-55"
                }`}
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface)]">
                  {study.coverImage ? (
                    <img
                      src={study.coverImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]"
                    />
                  ) : (
                    <div
                      className="h-full w-full opacity-[0.09]"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h2 className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
                    {study.title}
                  </h2>
                  <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
                    {study.description}
                  </p>
                </div>
              </article>
            );

            if (!study.available) {
              return <div key={study.slug}>{card}</div>;
            }

            return (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} aria-label={study.title}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
