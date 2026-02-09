import type { Metadata } from "next";
import { CosmicBackground } from "@/components/celestial";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Aistrology",
  description:
    "Get in touch with the Aistrology team. We're here to help with any questions about your cosmic journey.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <CosmicBackground variant="default" showStars={true} className="absolute inset-0" />

      {/* Decorative elements */}
      <div className="absolute top-32 left-10 w-48 h-48 bg-[var(--celestial-violet)]/15 rounded-full blur-3xl animate-nebula-drift" />
      <div
        className="absolute bottom-32 right-10 w-36 h-36 bg-[var(--celestial-gold)]/20 rounded-full blur-3xl animate-nebula-drift"
        style={{ animationDelay: "-7s" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <p className="text-mystical text-xs tracking-[0.3em] text-(--celestial-gold)">Reach Out</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-lg text-foreground/85 max-w-2xl mx-auto">
            Have questions about your astrological journey? We&apos;re here to guide you through the stars.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="order-1 md:order-2 space-y-8">
            <div
              className="oracle-glass rounded-2xl p-6 space-y-6 animate-slide-in-bottom"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="font-display text-xl text-gradient-gold">Other Ways to Connect</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--celestial-gold)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--celestial-gold)]/20 transition-colors">
                    <Mail className="h-5 w-5 text-(--celestial-gold)" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">support@aistrology.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--celestial-gold)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--celestial-gold)]/20 transition-colors">
                    <Clock className="h-5 w-5 text-(--celestial-gold)" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Response Time</h3>
                    <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--celestial-gold)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--celestial-gold)]/20 transition-colors">
                    <MapPin className="h-5 w-5 text-(--celestial-gold)" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">Aligned with the cosmos, everywhere</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="oracle-glass rounded-2xl p-6 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display text-xl text-gradient-gold mb-4">Frequently Asked</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground text-sm">How accurate are the readings?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI combines traditional astrological wisdom with modern technology to provide personalized
                    insights based on your birth chart.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">Can I get a refund?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, we offer refunds within the first 7 days if you&apos;re not satisfied with your subscription.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
