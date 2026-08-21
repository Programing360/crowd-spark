"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Coins, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/src/components/auth/AuthCard";
import {
  FieldError,
  inputClass,
  labelClass,
} from "@/src/components/auth/FormControls";
import { API_ENDPOINTS, postJson } from "@/src/config/api";
import { useAuth } from "@/src/hooks/useAuth";
import {
  REGISTER_CREDIT_BONUS,
  registerSchema,
  type RegisterFormValues,
} from "@/src/validations/auth.schema";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, applyAuthSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", photoURL: "", password: "", role: "Supporter" },
  });

  const [selectedRole, setSelectedRole] = useState<"Supporter" | "Creator">(
    "Supporter",
  );
  const creditBonus = REGISTER_CREDIT_BONUS[selectedRole];

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { ok, data } = await postJson(API_ENDPOINTS.register, {
        name: values.name,
        email: values.email,
        password: values.password,
        photoURL: values.photoURL || undefined,
        role: values.role,
      });
      const token = data.access_token ?? data.token;
      if (!ok || !token) {
        toast.error(
          data.message ?? data.error ?? "Registration failed. Please try again.",
        );
        return;
      }
      applyAuthSession(token, {
        ...data.user,
        name: values.name,
        email: values.email,
        photoURL: values.photoURL || null,
        role: values.role,
      });
      toast.success(
        `Welcome to FundVerse, ${values.name}! ${creditBonus} credits have been added to your account.`,
      );
      router.replace("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
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
      title="Create your account"
      subtitle="Join FundVerse and turn great ideas into reality."
      footer={
        <>
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-rose-600 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
            >
              Log in
            </Link>
            .
          </p>
          <p className="mt-3 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
            By signing up, you agree to FundVerse&apos;s{" "}
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
      <div
        role="status"
        className="mb-5 flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
      >
        <Coins className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          {selectedRole === "Creator"
            ? "Creators receive 20 bonus credits on sign-up!"
            : "Supporters receive 50 bonus credits on sign-up!"}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
            className={inputClass(Boolean(errors.name))}
          />
          <FieldError message={errors.name?.message} />
        </div>

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
          <label htmlFor="photoURL" className={labelClass}>
            Profile picture URL{" "}
            <span className="font-normal text-gray-400 dark:text-gray-500">
              (optional)
            </span>
          </label>
          <input
            id="photoURL"
            type="url"
            autoComplete="photo url"
            placeholder="https://example.com/avatar.jpg"
            aria-invalid={Boolean(errors.photoURL)}
            {...register("photoURL")}
            className={inputClass(Boolean(errors.photoURL))}
          />
          <FieldError message={errors.photoURL?.message} />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 6 characters"
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
          {!errors.password && (
            <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
              Minimum 6 characters, with at least one letter and one number.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role" className={labelClass}>
            I want to join as
          </label>
          <div className="relative">
            <select
              id="role"
              aria-invalid={Boolean(errors.role)}
              {...register("role", {
                onChange: (event) =>
                  setSelectedRole(event.target.value as "Supporter" | "Creator"),
              })}
              className={`${inputClass(Boolean(errors.role))} appearance-none pr-10`}
            >
              <option value="Supporter">Supporter — back campaigns you love</option>
              <option value="Creator">Creator — launch your own campaign</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute inset-y-0 right-3 h-4 w-4 self-center text-gray-400"
              aria-hidden="true"
            />
          </div>
          <FieldError message={errors.role?.message} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-gray-900"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}
