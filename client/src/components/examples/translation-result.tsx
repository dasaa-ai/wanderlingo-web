import { TranslationResult } from "../translation-result";
import { ThemeProvider } from "../theme-provider";

export default function TranslationResultExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-4xl">
        <TranslationResult
          original="Poulet rôti avec légumes de saison"
          translated="Roasted chicken with seasonal vegetables"
          sourceLang="French"
          targetLang="English"
          allergens={["Gluten"]}
          dietary={["Contains meat"]}
          culturalTip="Traditional French preparation"
          notes={[
            "Popular dish in French bistros",
            "Typically served with wine sauce",
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
