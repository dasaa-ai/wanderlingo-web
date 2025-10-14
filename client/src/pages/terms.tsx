import { LandingHeader } from "@/components/landing-header";
import { Footer } from "@/components/footer";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using WanderLingo, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily use WanderLingo for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">3. Service Description</h2>
              <p className="text-muted-foreground">
                WanderLingo provides AI-powered translation services for travelers, including camera translation, chat interpretation, and translation library management.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">4. User Responsibilities</h2>
              <p className="text-muted-foreground">
                Users are responsible for maintaining the confidentiality of their account and for all activities that occur under their account.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">5. Limitations</h2>
              <p className="text-muted-foreground">
                WanderLingo shall not be held liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
