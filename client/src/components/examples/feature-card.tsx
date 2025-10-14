import { Camera } from "lucide-react";
import { FeatureCard } from "../feature-card";
import { ThemeProvider } from "../theme-provider";

export default function FeatureCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <FeatureCard
          icon={Camera}
          title="Camera Translation"
          description="Point your camera at any menu, sign, or document for instant translation"
          features={[
            "Real-time OCR technology",
            "Works with 100+ languages",
            "Allergen and dietary detection",
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
