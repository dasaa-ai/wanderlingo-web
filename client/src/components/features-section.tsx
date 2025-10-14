import { Camera, MessageCircle, Library, Globe, Shield, Zap } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  const features = [
    {
      icon: Camera,
      title: "Camera Translation",
      description: "Point your camera at any menu, sign, or document for instant translation",
      features: [
        "Real-time OCR technology",
        "Works with 100+ languages",
        "Allergen and dietary detection",
      ],
    },
    {
      icon: MessageCircle,
      title: "Travel Chat",
      description: "Two-way interpreter mode for seamless conversations in any language",
      features: [
        "Auto-detect source language",
        "Voice input and output",
        "Save conversation history",
      ],
    },
    {
      icon: Library,
      title: "Smart Library",
      description: "All your translations saved, organized, and searchable",
      features: [
        "Full-text search across translations",
        "Organize by trips and tags",
        "Works offline with sync",
      ],
    },
    {
      icon: Globe,
      title: "100+ Languages",
      description: "Comprehensive language support for travelers worldwide",
      features: [
        "Major world languages",
        "Regional dialects",
        "Cultural context included",
      ],
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your translations stay secure with end-to-end protection",
      features: [
        "Encrypted storage",
        "No data sharing",
        "GDPR compliant",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get translations in seconds, even on slow connections",
      features: [
        "Optimized AI models",
        "Local OCR processing",
        "Offline capability",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold md:text-4xl mb-4">
            Everything you need for confident travel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From menu translations to real-time conversations, WanderLingo has you covered
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
