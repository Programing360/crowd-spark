"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard, GoogleIcon } from "@/src/components/auth/AuthCard";
import {
  FieldError,
  inputClass,
  labelClass,
} from "@/src/components/auth/FormControls";
import { API_ENDPOINTS, postJson } from "@/src/config/api";
import { useAuth } from "@/src/hooks/useAuth";
import {
  loginSchema,
  type LoginFormValues,
} from "@/src/validations/auth.schema";

const LOGIN_HIGHLIGHTS = [
  "Follow and back projects you love",
  "Easily pay for your pledges",
  "Follow the life of a project, start to finish",
  "Launch your own campaign",
];

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, applyAuthSession } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { ok, data } = await postJson(API_ENDPOINTS.login, values);
      const responsePayload = (data as any)?.data ?? data;
      const token =
        responsePayload?.token ??
        responsePayload?.access_token ??
        (data as any)?.token ??
        (data as any)?.access_token;
      const userObj = responsePayload?.user ?? (data as any)?.user ?? { email: values.email };

      if (!ok && !responsePayload?.success && !(data as any)?.success) {
        toast.error(
          (data as any)?.message ??
            (data as any)?.error ??
            "Invalid email or password. Please try again.",
        );
        return;
      }

      applyAuthSession(token || "login_session_token", userObj);
      toast.success("Welcome back to FundVerse!");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      const { ok, data } = await postJson(API_ENDPOINTS.google, {});
      const authUrl =
        typeof (data as { url?: unknown }).url === "string"
          ? (data as { url: string }).url
          : undefined;
      if (!ok || !authUrl) {
        toast.error(
          data.message ??
            data.error ??
            "Google sign-in is unavailable right now.",
        );
        return;
      }
      window.location.assign(authUrl);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not start Google sign-in.",
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2
          className="h-8 w-8 animate-spin text-rose-600 dark:text-rose-400"
          aria-label="Checking your session"
        />
      </main>
    );
  }

  return (
    <AuthCard
      title="Welcome back!"
      subtitle="Sign in or create an account to continue."
      highlights={LOGIN_HIGHLIGHTS}
      footer={
        <>
          <p>
            Don't have an account yet?
            <Link
              href="/register"
              className="font-semibold text-rose-600 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
            >
              Sign up
            </Link>
            .
          </p>
          <p className="mt-3 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
            By signing in, you agree to FundVerse&apos;s{" "}
            <span className="underline decoration-gray-300 underline-offset-2 dark:decoration-gray-700">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="underline decoration-gray-300 underline-offset-2 dark:decoration-gray-700">
              Privacy Policy
            </span>
            .
          </p>
        </>
      }
    >
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
        {isGoogleLoading ? "Redirecting to Google..." : "Continue with Google"}
      </button>

      <div className="my-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          or
        </span>
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
            className={inputClass(Boolean(errors.email))}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Password reset isn't available yet — contact support.",
                )
              }
              className="mb-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
            >
              Forgot your password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
              className={inputClass(Boolean(errors.password))}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-gray-900"
        >
          {isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthCard>
  );
}
