"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, Star, UserCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export interface Testimonial {
  id: string;
  fullName: string;
  role: "Supporter" | "Creator";
  photoUrl: string;
  rating: number;
  quote: string;
  campaignSupported?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    fullName: "Sarah Jenkins",
    role: "Creator",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "FundVerse allowed us to reach our 50,000 credit goal in just 12 days! The admin approval process was seamless, and the milestone payout system gave our backers total confidence.",
    campaignSupported: "NeuroPulse Wearable",
  },
  {
    id: "t2",
    fullName: "Marcus Vance",
    role: "Supporter",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "I love how direct and transparent credit backing is on FundVerse. Being able to track project progress live and receive creator updates directly has made me a loyal backer.",
    campaignSupported: "SolarCanvas Architecture",
  },
  {
    id: "t3",
    fullName: "Elena Rostova",
    role: "Creator",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "The community engagement on FundVerse is unmatched. Beyond credit backing, we received valuable feedback from supporters worldwide that shaped our final product launch.",
    campaignSupported: "BioShield Diagnostics",
  },
  {
    id: "t4",
    fullName: "David Sterling",
    role: "Supporter",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "As a tech enthusiast, backing projects on FundVerse gives me first access to incredible innovations before they hit retail market. The credit reward system is super smooth!",
    campaignSupported: "Resonance Headphones",
  },
  {
    id: "t5",
    fullName: "Amara Patel",
    role: "Creator",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "Starting our green community initiative on FundVerse was the best decision we made. Transparent credit tracking gave our local donors complete peace of mind.",
    campaignSupported: "EcoHarvest Urban Towers",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-xs sm:text-sm mb-3 border border-amber-500/20"
          >
            <MessageSquareQuote className="w-4 h-4 text-amber-500" />
            <span>Community Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Loved by Creators & Supporters
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg"
          >
            Real feedback from visionaries who funded their dreams and backers who made them happen.
          </motion.p>
        </div>

        {/* Testimonials Swiper Carousel */}
        <div className="pb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full !py-4"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-200/90 dark:border-slate-700/80 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group"
                >
                  {/* Quote Icon Background */}
                  <MessageSquareQuote className="absolute top-6 right-6 w-10 h-10 text-slate-200 dark:text-slate-700/50 pointer-events-none group-hover:text-amber-500/20 transition-colors" />

                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  {/* Author Meta Info */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={testimonial.photoUrl}
                        alt={testimonial.fullName}
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md"
                        loading="lazy"
                      />

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {testimonial.fullName}
                        </h4>
                        {testimonial.campaignSupported && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {testimonial.campaignSupported}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Role Badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        testimonial.role === "Creator"
                          ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 border border-violet-500/30"
                          : "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/30"
                      }`}
                    >
                      {testimonial.role}
                    </span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Container */}
          <div className="testimonial-pagination !mt-8 flex justify-center gap-2 [&_.swiper-pagination-bullet]:bg-slate-400 dark:[&_.swiper-pagination-bullet]:bg-slate-600 [&_.swiper-pagination-bullet-active]:!bg-amber-500 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet]:transition-all" />
        </div>
      </div>
    </section>
  );
}
