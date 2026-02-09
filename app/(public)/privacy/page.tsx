import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Aistrology",
  description:
    "Learn how Aistrology collects, uses, and protects your personal information. Our privacy policy explains our data practices for our AI-powered astrology service.",
  keywords: ["privacy policy", "data protection", "astrology privacy", "Aistrology privacy"],
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="text-xl text-foreground/85">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: January 10, 2026</p>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>We collect the following types of information to provide and improve our services:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Account Information:</strong> When you create an account, we
                  collect your email address and password (securely hashed).
                </li>
                <li>
                  <strong className="text-foreground">Birth Data:</strong> To generate your birth chart, we collect your
                  birth date, time, and location. This information is essential for astrological calculations.
                </li>
                <li>
                  <strong className="text-foreground">Chat Conversations:</strong> We store your conversations with our
                  AI astrologer to provide personalized readings and improve our service.
                </li>
                <li>
                  <strong className="text-foreground">Payment Information:</strong> Payment processing is handled
                  securely by Stripe. We do not store your credit card details on our servers.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>We use your information for the following purposes:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Generate Personalized Readings:</strong> Your birth data is used
                  to calculate your natal chart and provide accurate astrological interpretations.
                </li>
                <li>
                  <strong className="text-foreground">AI Consultations:</strong> Your conversation history helps our AI
                  provide contextually relevant and personalized astrological guidance.
                </li>
                <li>
                  <strong className="text-foreground">Process Payments:</strong> We use Stripe to securely process
                  subscription payments and manage billing.
                </li>
                <li>
                  <strong className="text-foreground">Improve Our Services:</strong> We analyze anonymized usage data to
                  enhance our features and user experience.
                </li>
                <li>
                  <strong className="text-foreground">Communication:</strong> We may send you service-related emails,
                  such as account verification, subscription updates, or important announcements.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Storage and Security */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>We take the security of your data seriously:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Secure Infrastructure:</strong> Your data is stored securely using
                  Supabase, which provides enterprise-grade security with encryption at rest and in transit.
                </li>
                <li>
                  <strong className="text-foreground">Payment Security:</strong> All payment information is processed
                  and stored by Stripe, a PCI-DSS compliant payment processor. We never have access to your full card
                  details.
                </li>
                <li>
                  <strong className="text-foreground">Access Controls:</strong> We implement strict access controls to
                  ensure only authorized personnel can access user data when necessary.
                </li>
                <li>
                  <strong className="text-foreground">Data Encryption:</strong> All data transmitted between your
                  browser and our servers is encrypted using TLS/SSL.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* AI-Generated Content */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">AI-Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>Our service uses artificial intelligence to provide astrological readings:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">OpenAI Technology:</strong> We use OpenAI&apos;s technology to
                  power our AI astrologer. Your conversations may be processed by OpenAI&apos;s systems to generate
                  responses.
                </li>
                <li>
                  <strong className="text-foreground">Anonymized Data:</strong> When we use conversation data to improve
                  our service, we anonymize and aggregate it to protect your privacy.
                </li>
                <li>
                  <strong className="text-foreground">No Third-Party Sharing:</strong> We do not sell or share your
                  personal birth data with third parties for marketing purposes.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Access:</strong> You can request a copy of all personal data we
                  hold about you.
                </li>
                <li>
                  <strong className="text-foreground">Correction:</strong> You can update or correct your personal
                  information through your account settings or by contacting us.
                </li>
                <li>
                  <strong className="text-foreground">Deletion:</strong> You can request deletion of your account and
                  all associated data. Please note this action is irreversible.
                </li>
                <li>
                  <strong className="text-foreground">Export:</strong> You can request an export of your data in a
                  portable format.
                </li>
                <li>
                  <strong className="text-foreground">Opt-Out:</strong> You can opt out of marketing communications at
                  any time while still receiving essential service notifications.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>We use cookies and similar technologies to enhance your experience:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Essential Cookies:</strong> Required for basic functionality like
                  authentication and session management.
                </li>
                <li>
                  <strong className="text-foreground">Analytics:</strong> We may use analytics tools to understand how
                  users interact with our service, helping us improve the user experience.
                </li>
                <li>
                  <strong className="text-foreground">Preferences:</strong> We store your preferences (such as theme
                  settings) to provide a consistent experience across sessions.
                </li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser. Note that disabling certain cookies may affect the
                functionality of our service.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/85">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
              <p className="text-foreground font-medium">
                <a href="mailto:privacy@aistrology.com" className="text-primary hover:underline">
                  privacy@aistrology.com
                </a>
              </p>
              <p>We will respond to your inquiry within 30 days.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
