import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlanetIcon, PlanetKey } from "@/components/icons";
import { PLANETS, getPlanetsByType } from "@/data/planets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planets in Astrology - Complete Guide to Celestial Bodies | Aistrology",
  description: "Learn about the planets in astrology and how they influence your birth chart. Discover the meaning of the Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto.",
  keywords: ["planets astrology", "celestial bodies", "sun astrology", "moon astrology", "mercury retrograde", "venus love", "mars energy", "jupiter luck", "saturn lessons"],
};

const typeColors: Record<string, string> = {
  Luminary: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
  Personal: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  Social: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
  Generational: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
};

export default function PlanetsPage() {
  const luminaries = getPlanetsByType("Luminary");
  const personal = getPlanetsByType("Personal");
  const social = getPlanetsByType("Social");
  const generational = getPlanetsByType("Generational");

  const sections = [
    { title: "The Luminaries", description: "The Sun and Moon - the two lights of the chart", planets: luminaries },
    { title: "Personal Planets", description: "Mercury, Venus, and Mars - your personal expression", planets: personal },
    { title: "Social Planets", description: "Jupiter and Saturn - connecting you to society", planets: social },
    { title: "Generational Planets", description: "Uranus, Neptune, and Pluto - collective transformation", planets: generational },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
          The <span className="text-gradient-gold">Celestial Bodies</span>
        </h1>
        <p className="text-xl text-foreground/70">
          In astrology, planets represent different aspects of your psyche and life experiences.
          Each planet brings its own energy, influencing how you think, feel, love, act, and grow.
        </p>
      </div>

      {/* Type Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className={`flex items-center gap-2 px-4 py-2 rounded-full ${color}`}>
            <span className="font-medium">{type}</span>
          </div>
        ))}
      </div>

      {/* Planets by Category */}
      <div className="space-y-16 max-w-7xl mx-auto">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{section.title}</h2>
              <p className="text-foreground/70">{section.description}</p>
            </div>

            <div className={`grid gap-6 ${section.planets.length <= 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"}`}>
              {section.planets.map((planet) => (
                <Link key={planet.slug} href={`/planets/${planet.slug}`}>
                  <Card className="h-full hover:zodiac-glow transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <PlanetIcon planet={planet.slug as PlanetKey} size={48} className="text-primary" />
                      </div>
                      <CardTitle className="font-display text-2xl flex items-center justify-center gap-2">
                        {planet.name}
                        <span className="text-foreground/70 text-lg">{planet.symbol}</span>
                      </CardTitle>
                      <CardDescription>
                        Rules {planet.rulership.join(" & ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Badge className={typeColors[planet.type]}>{planet.type}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {planet.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/70 line-clamp-2">
                        {planet.description.slice(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Additional Info */}
      <section className="mt-20 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">How Planets Work in Your Chart</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">Planet Positions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/70">
                Each planet occupies a zodiac sign and house in your birth chart:
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Sign:</strong> How the planet expresses its energy</li>
                <li><strong>House:</strong> Where in life the planet's energy manifests</li>
                <li><strong>Aspects:</strong> How planets interact with each other</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">Planetary Dignity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/70">
                Planets are stronger or weaker depending on their sign placement:
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Domicile:</strong> Planet in its ruling sign (strongest)</li>
                <li><strong>Exaltation:</strong> Planet in a sign that enhances it</li>
                <li><strong>Detriment:</strong> Planet opposite its ruling sign</li>
                <li><strong>Fall:</strong> Planet opposite its exaltation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
