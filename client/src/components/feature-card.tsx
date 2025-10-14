import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export function FeatureCard({ icon: Icon, title, description, features }: FeatureCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-200">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 flex h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
