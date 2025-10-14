import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">W</span>
              </div>
              <span className="font-heading text-xl font-bold">WanderLingo</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild data-testid="link-features">
              <a href="#features">Features</a>
            </Button>
            <Button variant="ghost" asChild data-testid="link-how-it-works">
              <a href="#how-it-works">How It Works</a>
            </Button>
            <Button variant="ghost" asChild data-testid="link-pricing">
              <Link href="/pricing">Pricing</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" className="hidden md:flex" asChild data-testid="button-login">
              <Link href="/app">Log In</Link>
            </Button>
            <Button className="hidden md:flex" asChild data-testid="button-get-started">
              <Link href="/app">Get Started</Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t md:hidden">
            <nav className="flex flex-col gap-2 p-4">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#features">Features</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#how-it-works">How It Works</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <div className="mt-2 flex flex-col gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/app">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/app">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
