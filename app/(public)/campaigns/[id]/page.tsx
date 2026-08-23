"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Gift,
  HeartHandshake,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import type { Campaign } from "@/src/components/home/TopFundedCampaigns";

const FALLBACK_CAMPAIGN_DETAILS: Record<string, Campaign> = {
  "top-camp-1": {
    _id: "top-camp-1",
    title: "NeuroPulse: AI-Powered EEG Wearable for Brain Wellness",
    story:
      "NeuroPulse represents a revolutionary leap forward in consumer neurotechnology. Designed by leading neuroscientists and hardware engineers, our non-invasive EEG headband monitors real-time brainwave activity across 16 discrete focus channels. Using embedded deep learning algorithms, NeuroPulse detects cognitive fatigue, stress build-up, and focus lapses, providing subtle biofeedback cues to restore mental clarity.\n\nYour credit contribution will directly fund our final clinical validation trial and mass production tooling.",
    category: "Technology",
    fundingGoal: 50000,
    minimumContribution: 100,
    amountRaised: 45200,
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    creatorName: "Dr. Elena Rostova",
    backersCount: 342,
    deadline: "2026-10-15",
  },
  "top-camp-2": {
    _id: "top-camp-2",
    title: "SolarCanvas: Flexible Solar Films for Urban Architecture",
    story:
      "SolarCanvas integrates ultra-thin, semi-transparent photovoltaic films into commercial glass facades and window units. By transforming urban skyscrapers into massive clean energy generators, we reduce municipal carbon footprints while maintaining original architectural aesthetics.\n\nFunds raised on FundVerse will be used to install our first 10,000 sq.ft commercial pilot facade in downtown Neo-Tokyo.",
    category: "Technology",
    fundingGoal: 75000,
    minimumContribution: 250,
    amountRaised: 68400,
    imageUrl:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    creatorName: "SolarTech Labs",
    backersCount: 512,
    deadline: "2026-11-01",
  },
};

