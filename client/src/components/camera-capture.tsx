import { Camera, Upload, X, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [flashOn, setFlashOn] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    console.log("Camera capture triggered");
    // TODO: Implement actual camera capture
    onCapture("mock-image-data");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-camera">
            <X className="h-5 w-5" />
          </Button>
          <span className="font-medium">Camera Translation</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlashOn(!flashOn)}
            className={flashOn ? "text-chart-3" : ""}
            data-testid="button-flash"
          >
            <Zap className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative flex-1 bg-muted/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="p-8 max-w-md mx-4 text-center space-y-4">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-semibold">Camera Preview</h3>
                <p className="text-sm text-muted-foreground">
                  In production, this will show your device camera feed
                </p>
              </div>
            </Card>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative h-48 w-64">
              <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t p-6">
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button variant="outline" size="icon" className="h-12 w-12" asChild data-testid="button-upload">
              <span className="cursor-pointer">
                <Upload className="h-6 w-6" />
              </span>
            </Button>
          </label>

          <Button
            size="icon"
            className="h-16 w-16 rounded-full"
            onClick={handleCapture}
            data-testid="button-capture"
          >
            <Camera className="h-8 w-8" />
          </Button>

          <div className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
}
