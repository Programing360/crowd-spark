"use client";

import {
  createContext,
  useCallback,
  useEffect,
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
      : "Creator";

  const rawId =
    typeof raw.id === "string" && raw.id.length > 0
      ? raw.id
      : typeof (raw as { _id?: string })._id === "string"
        ? (raw as { _id: string })._id
        : fallbackId || "user_default";

  return {
    id: rawId,
    name:
      typeof raw.name === "string" && raw.name.trim().length > 0
        ? raw.name
        : typeof raw.email === "string" && raw.email.includes("@")
          ? raw.email.split("@")[0]
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
  const [initialized, setInitialized] = useState<boolean>(false);

  // Restore session from localStorage on initial client mount
  useEffect(() => {
    try {
      const storedUserJson = window.localStorage.getItem("fundverse_user");
      const storedCredits = window.localStorage.getItem("fundverse_credits");

      if (storedUserJson) {
        const parsed = JSON.parse(storedUserJson);
        if (parsed && typeof parsed === "object") {
          setLocalUser(normalizeUser(parsed as AuthSessionUser));
        }
      }
      if (storedCredits !== null && !isNaN(Number(storedCredits))) {
        setCreditsOverride(Number(storedCredits));
      }
    } catch (e) {
      console.warn("Failed to restore session from localStorage", e);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Safely extract raw user from Better Auth session data variations
  const rawUser = useMemo<AuthSessionUser | null>(() => {
    if (!data) return null;
    const sessionObj = (data as { data?: unknown }).data ?? data;
    if (sessionObj && typeof sessionObj === "object") {
      if ("user" in sessionObj && sessionObj.user && typeof sessionObj.user === "object") {
        return sessionObj.user as AuthSessionUser;
      }
      if ("email" in sessionObj || "id" in sessionObj || "_id" in sessionObj) {
        return sessionObj as AuthSessionUser;
      }
    }
    return null;
  }, [data]);

  const sessionUser = useMemo<AuthUser | null>(() => {
    if (!rawUser) return null;
    return normalizeUser(rawUser);
  }, [rawUser]);

  const user = localUser ?? sessionUser;

  const sessionCredits =
    typeof rawUser?.credits === "number" && Number.isFinite(rawUser.credits)
      ? rawUser.credits
      : 5000;

  const applyAuthSession = useCallback(
    (token: string, raw: AuthSessionUser) => {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
      window.localStorage.setItem("fundverse_user", JSON.stringify(raw));

      const newCredits = typeof raw.credits === "number" && Number.isFinite(raw.credits) ? raw.credits : 5000;
      window.localStorage.setItem("fundverse_credits", String(newCredits));
      setCreditsOverride(newCredits);
      setLocalUser(normalizeUser(raw));
    },
    [],
  );

  const setCredits = useCallback((newCredits: number) => {
    setCreditsOverride(newCredits);
    window.localStorage.setItem("fundverse_credits", String(newCredits));
  }, []);

  const logout = useCallback(async () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.localStorage.removeItem("fundverse_user");
      window.localStorage.removeItem("fundverse_credits");
      await authClient.signOut();
    } catch {
      // Ignore network signout errors
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
      isLoading: (isPending || !initialized) && user === null,
      setCredits,
      applyAuthSession,
      logout,
    }),
    [user, creditsOverride, sessionCredits, isPending, initialized, setCredits, applyAuthSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


