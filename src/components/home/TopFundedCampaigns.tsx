"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coins, Flame, Layers, TrendingUp, Users } from "lucide-react";

export interface Campaign {
  _id?: string;
  id?: string;
  title: string;
  story?: string;
  category: "Technology" | "Art" | "Community" | "Health" | string;
  fundingGoal: number;
  minimumContribution?: number;
  amountRaised: number;
  deadline?: string | Date;
  imageUrl: string;
  status?: string;
  creatorName?: string;
  backersCount?: number;
}

const FALLBACK_CAMPAIGNS: Campaign[] = [
  {
    _id: "top-camp-1",
    title: "NeuroPulse: AI-Powered EEG Wearable for Brain Wellness",
    category: "Technology",
    fundingGoal: 50000,
    amountRaised: 45200,
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    creatorName: "Dr. Elena Rostova",
    backersCount: 342,
    deadline: "2026-09-15",
  },
  {
    _id: "top-camp-2",
    title: "SolarCanvas: Flexible Solar Films for Urban Architecture",
    category: "Technology",
    fundingGoal: 75000,
    amountRaised: 68400,
    imageUrl:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    creatorName: "SolarTech Labs",
    backersCount: 512,
    deadline: "2026-09-28",
  },
  {
    _id: "top-camp-3",
    title: "EcoHarvest: Vertical Hydroponic Towers for Cities",
    category: "Community",
    fundingGoal: 40000,
    amountRaised: 38900,
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    creatorName: "GreenUrban Collective",
    backersCount: 428,
    deadline: "2026-10-05",
  },
  {
    _id: "top-camp-4",
    title: "ImmerseVR: Haptic Gloves for Digital Sculptors",
    category: "Art",
    fundingGoal: 35000,
    amountRaised: 32100,
    imageUrl:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800&auto=format&fit=crop",
    creatorName: "Maya Lin & Studio",
    backersCount: 298,
    deadline: "2026-09-20",
  },
  {
    _id: "top-camp-5",
    title: "BioShield: Portable Rapid Diagnostic Device for Water Safety",
    category: "Health",
    fundingGoal: 60000,
    amountRaised: 54800,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    creatorName: "HealthReach Global",
    backersCount: 489,
    deadline: "2026-10-12",
  },
  {
    _id: "top-camp-6",
    title: "Resonance: High-Fidelity Audiophile Wireless Headphones",
    category: "Technology",
    fundingGoal: 45000,
    amountRaised: 41200,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    creatorName: "Acoustic Craft",
    backersCount: 375,
    deadline: "2026-09-30",
  },
];

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Technology: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
  },
  Art: {
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
  },
  Community: {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
  },
  Health: {
    bg: "bg-rose-500/10 dark:bg-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
  },
};

export default function TopFundedCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTopFunded() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/v1/campaigns/top-funded`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch top funded campaigns");
        }

        const data = await res.json();

        let list: Campaign[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && Array.isArray(data.data)) {
          list = data.data;
        } else if (data && Array.isArray(data.campaigns)) {
          list = data.campaigns;
        }

        if (list.length > 0) {
          setCampaigns(list.slice(0, 6));
        } else {
          setCampaigns(FALLBACK_CAMPAIGNS);
        }
      } catch {
        // Fallback to rich mock data if backend request fails or endpoint is not reachable
        setCampaigns(FALLBACK_CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    }

    fetchTopFunded();
  }, []);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/60 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-xs sm:text-sm mb-3 border border-amber-500/20"
            >
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Trending Projects</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Top Funded Campaigns
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 text-slate-600 dark:text-slate-400 text-base max-w-xl"
            >
              Explore the highest-backed innovations leading the crowd-funding revolution on FundVerse.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
            >
              <span>View All Campaigns</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 animate-pulse flex flex-col gap-4"
              >
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const campaignId = campaign._id || campaign.id || `camp-${index}`;
              const categoryStyle =
                CATEGORY_STYLES[campaign.category] || CATEGORY_STYLES["Technology"];
              const raised = campaign.amountRaised || 0;
              const goal = campaign.fundingGoal || 1;
              const percent = Math.min(100, Math.round((raised / goal) * 100));

              return (
                <motion.div
                  key={campaignId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Cover Image Container */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                    {/* Category Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                      >
                        {campaign.category}
                      </span>
                    </div>

                    {/* Backers / Days Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md text-slate-200 text-xs font-medium">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{campaign.backersCount || 120}+ Backers</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {campaign.title}
                      </h3>

                      {/* Creator name */}
                      {campaign.creatorName && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          by <span className="text-slate-700 dark:text-slate-300 font-semibold">{campaign.creatorName}</span>
                        </p>
                      )}

                      {/* Progress Bar & Amount Raised */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-600 dark:text-slate-400">Progress</span>
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{percent}%</span>
                        </div>

                        {/* Progress track */}
                        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          />
                        </div>

                        {/* Credits Details */}
                        <div className="pt-2 flex items-center justify-between">
                          <div>
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                              Total Raised
                            </span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                              <Coins className="w-4 h-4 text-amber-500" />
                              {raised.toLocaleString()} <span className="text-xs text-amber-500 font-bold">Credits</span>
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                              Goal
                            </span>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                              {goal.toLocaleString()} CR
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View Details CTA Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                      <Link
                        href={`/campaigns/${campaignId}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 dark:bg-slate-700 dark:hover:bg-amber-400 dark:hover:text-slate-950 font-bold text-sm transition-all duration-300 shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
