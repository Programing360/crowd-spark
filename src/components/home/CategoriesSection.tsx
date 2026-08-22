"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Cpu,
  HeartHandshake,
  Grid,
  Palette,
} from "lucide-react";

interface CategoryCard {
  name: string;
  icon: React.ElementType;
  description: string;
  count: string;
  color: string;
  bgGlow: string;
  borderHover: string;
  gradientText: string;
  image: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    name: "Technology",
    icon: Cpu,
    description:
      "Next-gen hardware, AI innovations, consumer electronics, robotics, and sustainable tech solutions.",
    count: "1,240+ Active Projects",
    color: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/10",
    borderHover: "group-hover:border-emerald-500/50",
    gradientText: "from-emerald-400 to-teal-300",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Art",
    icon: Palette,
    description:
      "Digital art, indie game releases, film productions, musical albums, and immersive design projects.",
    count: "890+ Active Projects",
    color: "from-purple-500 to-pink-600",
    bgGlow: "bg-purple-500/10",
    borderHover: "group-hover:border-purple-500/50",
    gradientText: "from-purple-400 to-pink-300",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Community",
    icon: HeartHandshake,
    description:
      "Social impact initiatives, green energy, urban agriculture, educational funds, and local movements.",
    count: "750+ Active Projects",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-500/10",
    borderHover: "group-hover:border-blue-500/50",
    gradientText: "from-blue-400 to-cyan-300",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Health",
    icon: Activity,
    description:
      "Biotech breakthroughs, mental wellness devices, portable diagnostics, and fitness tech devices.",
    count: "570+ Active Projects",
    color: "from-rose-500 to-amber-600",
    bgGlow: "bg-rose-500/10",
    borderHover: "group-hover:border-rose-500/50",
    gradientText: "from-rose-400 to-amber-300",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-3 border border-slate-200 dark:border-slate-700"
          >
            <Grid className="w-4 h-4 text-amber-500" />
            <span>Discover Passion Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Explore by Category
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg"
          >
            Find visionary campaigns across four core disciplines driving real-world change.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <Link
                  href={`/campaigns?category=${encodeURIComponent(cat.name)}`}
                  className={`block h-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-7 border border-slate-200/90 dark:border-slate-800 shadow-md ${cat.borderHover} transition-all duration-300 flex flex-col justify-between overflow-hidden relative`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="w-9 h-9 rounded-full bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      {cat.name}
                    </h3>

                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Footer Tag */}
                  <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wide uppercase">
                      {cat.count}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
