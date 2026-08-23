"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderKanban, PlusCircle, ArrowRight, Coins } from "lucide-react";

export default function CreatorMyCampaignsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold border border-violet-500/20 mb-3">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Creator Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Campaigns</h1>
          <p className="mt-1 text-slate-400 text-sm">
            View and manage all your submitted crowdfunding campaigns.
          </p>
        </div>

        <Link
          href="/dashboard/creator/add-campaign"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Campaign</span>
        </Link>
      </motion.div>

      <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 text-center space-y-4">
        <FolderKanban className="w-10 h-10 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">Launch Your Next Big Idea</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Start a new campaign to collect credit contributions from supporters worldwide.
        </p>
      </div>
    </div>
  );
}
