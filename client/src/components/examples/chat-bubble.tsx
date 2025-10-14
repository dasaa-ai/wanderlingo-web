import { ChatBubble } from "../chat-bubble";
import { ThemeProvider } from "../theme-provider";

export default function ChatBubbleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4 max-w-2xl">
        <ChatBubble
          message="Hello, where is the nearest restaurant?"
          language="English"
          isUser
          timestamp="2:45 PM"
        />
        <ChatBubble
          message="Bonjour, où se trouve le restaurant le plus proche?"
          language="French"
          timestamp="2:45 PM"
        />
      </div>
    </ThemeProvider>
  );
}
