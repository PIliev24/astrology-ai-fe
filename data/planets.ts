/**
 * Celestial bodies data for static SEO pages
 */

export interface CelestialBody {
  slug: string;
  name: string;
  symbol: string;
  emoji: string;
  type: "Personal" | "Social" | "Generational" | "Luminary";
  rulership: string[];
  keywords: string[];
  description: string;
  inSigns: string;
  retrograde: string;
  transitMeaning: string;
}

export const PLANETS: CelestialBody[] = [
  {
    slug: "sun",
    name: "Sun",
    symbol: "☉",
    emoji: "☀️",
    type: "Luminary",
    rulership: ["Leo"],
    keywords: ["Identity", "Ego", "Vitality", "Purpose", "Self-expression"],
    description:
      "The Sun represents your core identity, ego, and life purpose. It's the center of your being, illuminating your path and revealing your true nature. In your birth chart, the Sun sign shows how you express yourself and what drives you to shine.",
    inSigns:
      "The Sun spends approximately one month in each zodiac sign, completing its journey through all twelve signs in one year. Your Sun sign is determined by your birthday and represents your fundamental character.",
    retrograde:
      "The Sun never goes retrograde, as it's the center of our solar system. It represents constant, unwavering energy and steady progress forward.",
    transitMeaning:
      "When the Sun transits a house in your chart, it illuminates and energizes that area of life. It's a time of increased vitality, confidence, and focus on matters related to that house.",
  },
  {
    slug: "moon",
    name: "Moon",
    symbol: "☽",
    emoji: "🌙",
    type: "Luminary",
    rulership: ["Cancer"],
    keywords: ["Emotions", "Intuition", "Nurturing", "Habits", "Subconscious"],
    description:
      "The Moon governs your emotional nature, instincts, and subconscious patterns. It reveals how you process feelings, nurture others, and what you need to feel secure. The Moon represents your inner self and emotional responses.",
    inSigns:
      "The Moon changes signs approximately every 2.5 days, making it the fastest-moving celestial body in astrology. Your Moon sign deeply influences your emotional landscape and instinctive reactions.",
    retrograde:
      "The Moon never goes retrograde. Its phases (new, waxing, full, waning) create natural cycles that influence emotional tides and are used in lunar astrology.",
    transitMeaning:
      "Moon transits are brief but emotionally significant. When the Moon passes through a house, you may feel more emotionally connected to matters of that house, with heightened intuition and sensitivity.",
  },
  {
    slug: "mercury",
    name: "Mercury",
    symbol: "☿",
    emoji: "☿️",
    type: "Personal",
    rulership: ["Gemini", "Virgo"],
    keywords: ["Communication", "Thinking", "Learning", "Travel", "Technology"],
    description:
      "Mercury rules communication, thinking patterns, and how you process information. It governs writing, speaking, learning, and short-distance travel. Mercury reveals your intellectual approach and communication style.",
    inSigns:
      "Mercury spends about 3-4 weeks in each sign, though this varies due to retrograde periods. It's never more than 28 degrees away from the Sun in your chart.",
    retrograde:
      "Mercury retrograde occurs 3-4 times per year for about 3 weeks each time. During retrograde, communication mishaps, travel delays, and technology glitches are common. It's a time for review, reflection, and redoing.",
    transitMeaning:
      "Mercury transits bring mental focus to the affected area of your chart. Expect increased communication, learning opportunities, and the need to think carefully about matters of that house.",
  },
  {
    slug: "venus",
    name: "Venus",
    symbol: "♀",
    emoji: "💕",
    type: "Personal",
    rulership: ["Taurus", "Libra"],
    keywords: ["Love", "Beauty", "Values", "Pleasure", "Harmony"],
    description:
      "Venus governs love, beauty, pleasure, and what you value. It reveals your romantic style, aesthetic preferences, and approach to relationships. Venus shows how you attract and what attracts you.",
    inSigns:
      "Venus spends about 4-5 weeks in each sign, though retrograde can extend this. It's never more than 48 degrees away from the Sun in your birth chart.",
    retrograde:
      "Venus retrograde occurs approximately every 18 months for about 40 days. It's a time to reassess relationships, values, and finances. Old flames may resurface, and beauty/aesthetic choices should wait.",
    transitMeaning:
      "Venus transits bring harmony, pleasure, and social opportunities to the affected house. It's favorable for relationships, creative pursuits, and enjoying the finer things related to that life area.",
  },
  {
    slug: "mars",
    name: "Mars",
    symbol: "♂",
    emoji: "🔴",
    type: "Personal",
    rulership: ["Aries", "Scorpio"],
    keywords: ["Action", "Energy", "Desire", "Courage", "Aggression"],
    description:
      "Mars represents your drive, ambition, and how you take action. It governs physical energy, sexuality, competition, and courage. Mars reveals how you assert yourself and pursue your desires.",
    inSigns:
      "Mars spends about 6-7 weeks in each sign, though retrograde can extend this to 6 months or more. It takes approximately 2 years to complete its journey through the zodiac.",
    retrograde:
      "Mars retrograde occurs about every 2 years for approximately 2.5 months. During this time, energy may feel frustrated, and direct action can backfire. It's better to strategize than to push forward.",
    transitMeaning:
      "Mars transits energize and activate the affairs of the house it's passing through. Expect increased motivation, potential conflicts, and the drive to take action in that life area.",
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    symbol: "♃",
    emoji: "🪐",
    type: "Social",
    rulership: ["Sagittarius", "Pisces"],
    keywords: ["Expansion", "Luck", "Wisdom", "Growth", "Abundance"],
    description:
      "Jupiter is the planet of expansion, luck, and higher learning. It represents opportunities, optimism, and the search for meaning. Jupiter shows where you experience growth, abundance, and good fortune.",
    inSigns:
      "Jupiter spends about 12-13 months in each sign, taking approximately 12 years to complete its journey through the zodiac. Its sign placement influences an entire year's worth of growth themes.",
    retrograde:
      "Jupiter retrograde occurs once a year for about 4 months. It's a time for internal growth, reassessing beliefs, and integrating lessons learned during its direct motion.",
    transitMeaning:
      "Jupiter transits bring expansion, opportunities, and good fortune to the house it's moving through. It's an excellent time for growth, learning, and taking calculated risks in that life area.",
  },
  {
    slug: "saturn",
    name: "Saturn",
    symbol: "♄",
    emoji: "🪐",
    type: "Social",
    rulership: ["Capricorn", "Aquarius"],
    keywords: ["Structure", "Discipline", "Responsibility", "Limitations", "Karma"],
    description:
      "Saturn represents structure, discipline, and life lessons. It governs responsibility, boundaries, and the rewards of hard work. Saturn shows where you face challenges that lead to mastery and maturity.",
    inSigns:
      "Saturn spends about 2.5 years in each sign, taking approximately 29.5 years to complete its journey through the zodiac. This cycle creates the famous 'Saturn Return' around ages 29 and 58.",
    retrograde:
      "Saturn retrograde occurs once a year for about 4.5 months. It's a time to review commitments, restructure foundations, and take responsibility for past actions.",
    transitMeaning:
      "Saturn transits bring tests, responsibilities, and the need for hard work to the affected house. While challenging, these periods lead to lasting achievements and maturity in that life area.",
  },
  {
    slug: "uranus",
    name: "Uranus",
    symbol: "♅",
    emoji: "⚡",
    type: "Generational",
    rulership: ["Aquarius"],
    keywords: ["Change", "Innovation", "Freedom", "Rebellion", "Awakening"],
    description:
      "Uranus represents sudden change, innovation, and liberation. It governs breakthroughs, eccentricity, and the urge for freedom. Uranus shows where you seek independence and experience unexpected events.",
    inSigns:
      "Uranus spends about 7 years in each sign, taking approximately 84 years to complete its journey through the zodiac. Its generational influence shapes the revolutionary spirit of an entire age group.",
    retrograde:
      "Uranus retrograde occurs once a year for about 5 months. It's a time for internal revolution, reconsidering where you need more freedom, and processing sudden changes.",
    transitMeaning:
      "Uranus transits bring unexpected changes, awakenings, and the need for freedom in the affected house. Expect the unexpected and be open to revolutionary shifts in that life area.",
  },
  {
    slug: "neptune",
    name: "Neptune",
    symbol: "♆",
    emoji: "🌊",
    type: "Generational",
    rulership: ["Pisces"],
    keywords: ["Dreams", "Spirituality", "Illusion", "Compassion", "Creativity"],
    description:
      "Neptune governs dreams, spirituality, and the dissolution of boundaries. It represents imagination, compassion, and transcendence. Neptune shows where you seek to connect with something greater than yourself.",
    inSigns:
      "Neptune spends about 14 years in each sign, taking approximately 165 years to complete its journey through the zodiac. Its generational influence shapes the spiritual and creative ideals of entire eras.",
    retrograde:
      "Neptune retrograde occurs once a year for about 5-6 months. It's a time for spiritual introspection, clearing illusions, and grounding dreams in reality.",
    transitMeaning:
      "Neptune transits bring dreams, inspiration, and sometimes confusion to the affected house. It's a time for spiritual growth, creativity, and dissolving rigid structures in that life area.",
  },
  {
    slug: "pluto",
    name: "Pluto",
    symbol: "♇",
    emoji: "💀",
    type: "Generational",
    rulership: ["Scorpio"],
    keywords: ["Transformation", "Power", "Rebirth", "Intensity", "Shadow"],
    description:
      "Pluto represents deep transformation, power, and the cycle of death and rebirth. It governs the unconscious, obsessions, and profound change. Pluto shows where you experience intense transformation and renewal.",
    inSigns:
      "Pluto spends anywhere from 12 to 31 years in each sign due to its elliptical orbit, taking approximately 248 years to complete its journey through the zodiac. It marks generational transformations.",
    retrograde:
      "Pluto retrograde occurs once a year for about 5-6 months. It's a time for deep psychological work, confronting shadow aspects, and processing transformations.",
    transitMeaning:
      "Pluto transits bring profound transformation and power struggles to the affected house. While intense, these periods lead to complete renewal and empowerment in that life area.",
  },
];

export function getPlanetBySlug(slug: string): CelestialBody | undefined {
  return PLANETS.find(planet => planet.slug === slug);
}

export function getAllPlanetSlugs(): string[] {
  return PLANETS.map(planet => planet.slug);
}

export function getPlanetsByType(type: CelestialBody["type"]): CelestialBody[] {
  return PLANETS.filter(planet => planet.type === type);
}
