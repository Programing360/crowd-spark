import { cx } from "@/src/utils/cn";

export const labelClass =
  "mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-200";

export const inputClass = (hasError?: boolean) =>
  cx(
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-500/60 dark:focus:ring-red-500/20"
      : "border-gray-300 hover:border-gray-400 focus:border-rose-500 focus:ring-rose-100 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-rose-500 dark:focus:ring-rose-500/20",
  );

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}
