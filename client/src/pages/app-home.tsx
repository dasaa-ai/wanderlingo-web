import { useState } from "react";
import { Camera, MessageCircle, Library as LibraryIcon, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { CameraCapture } from "@/components/camera-capture";
import { TranslationResult } from "@/components/translation-result";
import { ChatBubble } from "@/components/chat-bubble";
import { LibraryItem } from "@/components/library-item";
import { LanguagePill } from "@/components/language-pill";
import { UsageMeter } from "@/components/usage-meter";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AppHome() {
  const [activeTab, setActiveTab] = useState("camera");
  const [showCamera, setShowCamera] = useState(false);
  const [translationResult, setTranslationResult] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { message: "Hello, where is the nearest restaurant?", language: "English", isUser: true, timestamp: "2:45 PM" },
    { message: "Bonjour, où se trouve le restaurant le plus proche?", language: "French", isUser: false, timestamp: "2:45 PM" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();

  const handleCapture = async (imageData: string) => {
    console.log("Image captured:", imageData);
    setShowCamera(false);
    setIsTranslating(true);
    setTranslationResult(null);

    try {
      const response = await apiRequest("POST", "/api/translate-image", {
        image: imageData,
        targetLanguage: "English"
      });

      const result = await response.json();
      setTranslationResult(result);
      toast({
        title: "Translation complete!",
        description: "Your image has been translated successfully.",
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: "Translation failed",
        description: error instanceof Error ? error.message : "Failed to translate image. Please try again.",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // TODO: remove mock functionality
    setChatMessages([
      ...chatMessages,
      { message: inputMessage, language: "English", isUser: true, timestamp: "Now" },
      { message: "Translation would appear here", language: "Spanish", isUser: false, timestamp: "Now" },
    ]);
    setInputMessage("");
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">W</span>
          </div>
          <span className="font-heading text-lg font-bold">WanderLingo</span>
        </div>
        <ThemeToggle />
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4 gap-2">
          <TabsTrigger value="camera" className="gap-2" data-testid="tab-camera">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Camera</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2" data-testid="tab-chat">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2" data-testid="tab-library">
            <LibraryIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2" data-testid="tab-account">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          <TabsContent value="camera" className="m-0 h-full p-4">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <LanguagePill code="fr" name="French" flag="🇫🇷" active />
                  <span className="text-muted-foreground">→</span>
                  <LanguagePill code="en" name="English" flag="🇬🇧" />
                </div>
              </div>

              {isTranslating ? (
                <Card className="p-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Translating...
                  </h3>
                  <p className="text-muted-foreground">
                    Extracting text and analyzing your image
                  </p>
                </Card>
              ) : !translationResult ? (
                <Card className="p-12 text-center">
                  <Camera className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Translate any menu, sign, or document
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Point your camera or upload an image to get started
                  </p>
                  <Button size="lg" onClick={() => setShowCamera(true)} data-testid="button-open-camera">
                    Open Camera
                  </Button>
                </Card>
              ) : (
                <TranslationResult {...translationResult} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="m-0 h-full flex flex-col">
            <div className="flex-1 overflow-auto p-4">
              <div className="mx-auto max-w-4xl space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <LanguagePill code="en" name="English" flag="🇬🇧" active />
                  <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-swap-languages">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <LanguagePill code="es" name="Spanish" flag="🇪🇸" />
                </div>

                <div className="space-y-4">
                  {chatMessages.map((msg, i) => (
                    <ChatBubble key={i} {...msg} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <div className="mx-auto max-w-4xl flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  data-testid="input-chat-message"
                />
                <Button onClick={handleSendMessage} data-testid="button-send-message">
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="m-0 h-full p-4">
            <div className="mx-auto max-w-6xl space-y-4">
              <Input placeholder="Search translations..." data-testid="input-search-library" />
              
              <div className="space-y-3">
                {/* TODO: remove mock functionality */}
                <LibraryItem
                  type="image"
                  sourcePreview="Menu du jour"
                  translated="Menu of the day"
                  sourceLang="French"
                  targetLang="English"
                  tags={["Paris", "Restaurant"]}
                  timestamp="2 hours ago"
                />
                <LibraryItem
                  type="chat"
                  sourcePreview="Where is the train station?"
                  translated="¿Dónde está la estación de tren?"
                  sourceLang="English"
                  targetLang="Spanish"
                  tags={["Travel"]}
                  timestamp="Yesterday"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="m-0 h-full p-4">
            <div className="mx-auto max-w-2xl space-y-6">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Usage Limits</h3>
                <div className="space-y-4">
                  <UsageMeter label="Camera Translations Today" used={2} limit={3} variant="warning" />
                  <UsageMeter label="Chat Messages Today" used={15} limit={20} />
                </div>
                <Button className="w-full mt-6" data-testid="button-upgrade">
                  Upgrade to Pro
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Language Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Home Language</label>
                    <LanguagePill code="en" name="English" flag="🇬🇧" active />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Target Languages</label>
                    <div className="flex flex-wrap gap-2">
                      <LanguagePill code="es" name="Spanish" flag="🇪🇸" />
                      <LanguagePill code="fr" name="French" flag="🇫🇷" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
