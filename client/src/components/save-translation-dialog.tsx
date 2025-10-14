import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SaveTranslationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translationData: {
    original: string;
    translated: string;
    sourceLang: string;
    targetLang: string;
    allergens?: string[];
    dietary?: string[];
    culturalTip?: string;
  };
  type: "camera" | "chat";
  onSave: (data: { tags: string[]; notes: string }) => Promise<void>;
}

export function SaveTranslationDialog({
  open,
  onOpenChange,
  translationData,
  type,
  onSave,
}: SaveTranslationDialogProps) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when dialog closes without saving
  useEffect(() => {
    if (!open && !isSaving) {
      setTagInput("");
      setTags([]);
      setNotes("");
    }
  }, [open, isSaving]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ tags, notes });
      // Reset form
      setTags([]);
      setNotes("");
      setTagInput("");
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Save Translation to Library</DialogTitle>
          <DialogDescription>
            Add tags and notes to organize this translation in your library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Translation Preview */}
          <div className="space-y-2">
            <Label>Translation</Label>
            <div className="rounded-lg border p-3 space-y-2 bg-muted/30">
              <div>
                <span className="text-xs text-muted-foreground">{translationData.sourceLang}</span>
                <p className="text-sm mt-1">{translationData.original}</p>
              </div>
              <div className="border-t pt-2">
                <span className="text-xs text-muted-foreground">{translationData.targetLang}</span>
                <p className="text-sm mt-1 font-medium">{translationData.translated}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag (e.g., food, directions, emergency)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                data-testid="input-tag"
              />
              <Button onClick={addTag} variant="outline" data-testid="button-add-tag">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1" data-testid={`tag-${tag}`}>
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                      data-testid={`button-remove-tag-${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or context about this translation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              data-testid="textarea-notes"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} data-testid="button-save-translation">
            {isSaving ? "Saving..." : "Save to Library"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
