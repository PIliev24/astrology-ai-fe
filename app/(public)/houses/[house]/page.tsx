import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOUSES, getHouseBySlug, getAllHouseSlugs } from "@/data/houses";
import { ArrowLeft, ArrowRight, Home, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ house: string }>;
}

export async function generateStaticParams() {
  return getAllHouseSlugs().map((house) => ({ house }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { house: houseSlug } = await params;
  const house = getHouseBySlug(houseSlug);

  if (!house) {
    return { title: "House Not Found" };
  }

  return {
    title: `${house.name} in Astrology - Meaning & Interpretation | Aistrology`,
    description: `Learn about the ${house.name} in your birth chart. Discover how this house influences ${house.lifeAreas.slice(0, 3).join(", ")} and more. Ruled by ${house.rulingSign} and ${house.rulingPlanet}.`,
    keywords: [
      house.name.toLowerCase(),
      `${house.number}${house.number === 1 ? "st" : house.number === 2 ? "nd" : house.number === 3 ? "rd" : "th"} house astrology`,
      ...house.keywords.map((k) => k.toLowerCase()),
      house.rulingSign.toLowerCase(),
    ],
  };
}

export default async function HousePage({ params }: Props) {
  const { house: houseSlug } = await params;
  const house = getHouseBySlug(houseSlug);

  if (!house) {
    notFound();
  }

  // Get prev/next houses for navigation
  const currentIndex = HOUSES.findIndex((h) => h.slug === houseSlug);
  const prevHouse = currentIndex > 0 ? HOUSES[currentIndex - 1] : null;
  const nextHouse = currentIndex < HOUSES.length - 1 ? HOUSES[currentIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/houses" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to All Houses
        </Link>
      </nav>

      {/* Header */}
      <header className="text-center mb-16">
        <div className="w-20 h-20 rounded-full gradient-gold text-primary-foreground flex items-center justify-center font-display font-bold text-4xl mb-6 mx-auto animate-float">
          {house.number}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          {house.name}
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Ruled by {house.rulingSign}
          </Badge>
          <Badge variant="outline">
            {house.rulingPlanet}
          </Badge>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {house.keywords.map((keyword) => (
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
          <p className="text-lg leading-relaxed text-foreground/70">
            {house.description}
          </p>
        </section>

        {/* Life Areas */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Life Areas Governed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {house.lifeAreas.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-accent" />
              Questions This House Answers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {house.questions.map((question) => (
                <li key={question} className="flex items-start gap-3">
                  <span className="text-primary font-bold">?</span>
                  <span className="text-foreground/70">{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Ruling Sign Info */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-foreground/70 mb-4">
                The {house.name.split(" - ")[0]} is naturally ruled by <strong>{house.rulingSign}</strong> and
                its planetary ruler <strong>{house.rulingPlanet}</strong>. This connection reveals the
                natural energy of this house.
              </p>
              <Link href={`/zodiac/${house.rulingSign.toLowerCase()}`}>
                <Button variant="outline" className="zodiac-border">
                  Learn about {house.rulingSign}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h3 className="font-display text-xl font-bold mb-3">
              Discover Your {house.name.split(" - ")[0]}
            </h3>
            <p className="text-foreground/70 mb-6">
              See which planets and signs occupy this house in your birth chart.
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
          {prevHouse ? (
            <Link href={`/houses/${prevHouse.slug}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                House {prevHouse.number}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextHouse && (
            <Link href={`/houses/${nextHouse.slug}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                House {nextHouse.number}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
