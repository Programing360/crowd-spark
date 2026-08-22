"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Coins, Lightbulb, ShieldCheck, Wallet } from "lucide-react";

interface Step {
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  badgeBg: string;
}

const STEPS: Step[] = [
  {
    stepNumber: "01",
    title: "Launch Idea",
    subtitle:
      "Craft your campaign storyline, set a credit funding goal, upload high-res visuals, and configure backer reward tiers.",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  },
  {
    stepNumber: "02",
    title: "Admin Review",
    subtitle:
      "Our compliance team verifies creator details, authenticity, and platform safety to ensure maximum trust for all backers.",
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-violet-500",
    badgeBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
  },
  {
    stepNumber: "03",
    title: "Gather Contributions",
    subtitle:
      "Publish your campaign, share your unique link across global networks, and watch live credit contributions roll in.",
    icon: Coins,
    gradient: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  },
  {
    stepNumber: "04",
    title: "Withdraw Funds",
    subtitle:
      "Hit your campaign milestones and safely request credit payouts to execute your project and reward your loyal backers.",
    icon: Wallet,
    gradient: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/10 text-rose-500 border-rose-500/30",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 font-medium text-xs sm:text-sm mb-4 border border-white/15 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Simple & Transparent Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            How <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">FundVerse</span> Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            From your initial breakthrough idea to withdrawing raised credits, our platform simplifies every step for creators and supporters alike.
          </motion.p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative bg-slate-800/80 backdrop-blur-md rounded-2xl p-7 border border-slate-700/80 shadow-xl flex flex-col justify-between group hover:border-slate-600 transition-all duration-300"
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <span className="text-3xl font-black text-slate-700 group-hover:text-amber-400/80 transition-colors">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Card Title & Content */}
                <div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border mb-2 ${step.badgeBg}">
                    Step {step.stepNumber}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                {/* Progress accent bottom bar */}
                <div className="mt-6 pt-4 border-t border-slate-700/60">
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${step.gradient} w-0 group-hover:w-full transition-all duration-500`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
