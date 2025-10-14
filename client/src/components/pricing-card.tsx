import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  onSelect: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  cta,
  onSelect,
}: PricingCardProps) {
  return (
    <Card className={`relative p-6 ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-heading text-2xl font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
        
        <Button 
          className="w-full" 
          variant={popular ? "default" : "outline"}
          onClick={onSelect}
          data-testid={`button-select-${name.toLowerCase()}`}
        >
          {cta}
        </Button>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
