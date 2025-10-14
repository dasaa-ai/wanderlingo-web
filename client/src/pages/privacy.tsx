import { LandingHeader } from "@/components/landing-header";
import { Footer } from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, use our translation services, or communicate with us.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, process translations, and communicate with you.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">3. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">4. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mb-4">6. GDPR Compliance</h2>
              <p className="text-muted-foreground">
                WanderLingo is committed to GDPR compliance. We process personal data lawfully, fairly, and transparently.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
