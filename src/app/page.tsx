import Background from "@/components/landing_page/background";
import Hero from "@/components/landing_page/hero";
import SocialProof from "@/components/landing_page/socialproof";
import Features from "@/components/landing_page/features";
import HowItWorks from "@/components/landing_page/HowItWorks";
import CTA from "@/components/landing_page/cta";
import Footer from "@/components/landing_page/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Background />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
