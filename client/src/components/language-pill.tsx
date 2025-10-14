import { Badge } from "./ui/badge";

interface LanguagePillProps {
  code: string;
  name: string;
  flag?: string;
  active?: boolean;
  onClick?: () => void;
}

export function LanguagePill({ code, name, flag, active = false, onClick }: LanguagePillProps) {
  return (
    <Badge
      variant={active ? "default" : "outline"}
      className={`cursor-pointer gap-2 px-3 py-1.5 ${onClick ? 'hover-elevate' : ''}`}
      onClick={onClick}
      data-testid={`language-pill-${code}`}
    >
      {flag && <span className="text-base">{flag}</span>}
      <span className="font-medium">{name}</span>
    </Badge>
  );
}
