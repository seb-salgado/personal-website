# Case Studies Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Password-protect case studies behind a modal on the home page, serving content from a gated API route so the case study data is never exposed without a valid session token.

**Current status — 2026-06-27:** Implemented with one shared password, neutral password modal copy, a placeholder locked card on the homepage, `/case-studies` index, and `/case-studies/tempest-browser-privacy-panel` detail route. The old public `/work/tempest-privacy-panel` route now redirects to the gated route. Auth now uses a short-lived first-party `HttpOnly` cookie so the protected pages can server-render without a visible loading state. Remaining user-side deployment step: add `PORTFOLIO_PASSWORD` and `JWT_SECRET` to Vercel project environment variables.

**Decisions:** Use `seb-case-studies-2026` as the current shared password, a generated server-only JWT secret in `.env.local`, and a `case_studies_access` cookie with `HttpOnly`, `SameSite=Strict`, `Max-Age=12h`, and `Path=/case-studies`. The real Tempest card links to the Tempest case study; the second card is an inert placeholder.

**Architecture:** The user enters a password via a modal consistent with the existing `JobExperienceModal` pattern. On success, the API route `/api/auth` sets a JWT signed with a server-only secret in a short-lived first-party `HttpOnly` cookie scoped to `/case-studies`. The case study index and detail pages verify the cookie server-side before rendering; without it, the user is redirected home. Case study content lives in `lib/case-studies-data.ts` and is imported only by server-side code.

**Tech Stack:** Next.js 15 App Router, `jose` (JWT sign/verify), `motion/react` (animations matching existing patterns), Tailwind v4, TypeScript.

---

## File Map

Note: the implementation status/architecture above reflects the current cookie-based build. Some older task snippets below still describe the original `sessionStorage` API-fetch approach and should be treated as historical notes, not the current target architecture.

| File | Status | Responsibility |
|------|--------|---------------|
| `lib/case-studies-data.ts` | Create | Source of truth for case study content — only imported by API routes |
| `lib/auth.ts` | Create | JWT sign and verify helpers using `jose` |
| `app/api/auth/route.ts` | Create | POST: receives password, returns signed JWT |
| `app/api/case-studies/route.ts` | Create | GET: verifies JWT, returns full case studies list |
| `app/api/case-studies/[slug]/route.ts` | Create | GET: verifies JWT, returns single case study |
| `components/password-modal.tsx` | Create | Modal UI — mirrors `JobExperienceModal` animation patterns |
| `components/case-studies-locked-card.tsx` | Create | Home page card — shows lock state and triggers modal |
| `app/case-studies/page.tsx` | Create | Index page — client component, fetches from API with token |
| `app/case-studies/[slug]/page.tsx` | Create | Case study page — client component, fetches from API with token |
| `app/page.tsx` | Modify | Add `CaseStudiesLockedCard` to the work section |
| `.env.local` | Modify | Add `PORTFOLIO_PASSWORD` and `JWT_SECRET` |
| `.gitignore` | Verify | Confirm `.env.local` is ignored |

---

## Task 1: Install `jose` and configure environment variables

**Files:**
- Modify: `.env.local`
- Verify: `.gitignore`

- [ ] **Step 1: Install jose**

```bash
pnpm add jose
```

Expected: `jose` appears in `package.json` dependencies.

- [ ] **Step 2: Add env variables to `.env.local`**

