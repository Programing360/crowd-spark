import HeroSection from "@/src/components/home/HeroSection";
import TopFundedCampaigns from "@/src/components/home/TopFundedCampaigns";
import HowItWorksSection from "@/src/components/home/HowItWorksSection";
import CategoriesSection from "@/src/components/home/CategoriesSection";
import PlatformImpactSection from "@/src/components/home/PlatformImpactSection";
import TestimonialsSection from "@/src/components/home/TestimonialsSection";
import CtaBannerSection from "@/src/components/home/CtaBannerSection";

export const metadata = {
  title: "FundVerse | Empowering Visionary Ideas Through Transparent Crowdfunding",
  description:
    "FundVerse is the premier crowdfunding platform powering tech innovations, creative arts, community initiatives, and wellness breakthroughs with transparent credit backing.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* 1. Hero Section (Banner Slider / Carousel) */}
      <HeroSection />

      {/* 2. Top Funded Campaigns Section */}
      <TopFundedCampaigns />

      {/* 3. Custom Extra Section A: How It Works */}
      <HowItWorksSection />

      {/* 4. Custom Extra Section B: Explore by Category */}
      <CategoriesSection />

      {/* 5. Custom Extra Section C: Platform Impact in Numbers */}
      <PlatformImpactSection />

      {/* 6. Testimonial Section (Swiper Card Slider) */}
      <TestimonialsSection />

      {/* 7. Final Call to Action Banner */}
      <CtaBannerSection />
    </div>
  );
}
