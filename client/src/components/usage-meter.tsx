import { Progress } from "./ui/progress";

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
  variant?: "default" | "warning" | "danger";
}

export function UsageMeter({ label, used, limit, variant = "default" }: UsageMeterProps) {
  const percentage = (used / limit) * 100;
  
  const getColor = () => {
    if (variant === "danger" || percentage >= 90) return "bg-destructive";
    if (variant === "warning" || percentage >= 70) return "bg-chart-3";
    return "bg-chart-2";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {used} / {limit}
        </span>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <div 
          className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
