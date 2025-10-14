import { LandingHeader } from "@/components/landing-header";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Pricing() {
  const faqs = [
    {
      question: "Can I try WanderLingo for free?",
      answer: "Yes! Our free plan includes 3 camera translations and 20 chat messages per day. You can upgrade anytime to unlock unlimited access.",
    },
    {
      question: "What happens if I exceed my free tier limits?",
      answer: "You'll see a friendly prompt to upgrade to Pro. Your existing translations remain accessible in your library.",
    },
    {
      question: "Is there a refund policy?",
      answer: "Absolutely! All paid plans come with a 14-day money-back guarantee. If you're not satisfied, we'll refund you in full.",
    },
    {
      question: "Does offline mode work on all plans?",
      answer: "Offline mode is available exclusively on Pro and Lifetime plans. Your library items sync automatically when you're back online.",
    },
    {
      question: "How does the Lifetime plan work?",
      answer: "Pay once ($59) and use WanderLingo forever! The fair-use cap of 1,000 images per month ensures quality service for everyone.",
    },
  ];

  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="py-12">
        <PricingSection />
        
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              All plans include
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mt-8 text-left">
              {[
                "100+ language support",
                "AI-powered translations",
                "Cultural context & tips",
                "Mobile-optimized interface",
                "Secure, encrypted storage",
                "Regular feature updates",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
