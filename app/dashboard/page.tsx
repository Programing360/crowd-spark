"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Coins,
  Flame,
  FolderKanban,
  HeartHandshake,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import type { UserRole } from "@/src/types/auth";

export default function DashboardOverviewPage() {
  const { user, credits } = useAuth();
  const role: UserRole = user?.role || "Creator";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-3">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{role} Portal Active</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{user?.name || "Creator"}</span>!
          </h1>

          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Manage your campaigns, track credit contributions, and oversee platform activity from your dedicated FundVerse dashboard.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {role === "Creator" && (
              <Link
                href="/dashboard/creator/add-campaign"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Campaign</span>
              </Link>
            )}

            {role === "Admin" && (
              <Link
                href="/dashboard/admin/campaigns"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Manage Pending Campaigns</span>
              </Link>
            )}

            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>Explore Public Campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Credits
            </span>
            <h3 className="text-2xl font-black text-white mt-1 flex items-center gap-1.5">
              <Coins className="w-5 h-5 text-amber-400" />
              {credits.toLocaleString()} CR
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {role === "Creator" ? "My Campaigns" : role === "Admin" ? "Total Platform Campaigns" : "Contributions"}
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              {role === "Creator" ? "3 Projects" : role === "Admin" ? "124 Campaigns" : "8 Backed"}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Account Status
            </span>
            <h3 className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5" /> Verified
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Success Rate
            </span>
            <h3 className="text-2xl font-black text-white mt-1">98.5%</h3>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Role Quick Links */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {role === "Creator" && (
            <>
              <Link
                href="/dashboard/creator/add-campaign"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Create Campaign</h4>
                  <p className="text-xs text-slate-400">Launch a new crowdfunding project</p>
                </div>
              </Link>

              <Link
                href="/dashboard/creator/my-campaigns"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-3 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Manage Campaigns</h4>
                  <p className="text-xs text-slate-400">View progress and story details</p>
                </div>
              </Link>
            </>
          )}

          {role === "Admin" && (
            <Link
              href="/dashboard/admin/campaigns"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-3 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Admin Approval Panel</h4>
                <p className="text-xs text-slate-400">Approve or reject pending projects</p>
              </div>
            </Link>
          )}

          <Link
            href="/campaigns"
            className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-3 transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Explore Campaigns</h4>
              <p className="text-xs text-slate-400">Back innovative public projects</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
