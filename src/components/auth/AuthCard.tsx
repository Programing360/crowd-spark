import Link from "next/link";
import type { ReactNode } from "react";
import { Check, HeartHandshake } from "lucide-react";
import { cx } from "@/src/utils/cn";

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AuthHighlights({ points }: { points: string[] }) {
  return (
    <ul className="mb-6 space-y-2.5 rounded-xl bg-gray-50 p-4 dark:bg-gray-950/60">
      {points.map((point) => (
        <li
          key={point}
          className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
        >
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400"
            aria-hidden="true"
          />
          {point}
        </li>
      ))}
    </ul>
  );
}

export function AuthCard({
  title,
  subtitle,
  highlights,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  highlights?: string[];
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-10 sm:bg-gray-50 dark:bg-gray-950 sm:dark:bg-gray-950">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
        aria-label="FundVerse home"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
          <HeartHandshake className="h-5 w-5" />
        </span>
        <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Fund<span className="text-rose-600 dark:text-rose-400">Verse</span>
        </span>
      </Link>

      <div className="w-full max-w-[26rem] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-900/5 sm:p-8 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
        {highlights && highlights.length > 0 && (
          <div className="mt-5">
            <AuthHighlights points={highlights} />
          </div>
        )}
        <div className={cx(highlights && highlights.length > 0 && "mt-6")}>
          {children}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        {footer}
      </div>
    </main>
  );
}
