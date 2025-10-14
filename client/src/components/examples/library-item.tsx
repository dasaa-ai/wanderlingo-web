import { LibraryItem } from "../library-item";
import { ThemeProvider } from "../theme-provider";

export default function LibraryItemExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-3 max-w-2xl">
        <LibraryItem
          type="image"
          sourcePreview="Menu du jour"
          translated="Menu of the day"
          sourceLang="French"
          targetLang="English"
          tags={["Paris", "Restaurant"]}
          timestamp="2 hours ago"
          onClick={() => console.log("Library item clicked")}
        />
        <LibraryItem
          type="chat"
          sourcePreview="Where is the train station?"
          translated="¿Dónde está la estación de tren?"
          sourceLang="English"
          targetLang="Spanish"
          tags={["Travel"]}
          timestamp="Yesterday"
          onClick={() => console.log("Library item clicked")}
        />
      </div>
    </ThemeProvider>
  );
}
