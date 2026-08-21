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

export const TOKEN_STORAGE_KEY = "fundverse_token";
const VALID_ROLES: UserRole[] = ["Supporter", "Creator", "Admin"];

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  credits: number;
  isLoading: boolean;
  setCredits: (credits: number) => void;
  applyAuthSession: (token: string, user: AuthSessionUser) => void;
  logout: () => Promise<void>;
}

export interface AuthSessionUser {
  id?: string;
  name?: string;
  email?: string;
  photoURL?: string | null;
  image?: string | null;
  role?: UserRole | string;
  credits?: number;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

type RawUser = Record<string, unknown> & { id?: unknown };

function normalizeUser(raw: AuthSessionUser, fallbackId = ""): AuthUser {
  const role =
    typeof raw.role === "string" && VALID_ROLES.includes(raw.role as UserRole)
      ? (raw.role as UserRole)
      : "Supporter";
  return {
    id: typeof raw.id === "string" && raw.id.length > 0 ? raw.id : fallbackId,
    name:
      typeof raw.name === "string" && raw.name.trim().length > 0
        ? raw.name
        : "FundVerse User",
    email: typeof raw.email === "string" ? raw.email : "",
    photoURL:
      typeof raw.photoURL === "string"
        ? raw.photoURL
        : typeof raw.image === "string"
          ? raw.image
          : null,
    role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [creditsOverride, setCreditsOverride] = useState<number | null>(null);
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);

  const rawUser = (data as { user?: RawUser } | null)?.user;

  const sessionUser = useMemo<AuthUser | null>(() => {
    if (!rawUser || typeof rawUser.id !== "string") return null;
    return normalizeUser(rawUser as AuthSessionUser, rawUser.id);
  }, [rawUser]);

  const user = localUser ?? sessionUser;

  const sessionCredits =
    typeof rawUser?.credits === "number" && Number.isFinite(rawUser.credits)
      ? rawUser.credits
      : 0;

  const applyAuthSession = useCallback(
    (token: string, raw: AuthSessionUser) => {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
      if (typeof raw.credits === "number" && Number.isFinite(raw.credits)) {
        setCreditsOverride(raw.credits);
      } else {
        setCreditsOverride(null);
      }
      setLocalUser(normalizeUser(raw));
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      await authClient.signOut();
    } finally {
      setCreditsOverride(null);
      setLocalUser(null);
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
      applyAuthSession,
      logout,
    }),
    [user, creditsOverride, sessionCredits, isPending, applyAuthSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
