import { LanguagePill } from "../language-pill";
import { ThemeProvider } from "../theme-provider";

export default function LanguagePillExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex gap-3 flex-wrap">
        <LanguagePill code="en" name="English" flag="🇬🇧" active />
        <LanguagePill code="es" name="Spanish" flag="🇪🇸" onClick={() => console.log("Spanish selected")} />
        <LanguagePill code="fr" name="French" flag="🇫🇷" onClick={() => console.log("French selected")} />
        <LanguagePill code="de" name="German" flag="🇩🇪" onClick={() => console.log("German selected")} />
      </div>
    </ThemeProvider>
  );
}
