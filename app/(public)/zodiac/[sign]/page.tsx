import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZodiacIcon, ZodiacSignKey } from "@/components/icons";
import { ZODIAC_SIGNS, getZodiacBySlug, getAllZodiacSlugs } from "@/data/zodiac";
import { ArrowLeft, ArrowRight, Heart, Star, Zap, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ sign: string }>;
}

export async function generateStaticParams() {
  return getAllZodiacSlugs().map(sign => ({ sign }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign: signSlug } = await params;
  const sign = getZodiacBySlug(signSlug);

  if (!sign) {
    return { title: "Sign Not Found" };
  }

  return {
    title: `${sign.name} Zodiac Sign - Traits, Compatibility & More | Aistrology`,
    description: `Discover everything about ${sign.name} (${sign.dateRange}). Learn about ${sign.name}'s personality traits, strengths, weaknesses, compatibility, and ruling planet ${sign.rulingPlanet}.`,
    keywords: [
      sign.name.toLowerCase(),
      `${sign.name.toLowerCase()} zodiac`,
      `${sign.name.toLowerCase()} horoscope`,
      `${sign.name.toLowerCase()} traits`,
      `${sign.name.toLowerCase()} compatibility`,
      sign.element.toLowerCase(),
      sign.rulingPlanet.toLowerCase(),
    ],
    openGraph: {
      title: `${sign.name} - ${sign.dateRange}`,
      description: sign.description,
      type: "article",
    },
  };
}

export default async function ZodiacSignPage({ params }: Props) {
  const { sign: signSlug } = await params;
  const sign = getZodiacBySlug(signSlug);

  if (!sign) {
    notFound();
  }

  // Get prev/next signs for navigation
  const currentIndex = ZODIAC_SIGNS.findIndex(s => s.slug === signSlug);
  const prevSign = ZODIAC_SIGNS[(currentIndex - 1 + 12) % 12];
  const nextSign = ZODIAC_SIGNS[(currentIndex + 1) % 12];

  const elementColors: Record<string, string> = {
    Fire: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
    Earth: "bg-green-500/20 text-green-600 dark:text-green-400",
    Air: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
    Water: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/zodiac"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Signs
        </Link>
      </nav>

      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <ZodiacIcon sign={sign.slug as ZodiacSignKey} size={96} className="text-primary animate-float" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">{sign.name}</h1>
        <p className="text-xl text-foreground/85 mb-6">{sign.dateRange}</p>

        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="outline" className={elementColors[sign.element]}>
            {sign.element} Element
          </Badge>
          <Badge variant="outline">{sign.quality} Quality</Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Ruled by {sign.rulingPlanet}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Description */}
        <section>
          <p className="text-lg leading-relaxed text-foreground/85">{sign.description}</p>
        </section>

        {/* Key Traits */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Key Personality Traits
          </h2>
          <div className="flex flex-wrap gap-2">
            {sign.traits.map(trait => (
              <Badge key={trait} variant="secondary" className="text-sm py-1 px-3">
                {trait}
              </Badge>
            ))}
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-green-600 dark:text-green-400">
                <Zap className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sign.strengths.map(strength => (
                  <li key={strength} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sign.weaknesses.map(weakness => (
                  <li key={weakness} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compatibility */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Compatible Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {sign.compatibility.map(compatSign => {
                const compatData = ZODIAC_SIGNS.find(s => s.name === compatSign);
                return (
                  <Link key={compatSign} href={`/zodiac/${compatSign.toLowerCase()}`}>
                    <Badge
                      variant="outline"
                      className="text-base py-2 px-4 hover:zodiac-glow transition-all cursor-pointer flex items-center gap-2"
                    >
                      {compatData && <ZodiacIcon sign={compatData.slug as ZodiacSignKey} size={16} />}
                      {compatSign}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Lucky Info */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Lucky Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {sign.luckyNumbers.map(num => (
                  <span
                    key={num}
                    className="w-10 h-10 rounded-full gradient-gold text-primary-foreground flex items-center justify-center font-bold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Lucky Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sign.luckyColors.map(color => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h3 className="font-display text-xl font-bold mb-3">Want a personalized {sign.name} reading?</h3>
            <p className="text-foreground/85 mb-6">
              Discover how your unique birth chart reveals your cosmic potential.
            </p>
            <Link href="/signup">
              <Button className="gradient-gold text-primary-foreground zodiac-glow">
                Get Your Birth Chart Reading
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link href={`/zodiac/${prevSign.slug}`}>
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <ZodiacIcon sign={prevSign.slug as ZodiacSignKey} size={16} className="hidden sm:inline-block" />
              {prevSign.name}
            </Button>
          </Link>
          <Link href={`/zodiac/${nextSign.slug}`}>
            <Button variant="ghost" className="flex items-center gap-2">
              {nextSign.name}
              <ZodiacIcon sign={nextSign.slug as ZodiacSignKey} size={16} className="hidden sm:inline-block" />
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
