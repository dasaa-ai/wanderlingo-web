import { Camera, Scan, Languages, Save } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Camera,
      title: "Capture",
      description: "Point your camera at any menu, sign, or document",
    },
    {
      icon: Scan,
      title: "Scan",
      description: "AI instantly recognizes and extracts text",
    },
    {
      icon: Languages,
      title: "Translate",
      description: "Get accurate translations with cultural context",
    },
    {
      icon: Save,
      title: "Save",
      description: "Store in your library for offline access",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold md:text-4xl mb-4">
            Translation made simple
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four easy steps to understand any language
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden lg:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                      <Icon className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-chart-2 text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
