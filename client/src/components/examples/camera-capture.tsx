import { CameraCapture } from "../camera-capture";
import { ThemeProvider } from "../theme-provider";

export default function CameraCaptureExample() {
  return (
    <ThemeProvider>
      <CameraCapture
        onCapture={(imageData) => console.log("Image captured:", imageData)}
        onClose={() => console.log("Camera closed")}
      />
    </ThemeProvider>
  );
}