Open `.env.local` (create if it doesn't exist) and add:

```env
PORTFOLIO_PASSWORD=choose-a-strong-password-here
JWT_SECRET=choose-a-long-random-string-at-least-32-chars
```

Replace both values with your actual choices. The password is what the interviewer types. The JWT secret is never shared — generate something random (e.g. `openssl rand -base64 32`).

- [ ] **Step 3: Verify `.gitignore` covers `.env.local`**

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` appears. If not, add it:

```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 4: Add env vars to Vercel**

In the Vercel dashboard → Project → Settings → Environment Variables, add both `PORTFOLIO_PASSWORD` and `JWT_SECRET` with the same values. This is what the production server reads — never the `.env.local` file.

---

## Task 2: Create case study data

**Files:**
- Create: `lib/case-studies-data.ts`

- [ ] **Step 1: Create the data file**

```typescript
// lib/case-studies-data.ts
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  sections: Array<
    | { type: "text"; content: string }
    | { type: "image"; src: string; alt: string; caption?: string }
    | { type: "video"; url: string; caption?: string }
  >;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-one",
    title: "Project One",
    client: "Client Name",
    year: "2024",
    description: "One sentence describing this case study.",
    coverImage: "/assets/case-studies/project-one-cover.webp",
    sections: [
      {
        type: "text",
        content: "Replace with your actual case study content.",
      },
      {
        type: "image",
        src: "/assets/case-studies/project-one-01.webp",
        alt: "Descriptive alt text",
        caption: "Optional caption",
      },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    client: "Client Name",
    year: "2025",
    description: "One sentence describing this case study.",
    coverImage: "/assets/case-studies/project-two-cover.webp",
    sections: [
      {
        type: "text",
        content: "Replace with your actual case study content.",
      },
    ],
  },
];
```

Note: Images go in `public/assets/case-studies/`. Add them there when you have the actual assets.

- [ ] **Step 2: Create the case studies image folder**

```bash
mkdir -p public/assets/case-studies
```

- [ ] **Step 3: Commit**

```bash
git add lib/case-studies-data.ts public/assets/case-studies/.gitkeep
git commit -m "feat: add case study data model and placeholder content"
```

---

## Task 3: Create auth helpers

**Files:**
- Create: `lib/auth.ts`

- [ ] **Step 1: Create the JWT helper**

```typescript
// lib/auth.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(): Promise<string> {
  return new SignJWT({ unlocked: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/auth.ts
git commit -m "feat: add JWT sign/verify helpers"
```

---

## Task 4: Create API routes

**Files:**
- Create: `app/api/auth/route.ts`
- Create: `app/api/case-studies/route.ts`
- Create: `app/api/case-studies/[slug]/route.ts`

- [ ] **Step 1: Create the auth route**

```typescript
// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== process.env.PORTFOLIO_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await signToken();
  return NextResponse.json({ token });
}
```

- [ ] **Step 2: Create the case studies list route**

```typescript
// app/api/case-studies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { caseStudies } from "@/lib/case-studies-data";

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const list = caseStudies.map(({ slug, title, client, year, description, coverImage }) => ({
    slug,
    title,
    client,
    year,
    description,
    coverImage,
  }));

  return NextResponse.json(list);
}
```

- [ ] **Step 3: Create the single case study route**

```typescript
// app/api/case-studies/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { caseStudies } from "@/lib/case-studies-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(study);
}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/auth/route.ts app/api/case-studies/route.ts "app/api/case-studies/[slug]/route.ts"
git commit -m "feat: add auth and case studies API routes"
```

---

## Task 5: Create the password modal component

**Files:**
- Create: `components/password-modal.tsx`

This component mirrors the animation approach in `components/job-experience-modal.tsx` — backdrop blur, centered card, keyboard dismiss.

- [ ] **Step 1: Create the component**

```typescript
// components/password-modal.tsx
"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string) => void;
}

function ModalContent({ onClose, onSuccess }: Omit<PasswordModalProps, "isOpen">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const transition = { duration: prefersReducedMotion ? 0.15 : 0.25, ease: [0.23, 1, 0.32, 1] as const };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const bodyWidth = document.body.getBoundingClientRect().width;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = `${bodyWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password");
        setLoading(false);
        return;
      }

      const { token } = await res.json();
      onSuccess(token);
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onClick={onClose}
      />

      <div
        className="fixed inset-0 z-[10001] flex items-center justify-center px-4"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-sm rounded-xl p-6 pointer-events-auto"
          style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
          transition={transition}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full p-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white active:scale-[0.97] transition-[transform,background-color] duration-150"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <h2
            className="text-base font-medium mb-1"
            style={{ color: "var(--color-fg)" }}
          >
            Protected work
          </h2>
          <p
            className="text-sm mb-5"
            style={{ color: "var(--color-fg-muted)" }}
          >
            These case studies are under NDA. Enter the password to view them.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-fg)",
                border: error ? "1px solid var(--color-error, #ef4444)" : "1px solid var(--color-border)",
              }}
              autoComplete="current-password"
            />

            {error && (
              <p className="text-xs" style={{ color: "var(--color-error, #ef4444)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || password.length === 0}
              className="w-full rounded-lg py-2 text-sm font-medium transition-opacity disabled:opacity-40 active:scale-[0.98]"
              style={{
                backgroundColor: "var(--color-fg)",
                color: "var(--color-bg)",
              }}
            >
              {loading ? "Checking…" : "Unlock"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContent key="password-modal" onClose={onClose} onSuccess={onSuccess} />
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/password-modal.tsx
git commit -m "feat: add password modal component"
```

---

## Task 6: Create the locked card for the home page

**Files:**
- Create: `components/case-studies-locked-card.tsx`

This is a placeholder-ready component. The visual design (layout, imagery treatment) will be refined after Figma. What's fixed here is the auth logic and the modal trigger.

- [ ] **Step 1: Create the component**

```typescript
// components/case-studies-locked-card.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { PasswordModal } from "@/components/password-modal";

export function CaseStudiesLockedCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = useCallback((token: string) => {
    sessionStorage.setItem("cs-token", token);
    router.push("/case-studies");
  }, [router]);

  return (
    <>
      <div
        className="relative w-full rounded-xl overflow-hidden flex flex-col items-center justify-center gap-4 cursor-pointer group"
        style={{
          minHeight: 240,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        aria-label="Unlock protected case studies"
      >
        {/* Background dot pattern — matches existing modal placeholder style */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-fg) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3 pointer-events-none">
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
          >
            <Lock size={20} style={{ color: "var(--color-fg)" }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: "var(--color-fg)" }}>
              Case studies
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-fg-muted)" }}>
              Password protected · 2 projects
            </p>
          </div>
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-full transition-opacity group-hover:opacity-80 pointer-events-none"
            style={{
              backgroundColor: "var(--color-fg)",
              color: "var(--color-bg)",
            }}
            tabIndex={-1}
          >
            Unlock
          </button>
        </div>
      </div>

      <PasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/case-studies-locked-card.tsx
git commit -m "feat: add locked case studies card component"
```

---

## Task 7: Add the locked card to the home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import and add the card**

In `app/page.tsx`, import `CaseStudiesLockedCard` and add it in the work/projects section. Find the section where you want it to appear (after the experience section or wherever the design calls for it) and add:

```tsx
import { CaseStudiesLockedCard } from "@/components/case-studies-locked-card";

// Inside the JSX, in the appropriate section:
<CaseStudiesLockedCard />
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add locked case studies card to home page"
```

---

## Task 8: Create the case studies index page

**Files:**
- Create: `app/case-studies/page.tsx`

- [ ] **Step 1: Create the index page**

```typescript
// app/case-studies/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

interface CaseStudySummary {
  slug: string;
  title: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
}

export default function CaseStudiesPage() {
  const router = useRouter();
  const [studies, setStudies] = useState<CaseStudySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("cs-token");
    if (!token) {
      router.replace("/");
      return;
    }

    fetch("/api/case-studies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem("cs-token");
          router.replace("/");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setStudies(data);
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-16 mx-auto"
      style={{ maxWidth: 680 }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm"
            style={{ color: "var(--color-fg-muted)" }}
          >
            ← Back
          </Link>
          <h1
            className="text-xl font-medium mt-4"
            style={{ color: "var(--color-fg)" }}
          >
            Case studies
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-fg-muted)" }}>
            NDA-protected work. Please don't share this link publicly.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {studies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
            >
              <Link href={`/case-studies/${study.slug}`} className="block group">
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{ aspectRatio: "16/9", backgroundColor: "var(--color-surface)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.coverImage}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium" style={{ color: "var(--color-fg)" }}>
                      {study.title}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-fg-muted)" }}>
                      {study.description}
                    </p>
                  </div>
                  <span
                    className="text-sm shrink-0 ml-4"
                    style={{ color: "var(--color-fg-muted)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {study.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/case-studies/page.tsx
git commit -m "feat: add case studies index page"
```

---

## Task 9: Create the individual case study page

**Files:**
- Create: `app/case-studies/[slug]/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
// app/case-studies/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

interface Section {
  type: "text" | "image" | "video";
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
  url?: string;
}

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  sections: Section[];
}

export default function CaseStudyPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("cs-token");
    if (!token) {
      router.replace("/");
      return;
    }

    fetch(`/api/case-studies/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem("cs-token");
          router.replace("/");
          return null;
        }
        if (res.status === 404) {
          router.replace("/case-studies");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setStudy(data);
          setLoading(false);
        }
      });
  }, [router, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!study) return null;

  return (
    <main className="min-h-screen px-4 py-16 mx-auto" style={{ maxWidth: 680 }}>
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mb-10">
          <Link
            href="/case-studies"
            className="text-sm"
            style={{ color: "var(--color-fg-muted)" }}
          >
            ← Case studies
          </Link>
          <h1
            className="text-2xl font-medium mt-4"
            style={{ color: "var(--color-fg)" }}
          >
            {study.title}
          </h1>
          <div className="flex gap-4 mt-1">
            <span className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
              {study.client}
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-fg-muted)", fontVariantNumeric: "tabular-nums" }}
            >
              {study.year}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {study.sections.map((section, i) => {
            if (section.type === "text") {
              return (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  {section.content}
                </p>
              );
            }

            if (section.type === "image") {
              return (
                <figure key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.src!}
                    alt={section.alt ?? ""}
                    className="w-full rounded-xl"
                  />
                  {section.caption && (
                    <figcaption
                      className="text-xs mt-2 text-center"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            if (section.type === "video") {
              return (
                <figure key={i}>
                  <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src={section.url}
                      className="w-full h-full"
                      allowFullScreen
                      title={section.caption ?? "Video"}
                    />
                  </div>
                  {section.caption && (
                    <figcaption
                      className="text-xs mt-2 text-center"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>
      </motion.div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/case-studies/[slug]/page.tsx"
git commit -m "feat: add individual case study page"
```

---

## Task 10: Verify end-to-end

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Verify the happy path**
  1. Visit `http://localhost:3000`
  2. Confirm the locked card is visible with no title or image
  3. Click "Unlock" — confirm the modal appears
  4. Type the wrong password — confirm the error message appears
  5. Type the correct password — confirm redirect to `/case-studies`
  6. Confirm the index page shows the two placeholder case studies
  7. Click one — confirm the case study page loads
  8. Close the tab and reopen `http://localhost:3000/case-studies` — confirm redirect to home (sessionStorage cleared)

- [ ] **Step 3: Verify direct API access is blocked**

```bash
curl http://localhost:3000/api/case-studies
```

Expected: `{"error":"Unauthorized"}` with status 401.

- [ ] **Step 4: Commit any fixes, then deploy**

```bash
git push origin main
```

Check Vercel dashboard that environment variables are set and the deployment succeeds.

---

## Notes for design handoff

When you've finished the Figma designs for the locked card and index page, the two components to update are:

- **`components/case-studies-locked-card.tsx`** — replace the placeholder layout with your designed card
- **`app/case-studies/page.tsx`** — update the index page layout and typography to match Figma

The auth logic in both files is isolated from the visual layer and won't need to change.
