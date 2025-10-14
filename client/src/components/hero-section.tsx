import { ArrowRight, Camera, MessageCircle, Library } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10" />
      
      <div className="container relative mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 w-fit">
              <span className="text-sm font-medium text-primary">✨ AI-Powered Translation</span>
            </div>
            
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              See, say, and save any language—
              <span className="text-primary">on the go</span>
            </h1>
            
            <p className="text-lg text-muted-foreground md:text-xl">
              Instantly translate menus, signs, and documents with your camera. 
              Chat in any language. Save everything for offline access.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild data-testid="button-hero-start">
                <Link href="/app">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-demo">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Camera Translation</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Live Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Library className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Smart Library</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:ml-auto">
            <div className="relative aspect-[9/16] max-w-[300px] mx-auto lg:max-w-[350px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-chart-2/20 blur-3xl" />
              <div className="relative rounded-3xl border-8 border-foreground/10 bg-background p-2 shadow-2xl">
                <div className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-6 flex flex-col items-center justify-center gap-4">
                  <div className="rounded-2xl bg-card border p-4 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Camera className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Camera Translation</span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-xs text-muted-foreground">Original</p>
                        <p className="text-sm">Menu du jour</p>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-2">
                        <p className="text-xs text-primary">Translated</p>
                        <p className="text-sm font-medium">Menu of the day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
