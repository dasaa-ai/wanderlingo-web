import { LandingHeader } from "../landing-header";
import { ThemeProvider } from "../theme-provider";

export default function LandingHeaderExample() {
  return (
    <ThemeProvider>
      <LandingHeader />
    </ThemeProvider>
  );
}
