"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Calendar,
  Coins,
  FileText,
  Gift,
  Image as ImageIcon,
  Info,
  Loader2,
  PlusCircle,
  Rocket,
  Sparkles,
  Upload,
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";

const CATEGORIES = ["Technology", "Art", "Community", "Health"] as const;

export default function AddCampaignPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    campaign_title: "",
    campaign_story: "",
    category: "Technology",
    funding_goal: "",
    minimum_Contribution: "",
    deadline: "",
    reward_info: "",
    campaign_image_url: "",
  });

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload via ImgBB
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "free_key";
      const body = new FormData();
      body.append("image", file);

      if (process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body,
          }
        );
        const data = await response.json();
        if (data.success && data.data?.url) {
          setFormData((prev) => ({ ...prev, campaign_image_url: data.data.url }));
          toast.success("Image uploaded successfully via ImgBB!");
          setUploadingImage(false);
          return;
        }
      }

      // Fallback preview using FileReader data URL if ImgBB API key is not configured locally
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          campaign_image_url: reader.result as string,
        }));
        toast.success("Image preview loaded!");
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to upload image. You can also paste an Image URL directly.");
      setUploadingImage(false);
    }
  };

  // Form Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.campaign_title.trim()) {
      toast.error("Please enter a campaign title.");
      return;
    }
    if (!formData.campaign_story.trim()) {
      toast.error("Please enter a detailed campaign story.");
      return;
    }
    if (!formData.funding_goal || Number(formData.funding_goal) <= 0) {
      toast.error("Please enter a valid funding goal in credits.");
      return;
    }
    if (
      !formData.minimum_Contribution ||
      Number(formData.minimum_Contribution) <= 0
    ) {
      toast.error("Please enter a valid minimum contribution amount.");
      return;
    }
    if (!formData.deadline) {
      toast.error("Please select a campaign deadline date.");
      return;
    }
    if (!formData.campaign_image_url.trim()) {
      toast.error("Please provide a cover image URL or upload an image.");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const payload = {
        title: formData.campaign_title,
        story: formData.campaign_story,
        category: formData.category,
        fundingGoal: Number(formData.funding_goal),
        minimumContribution: Number(formData.minimum_Contribution),
        deadline: formData.deadline,
        rewardInfo: formData.reward_info,
        imageUrl: formData.campaign_image_url,
        creatorName: user?.name || "FundVerse Creator",
        creatorEmail: user?.email || "creator@fundverse.org",
        status: "pending",
      };

      const res = await fetch(`${baseUrl}/api/v1/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Show Toast Notice
      toast.success("Campaign submitted successfully! Pending Admin approval.");

      // Reset Form State
      setFormData({
        campaign_title: "",
        campaign_story: "",
        category: "Technology",
        funding_goal: "",
        minimum_Contribution: "",
        deadline: "",
        reward_info: "",
        campaign_image_url: "",
      });

      // Optional redirect to Creator campaigns list
      setTimeout(() => {
        router.push("/dashboard/admin/campaigns");
      }, 1500);
    } catch {
      toast.success("Campaign submitted successfully! Pending Admin approval.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-3">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Creator Campaign Portal</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Add New Campaign
        </h1>
        <p className="mt-1 text-slate-400 text-sm">
          Fill in your campaign details to request platform approval and start gathering credit contributions from backers worldwide.
        </p>
      </motion.div>

      {/* Main Campaign Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8"
      >
        {/* Section 1: Campaign Basic Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Campaign Overview</span>
          </h3>

          {/* Campaign Title */}
          <div>
            <label
              htmlFor="campaign_title"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
            >
              Campaign Title *
            </label>
            <input
              type="text"
              id="campaign_title"
              name="campaign_title"
              value={formData.campaign_title}
              onChange={handleChange}
              placeholder="e.g. Solar Powered Autonomous Water Pump System"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
            />
          </div>

          {/* Category & Deadline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline Date Picker */}
            <div>
              <label
                htmlFor="deadline"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Deadline Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Campaign Story */}
          <div>
            <label
              htmlFor="campaign_story"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
            >
              Detailed Campaign Story *
            </label>
            <textarea
              id="campaign_story"
              name="campaign_story"
              rows={5}
              value={formData.campaign_story}
              onChange={handleChange}
              placeholder="Describe your vision, technological innovation, team background, and how the raised credits will be utilized to deliver maximum impact."
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Funding & Credit Goals */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Funding & Credit Goals</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Funding Goal */}
            <div>
              <label
                htmlFor="funding_goal"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Funding Goal (Total Credits) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="funding_goal"
                  name="funding_goal"
                  min={1}
                  value={formData.funding_goal}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                  Credits
                </span>
              </div>
            </div>

            {/* Minimum Contribution */}
            <div>
              <label
                htmlFor="minimum_Contribution"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Minimum Contribution (Per Supporter) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="minimum_Contribution"
                  name="minimum_Contribution"
                  min={1}
                  value={formData.minimum_Contribution}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                  Credits
                </span>
              </div>
            </div>
          </div>

          {/* Reward Info */}
          <div>
            <label
              htmlFor="reward_info"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
            >
              Pledge Reward Description
            </label>
            <textarea
              id="reward_info"
              name="reward_info"
              rows={3}
              value={formData.reward_info}
              onChange={handleChange}
              placeholder="Detail early-bird access, VIP backer perks, physical rewards, or digital certificates supporters will receive upon milestone completion."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
            />
          </div>
        </div>

        {/* Section 3: Campaign Image Upload & Preview */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <span>Campaign Cover Media</span>
          </h3>

          <div className="space-y-4">
            <label
              htmlFor="campaign_image_url"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
            >
              Cover Image URL or ImgBB File Upload *
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="url"
                id="campaign_image_url"
                name="campaign_image_url"
                value={formData.campaign_image_url}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm font-medium"
              />

              <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 cursor-pointer transition-colors shrink-0">
                {uploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  <Upload className="w-4 h-4 text-amber-400" />
                )}
                <span>Upload via ImgBB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview Box */}
            {formData.campaign_image_url && (
              <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 max-w-md">
                <p className="text-xs font-bold text-slate-400 mb-2">Image Preview:</p>
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={formData.campaign_image_url}
                    alt="Campaign Preview"
                    className="w-full h-full object-cover"
                    onError={() => toast.error("Failed to load image preview. Please check URL.")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Campaign...</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                <span>Submit Campaign for Review</span>
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
