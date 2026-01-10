import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Star, ArrowRight, Telescope, BookOpen, MessageCircle, Orbit, Compass } from "lucide-react";
import type { Metadata } from "next";
import { CosmicBackground, ZodiacWheel } from "@/components/celestial";
import { ZodiacIcon, ZodiacSignKey } from "@/components/icons/zodiac-icons";

export const metadata: Metadata = {
  title: "Aistrology - AI-Powered Astrology | Discover Your Cosmic Blueprint",
  description:
    "Get personalized birth chart readings powered by AI. Discover your cosmic destiny through detailed zodiac analysis, house interpretations, and planetary insights. Start your celestial journey today.",
  keywords: ["astrology", "birth chart", "horoscope", "zodiac", "AI astrology", "natal chart", "personalized reading"],
  openGraph: {
    title: "Aistrology - AI-Powered Astrology",
    description: "Get personalized birth chart readings powered by AI. Discover your cosmic destiny.",
    type: "website",
  },
};

const features = [
  {
    icon: Telescope,
    title: "AI-Powered Readings",
    description:
      "Our advanced AI interprets your birth chart with remarkable depth and accuracy, providing personalized insights tailored to your unique celestial blueprint.",
    gradient: "from-[var(--celestial-gold)] to-[var(--celestial-copper)]",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Analysis",
    description:
      "Explore all 12 houses, planetary positions, and aspects in your chart. Understand how cosmic forces shape your personality, relationships, and life path.",
    gradient: "from-[var(--celestial-violet)] to-[var(--celestial-teal)]",
  },
  {
    icon: MessageCircle,
    title: "Interactive Consultations",
    description:
      "Ask questions and receive instant, personalized guidance from our AI astrologer. Dive deeper into any aspect of your chart that intrigues you.",
    gradient: "from-[var(--celestial-rose)] to-[var(--celestial-violet)]",
  },
];

