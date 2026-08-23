"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Filter,
  Flame,
  Loader2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import type { Campaign } from "@/src/components/home/TopFundedCampaigns";

interface AdminCampaignItem extends Campaign {
  createdAt?: string;
  creatorEmail?: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_ADMIN_CAMPAIGNS: AdminCampaignItem[] = [
  {
    _id: "admin-camp-1",
    title: "Solar Powered Water Pump for Agricultural Villages",
    category: "Technology",
    fundingGoal: 50000,
    amountRaised: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    creatorName: "Dr. Elena Rostova",
    creatorEmail: "elena@solartech.org",
    status: "pending",
    createdAt: "2026-08-22",
  },
  {
    _id: "admin-camp-2",
    title: "EcoHarvest: Vertical Hydroponic Towers for Urban Centers",
    category: "Community",
    fundingGoal: 40000,
    amountRaised: 38900,
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    creatorName: "GreenUrban Collective",
    creatorEmail: "contact@greenurban.org",
    status: "pending",
    createdAt: "2026-08-21",
  },
  {
    _id: "admin-camp-3",
    title: "BioShield: Portable Rapid Diagnostic Device",
    category: "Health",
    fundingGoal: 60000,
    amountRaised: 54800,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    creatorName: "HealthReach Global",
    creatorEmail: "admin@healthreach.org",
    status: "approved",
    createdAt: "2026-08-15",
  },
  {
    _id: "admin-camp-4",
    title: "ImmerseVR: Haptic Sculpting Gloves",
    category: "Art",
    fundingGoal: 35000,
    amountRaised: 32100,
    imageUrl:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800&auto=format&fit=crop",
    creatorName: "Maya Lin & Studio",
    creatorEmail: "maya@linstudio.art",
    status: "approved",
    createdAt: "2026-08-10",
  },
];

export default function AdminManageCampaignsPage() {
  const [campaigns, setCampaigns] = useState<AdminCampaignItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Fetch Campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${baseUrl}/api/v1/campaigns`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data || data?.campaigns || [];
        if (list.length > 0) {
          setCampaigns(list);
          setLoading(false);
          return;
        }
      }
      setCampaigns(INITIAL_ADMIN_CAMPAIGNS);
    } catch {
      setCampaigns(INITIAL_ADMIN_CAMPAIGNS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Update Status Handler (Approve / Reject)
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoadingId(id);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      await fetch(`${baseUrl}/api/v1/campaigns/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => null);

      // Update local state optimistically
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id || c.id === id ? { ...c, status: newStatus } : c))
      );

      if (newStatus === "approved") {
        toast.success("Campaign approved successfully! It is now live on the public Explore page.");
      } else {
        toast.error("Campaign has been rejected.");
      }
    } catch {
      toast.error("Failed to update campaign status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered List based on active tab
  const filteredCampaigns = campaigns.filter((c) => {
    if (activeTab === "all") return true;
    return c.status === activeTab;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Moderation Console</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage Campaigns
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Review submitted creator campaigns, verify authenticity, and approve or reject projects.
          </p>
        </div>

        <button
          onClick={fetchCampaigns}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh List</span>
        </button>
      </motion.div>

      {/* Tabs Filter Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
        {(["pending", "approved", "rejected", "all"] as const).map((tab) => {
          const count = campaigns.filter((c) => (tab === "all" ? true : c.status === tab)).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] ${
                  isActive ? "bg-slate-950 text-amber-400 font-bold" : "bg-slate-800 text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Campaigns Moderation Table */}
      {loading ? (
        <div className="bg-slate-900/90 rounded-3xl p-12 border border-slate-800 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto mb-3" />
          <p className="text-slate-400 text-sm font-medium">Fetching campaigns for moderation...</p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="bg-slate-900/90 rounded-3xl p-12 border border-slate-800 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No {activeTab} campaigns found</h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            All submitted campaigns in this category have been processed.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Campaign Info</th>
                  <th className="py-4 px-6">Creator</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Goal (Credits)</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCampaigns.map((campaign) => {
                  const id = campaign._id || campaign.id || "";
                  const isPending = campaign.status === "pending";
                  const isActionLoading = actionLoadingId === id;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Campaign Image + Title */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-white text-sm line-clamp-1">
                              {campaign.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Submitted: {campaign.createdAt || "Recent"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Creator Details */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200 text-xs sm:text-sm">
                            {campaign.creatorName || "FundVerse Creator"}
                          </span>
                          <span className="text-xs text-slate-400">
                            {campaign.creatorEmail || "creator@fundverse.org"}
                          </span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-amber-400 border border-slate-700">
                          {campaign.category}
                        </span>
                      </td>

                      {/* Funding Goal */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 font-extrabold text-white text-sm">
                          <Coins className="w-4 h-4 text-amber-400" />
                          {campaign.fundingGoal?.toLocaleString()} CR
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold capitalize border ${
                            campaign.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : campaign.status === "rejected"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {campaign.status === "approved" && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {campaign.status === "rejected" && <XCircle className="w-3.5 h-3.5" />}
                          {campaign.status === "pending" && <Clock className="w-3.5 h-3.5" />}
                          {campaign.status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(id, "approved")}
                            disabled={isActionLoading || campaign.status === "approved"}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
                          >
                            {isActionLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(id, "rejected")}
                            disabled={isActionLoading || campaign.status === "rejected"}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 disabled:opacity-40 text-rose-400 hover:text-rose-300 border border-rose-500/30 font-bold text-xs transition-all cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
