import { UsageMeter } from "../usage-meter";
import { ThemeProvider } from "../theme-provider";

export default function UsageMeterExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-6 max-w-md">
        <UsageMeter label="Camera Translations" used={2} limit={3} />
        <UsageMeter label="Chat Messages" used={15} limit={20} variant="warning" />
        <UsageMeter label="Storage Used" used={95} limit={100} variant="danger" />
      </div>
    </ThemeProvider>
  );
}
