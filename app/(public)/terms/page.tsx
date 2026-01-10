import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Aistrology",
  description:
    "Read the terms and conditions for using Aistrology, our AI-powered astrology service. Understand your rights and responsibilities as a user.",
  keywords: ["terms of service", "terms and conditions", "astrology terms", "Aistrology terms"],
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Terms of <span className="text-gradient-gold">Service</span>
          </h1>
          <p className="text-xl text-foreground/70">Please read these terms carefully before using our service.</p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: January 10, 2026</p>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>
                By accessing or using Aistrology (&quot;the Service&quot;), you agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use our Service.
              </p>
              <p>
                We reserve the right to update these terms at any time. Continued use of the Service after changes
                constitutes acceptance of the modified terms. We will notify users of significant changes via email or
                in-app notification.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>Aistrology provides the following services:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Birth Charts:</strong> Calculated natal charts based on your birth
                  date, time, and location, showing planetary positions and astrological houses.
                </li>
                <li>
                  <strong className="text-foreground">AI Consultations:</strong> Interactive conversations with our AI
                  astrologer powered by artificial intelligence to provide personalized astrological insights and
                  interpretations.
                </li>
                <li>
                  <strong className="text-foreground">Educational Content:</strong> Information about zodiac signs,
                  planets, houses, and astrological concepts to help you understand your chart.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Entertainment Purposes Disclaimer */}
          <Card className="bg-card/50 border-primary/30">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">
                Important: Entertainment Purposes Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p className="font-semibold text-foreground">
                All astrological readings and AI-generated content provided by Aistrology are for entertainment and
                informational purposes only.
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Not Professional Advice:</strong> Our Service does not provide
                  medical, legal, financial, psychological, or any other professional advice. Do not make important life
                  decisions based solely on astrological readings.
                </li>
                <li>
                  <strong className="text-foreground">No Guarantees:</strong> We make no claims about the accuracy,
                  reliability, or completeness of astrological interpretations. Astrology is not a science and results
                  are subjective.
                </li>
                <li>
                  <strong className="text-foreground">Seek Professional Help:</strong> If you are experiencing health,
                  mental health, financial, or legal issues, please consult with qualified professionals in those
                  fields.
                </li>
                <li>
                  <strong className="text-foreground">Personal Responsibility:</strong> You are solely responsible for
                  any decisions you make based on information obtained through our Service.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Subscription and Payments */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Subscription and Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>Our Service offers free and paid subscription tiers:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Payment Processing:</strong> All payments are processed securely
                  through Stripe. By subscribing, you agree to Stripe&apos;s terms of service.
                </li>
                <li>
                  <strong className="text-foreground">Recurring Billing:</strong> Paid subscriptions are billed on a
                  recurring basis (monthly or annually) until cancelled. You will be charged at the beginning of each
                  billing period.
                </li>
                <li>
                  <strong className="text-foreground">Cancellation:</strong> You may cancel your subscription at any
                  time through your account settings. Your access will continue until the end of the current billing
                  period, after which it will not renew.
                </li>
                <li>
                  <strong className="text-foreground">Refunds:</strong> We generally do not offer refunds for partial
                  subscription periods. If you believe you are entitled to a refund, please contact our support team.
                </li>
                <li>
                  <strong className="text-foreground">Price Changes:</strong> We reserve the right to change
                  subscription prices. Existing subscribers will be notified in advance of any price increases.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>When using our Service, you agree not to:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Illegal Activities:</strong> Use the Service for any unlawful
                  purpose or in violation of any applicable laws or regulations.
                </li>
                <li>
                  <strong className="text-foreground">Circumvent Limits:</strong> Attempt to bypass, circumvent, or
                  manipulate usage limits, rate limits, or other restrictions on your account.
                </li>
                <li>
                  <strong className="text-foreground">Share Accounts:</strong> Share your account credentials with
                  others or allow multiple people to use a single account. Each user must have their own account.
                </li>
                <li>
                  <strong className="text-foreground">Abuse the Service:</strong> Engage in any activity that disrupts,
                  damages, or impairs the Service or its infrastructure.
                </li>
                <li>
                  <strong className="text-foreground">Automated Access:</strong> Use bots, scrapers, or other automated
                  means to access the Service without our explicit permission.
                </li>
                <li>
                  <strong className="text-foreground">Harmful Content:</strong> Submit content that is abusive,
                  harassing, threatening, or otherwise objectionable through our chat features.
                </li>
              </ul>
              <p className="mt-4">Violation of these terms may result in suspension or termination of your account.</p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Our Content:</strong> All content, features, and functionality of
                  the Service (including but not limited to text, graphics, logos, and software) are owned by Aistrology
                  and are protected by intellectual property laws.
                </li>
                <li>
                  <strong className="text-foreground">Your Content:</strong> You retain ownership of any content you
                  submit (such as birth data). By using our Service, you grant us a license to use this information to
                  provide and improve our services.
                </li>
                <li>
                  <strong className="text-foreground">AI-Generated Content:</strong> Readings and interpretations
                  generated by our AI are provided for your personal use. You may not commercially redistribute
                  AI-generated content without permission.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>To the maximum extent permitted by law:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-foreground">No Warranties:</strong> The Service is provided &quot;as is&quot;
                  without warranties of any kind, either express or implied, including but not limited to implied
                  warranties of merchantability or fitness for a particular purpose.
                </li>
                <li>
                  <strong className="text-foreground">Limited Liability:</strong> Aistrology shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages arising from your use of the
                  Service.
                </li>
                <li>
                  <strong className="text-foreground">Maximum Liability:</strong> Our total liability shall not exceed
                  the amount you have paid us in the twelve (12) months preceding the claim.
                </li>
                <li>
                  <strong className="text-foreground">Third-Party Services:</strong> We are not responsible for any
                  third-party services, including but not limited to payment processors or AI providers.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>We may modify these Terms of Service at any time. When we make changes:</p>
              <ul className="space-y-3 list-disc list-inside">
                <li>We will update the &quot;Last updated&quot; date at the top of this page.</li>
                <li>For significant changes, we will notify you via email or through the Service.</li>
                <li>
                  Your continued use of the Service after changes become effective constitutes acceptance of the revised
                  terms.
                </li>
              </ul>
              <p className="mt-4">
                We encourage you to review these terms periodically to stay informed about your rights and obligations.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="text-foreground font-medium">
                <a href="mailto:support@aistrology.com" className="text-primary hover:underline">
                  support@aistrology.com
                </a>
              </p>
              <p>We will respond to your inquiry as soon as possible.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
