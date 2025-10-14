import { Image, MessageCircle, FileText, MoreVertical } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface LibraryItemProps {
  type: "image" | "text" | "chat";
  sourcePreview: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  tags?: string[];
  timestamp: string;
  onClick?: () => void;
}

export function LibraryItem({
  type,
  sourcePreview,
  translated,
  sourceLang,
  targetLang,
  tags,
  timestamp,
  onClick,
}: LibraryItemProps) {
  const getIcon = () => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "chat": return <MessageCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card 
      className="p-4 hover-elevate cursor-pointer transition-all" 
      onClick={onClick}
      data-testid="library-item"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{sourcePreview}</p>
              <p className="text-sm text-muted-foreground truncate">{translated}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log("More options");
              }}
              data-testid="button-library-more"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {sourceLang} → {targetLang}
            </span>
            <span className="text-xs text-muted-foreground">• {timestamp}</span>
            {tags?.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
