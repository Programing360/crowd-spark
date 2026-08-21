"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";
import type { AuthUser, UserRole } from "@/src/types/auth";

const TOKEN_STORAGE_KEY = "fundverse_token";
const VALID_ROLES: UserRole[] = ["Supporter", "Creator", "Admin"];

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  credits: number;
  isLoading: boolean;
  setCredits: (credits: number) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

type RawUser = Record<string, unknown> & { id?: unknown };

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [creditsOverride, setCreditsOverride] = useState<number | null>(null);

  const rawUser = (data as { user?: RawUser } | null)?.user;

  const user = useMemo<AuthUser | null>(() => {
    if (!rawUser || typeof rawUser.id !== "string") return null;
    const role =
      typeof rawUser.role === "string" &&
      VALID_ROLES.includes(rawUser.role as UserRole)
        ? (rawUser.role as UserRole)
        : "Supporter";
    return {
      id: rawUser.id,
      name:
        typeof rawUser.name === "string" && rawUser.name.trim().length > 0
          ? rawUser.name
          : "FundVerse User",
      email: typeof rawUser.email === "string" ? rawUser.email : "",
      photoURL: typeof rawUser.image === "string" ? rawUser.image : null,
      role,
    };
  }, [rawUser]);

  const sessionCredits =
    typeof rawUser?.credits === "number" && Number.isFinite(rawUser.credits)
      ? rawUser.credits
      : 0;

  const logout = useCallback(async () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      await authClient.signOut();
    } finally {
      setCreditsOverride(null);
      router.replace("/login");
      router.refresh();
    }
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      credits: creditsOverride ?? sessionCredits,
      isLoading: isPending,
      setCredits: setCreditsOverride,
      logout,
    }),
    [user, creditsOverride, sessionCredits, isPending, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
