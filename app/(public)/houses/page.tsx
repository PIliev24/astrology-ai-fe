import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HOUSES } from "@/data/houses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 12 Astrological Houses - Complete Guide | Aistrology",
  description:
    "Learn about all 12 astrological houses and how they influence different areas of your life. Discover the meaning of each house in your birth chart.",
  keywords: [
    "astrological houses",
    "12 houses astrology",
    "birth chart houses",
    "first house",
    "ascendant",
    "midheaven",
    "natal chart houses",
  ],
};

export default function HousesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
          The Twelve <span className="text-gradient-gold">Astrological Houses</span>
        </h1>
        <p className="text-xl text-foreground/70">
          The houses in your birth chart represent different areas of life. Each house governs specific themes, from
          identity and values to career and spirituality. Understanding your houses reveals where planetary energies
          manifest in your life.
        </p>
      </div>

      {/* Houses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {HOUSES.map(house => (
          <Link key={house.slug} href={`/houses/${house.slug}`}>
            <Card className="h-full hover:zodiac-glow transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-gold text-primary-foreground flex items-center justify-center font-display font-bold text-xl mb-4">
                  {house.number}
                </div>
                <CardTitle className="font-display text-xl">{house.name}</CardTitle>
                <CardDescription className="text-sm">
                  Ruled by {house.rulingSign} • {house.rulingPlanet}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {house.keywords.slice(0, 3).map(keyword => (
                    <Badge key={keyword} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-foreground/70 line-clamp-2">{house.description.slice(0, 120)}...</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Additional Info */}
      <section className="mt-20 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Understanding the Houses</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">Angular Houses (1, 4, 7, 10)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/70">The most powerful houses, marking cardinal points in your chart:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>1st House:</strong> Self, identity, appearance
                </li>
                <li>
                  <strong>4th House:</strong> Home, family, roots
                </li>
                <li>
                  <strong>7th House:</strong> Partnerships, marriage
                </li>
                <li>
                  <strong>10th House:</strong> Career, public image
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">Succedent Houses (2, 5, 8, 11)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/70">Houses of resources and values following the angular houses:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>2nd House:</strong> Money, possessions, values
                </li>
                <li>
                  <strong>5th House:</strong> Creativity, romance, children
                </li>
                <li>
                  <strong>8th House:</strong> Transformation, shared resources
                </li>
                <li>
                  <strong>11th House:</strong> Friends, groups, hopes
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-display">Cadent Houses (3, 6, 9, 12)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/70">Houses of learning, adaptation, and mental processes:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2">
                  <li>
                    <strong>3rd House:</strong> Communication, siblings, learning
                  </li>
                  <li>
                    <strong>6th House:</strong> Health, daily work, service
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <strong>9th House:</strong> Philosophy, travel, higher learning
                  </li>
                  <li>
                    <strong>12th House:</strong> Spirituality, unconscious, karma
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
