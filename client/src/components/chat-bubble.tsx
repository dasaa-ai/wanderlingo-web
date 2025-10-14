import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface ChatBubbleProps {
  message: string;
  language: string;
  isUser?: boolean;
  timestamp?: string;
}

export function ChatBubble({ message, language, isUser = false, timestamp }: ChatBubbleProps) {
  const { toast } = useToast();

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser.",
      });
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(message);
      
      // Map language names to language codes
      const languageMap: Record<string, string> = {
        'English': 'en-US',
        'Spanish': 'es-ES',
        'French': 'fr-FR',
        'German': 'de-DE',
        'Italian': 'it-IT',
        'Portuguese': 'pt-PT',
        'Japanese': 'ja-JP',
        'Korean': 'ko-KR',
        'Chinese': 'zh-CN',
      };
      
      utterance.lang = languageMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech error:", error);
      toast({
        variant: "destructive",
        title: "Speech failed",
        description: "Unable to speak the text. Please try again.",
      });
    }
  };

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
            onClick={handleSpeak}
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
