import { Copy, Volume2, Save, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface TranslationResultProps {
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  notes?: string[];
  allergens?: string[];
  dietary?: string[];
  culturalTip?: string;
}

export function TranslationResult({
  original,
  translated,
  sourceLang,
  targetLang,
  notes,
  allergens,
  dietary,
  culturalTip,
}: TranslationResultProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{sourceLang}</p>
            <p className="text-lg">{original}</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-2">
            <p className="text-xs text-primary font-medium">{targetLang}</p>
            <p className="text-lg font-medium">{translated}</p>
          </div>
        </Card>
      </div>

      {(allergens?.length || dietary?.length || culturalTip) && (
        <div className="flex flex-wrap gap-2">
          {allergens?.map((allergen, i) => (
            <Badge key={i} variant="destructive" className="gap-1">
              ⚠️ {allergen}
            </Badge>
          ))}
          {dietary?.map((diet, i) => (
            <Badge key={i} className="bg-chart-2 hover:bg-chart-2 gap-1">
              🌱 {diet}
            </Badge>
          ))}
          {culturalTip && (
            <Badge variant="outline" className="gap-1">
              💡 {culturalTip}
            </Badge>
          )}
        </div>
      )}

      {notes && notes.length > 0 && (
        <Card className="p-4 bg-muted/30">
          <p className="text-sm font-medium mb-2">Notes</p>
          <ul className="space-y-1">
            {notes.map((note, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span>•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => console.log("Copy")} data-testid="button-copy">
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => console.log("Speak")} data-testid="button-speak">
          <Volume2 className="h-4 w-4" />
          Speak
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => console.log("Save")} data-testid="button-save">
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => console.log("Re-translate")} data-testid="button-retranslate">
          <RotateCcw className="h-4 w-4" />
          Re-translate
        </Button>
      </div>
    </div>
  );
}
