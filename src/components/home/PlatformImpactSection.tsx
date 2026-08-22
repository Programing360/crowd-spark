"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Coins, Globe2, Layers, ShieldCheck, Sparkles } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  decimals?: number;
}

const STATS: StatItem[] = [
  {
    id: "raised",
    label: "Total Credits Raised",
    numericValue: 12.5,
    suffix: "M+ CR",
    decimals: 1,
    description: "Direct credit backing delivered safely to creator campaigns",
    icon: Coins,
    gradient: "from-amber-400 via-orange-400 to-rose-400",
  },
  {
    id: "campaigns",
    label: "Active Campaigns",
    numericValue: 3450,
    suffix: "+",
    description: "Verified innovations currently raising funds across the globe",
    icon: Layers,
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
  },
  {
    id: "backers",
    label: "Backers Worldwide",
    numericValue: 185,
    suffix: "K+",
    description: "Passionate community members funding visionary projects",
    icon: Globe2,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
  },
  {
    id: "success",
    label: "Success Rate",
    numericValue: 94.8,
    suffix: "%",
    decimals: 1,
    description: "Approved campaigns successfully reaching their funding goal",
    icon: ShieldCheck,
    gradient: "from-cyan-400 via-blue-400 to-indigo-400",
  },
];

function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // ms

    function animateCount(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    }

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function PlatformImpactSection() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 font-medium text-xs sm:text-sm mb-4 border border-white/15 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Proven Track Record</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Platform Impact in <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Numbers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg"
          >
            Our vibrant ecosystem connects visionaries with global supporters, driving unprecedented crowdfunding success.
          </motion.p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.03 }}
                className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle Inner Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-amber-400 group-hover:text-white group-hover:bg-amber-500 transition-all duration-300 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight">
                    <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      <AnimatedNumber
                        value={stat.numericValue}
                        decimals={stat.decimals || 0}
                        suffix={stat.suffix}
                        prefix={stat.prefix || ""}
                      />
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white tracking-wide">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
