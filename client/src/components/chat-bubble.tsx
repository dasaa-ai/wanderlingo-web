import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";

interface ChatBubbleProps {
  message: string;
  language: string;
  isUser?: boolean;
  timestamp?: string;
}

export function ChatBubble({ message, language, isUser = false, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] space-y-1`}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{language}</span>
          {timestamp && <span>• {timestamp}</span>}
        </div>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border'
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => console.log("Speak:", message)}
            data-testid="button-speak-bubble"
          >
            <Volume2 className="h-3 w-3" />
            Speak
          </Button>
        )}
      </div>
    </div>
  );
}
