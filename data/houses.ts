/**
 * Astrological houses data for static SEO pages
 */

export interface AstrologicalHouse {
  number: number;
  slug: string;
  name: string;
  keywords: string[];
  rulingSign: string;
  rulingPlanet: string;
  description: string;
  lifeAreas: string[];
  questions: string[];
}

export const HOUSES: AstrologicalHouse[] = [
  {
    number: 1,
    slug: "first-house",
    name: "First House - House of Self",
    keywords: ["Identity", "Appearance", "First Impressions", "New Beginnings"],
    rulingSign: "Aries",
    rulingPlanet: "Mars",
    description:
      "The First House represents your outward personality, physical appearance, and the way you present yourself to the world. It's the house of new beginnings and how others perceive you at first meeting. This house sets the tone for your entire birth chart.",
    lifeAreas: ["Physical body", "Self-image", "Personal style", "Approach to life", "First impressions"],
    questions: ["Who am I?", "How do others see me?", "What is my approach to new situations?"],
  },
  {
    number: 2,
    slug: "second-house",
    name: "Second House - House of Value",
    keywords: ["Money", "Possessions", "Self-Worth", "Values"],
    rulingSign: "Taurus",
    rulingPlanet: "Venus",
    description:
      "The Second House governs your material resources, personal finances, and sense of self-worth. It reveals your attitudes toward money, possessions, and what you truly value in life. This house shows how you earn, spend, and manage your resources.",
    lifeAreas: ["Income", "Material possessions", "Personal values", "Self-esteem", "Financial security"],
    questions: ["What do I value?", "How do I earn money?", "What gives me a sense of security?"],
  },
  {
    number: 3,
    slug: "third-house",
    name: "Third House - House of Communication",
    keywords: ["Communication", "Siblings", "Short Trips", "Learning"],
    rulingSign: "Gemini",
    rulingPlanet: "Mercury",
    description:
      "The Third House rules communication, early education, siblings, and your immediate environment. It governs how you think, learn, and express ideas. This house also covers short-distance travel and your relationship with neighbors and your community.",
    lifeAreas: ["Communication style", "Siblings", "Neighbors", "Early education", "Short journeys", "Writing"],
    questions: [
      "How do I communicate?",
      "What is my learning style?",
      "How do I connect with my immediate environment?",
    ],
  },
  {
    number: 4,
    slug: "fourth-house",
    name: "Fourth House - House of Home",
    keywords: ["Home", "Family", "Roots", "Emotional Foundation"],
    rulingSign: "Cancer",
    rulingPlanet: "Moon",
    description:
      "The Fourth House represents your home, family, roots, and emotional foundation. It governs your relationship with your parents (especially the mother figure), your ancestry, and your sense of belonging. This house shows your private life and what makes you feel secure.",
    lifeAreas: ["Family", "Home environment", "Ancestry", "Emotional security", "Real estate", "End of life"],
    questions: ["Where do I feel at home?", "What are my roots?", "What is my emotional foundation?"],
  },
  {
    number: 5,
    slug: "fifth-house",
    name: "Fifth House - House of Pleasure",
    keywords: ["Creativity", "Romance", "Children", "Self-Expression"],
    rulingSign: "Leo",
    rulingPlanet: "Sun",
    description:
      "The Fifth House is the house of creativity, romance, pleasure, and self-expression. It governs artistic pursuits, hobbies, love affairs, and your relationship with children. This house reveals how you express your creativity and what brings you joy.",
    lifeAreas: ["Creativity", "Romance", "Children", "Hobbies", "Gambling", "Entertainment", "Self-expression"],
    questions: ["What brings me joy?", "How do I express creativity?", "What is my romantic style?"],
  },
  {
    number: 6,
    slug: "sixth-house",
    name: "Sixth House - House of Health",
    keywords: ["Health", "Daily Routine", "Work", "Service"],
    rulingSign: "Virgo",
    rulingPlanet: "Mercury",
    description:
      "The Sixth House governs your daily routines, work environment, health habits, and service to others. It reveals your approach to wellness, your relationship with coworkers, and how you handle day-to-day responsibilities. This house also relates to pets and small animals.",
    lifeAreas: ["Daily routines", "Health habits", "Work environment", "Coworkers", "Pets", "Service to others"],
    questions: ["What are my health patterns?", "How do I serve others?", "What is my daily routine?"],
  },
  {
    number: 7,
    slug: "seventh-house",
    name: "Seventh House - House of Partnership",
    keywords: ["Marriage", "Partnerships", "Contracts", "Open Enemies"],
    rulingSign: "Libra",
    rulingPlanet: "Venus",
    description:
      "The Seventh House is the house of partnerships, marriage, and one-on-one relationships. It reveals what you seek in a partner, how you approach committed relationships, and your style of cooperation. This house also governs business partnerships and legal contracts.",
    lifeAreas: ["Marriage", "Business partnerships", "Contracts", "Legal matters", "Open enemies", "Cooperation"],
    questions: ["What do I seek in a partner?", "How do I approach commitment?", "What are my relationship patterns?"],
  },
  {
    number: 8,
    slug: "eighth-house",
    name: "Eighth House - House of Transformation",
    keywords: ["Transformation", "Shared Resources", "Intimacy", "Death/Rebirth"],
    rulingSign: "Scorpio",
    rulingPlanet: "Pluto",
    description:
      "The Eighth House governs transformation, shared resources, intimacy, and the cycle of death and rebirth. It reveals your approach to deep emotional bonds, inheritance, taxes, and other people's money. This mysterious house also relates to occult matters and psychology.",
    lifeAreas: ["Shared finances", "Inheritance", "Taxes", "Intimacy", "Transformation", "Psychology", "Occult"],
    questions: ["How do I handle shared resources?", "What needs to be transformed?", "How do I approach intimacy?"],
  },
  {
    number: 9,
    slug: "ninth-house",
    name: "Ninth House - House of Philosophy",
    keywords: ["Higher Learning", "Travel", "Philosophy", "Expansion"],
    rulingSign: "Sagittarius",
    rulingPlanet: "Jupiter",
    description:
      "The Ninth House is the house of higher learning, long-distance travel, philosophy, and spiritual seeking. It governs your belief systems, higher education, publishing, and foreign cultures. This house reveals your search for meaning and truth in life.",
    lifeAreas: ["Higher education", "Long-distance travel", "Philosophy", "Religion", "Publishing", "Foreign cultures"],
    questions: ["What do I believe?", "How do I expand my horizons?", "What is my life philosophy?"],
  },
  {
    number: 10,
    slug: "tenth-house",
    name: "Tenth House - House of Career",
    keywords: ["Career", "Public Image", "Authority", "Achievement"],
    rulingSign: "Capricorn",
    rulingPlanet: "Saturn",
    description:
      "The Tenth House represents your career, public reputation, and highest achievements. It governs your relationship with authority figures (especially the father figure), your professional goals, and how you're seen by the world. This house shows your legacy and social status.",
    lifeAreas: ["Career", "Reputation", "Authority figures", "Achievement", "Social status", "Legacy"],
    questions: ["What is my calling?", "How am I seen publicly?", "What do I want to achieve?"],
  },
  {
    number: 11,
    slug: "eleventh-house",
    name: "Eleventh House - House of Community",
    keywords: ["Friends", "Groups", "Hopes", "Humanitarian Causes"],
    rulingSign: "Aquarius",
    rulingPlanet: "Uranus",
    description:
      "The Eleventh House governs friendships, groups, organizations, and your hopes for the future. It reveals your social circle, involvement in communities, and humanitarian interests. This house shows how you contribute to collective goals and what you aspire to achieve.",
    lifeAreas: ["Friendships", "Groups", "Social causes", "Hopes and wishes", "Technology", "Networking"],
    questions: ["Who are my friends?", "What groups do I belong to?", "What are my hopes for the future?"],
  },
  {
    number: 12,
    slug: "twelfth-house",
    name: "Twelfth House - House of the Unconscious",
    keywords: ["Spirituality", "Hidden Things", "Solitude", "Self-Undoing"],
    rulingSign: "Pisces",
    rulingPlanet: "Neptune",
    description:
      "The Twelfth House is the house of the unconscious, spirituality, and hidden matters. It governs dreams, secrets, karma, and self-undoing patterns. This mysterious house reveals your spiritual path, hidden strengths, and the things you must release to evolve.",
    lifeAreas: ["Spirituality", "Dreams", "Secrets", "Karma", "Isolation", "Hidden enemies", "Subconscious"],
    questions: ["What is hidden from me?", "What must I release?", "What is my spiritual path?"],
  },
];

export function getHouseBySlug(slug: string): AstrologicalHouse | undefined {
  return HOUSES.find(house => house.slug === slug);
}

export function getHouseByNumber(number: number): AstrologicalHouse | undefined {
  return HOUSES.find(house => house.number === number);
}

export function getAllHouseSlugs(): string[] {
  return HOUSES.map(house => house.slug);
}
