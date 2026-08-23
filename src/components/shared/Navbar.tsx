"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Coins,
  HeartHandshake,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import type { UserRole } from "@/src/types/auth";
import { useSession } from "@/app/lib/auth-client";

const GITHUB_REPO_URL = "https://github.com/your-username/fundverse-client";

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  Supporter: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Creator:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Admin: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name?: string | null) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part.charAt(0).toUpperCase()).join("");
  return initials || "U";
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function BrandMark() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
      aria-label="FundVerse home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 text-white shadow-sm">
        <HeartHandshake className="h-5 w-5" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Fund<span className="text-rose-600 dark:text-rose-400">Verse</span>
      </span>
    </Link>
  );
}

function NavLink({
  href,
  variant,
  onNavigate,
  children,
}: {
  href: string;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
        variant === "desktop" &&
          cx(
            "rounded-lg px-3 py-2 text-sm",
            isActive
              ? "text-rose-600 dark:text-rose-400"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
          ),
        variant === "mobile" &&
          cx(
            "rounded-xl px-4 py-3 text-base",
            isActive
              ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white",
          ),
      )}
    >
      {children}
    </Link>
  );
}

function JoinAsDeveloperButton({
  variant,
  className,
}: {
  variant: "primary" | "ghost";
  className?: string;
}) {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
        variant === "primary" &&
          "bg-rose-600 px-4 py-2 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800",
        variant === "ghost" &&
          "border border-gray-300 px-4 py-2 text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
        className,
      )}
    >
      <GithubIcon className="h-4 w-4" />
      Join as Developer
    </a>
  );
}

