import { Camera, Upload, X, Zap, SwitchCamera } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [hasCamera, setHasCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);
      setHasCamera(false);
      
      // Try with specific facing mode first
      let constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      let stream: MediaStream;
      
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        // Fallback to any available camera if specific facingMode fails
        console.log("Specific camera failed, trying any camera...");
        constraints = {
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        const video = videoRef.current;
        
        const handleVideoReady = async () => {
          try {
            await video.play();
            setHasCamera(true);
            setIsLoading(false);
            console.log("Camera started successfully");
          } catch (err) {
            console.error("Video play error:", err);
            setCameraError("Unable to start video stream. Please use file upload instead.");
            setHasCamera(false);
            setIsLoading(false);
          }
        };

        // Check if metadata is already loaded
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          handleVideoReady();
        } else {
          video.onloadedmetadata = handleVideoReady;
        }
      } else {
        throw new Error("Video element not found");
      }
    } catch (error) {
      console.error("Camera access error:", error);
      setHasCamera(false);
      setIsLoading(false);
      
      if (error instanceof Error) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          setCameraError("Camera permission denied. Please allow camera access or use file upload instead.");
        } else if (error.name === "NotFoundError") {
          setCameraError("No camera found on this device. Please use file upload instead.");
        } else if (error.name === "NotReadableError") {
          setCameraError("Camera is in use by another application. Please close it and try again.");
        } else {
          setCameraError("Unable to access camera. Please use file upload instead.");
        }
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

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
    if (!videoRef.current || !canvasRef.current || !hasCamera) {
      toast({
        variant: "destructive",
        title: "Camera not available",
        description: "Please use the upload button to select an image instead.",
      });
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Check if video is ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast({
        variant: "destructive",
        title: "Camera not ready",
        description: "Please wait for the camera to load or use file upload.",
      });
      return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast({
        variant: "destructive",
        title: "Capture failed",
        description: "Unable to process camera image. Please try again.",
      });
      return;
    }

    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    console.log("Image captured successfully");
    
    stopCamera();
    onCapture(imageData);
  };

  const toggleCamera = async () => {
    stopCamera();
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-camera">
            <X className="h-5 w-5" />
          </Button>
          <span className="font-medium">Camera Translation</span>
          <div className="flex gap-2">
            {hasCamera && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCamera}
                  data-testid="button-switch-camera"
                >
                  <SwitchCamera className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFlashOn(!flashOn)}
                  className={flashOn ? "text-chart-3" : ""}
                  data-testid="button-flash"
                >
                  <Zap className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="relative flex-1 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${hasCamera ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {hasCamera && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative h-48 w-64">
                <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
              </div>
            </div>
          )}
          
          {!hasCamera && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Card className="p-8 max-w-md text-center space-y-4">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">
                    {isLoading ? "Loading Camera..." : cameraError ? "Camera Unavailable" : "Camera Ready"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isLoading 
                      ? "Requesting camera access..." 
                      : cameraError || "Camera is ready to use"}
                  </p>
                  {cameraError && (
                    <p className="text-sm font-medium text-primary mt-4">
                      Use the upload button below to select an image
                    </p>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 border-t p-6 bg-background">
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              data-testid="input-file-upload"
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
            disabled={!hasCamera || isLoading}
            data-testid="button-capture"
          >
            <Camera className="h-8 w-8" />
          </Button>

          <div className="h-12 w-12" />
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
