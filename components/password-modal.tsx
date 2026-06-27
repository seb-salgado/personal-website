"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function ModalContent({ onClose, onSuccess }: Omit<PasswordModalProps, "isOpen">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldRestoreScrollRef = useRef(true);
  const shouldReduceMotion = useReducedMotion();
  const transition = { duration: shouldReduceMotion ? 0.15 : 0.24, ease: [0.23, 1, 0.32, 1] as const };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
      if (shouldRestoreScrollRef.current) {
        window.scrollTo(0, scrollY);
      }
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("That password did not work.");
        setLoading(false);
        return;
      }

      shouldRestoreScrollRef.current = false;
      window.scrollTo(0, 0);
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[10001] flex items-center justify-center px-4" onClick={onClose}>
        <motion.div
          className="relative w-full max-w-[360px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 shadow-xl"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
          transition={transition}
          onClick={(event) => event.stopPropagation()}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 h-8 w-8 rounded-[8px] text-[var(--color-fg)] hover:bg-[var(--color-surface)] active:scale-[0.97]"
          >
            <X size={16} strokeWidth={1.75} />
          </Button>

          <div className="mb-5 flex flex-col gap-3 pr-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <Lock size={16} strokeWidth={1.75} className="text-[var(--color-fg)]" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-medium leading-[1.3] text-[var(--color-fg)]">
                Case studies
              </h2>
              <p className="text-sm leading-[1.45] text-[var(--color-fg-muted)]">
                Enter the password to continue.
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div
              className="flex h-10 items-center rounded-[8px] border bg-[var(--color-surface)] px-3"
              style={{ borderColor: error ? "#ef4444" : "var(--color-border)" }}
            >
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-[6px] text-[var(--color-fg-muted)] transition-[background-color,transform] duration-150 hover:bg-black/[0.04] active:scale-[0.97] dark:hover:bg-white/[0.06]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && <p className="text-xs leading-[1.4] text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading || password.length === 0}
              className="h-10 rounded-[8px] bg-[var(--color-fg)] text-sm text-[var(--color-bg)] transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              {loading ? "Checking..." : "Unlock"}
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  return (
    <AnimatePresence>
      {isOpen && <ModalContent onClose={onClose} onSuccess={onSuccess} />}
    </AnimatePresence>
  );
}