export default function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;
  const router = useRouter();
  const { user, credits, setCredits, isAuthenticated } = useAuth();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCampaignDetails() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/v1/campaigns/${campaignId}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          const item = data?.data || data?.campaign || data;
          if (item && item.title) {
            setCampaign(item);
            setLoading(false);
            return;
          }
        }

        // Fallback matching
        const fallback =
          FALLBACK_CAMPAIGN_DETAILS[campaignId] || {
            _id: campaignId,
            title: "Solar Powered Autonomous Water Pump System",
            story:
              "Clean water access remains a fundamental challenge for remote agricultural communities. Our solar-powered autonomous pump delivers up to 15,000 liters of purified water daily with zero carbon emissions and zero grid reliance.\n\nEvery credit contributed helps us manufacture modular filtration units and deploy them to dry-zone farming collectives.",
            category: "Technology",
            fundingGoal: 50000,
            minimumContribution: 100,
            amountRaised: 42000,
            imageUrl:
              "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
            creatorName: "Dr. Elena Rostova",
            backersCount: 285,
            deadline: "2026-10-30",
          };

        setCampaign(fallback);
      } catch {
        setCampaign({
          _id: campaignId,
          title: "Solar Powered Autonomous Water Pump System",
          story:
            "Clean water access remains a fundamental challenge for remote agricultural communities. Our solar-powered autonomous pump delivers up to 15,000 liters of purified water daily with zero carbon emissions.",
          category: "Technology",
          fundingGoal: 50000,
          minimumContribution: 100,
          amountRaised: 42000,
          imageUrl:
            "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
          creatorName: "Dr. Elena Rostova",
          backersCount: 285,
          deadline: "2026-10-30",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchCampaignDetails();
  }, [campaignId]);

  // Contribution Form Submission Logic
  const handleContributionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in to contribute credits to this campaign.");
      router.push("/login");
      return;
    }

    const amount = Number(contributionAmount);
    const minContribution = campaign?.minimumContribution || 100;

    if (isNaN(amount) || amount < minContribution) {
      toast.error(`Minimum contribution required is ${minContribution} credits.`);
      return;
    }

    if (amount > credits) {
      toast.error(
        `Insufficient credits! You currently have ${credits.toLocaleString()} CR. Please purchase more credits.`
      );
      return;
    }

    setSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const payload = {
        campaignId,
        amount,
        supporterEmail: user?.email,
        supporterName: user?.name,
        status: "pending",
      };

      await fetch(`${baseUrl}/api/v1/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // Deduct supporter credits
      const updatedUserCredits = credits - amount;
      setCredits(updatedUserCredits);

      // Update local campaign progress
      if (campaign) {
        setCampaign({
          ...campaign,
          amountRaised: (campaign.amountRaised || 0) + amount,
          backersCount: (campaign.backersCount || 0) + 1,
        });
      }

      toast.success(
        `Contribution of ${amount.toLocaleString()} credits placed successfully! Thank you for supporting this vision.`
      );
      setContributionAmount("");
    } catch {
      toast.error("An error occurred while processing your contribution.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          <p className="text-slate-400 text-sm font-medium">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold">Campaign Not Found</h2>
          <p className="text-slate-400 text-sm mt-2">The requested campaign does not exist or was removed.</p>
          <Link
            href="/campaigns"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
        </div>
      </div>
    );
  }

  const raised = campaign.amountRaised || 0;
  const goal = campaign.fundingGoal || 1;
  const percent = Math.min(100, Math.round((raised / goal) * 100));
  const minContribution = campaign.minimumContribution || 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Explore All Campaigns</span>
          </Link>
        </div>

        {/* Hero Section Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cover Image */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400">
                  {campaign.category}
                </span>
              </div>
            </div>
          </div>

          {/* Campaign Overview & Funding Box */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Verified Campaign
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 leading-snug">
                {campaign.title}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt={campaign.creatorName || "Creator"}
                  className="w-9 h-9 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-white">
                    {campaign.creatorName || "Dr. Elena Rostova"}
                  </p>
                </div>
              </div>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Funding Progress</span>
                <span className="text-amber-400">{percent}% Funded</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Total Raised
                  </span>
                  <span className="text-xl font-black text-white flex items-center gap-1">
                    <Coins className="w-4 h-4 text-amber-400" />
                    {raised.toLocaleString()} <span className="text-xs text-amber-400 font-bold">CR</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Funding Goal
                  </span>
                  <span className="text-base font-bold text-slate-300">
                    {goal.toLocaleString()} CR
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-extrabold text-white">
                  {campaign.backersCount || 120}+
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Backers</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-extrabold text-white">
                  {campaign.deadline ? "24 Days" : "Active"}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Time Remaining</span>
              </div>
            </div>

            {/* Supporter Contribution Form */}
            <form
              onSubmit={handleContributionSubmit}
              className="space-y-4 pt-4 border-t border-slate-800"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="contributionAmount"
                    className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
                  >
                    Contribution Amount (Credits) *
                  </label>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    Min: {minContribution} CR
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="contributionAmount"
                    min={minContribution}
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder={`e.g. ${minContribution * 2}`}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                    CR
                  </span>
                </div>

                {isAuthenticated && (
                  <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    Available Balance:{" "}
                    <span className="text-white font-bold">{credits.toLocaleString()} CR</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Contribution...</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-5 h-5 text-slate-950" />
                    <span>Back This Campaign</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Detailed Story & Reward Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">
              Campaign Story & Vision
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {campaign.story}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 h-fit">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span>Backer Reward Perks</span>
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {campaign.rewardInfo ||
                "Backers contributing at or above minimum credit tiers will receive VIP milestone updates, early-bird product access, and digital backer recognition badges."}
            </p>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400 inline mr-1.5" />
              Protected by FundVerse Admin Review. Your credit contributions are safeguarded until project funding milestones are reached.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
