import { PricingCard } from "./pricing-card";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out WanderLingo",
      features: [
        "3 camera translations per day",
        "20 chat messages per day",
        "Basic history (last 20 items)",
        "Standard support",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$4.99",
      period: "month",
      description: "Perfect for frequent travelers",
      features: [
        "Unlimited camera translations",
        "Unlimited chat messages",
        "Full library access with trips",
        "Offline mode with sync",
        "Priority support",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Lifetime",
      price: "$59",
      description: "One-time payment, yours forever",
      features: [
        "Everything in Pro",
        "Pay once, use forever",
        "Fair-use cap (1k images/month)",
        "Early access to new features",
        "VIP support",
      ],
      cta: "Buy Lifetime",
    },
  ];

  const handleSelectPlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <section className="py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold md:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your travel style. All plans include our core features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              onSelect={() => handleSelectPlan(plan.name)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include a 14-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
