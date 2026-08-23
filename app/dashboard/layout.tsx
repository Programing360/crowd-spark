"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Coins,
  CreditCard,
  FileText,
  FolderKanban,
  HeartHandshake,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  ShieldAlert,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import type { UserRole } from "@/src/types/auth";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const COMMON_NAV: NavItem[] = [
  { name: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
];

const SUPPORTER_NAV: NavItem[] = [
  { name: "Explore Campaigns", href: "/campaigns", icon: FolderKanban },
  { name: "My Contributions", href: "/dashboard/supporter/contributions", icon: HeartHandshake },
  { name: "Purchase Credit", href: "/dashboard/supporter/purchase-credit", icon: Coins },
  { name: "Payment History", href: "/dashboard/supporter/payment-history", icon: CreditCard },
];

const CREATOR_NAV: NavItem[] = [
  { name: "Add New Campaign", href: "/dashboard/creator/add-campaign", icon: PlusCircle },
  { name: "My Campaigns", href: "/dashboard/creator/my-campaigns", icon: FolderKanban },
  { name: "Withdrawals", href: "/dashboard/creator/withdrawals", icon: Wallet },
  { name: "Payment History", href: "/dashboard/creator/payment-history", icon: CreditCard },
];

const ADMIN_NAV: NavItem[] = [
  { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Manage Campaigns", href: "/dashboard/admin/campaigns", icon: ShieldAlert },
  { name: "Withdrawal Requests", href: "/dashboard/admin/withdrawals", icon: Wallet },
  { name: "Reports", href: "/dashboard/admin/reports", icon: FileText },
];

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  Supporter: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Creator: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Admin: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, credits, isLoading, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(2);

  // Determine user role (defaults to Creator if none specified, so testing layout is effortless)
  const role: UserRole = user?.role || "Creator";

  // Persistent session check: Wait until auth has initialized, then redirect if unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Small grace delay to prevent flash during client hydration
      const timeout = setTimeout(() => {
        if (!isAuthenticated) {
          router.replace("/login");
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, isAuthenticated, router]);

  // Compute active navigation list based on user role
  let roleNav: NavItem[] = SUPPORTER_NAV;
  if (role === "Creator") {
    roleNav = CREATOR_NAV;
  } else if (role === "Admin") {
    roleNav = ADMIN_NAV;
  }

  const allNavItems = [...COMMON_NAV, ...roleNav];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium animate-pulse">
            Loading FundVerse Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Topbar Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Fund<span className="text-amber-400">Verse</span>
            </span>
          </Link>
        </div>

        {/* Right: Credits, Role Badge, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* User Credits Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-sm">
            <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-amber-500/80 leading-none">
                Credits
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-tight leading-tight">
                {credits.toLocaleString()} CR
              </span>
            </div>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setNotificationsCount(0);
              }}
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Notifications
                  </h4>
                  <span className="text-[11px] text-amber-400 font-medium">All cleared</span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">System Check Passed</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Welcome to your FundVerse dashboard.</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-start gap-3">
                    <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Credit Balance Active</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">You have {credits.toLocaleString()} credits available.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <img
              src={
                user?.photoURL ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
              }
              alt={user?.name || "User Avatar"}
              className="w-9 h-9 rounded-full object-cover border-2 border-amber-400/80 shadow-md"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white line-clamp-1">
                {user?.name || "FundVerse Creator"}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${ROLE_BADGE_STYLES[role]}`}
              >
                {role}
              </span>
            </div>

            <button
              onClick={() => logout()}
              title="Logout"
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Body Area: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 justify-between">
          <div className="space-y-6">
            {/* User Role Indicator Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium">Role View</span>
                <span className="text-xs font-extrabold text-amber-400">{role} Workspace</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Navigation Menu
              </p>
              {allNavItems.map((item) => {
                const IconComp = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Link */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-xs transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Website</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
            <div className="w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between h-full animate-in slide-in-from-left duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-lg font-bold text-white">Menu Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {allNavItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          isActive
                            ? "bg-amber-500 text-slate-950 shadow-lg"
                            : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <IconComp className="w-5 h-5 shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white font-medium text-sm"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Website</span>
                </Link>
              </div>
            </div>

            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-950">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
