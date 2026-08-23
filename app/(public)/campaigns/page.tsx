"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Coins,
  Filter,
  Flame,
  Grid,
  Loader2,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import type { Campaign } from "@/src/components/home/TopFundedCampaigns";

const EXPLORE_FALLBACK_CAMPAIGNS: Campaign[] = [
  {
    _id: "exp-camp-1",
    title: "NeuroPulse: AI-Powered EEG Wearable for Brain Wellness",
    story:
      "NeuroPulse tracks neural patterns in real time using non-invasive sensors and generative AI to improve mental focus and stress resilience.",
    category: "Technology",
    fundingGoal: 50000,
    amountRaised: 45200,
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    creatorName: "Dr. Elena Rostova",
    backersCount: 342,
    deadline: "2026-10-15",
  },
  {
    _id: "exp-camp-2",
    title: "SolarCanvas: Flexible Solar Films for Urban Architecture",
    story:
      "Integrating ultra-thin photovoltaic films into building facades to turn skyscrapers into self-sustaining renewable clean energy generators.",
    category: "Technology",
    fundingGoal: 75000,
    amountRaised: 68400,
    imageUrl:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    creatorName: "SolarTech Labs",
    backersCount: 512,
    deadline: "2026-11-01",
  },
  {
    _id: "exp-camp-3",
    title: "EcoHarvest: Vertical Hydroponic Towers for Cities",
    story:
      "Bringing modular, high-yield organic farming directly into urban neighborhoods to eliminate food deserts and reduce carbon emissions.",
    category: "Community",
    fundingGoal: 40000,
    amountRaised: 38900,
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    creatorName: "GreenUrban Collective",
    backersCount: 428,
    deadline: "2026-10-30",
  },
  {
    _id: "exp-camp-4",
    title: "ImmerseVR: Haptic Sculpting Gloves for Artists",
    story:
      "Revolutionary tactile feedback gloves enabling digital sculptors and 3D animators to feel virtual materials with realistic pressure.",
    category: "Art",
    fundingGoal: 35000,
    amountRaised: 32100,
    imageUrl:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800&auto=format&fit=crop",
    creatorName: "Maya Lin & Studio",
    backersCount: 298,
    deadline: "2026-10-20",
  },
  {
    _id: "exp-camp-5",
    title: "BioShield: Portable Rapid Diagnostic Device",
    story:
      "Handheld point-of-care bio-sensor capable of detecting pathogens in water samples in under 3 minutes.",
    category: "Health",
    fundingGoal: 60000,
    amountRaised: 54800,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    creatorName: "HealthReach Global",
    backersCount: 489,
    deadline: "2026-11-15",
  },
  {
    _id: "exp-camp-6",
    title: "Resonance: High-Fidelity Audiophile Headphones",
    story:
      "Planar magnetic wireless headphones engineered with custom acoustic drivers for studio-grade sound purity.",
    category: "Technology",
    fundingGoal: 45000,
    amountRaised: 41200,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    creatorName: "Acoustic Craft",
    backersCount: 375,
    deadline: "2026-10-28",
  },
];

const CATEGORIES = ["All", "Technology", "Art", "Community", "Health"] as const;

export default function ExploreCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/v1/campaigns`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          const list: Campaign[] = Array.isArray(data)
            ? data
            : data?.data || data?.campaigns || [];

          // Filter for approved and non-expired campaigns
          const currentDate = new Date();
          const validApproved = list.filter((c) => {
            const isApproved = !c.status || c.status === "approved";
            const notExpired = !c.deadline || new Date(c.deadline) > currentDate;
            return isApproved && notExpired;
          });

          if (validApproved.length > 0) {
            setCampaigns(validApproved);
            setLoading(false);
            return;
          }
        }
        setCampaigns(EXPLORE_FALLBACK_CAMPAIGNS);
      } catch {
        setCampaigns(EXPLORE_FALLBACK_CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  // Filtered List based on category and search query
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" ||
      c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.story && c.story.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 font-medium text-xs sm:text-sm mb-4 border border-amber-500/20"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Discover Verified Crowdfunding Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Explore <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">FundVerse</span> Campaigns
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg"
          >
            Back visionary creators directly with transparent credits and unlock exclusive milestone rewards.
          </motion.p>
        </div>

        {/* Filter Controls: Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                      : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-3xl p-4 border border-slate-800 animate-pulse space-y-4"
              >
                <div className="w-full h-48 bg-slate-800 rounded-2xl" />
                <div className="h-4 bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-800 rounded w-3/4" />
                <div className="h-10 bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800">
            <Grid className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white">No campaigns found</h3>
            <p className="text-slate-400 text-sm mt-1">
              Try tweaking your search term or selecting another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign, idx) => {
              const id = campaign._id || campaign.id || `camp-${idx}`;
              const raised = campaign.amountRaised || 0;
              const goal = campaign.fundingGoal || 1;
              const percent = Math.min(100, Math.round((raised / goal) * 100));

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative w-full h-52 overflow-hidden bg-slate-950">
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400">
                          {campaign.category}
                        </span>
                      </div>

                      {/* Backers Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-medium">
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>{campaign.backersCount || 120}+ Backers</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                        {campaign.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        by <span className="text-slate-300 font-semibold">{campaign.creatorName || "FundVerse Creator"}</span>
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-amber-400 font-bold">{percent}%</span>
                        </div>

                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          />
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <div>
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                              Raised
                            </span>
                            <span className="text-sm font-extrabold text-white flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5 text-amber-400" />
                              {raised.toLocaleString()} CR
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                              Goal
                            </span>
                            <span className="text-sm font-semibold text-slate-300">
                              {goal.toLocaleString()} CR
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/campaigns/${id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-sm transition-all duration-300 shadow-md"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
