import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ZodiacIcon, ZodiacSignKey } from "@/components/icons";
import { ZODIAC_SIGNS } from "@/data/zodiac";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zodiac Signs - Complete Guide to All 12 Signs | Aistrology",
  description:
    "Explore all 12 zodiac signs with detailed descriptions of their traits, elements, ruling planets, and compatibility. Discover the unique characteristics of each astrological sign.",
  keywords: [
    "zodiac signs",
    "astrology signs",
    "horoscope signs",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ],
};

const elementColors: Record<string, string> = {
  Fire: "text-orange-500 dark:text-orange-400",
  Earth: "text-green-600 dark:text-green-400",
  Air: "text-sky-500 dark:text-sky-400",
  Water: "text-blue-500 dark:text-blue-400",
};

const elementBg: Record<string, string> = {
  Fire: "bg-orange-500/10",
  Earth: "bg-green-500/10",
  Air: "bg-sky-500/10",
  Water: "bg-blue-500/10",
};

export default function ZodiacPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
          The Twelve Signs of the <span className="text-gradient-gold">Zodiac</span>
        </h1>
        <p className="text-xl text-foreground/70">
          Each zodiac sign represents a unique expression of cosmic energy. Explore the characteristics, strengths, and
          mysteries of all twelve signs to better understand yourself and others.
        </p>
      </div>

      {/* Elements Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["Fire", "Earth", "Air", "Water"].map(element => (
          <div key={element} className={`flex items-center gap-2 px-4 py-2 rounded-full ${elementBg[element]}`}>
            <span className={`font-medium ${elementColors[element]}`}>{element}</span>
          </div>
        ))}
      </div>

      {/* Zodiac Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {ZODIAC_SIGNS.map(sign => (
          <Link key={sign.slug} href={`/zodiac/${sign.slug}`}>
            <Card className="h-full hover:zodiac-glow transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={sign.slug as ZodiacSignKey} size={48} className="text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">{sign.name}</CardTitle>
                <CardDescription className="text-sm">{sign.dateRange}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${elementBg[sign.element]} ${elementColors[sign.element]}`}
                  >
                    {sign.element}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/70">{sign.quality}</span>
                </div>
                <p className="text-sm text-foreground/70 text-center line-clamp-2">
                  {sign.traits.slice(0, 3).join(" • ")}
                </p>
                <p className="text-xs text-center text-primary">Ruled by {sign.rulingPlanet}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Additional Info */}
      <section className="mt-20 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">Understanding the Zodiac</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">The Four Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Each zodiac sign belongs to one of four elements, which describes its fundamental nature:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-orange-500">Fire:</strong> Passion, energy, enthusiasm (Aries, Leo,
                  Sagittarius)
                </li>
                <li>
                  <strong className="text-green-600">Earth:</strong> Stability, practicality, grounding (Taurus, Virgo,
                  Capricorn)
                </li>
                <li>
                  <strong className="text-sky-500">Air:</strong> Intellect, communication, ideas (Gemini, Libra,
                  Aquarius)
                </li>
                <li>
                  <strong className="text-blue-500">Water:</strong> Emotion, intuition, depth (Cancer, Scorpio, Pisces)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-display">The Three Qualities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Qualities (or modalities) describe how signs approach life and change:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Cardinal:</strong> Initiators, leaders, start new cycles (Aries, Cancer, Libra, Capricorn)
                </li>
                <li>
                  <strong>Fixed:</strong> Stabilizers, determined, maintain energy (Taurus, Leo, Scorpio, Aquarius)
                </li>
                <li>
                  <strong>Mutable:</strong> Adapters, flexible, facilitate change (Gemini, Virgo, Sagittarius, Pisces)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