const zodiacSigns = [
  { name: "Aries", element: "Fire", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { name: "Taurus", element: "Earth", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Gemini", element: "Air", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
  { name: "Cancer", element: "Water", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "Leo", element: "Fire", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { name: "Virgo", element: "Earth", color: "bg-lime-500/20 text-lime-400 border-lime-500/30" },
  { name: "Libra", element: "Air", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  { name: "Scorpio", element: "Water", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "Sagittarius", element: "Fire", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { name: "Capricorn", element: "Earth", color: "bg-stone-500/20 text-stone-400 border-stone-500/30" },
  { name: "Aquarius", element: "Air", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { name: "Pisces", element: "Water", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
];

const knowledgeCards = [
  {
    href: "/zodiac",
    icon: Star,
    title: "Zodiac Signs",
    description: "Explore all 12 zodiac signs, their elements, qualities, and unique characteristics.",
  },
  {
    href: "/houses",
    icon: Compass,
    title: "Astrological Houses",
    description: "Learn about the 12 houses and how they influence different areas of your life.",
  },
  {
    href: "/planets",
    icon: Orbit,
    title: "Celestial Bodies",
    description: "Discover the meaning of planets and how their positions shape your destiny.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <CosmicBackground
          variant="hero"
          showStars={true}
          showAurora={true}
          interactive={true}
          className="absolute inset-0"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Main heading */}
            <div className="space-y-4 animate-fade-in">
              <p className="text-mystical text-sm tracking-[0.3em] text-(--celestial-gold) opacity-80">Welcome to</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-gradient-gold">Celestial</span>
                <br />
                <span className="text-foreground">Insights</span>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="text-xl md:text-2xl lg:text-3xl text-foreground/80 max-w-3xl mx-auto font-serif italic leading-relaxed animate-slide-in-bottom"
              style={{ animationDelay: "0.2s" }}
            >
              Unlock the secrets of the cosmos with AI-powered birth chart readings.
              <br className="hidden md:block" />
              Your personalized celestial guide awaits.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-in-bottom"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gradient-gold text-primary-foreground text-lg px-10 py-7 rounded-xl zodiac-glow hover-lift group"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/zodiac">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 rounded-xl zodiac-border hover-glow backdrop-blur-soft"
                >
                  Explore the Zodiac
                </Button>
              </Link>
            </div>

            {/* Trust indicator */}
            <p className="text-sm text-muted-foreground pt-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Sparkles className="inline-block h-4 w-4 mr-1 text-(--celestial-gold)" />
              Join thousands of seekers discovering their cosmic path
            </p>
          </div>
        </div>
      </section>

      {/* Zodiac Wheel Showcase */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-cosmic opacity-50" />
        <div className="absolute inset-0 constellation-bg opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-mystical text-xs tracking-[0.3em] text-(--celestial-violet)">
                  Ancient Wisdom, Modern Technology
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold">
                  The Twelve Signs of the <span className="text-gradient-gold">Zodiac</span>
                </h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Each zodiac sign carries unique energy and characteristics that influence your personality,
                relationships, and life path. Discover what the stars reveal about your true nature.
              </p>

              {/* Zodiac grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-4">
                {zodiacSigns.map((sign, index) => (
                  <Link
                    key={sign.name}
                    href={`/zodiac/${sign.name.toLowerCase()}`}
                    className="group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={`
                        aspect-square rounded-xl border backdrop-blur-soft
                        flex flex-col items-center justify-center gap-1 p-2
                        transition-all duration-300 hover-lift hover-glow
                        ${sign.color}
                      `}
                    >
                      <ZodiacIcon
                        sign={sign.name.toLowerCase() as ZodiacSignKey}
                        size={24}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-[10px] font-medium opacity-80 hidden sm:block">{sign.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Zodiac Wheel */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[var(--celestial-gold)]/20 rounded-full blur-3xl scale-110" />
                <ZodiacWheel size="xl" animated={true} showSymbols={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 star-field-subtle opacity-40" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <p className="text-mystical text-xs tracking-[0.3em] text-(--celestial-gold)">What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Why Choose <span className="text-gradient-gold">Aistrology</span>?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Our AI-powered platform combines ancient astrological wisdom with modern technology to deliver insights
              that truly resonate with your soul.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="celestial-card hover-lift group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="relative">
                  {/* Icon with gradient background */}
                  <div
                    className={`
                      w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient}
                      flex items-center justify-center mb-4
                      shadow-lg group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="font-display text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-card-foreground/75">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {/* Hover gradient overlay */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0
                    group-hover:opacity-5 transition-opacity duration-500 pointer-events-none
                  `}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-mystical opacity-30" />
        <div className="absolute inset-0 constellation-bg opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <p className="text-mystical text-xs tracking-[0.3em] text-[var(--celestial-violet)]">
              Expand Your Knowledge
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Dive Deep Into <span className="text-gradient-cosmic">Astrology</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Explore the fundamentals of astrology with our comprehensive guides.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {knowledgeCards.map((card, index) => (
              <Link key={card.href} href={card.href} className="group">
                <Card
                  className="h-full celestial-card hover-lift overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[var(--celestial-gold)]/10 group-hover:bg-[var(--celestial-gold)]/20 transition-colors">
                        <card.icon className="h-5 w-5 text-(--celestial-gold)" />
                      </div>
                      <CardTitle className="font-display text-lg group-hover:text-(--celestial-gold) transition-colors">
                        {card.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-card-foreground/70">{card.description}</CardDescription>
                  </CardContent>
                  {/* Arrow indicator */}
                  <div className="px-6 pb-6">
                    <span className="text-sm text-(--celestial-gold) opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <CosmicBackground variant="intense" showStars={true} className="absolute inset-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Ready to Unlock Your <span className="text-gradient-gold">Celestial Secrets</span>?
            </h2>

            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Your cosmic journey begins with a single step. Discover the wisdom written in the stars and transform your
              understanding of yourself and your destiny.
            </p>

            <div className="pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gradient-gold text-primary-foreground text-lg px-12 py-8 rounded-xl zodiac-glow-intense hover-lift group"
                >
                  Start Your Cosmic Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
