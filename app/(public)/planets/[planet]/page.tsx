import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanetIcon, PlanetKey } from "@/components/icons";
import { PLANETS, getPlanetBySlug, getAllPlanetSlugs } from "@/data/planets";
import { ArrowLeft, ArrowRight, Orbit, Clock, Repeat } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ planet: string }>;
}

export async function generateStaticParams() {
  return getAllPlanetSlugs().map(planet => ({ planet }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { planet: planetSlug } = await params;
  const planet = getPlanetBySlug(planetSlug);

  if (!planet) {
    return { title: "Planet Not Found" };
  }

  return {
    title: `${planet.name} in Astrology - Meaning, Signs & Transits | Aistrology`,
    description: `Discover the astrological meaning of ${planet.name}. Learn how ${planet.name} influences ${planet.keywords.slice(0, 3).join(", ")} in your birth chart. Rules ${planet.rulership.join(" and ")}.`,
    keywords: [
      `${planet.name.toLowerCase()} astrology`,
      `${planet.name.toLowerCase()} sign`,
      `${planet.name.toLowerCase()} retrograde`,
      `${planet.name.toLowerCase()} transit`,
      ...planet.keywords.map(k => k.toLowerCase()),
    ],
  };
}

export default async function PlanetPage({ params }: Props) {
  const { planet: planetSlug } = await params;
  const planet = getPlanetBySlug(planetSlug);

  if (!planet) {
    notFound();
  }

  // Get prev/next planets for navigation
  const currentIndex = PLANETS.findIndex(p => p.slug === planetSlug);
  const prevPlanet = currentIndex > 0 ? PLANETS[currentIndex - 1] : null;
  const nextPlanet = currentIndex < PLANETS.length - 1 ? PLANETS[currentIndex + 1] : null;

  const typeColors: Record<string, string> = {
    Luminary: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    Personal: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    Social: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    Generational: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/planets"
          className="text-foreground/85 hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Planets
        </Link>
      </nav>

      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <PlanetIcon planet={planet.slug as PlanetKey} size={96} className="text-primary animate-float" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-2">{planet.name}</h1>
        <p className="text-3xl text-foreground/85 mb-6">{planet.symbol}</p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Badge className={typeColors[planet.type]}>{planet.type} Planet</Badge>
          {planet.rulership.map(sign => (
            <Badge key={sign} variant="outline" className="bg-primary/10 text-primary">
              Rules {sign}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {planet.keywords.map(keyword => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Description */}
        <section>
          <p className="text-lg leading-relaxed text-foreground/85">{planet.description}</p>
        </section>

        {/* In Signs */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Orbit className="h-5 w-5 text-primary" />
              {planet.name} Through the Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/85">{planet.inSigns}</p>
          </CardContent>
        </Card>

        {/* Retrograde */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Repeat className="h-5 w-5 text-accent" />
              {planet.name} Retrograde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/85">{planet.retrograde}</p>
          </CardContent>
        </Card>

        {/* Transits */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {planet.name} Transits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/85">{planet.transitMeaning}</p>
          </CardContent>
        </Card>

        {/* Ruled Signs */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-foreground/85 mb-4">
                {planet.name} is the planetary ruler of{" "}
                {planet.rulership.map((sign, i) => (
                  <span key={sign}>
                    {i > 0 && " and "}
                    <strong>{sign}</strong>
                  </span>
                ))}
                . This connection reveals how {planet.name}&apos;s energy is naturally expressed.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {planet.rulership.map(sign => (
                  <Link key={sign} href={`/zodiac/${sign.toLowerCase()}`}>
                    <Button variant="outline" className="zodiac-border">
                      Explore {sign}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h3 className="font-display text-xl font-bold mb-3">Discover Your {planet.name} Placement</h3>
            <p className="text-foreground/85 mb-6">
              See which sign and house {planet.name} occupies in your unique birth chart.
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
          {prevPlanet ? (
            <Link href={`/planets/${prevPlanet.slug}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <PlanetIcon planet={prevPlanet.slug as PlanetKey} size={16} />
                {prevPlanet.name}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextPlanet && (
            <Link href={`/planets/${nextPlanet.slug}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                {nextPlanet.name}
                <PlanetIcon planet={nextPlanet.slug as PlanetKey} size={16} />
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
