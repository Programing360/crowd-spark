"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Coins, HeartHandshake, FolderKanban, ArrowRight } from "lucide-react";

export default function SupporterContributionsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Supporter Portfolio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Contributions</h1>
        <p className="mt-1 text-slate-400 text-sm">
          Track all credit contributions you have made to active and completed crowdfunding campaigns.
        </p>
      </motion.div>

      <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
          <FolderKanban className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Explore Campaigns to Back</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          You haven&apos;t backed any pending campaigns yet. Discover innovative technology, art, and community causes on FundVerse.
        </p>
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all"
        >
          <span>Browse Campaigns</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
