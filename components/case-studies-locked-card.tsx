"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { PasswordModal } from "@/components/password-modal";

export function CaseStudiesLockedCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleSuccess = useCallback(
    () => {
      router.push("/case-studies");
      router.refresh();
    },
    [router]
  );

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative flex min-h-[172px] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-[background-color,border-color] duration-150 hover:bg-black/[0.055] active:bg-black/[0.075] dark:hover:bg-white/[0.075] dark:active:bg-white/[0.1]"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
        aria-label="Unlock case studies"
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative z-10 flex w-full flex-col justify-between gap-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)]">
              <Lock size={17} strokeWidth={1.75} className="text-[var(--color-fg)]" />
            </div>
            <ArrowRight
              size={17}
              strokeWidth={1.75}
              className="mt-1 text-[var(--color-fg-muted)] transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
              Case studies
            </p>
            <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
              Password protected selected work.
            </p>
          </div>
        </div>
      </motion.button>

      <PasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