function Avatar({
  src,
  name,
  size,
}: {
  src?: string | null;
  name?: string | null;
  size: "sm" | "md" | "lg";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;
  return (
    <span
      className={cx(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-rose-500 to-orange-400 font-bold text-white ring-2 ring-white dark:ring-gray-900",
        size === "sm" && "h-8 w-8 text-xs",
        size === "md" && "h-10 w-10 text-sm",
        size === "lg" && "h-12 w-12 text-base",
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setImageFailed(true)}
          unoptimized
        />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}

function CreditsBadge({ credits }: { credits: number }) {
  return (
    <span
      title="Available credits"
      className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
    >
      <Coins className="h-4 w-4" aria-hidden="true" />
      {credits.toLocaleString()}
      <span className="hidden sm:inline">Credits</span>
      <span className="sr-only">credits available</span>
    </span>
  );
}

function SkeletonPill({ className }: { className?: string }) {
  return (
    <div
      className={cx("animate-pulse bg-gray-200 dark:bg-gray-800", className)}
      aria-hidden="true"
    />
  );
}

function AuthSkeleton() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <SkeletonPill className="hidden h-9 w-28 rounded-full md:block" />
      <SkeletonPill className="h-9 w-24 rounded-full" />
      <SkeletonPill className="h-10 w-10 rounded-full" />
    </div>
  );
}

function useIsMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

const subscribeNoop = () => () => {};

export default function Navbar() {
  const { user, isAuthenticated, credits, isLoading, logout } = useAuth();
  const pathname = usePathname();
  // const { data: session } = authClient.useSession();
  // const user = session?.user;

  // const data = fetch()
  console.log(user);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isMounted = useIsMounted();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const userMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLElement>(null);

  const closeUserMenu = useCallback(() => setIsUserMenuOpen(false), []);
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsUserMenuOpen(false);
    setIsMobileOpen(false);
  }

  useEffect(() => {
    if (!isUserMenuOpen) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (!isUserMenuOpen && !isMobileOpen) return;
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
        userMenuTriggerRef.current?.focus();
      } else if (isMobileOpen) {
        setIsMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isUserMenuOpen, isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
    getFocusable()[0]?.focus();
    const handleTab = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", handleTab);
    document.body.style.overflow = "hidden";
    return () => {
      panel.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (isUserMenuOpen) {
      userMenuRef.current
        ?.querySelector<HTMLElement>("[data-menu-item]")
        ?.focus();
    }
  }, [isUserMenuOpen]);

  const handleUserMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      userMenuRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ??
        [],
    );
    if (items.length === 0) return;
    const currentIndex = items.findIndex(
      (item) => item === document.activeElement,
    );
    let nextIndex: number;
    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1 + items.length) % items.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    items[nextIndex].focus();
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    closeUserMenu();
    closeMobileMenu();
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItemClasses =
    "flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:bg-gray-100 focus-visible:text-gray-900 focus-visible:outline-none dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white dark:focus-visible:bg-gray-800";

  const renderUserMenuItems = (onNavigate: () => void) => (
    <>
      <Link
        role="menuitem"
        data-menu-item
        href="/dashboard"
        onClick={onNavigate}
        className={menuItemClasses}
      >
        <LayoutDashboard className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        Profile / Dashboard
      </Link>
      <button
        role="menuitem"
        data-menu-item
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={cx(
          menuItemClasses,
          "text-rose-600 hover:bg-rose-50 hover:text-rose-700 focus-visible:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300",
        )}
      >
        {isLoggingOut ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
        Logout
      </button>
    </>
  );

  const renderUserInfoHeader = () =>
    user ? (
      <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar src={user.photoURL} name={user.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <span
          className={cx(
            "mt-2.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            ROLE_BADGE_STYLES[user.role],
          )}
        >
          {user.role}
        </span>
      </div>
    ) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <BrandMark />

        {isLoading ? (
          <AuthSkeleton />
        ) : (
          <>
            <div className="hidden items-center gap-1 lg:flex">
              {isAuthenticated ? (
                <NavLink href="/dashboard" variant="desktop">
                  Dashboard
                </NavLink>
              ) : (
                <NavLink href="/campaigns" variant="desktop">
                  Explore Campaigns
                </NavLink>
              )}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {isAuthenticated && user ? (
                <>
                  <CreditsBadge credits={credits} />
                  <JoinAsDeveloperButton variant="ghost" />
                  <div className="relative">
                    <button
                      ref={userMenuTriggerRef}
                      type="button"
                      onClick={() => setIsUserMenuOpen((open) => !open)}
                      aria-haspopup="menu"
                      aria-expanded={isUserMenuOpen}
                      aria-controls="fundverse-user-menu"
                      className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-gray-800"
                    >
                      <Avatar src={user.photoURL} name={user.name} size="sm" />
                      <ChevronDown
                        className={cx(
                          "mr-1 h-4 w-4 text-gray-500 transition-transform duration-200 dark:text-gray-400",
                          isUserMenuOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isUserMenuOpen && (
                      <div
                        id="fundverse-user-menu"
                        ref={userMenuRef}
                        role="menu"
                        aria-label="Account menu"
                        onKeyDown={handleUserMenuKeyDown}
                        className="fv-menu-in absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/40"
                      >
                        {renderUserInfoHeader()}
                        <div role="none" className="py-1.5">
                          {renderUserMenuItems(closeUserMenu)}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    Register
                  </Link>
                  <JoinAsDeveloperButton variant="primary" />
                </>
              )}
            </div>
          </>
        )}

        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
          aria-controls="fundverse-mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {isMounted &&
        createPortal(
          <>
            <div
              onClick={closeMobileMenu}
              aria-hidden="true"
              className={cx(
                "fixed inset-0 z-[60] bg-gray-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
                isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />

            <aside
              id="fundverse-mobile-menu"
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className={cx(
                "fixed inset-y-0 right-0 z-[70] flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-gray-950 lg:hidden",
                isMobileOpen ? "translate-x-0" : "invisible translate-x-full",
              )}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
                <BrandMark />
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                {isLoading ? (
                  <div className="space-y-3 px-1" aria-hidden="true">
                    <SkeletonPill className="h-11 w-full rounded-xl" />
                    <SkeletonPill className="h-16 w-full rounded-xl" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {isAuthenticated ? (
                      <NavLink
                        href="/dashboard"
                        variant="mobile"
                        onNavigate={closeMobileMenu}
                      >
                        Dashboard
                      </NavLink>
                    ) : (
                      <NavLink
                        href="/campaigns"
                        variant="mobile"
                        onNavigate={closeMobileMenu}
                      >
                        Explore Campaigns
                      </NavLink>
                    )}

                    {isAuthenticated && user && (
                      <div className="mt-4 rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.photoURL}
                            name={user.name}
                            size="md"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span
                            className={cx(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              ROLE_BADGE_STYLES[user.role],
                            )}
                          >
                            {user.role}
                          </span>
                          <CreditsBadge credits={credits} />
                        </div>
                      </div>
                    )}

                    <div className="my-4 border-t border-gray-200 dark:border-gray-800" />

                    <a
                      href={GITHUB_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <GithubIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      Join as Developer
                    </a>
                  </div>
                )}
              </div>

              {!isLoading && (
                <div className="shrink-0 space-y-2 border-t border-gray-200 p-4 dark:border-gray-800">
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-60 dark:border-rose-500/30 dark:text-rose-400 dark:hover:bg-rose-500/10"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                      >
                        <UserRound className="h-4 w-4" />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </aside>
          </>,
          document.body,
        )}
    </header>
  );
}
