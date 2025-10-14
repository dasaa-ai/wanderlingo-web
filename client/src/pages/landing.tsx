import { LandingHeader } from "@/components/landing-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
