"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";

export default function CtaBannerSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 rounded-3xl p-8 sm:p-14 border border-amber-500/20 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Ring */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 font-medium text-xs sm:text-sm mb-4 border border-amber-500/20"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ready to Spark the Next Revolution?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Bring Your Vision to Life with <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">FundVerse</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed"
            >
              Join thousands of creators and backers building the future. Launch your campaign today or back groundbreaking innovations with verified credit safety.
            </motion.p>
          </div>

          {/* Right Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0"
          >
            <Link
              href="/dashboard/creator/add-campaign"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Rocket className="w-5 h-5 text-slate-950" />
              <span>Start a Campaign</span>
            </Link>

            <Link
              href="/campaigns"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
