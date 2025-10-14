import { PricingCard } from "../pricing-card";
import { ThemeProvider } from "../theme-provider";

export default function PricingCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <PricingCard
          name="Pro"
          price="$4.99"
          period="month"
          description="Perfect for frequent travelers"
          features={[
            "Unlimited camera translations",
            "Unlimited chat messages",
            "Full library access with trips",
            "Offline mode with sync",
            "Priority support",
          ]}
          popular={true}
          cta="Start Free Trial"
          onSelect={() => console.log("Pro plan selected")}
        />
      </div>
    </ThemeProvider>
  );
}
