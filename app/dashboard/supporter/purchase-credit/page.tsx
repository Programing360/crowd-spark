"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Coins, CreditCard, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";

const CREDIT_PACKAGES = [
  { credits: 500, price: "$50", popular: false },
  { credits: 1500, price: "$140", popular: true },
  { credits: 5000, price: "$450", popular: false },
];

export default function PurchaseCreditPage() {
  const { credits, setCredits } = useAuth();
  const [selectedPkg, setSelectedPkg] = useState(1500);

  const handlePurchase = (pkgCredits: number) => {
    setCredits(credits + pkgCredits);
    toast.success(`Successfully purchased ${pkgCredits.toLocaleString()} Credits!`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-3">
          <Coins className="w-3.5 h-3.5" />
          <span>Instant Balance Top-Up</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Purchase Credits</h1>
        <p className="mt-1 text-slate-400 text-sm">
          Top up your FundVerse credit balance to back breakthrough projects and receive creator rewards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CREDIT_PACKAGES.map((pkg) => (
          <div
            key={pkg.credits}
            className={`relative bg-slate-900/90 rounded-3xl p-6 border ${
              pkg.popular ? "border-amber-500 shadow-amber-500/10" : "border-slate-800"
            } shadow-xl flex flex-col justify-between space-y-6`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase">
                Most Popular
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Coins className="w-5 h-5" />
                <span className="text-2xl font-black">{pkg.credits.toLocaleString()}</span>
                <span className="text-xs font-bold">Credits</span>
              </div>
              <p className="text-3xl font-black text-white">{pkg.price}</p>
            </div>
            <button
              onClick={() => handlePurchase(pkg.credits)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Purchase Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
