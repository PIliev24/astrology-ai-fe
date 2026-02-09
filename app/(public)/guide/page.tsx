import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Home, Sun, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birth Chart Guide - How to Read Your Natal Chart | Aistrology",
  description:
    "Learn how to read and interpret your birth chart. This comprehensive guide covers the basics of natal chart interpretation including signs, houses, planets, and aspects.",
  keywords: [
    "birth chart guide",
    "how to read birth chart",
    "natal chart interpretation",
    "astrology basics",
    "chart reading guide",
  ],
};

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Birth Chart <span className="text-gradient-gold">Interpretation Guide</span>
          </h1>
          <p className="text-xl text-foreground/85">
            Your birth chart is a cosmic snapshot of the sky at the moment you were born. This guide will help you
            understand the fundamental components of your chart and what they reveal about your unique cosmic blueprint.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* What is a Birth Chart */}
          <section>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">What is a Birth Chart?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/85">
                <p>
                  A birth chart (also called a natal chart) is a map of where all the planets were in their journey
                  around the Sun at the exact moment you were born. It&apos;s calculated using your birth date, time,
                  and location.
                </p>
                <p>
                  This celestial snapshot creates a unique cosmic fingerprint that astrologers use to understand your
                  personality, potential, challenges, and life path. No two birth charts are exactly alike—even twins
                  born minutes apart will have subtle differences.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* The Three Pillars */}
          <section>
            <h2 className="font-display text-3xl font-bold mb-8 text-center">The Three Pillars of Your Chart</h2>
            <p className="text-center text-foreground/85 mb-8">
              Understanding these three components is the foundation of chart interpretation.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card hover:zodiac-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <Star className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="font-display">Zodiac Signs</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-foreground/85 mb-4">
                    The 12 signs describe <strong>how</strong> energy is expressed. Each sign has unique qualities,
                    elements, and modes of operation.
                  </p>
                  <Link href="/zodiac">
                    <Button variant="outline" size="sm">
                      Explore Signs <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card hover:zodiac-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <Home className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="font-display">Houses</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-foreground/85 mb-4">
                    The 12 houses show <strong>where</strong> in life the energy manifests. Each house governs different
                    life areas.
                  </p>
                  <Link href="/houses">
                    <Button variant="outline" size="sm">
                      Explore Houses <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-card hover:zodiac-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <Sun className="h-10 w-10 text-primary mx-auto mb-2" />
                  <CardTitle className="font-display">Planets</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-foreground/85 mb-4">
                    The planets represent <strong>what</strong> energy is at play. Each planet governs different aspects
                    of your psyche.
                  </p>
                  <Link href="/planets">
                    <Button variant="outline" size="sm">
                      Explore Planets <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Placements */}
          <section>
            <h2 className="font-display text-3xl font-bold mb-8 text-center">Key Placements to Know</h2>

            <div className="space-y-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-display">The Big Three</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Sun Sign</h4>
                      <p className="text-sm text-foreground/85">
                        Your core identity and ego. What you&apos;re here to become. This is the sign most people
                        know—your &quot;zodiac sign&quot; based on your birthday.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Moon Sign</h4>
                      <p className="text-sm text-foreground/85">
                        Your emotional nature and inner self. How you process feelings and what you need to feel secure
                        and nurtured.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Rising Sign (Ascendant)</h4>
                      <p className="text-sm text-foreground/85">
                        Your outer personality and first impressions. The mask you wear and how others perceive you when
                        they first meet you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-display">Important Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Midheaven (MC)</h4>
                      <p className="text-sm text-foreground/85">
                        The highest point in your chart. Represents your career, public image, and what you&apos;re
                        known for in the world.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Lunar Nodes</h4>
                      <p className="text-sm text-foreground/85">
                        The North Node shows your life purpose and growth direction. The South Node represents past life
                        gifts and comfort zones to move beyond.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Aspects */}
          <section>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Planetary Aspects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/85">
                  Aspects are the angular relationships between planets. They show how different parts of your
                  personality interact with each other.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-green-500">Conjunction (0°)</span>
                      <span className="text-foreground/85"> - Planets blend their energies intensely</span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-500">Trine (120°)</span>
                      <span className="text-foreground/85"> - Harmonious flow, natural talents</span>
                    </div>
                    <div>
                      <span className="font-semibold text-cyan-500">Sextile (60°)</span>
                      <span className="text-foreground/85"> - Opportunities through effort</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-red-500">Opposition (180°)</span>
                      <span className="text-foreground/85"> - Tension seeking balance</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-500">Square (90°)</span>
                      <span className="text-foreground/85"> - Friction driving growth</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Reading Tips */}
          <section>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Tips for Reading Your Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-foreground/85">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span>Start with the Big Three (Sun, Moon, Rising) to understand your core self.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span>Look at which houses have the most planets—these are emphasized life areas.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span>Note any planets in their ruling signs—they&apos;re especially powerful.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span>Pay attention to tight aspects (within 3°)—they&apos;re the strongest influences.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">5.</span>
                    <span>Remember that challenging aspects create growth, not doom.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="text-center py-10">
                <h3 className="font-display text-2xl font-bold mb-3">Ready to Explore Your Birth Chart?</h3>
                <p className="text-foreground/85 mb-6 max-w-lg mx-auto">
                  Get a personalized AI-powered reading that interprets your unique celestial blueprint. Our AI
                  astrologer will guide you through every aspect of your chart.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="gradient-gold text-primary-foreground zodiac-glow">
                    Get Your Personalized Reading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
