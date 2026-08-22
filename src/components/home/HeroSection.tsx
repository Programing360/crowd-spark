"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  bgImage: string;
  overlayGradient: string;
  accentColor: string;
  stats: Array<{ label: string; value: string }>;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "The Future of Crowdfunding",
    title: "Turn Bold Ideas Into",
    highlightText: "Reality",
    description:
      "Fuel groundbreaking tech innovations, artistic masterpieces, and social movements. Connect directly with visionary creators and shape tomorrow.",
    bgImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
    overlayGradient:
      "from-slate-950/90 via-slate-900/80 to-slate-950/95",
    accentColor: "from-amber-400 via-orange-500 to-rose-500",
    stats: [
      { label: "Total Funded", value: "12.5M+ CR" },
      { label: "Success Rate", value: "98.4%" },
    ],
  },
  {
    id: 2,
    badge: "Global Creator Ecosystem",
    title: "Empower Creators",
    highlightText: "Worldwide",
    description:
      "Join over 185,000+ passionate backers across 120 countries. Direct peer-to-peer funding with zero hidden platform fees and transparent credits.",
    bgImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop",
    overlayGradient:
      "from-indigo-950/90 via-slate-900/80 to-purple-950/95",
    accentColor: "from-emerald-400 via-teal-400 to-cyan-500",
    stats: [
      { label: "Global Backers", value: "185K+" },
      { label: "Active Countries", value: "120+" },
    ],
  },
  {
    id: 3,
    badge: "Transparent & Direct Platform",
    title: "Transparent & Direct",
    highlightText: "Crowdfunding",
    description:
      "Built on verified admin reviews, encrypted credit ledgers, and milestone milestone tracking. Back bold projects with total peace of mind.",
    bgImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto=format&fit=crop",
    overlayGradient:
      "from-blue-950/90 via-slate-900/85 to-slate-950/95",
    accentColor: "from-cyan-400 via-blue-500 to-indigo-500",
    stats: [
      { label: "Verified Reviews", value: "100%" },
      { label: "Credit Safety", value: "Protected" },
    ],
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".hero-swiper-pagination",
        }}
        navigation={{
          nextEl: ".hero-button-next",
          prevEl: ".hero-button-prev",
        }}
        loop={true}
        className="w-full h-[640px] sm:h-[700px] lg:h-[780px]"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Parallax feel */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.overlayGradient}`}
            />
            <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-12 pb-16">
              <div className="max-w-3xl">
                {/* Tag Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-white shadow-lg mb-6"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{slide.badge}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
                >
                  {slide.title}{" "}
                  <span
                    className={`bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent`}
                  >
                    {slide.highlightText}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
                >
                  {slide.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/dashboard/creator/add-campaign"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <Rocket className="w-5 h-5 text-slate-950" />
                    <span>Start a Campaign</span>
                  </Link>

                  <Link
                    href="/campaigns"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Hero Stats Pill */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg"
                >
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight flex items-center gap-1">
                      <ShieldCheck className="w-5 h-5 inline" /> Safe
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Admin Protection
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          aria-label="Previous Slide"
          className="hero-button-prev p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-white/15 backdrop-blur-md transition-all duration-200 focus:outline-none hover:scale-110 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="hero-swiper-pagination !static !w-auto flex items-center justify-center gap-2 [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet-active]:!bg-amber-400 [&_.swiper-pagination-bullet-active]:!w-7 [&_.swiper-pagination-bullet]:transition-all" />

        <button
          aria-label="Next Slide"
          className="hero-button-next p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-white/15 backdrop-blur-md transition-all duration-200 focus:outline-none hover:scale-110 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
