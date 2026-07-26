import type { PressItem } from "@/types/content";

export const pressCoverage: PressItem[] = [
  {
    title: "Featured interview on the Asia MarTech Podcast",
    outlet: "Asia MarTech Podcast",
    type: "interview",
    date: "2025-02-12",
    summary:
      "A forty-two minute conversation on where the CMO sits in the boardroom in 2026 and how marketing leaders are restructuring for AI-first operating models.",
    url: "/insights/ai-in-the-boardroom",
    verificationStatus: "verified",
  },
  {
    title: "AI in the boardroom — where the CMO sits in 2026",
    outlet: "Internal write-up",
    type: "appearance",
    date: "2025-02-12",
    summary: "Companion essay to the Asia MarTech Podcast conversation.",
    url: "/insights/ai-in-the-boardroom",
    verificationStatus: "verified",
  },
  {
    title: "Featured in the World Brand Congress programme",
    outlet: "World Brand Congress",
    type: "mention",
    date: "2024-11-20",
    summary:
      "Featured speaker on AI-first marketing operating models at the 2024 World Brand Congress in Mumbai.",
    verificationStatus: "needs-verification",
  },
  {
    title: "Featured in the Asia Marketing Federation programme",
    outlet: "Asia Marketing Federation",
    type: "mention",
    date: "2023-09-15",
    summary:
      "Featured speaker on compounding brand equity across APAC at the 2023 Asia Marketing Federation.",
    verificationStatus: "needs-verification",
  },
];

export const pressKit = {
  bios: {
    short:
      "Abdullah Al Alamin is the Group Chief Marketing Officer of Betopia Group, leading brand, marketing, and AI marketing transformation across the group's consumer and enterprise businesses.",
    medium:
      "Abdullah Al Alamin is the Group Chief Marketing Officer of Betopia Group. He has spent fourteen years building category-defining brands across FMCG, building materials, education, and conglomerate portfolios across Bangladesh, South Asia, and APAC.",
    long:
      "Abdullah Al Alamin is the Group Chief Marketing Officer of Betopia Group. He leads the Office of the CMO at Betopia Group, where he is responsible for the group's brand, marketing, and AI marketing operating model. Prior to Betopia, he led brand and corporate affairs at Bengal Group, group marketing at Metrocem Group, and brand and digital at Daffodil Group. Earlier in his career, he repositioned Lovello for first-time buyers at Akij Foods and built the KotiPoti Offer field programme at PRAN-RFL Group, where he delivered 350% sales growth in forty-five days. He has been recognised by the World Brand Congress, the Asia Marketing Federation, the International Association of Business Communicators, the ICT Division of the Government of Bangladesh, and the Ministry of Commerce of the Government of Bangladesh. He is a juror at the Bangladesh Marketing Excellence Awards and a mentor at the Commonwealth Youth Programme.",
  },
  assets: [
    { label: "Approved short bio", status: "available on request" as const },
    { label: "Approved medium bio", status: "available on request" as const },
    { label: "Approved long bio", status: "available on request" as const },
    { label: "High-resolution headshots", status: "available on request" as const },
    { label: "Office fact sheet", status: "available on request" as const },
  ],
  contactEmail: "press@abdullahalamin.me",
};

export const interviewTopics = [
  "The AI-first CMO and the board's question for marketing",
  "Compounding brand equity across emerging markets",
  "Reputation rebuilt in public — narrative discipline in crisis",
  "Building an AI marketing operating model for a conglomerate",
];
