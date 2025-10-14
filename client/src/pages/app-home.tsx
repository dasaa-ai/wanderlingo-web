import { useState, useEffect } from "react";
import { Camera, MessageCircle, Library as LibraryIcon, User, ArrowRight, Trash2 } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Translation } from "@shared/schema";

export default function AppHome() {
  const [activeTab, setActiveTab] = useState("camera");
  const [showCamera, setShowCamera] = useState(false);
  const [translationResult, setTranslationResult] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatSourceLang, setChatSourceLang] = useState("English");
  const [chatTargetLang, setChatTargetLang] = useState("Spanish");
  const [isTranslatingChat, setIsTranslatingChat] = useState(false);
  const [libraryTranslations, setLibraryTranslations] = useState<Translation[]>([]);
  const [librarySearch, setLibrarySearch] = useState("");
  const [usageStats, setUsageStats] = useState({ cameraTranslations: 0, chatMessages: 0 });
  const { toast } = useToast();

  // Fetch library translations on mount and tab change
  useEffect(() => {
    if (activeTab === "library") {
      fetchLibraryTranslations();
    }
  }, [activeTab]);

  // Fetch usage stats on account tab
  useEffect(() => {
    if (activeTab === "account") {
      fetchUsageStats();
    }
  }, [activeTab]);

  const fetchLibraryTranslations = async () => {
    try {
      const response = await apiRequest("GET", "/api/translations");
      const data = await response.json();
      setLibraryTranslations(data);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  const fetchUsageStats = async () => {
    try {
      const response = await apiRequest("GET", "/api/usage");
      const data = await response.json();
      setUsageStats(data);
    } catch (error) {
      console.error("Error fetching usage:", error);
    }
  };

  const saveToLibrary = async (translationData: any, type: "camera" | "chat") => {
    try {
      await apiRequest("POST", "/api/translations", {
        type,
        originalText: translationData.original,
        translatedText: translationData.translated,
        sourceLang: translationData.sourceLang,
        targetLang: translationData.targetLang,
        allergens: translationData.allergens || [],
        dietary: translationData.dietary || [],
        culturalTip: translationData.culturalTip || "",
        tags: [],
      });
    } catch (error) {
      console.error("Error saving to library:", error);
    }
  };

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
      
      // Save to library
      await saveToLibrary(result, "camera");
      
      // Refresh usage stats
      await fetchUsageStats();
      
      toast({
        title: "Translation complete!",
        description: "Your image has been translated successfully.",
      });
    } catch (error) {
      console.error("Translation error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to translate image";
      
      // Extract user-friendly error message from API response
      let description = errorMessage;
      const statusMatch = errorMessage.match(/(\d{3}):\s*({.*})/);
      
      if (statusMatch) {
        // Server returned JSON error (e.g., "400: {...}" or "500: {...}")
        try {
          const errorData = JSON.parse(statusMatch[2]);
          description = errorData.error || errorData.message || description;
        } catch (e) {
          // If JSON parsing fails, use the original error message
          description = errorMessage.replace(/^\d{3}:\s*/, ''); // Remove status code prefix
        }
      } else if (errorMessage.toLowerCase().includes('fetch') || errorMessage.toLowerCase().includes('network')) {
        // Network error
        description = "Please check your internet connection and try again.";
      }
      
      toast({
        variant: "destructive",
        title: "Translation failed",
        description,
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTranslatingChat) return;
    
    const userMessage = inputMessage;
    setInputMessage("");
    setIsTranslatingChat(true);

    // Add user message to chat
    const newUserMessage = { 
      message: userMessage, 
      language: chatSourceLang, 
      isUser: true, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newUserMessage]);

    try {
      const response = await apiRequest("POST", "/api/translate-text", {
        text: userMessage,
        sourceLang: chatSourceLang,
        targetLang: chatTargetLang,
      });

      const result = await response.json();
      
      // Save to library
      await saveToLibrary(result, "chat");
      
      // Refresh usage stats
      await fetchUsageStats();

      // Add translated message to chat
      const translatedMessage = {
        message: result.translated,
        language: chatTargetLang,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, translatedMessage]);
    } catch (error) {
      console.error("Chat translation error:", error);
      toast({
        variant: "destructive",
        title: "Translation failed",
        description: "Unable to translate your message. Please try again.",
      });
    } finally {
      setIsTranslatingChat(false);
    }
  };

  const swapLanguages = () => {
    const temp = chatSourceLang;
    setChatSourceLang(chatTargetLang);
    setChatTargetLang(temp);
  };

  const deleteTranslation = async (id: string) => {
    try {
      await apiRequest("DELETE", `/api/translations/${id}`);
      setLibraryTranslations(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Translation deleted",
        description: "The translation has been removed from your library.",
      });
    } catch (error) {
      console.error("Error deleting translation:", error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Unable to delete the translation. Please try again.",
      });
    }
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold">Translation Result</h3>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setTranslationResult(null);
                        setShowCamera(true);
                      }} 
                      data-testid="button-new-translation"
                    >
                      New Translation
                    </Button>
                  </div>
                  <TranslationResult {...translationResult} />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="m-0 h-full flex flex-col">
            <div className="flex-1 overflow-auto p-4">
              <div className="mx-auto max-w-4xl space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Select value={chatSourceLang} onValueChange={setChatSourceLang}>
                    <SelectTrigger className="w-[140px]" data-testid="select-source-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={swapLanguages}
                    data-testid="button-swap-languages"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Select value={chatTargetLang} onValueChange={setChatTargetLang}>
                    <SelectTrigger className="w-[140px]" data-testid="select-target-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {chatMessages.length === 0 ? (
                  <Card className="p-12 text-center">
                    <MessageCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-muted-foreground">
                      Type a message below to get instant translation
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((msg, i) => (
                      <ChatBubble key={i} {...msg} />
                    ))}
                    {isTranslatingChat && (
                      <div className="flex justify-start">
                        <div className="bg-muted px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm text-muted-foreground">Translating...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t p-4">
              <div className="mx-auto max-w-4xl flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  disabled={isTranslatingChat}
                  data-testid="input-chat-message"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim() || isTranslatingChat}
                  data-testid="button-send-message"
                >
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="m-0 h-full p-4">
            <div className="mx-auto max-w-6xl space-y-4">
              <Input 
                placeholder="Search translations..." 
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                data-testid="input-search-library" 
              />
              
              <div className="space-y-3">
                {libraryTranslations.length === 0 ? (
                  <Card className="p-12 text-center">
                    <LibraryIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      No saved translations yet
                    </h3>
                    <p className="text-muted-foreground">
                      Your camera and chat translations will appear here
                    </p>
                  </Card>
                ) : (
                  libraryTranslations
                    .filter(t => 
                      !librarySearch || 
                      t.originalText.toLowerCase().includes(librarySearch.toLowerCase()) ||
                      t.translatedText.toLowerCase().includes(librarySearch.toLowerCase())
                    )
                    .map((translation) => (
                      <div key={translation.id} className="relative group">
                        <LibraryItem
                          type={translation.type === "camera" ? "image" : "chat"}
                          sourcePreview={translation.originalText}
                          translated={translation.translatedText}
                          sourceLang={translation.sourceLang}
                          targetLang={translation.targetLang}
                          tags={translation.tags || []}
                          timestamp={new Date(translation.createdAt).toLocaleDateString()}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteTranslation(translation.id)}
                          data-testid={`button-delete-${translation.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="m-0 h-full p-4">
            <div className="mx-auto max-w-2xl space-y-6">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Usage Today</h3>
                <div className="space-y-4">
                  <UsageMeter 
                    label="Camera Translations" 
                    used={usageStats.cameraTranslations} 
                    limit={100} 
                    variant={usageStats.cameraTranslations > 80 ? "warning" : undefined}
                  />
                  <UsageMeter 
                    label="Chat Messages" 
                    used={usageStats.chatMessages} 
                    limit={100}
                    variant={usageStats.chatMessages > 80 ? "warning" : undefined}
                  />
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Free Plan</span> • Limited to 100 translations per day
                  </p>
                  <Button className="w-full mt-4" data-testid="button-upgrade">
                    Upgrade to Lifetime ($89)
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Language Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Chat Languages</label>
                    <div className="flex items-center gap-2">
                      <LanguagePill code="en" name={chatSourceLang} flag="🇬🇧" active />
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <LanguagePill code="es" name={chatTargetLang} flag="🇪🇸" />
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
