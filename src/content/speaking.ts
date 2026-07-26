import type { SpeakingTopic } from "@/types/content";

export const speakingTopics: SpeakingTopic[] = [
  {
    slug: "the-ai-first-cmo",
    title: "The AI-First CMO",
    shortAbstract:
      "What it actually takes to integrate AI into a marketing operating model — without losing the operator's judgment.",
    fullAbstract:
      "The AI-First CMO is a working talk on what it actually takes to integrate AI into a marketing operating model. The talk covers the operating-model change, the governance backbone, the human-in-the-loop constraints, and the board's question for the CMO. The talk is grounded in the operator-led AI work at Betopia Group — and is built for boards, executive committees, and senior marketing leadership audiences.",
    audiences: [
      "Boards and executive committees",
      "Senior marketing leadership and CMOs",
      "AI transformation leads in marketing",
    ],
    takeaways: [
      "An operating-model-first framing for AI in marketing",
      "A governance backbone that survives the next vendor cycle",
      "The three lines on a P&L the CMO must own for AI",
    ],
    formats: ["Keynote (45 min)", "Board session (90 min)", "Workshop (half day)"],
    durationOptions: ["45 minutes", "90 minutes", "half day"],
    customizationNote:
      "The talk is customisable for boards, executive committees, and senior marketing leadership audiences. The board session includes a working pre-read and a closed Q&A.",
    relatedInsightSlugs: ["ai-in-marketing-is-a-craft-tool", "the-conglomerate-as-a-queryable-brand"],
    verificationStatus: "draft",
  },
  {
    slug: "compounding-brand-equity",
    title: "Compounding Brand Equity",
    shortAbstract:
      "Why the work that compounds across a decade wins the category — and how to build the systems that make it possible.",
    fullAbstract:
      "Compounding Brand Equity is a talk on why the work that compounds across a decade wins the category. The talk covers the operating-model choices that make compounding possible, the measurement framework that protects it, and the editorial practice that keeps the work on-brand across the years. The talk is grounded in the work at PRAN-RFL, Akij Foods, and Bengal Group.",
    audiences: [
      "CMOs and senior brand leaders",
      "Brand and marketing teams in growth mode",
      "Boards reviewing brand investment",
    ],
    takeaways: [
      "A framework for choosing compounding work over virality",
      "A measurement framework that protects the compounding curve",
      "An editorial practice that keeps the work on-brand over years",
    ],
    formats: ["Keynote (45 min)", "Leadership off-site (90 min)"],
    durationOptions: ["45 minutes", "90 minutes"],
    customizationNote:
      "The talk is customisable for CMOs, brand teams, and boards. The leadership off-site includes a working session on the team's current portfolio and where compounding is or is not present.",
    relatedInsightSlugs: ["compounding-beats-virality", "twelve-brands-one-discipline"],
    verificationStatus: "draft",
  },
  {
    slug: "branding-a-nation",
    title: "Branding a Nation on the Global Stage",
    shortAbstract:
      "What the Bangladesh brand needs to do to compete on the global stage — and what boardrooms, ministries, and category leaders can do about it.",
    fullAbstract:
      "Branding a Nation on the Global Stage is a talk on what the Bangladesh brand needs to do to compete on the global stage. The talk covers the operating choices that public-sector and private-sector leaders can make to compound the country's brand, the measurement framework that protects it, and the editorial practice that holds the line across administrations. The talk is grounded in the work at the World Brand Congress and the Asia Marketing Federation.",
    audiences: [
      "Ministries and public-sector leaders",
      "Boards of category-leading Bangladesh companies",
      "Industry bodies and chambers of commerce",
    ],
    takeaways: [
      "An operating framing for national brand investment",
      "A measurement framework that survives political cycles",
      "A category-by-category plan for compounding brand equity",
    ],
    formats: ["Keynote (45 min)", "Policy briefing (90 min)"],
    durationOptions: ["45 minutes", "90 minutes"],
    customizationNote:
      "The talk is customisable for ministries, industry bodies, and the boards of category-leading companies. The policy briefing includes a closed-door discussion.",
    relatedInsightSlugs: ["geography-is-a-category", "compounding-beats-virality"],
    verificationStatus: "draft",
  },
  {
    slug: "reputation-rebuilt-in-public",
    title: "Reputation Rebuilt in Public",
    shortAbstract:
      "A case study-driven talk on the discipline of narrative repair under public scrutiny.",
    fullAbstract:
      "Reputation Rebuilt in Public is a case study-driven talk on the discipline of narrative repair under public scrutiny. The talk draws on the Bengal Cement turnaround and other operator-led work to walk through the discipline of crisis communication: the stakeholder map, the evidence-led public update, the measurement framework, and the long arc of the narrative shift. The talk is built for boards, executive committees, and corporate affairs leadership.",
    audiences: [
      "Boards and executive committees facing a public situation",
      "Corporate affairs and communications leadership",
      "Crisis and reputation professionals",
    ],
    takeaways: [
      "A stakeholder-first approach to crisis communication",
      "An evidence-led public update cadence",
      "A measurement framework that protects the long arc",
    ],
    formats: ["Keynote (45 min)", "Closed-door briefing (90 min)"],
    durationOptions: ["45 minutes", "90 minutes"],
    customizationNote:
      "The talk is customisable for boards, executive committees, and corporate affairs leadership. The closed-door briefing is built around the client's specific situation.",
    relatedInsightSlugs: ["reputation-is-rebuilt-in-public", "twelve-brands-one-discipline"],
    verificationStatus: "draft",
  },
];

export const pastStages = [
  {
    name: "World Brand Congress",
    location: "Mumbai, India",
    year: "2024",
    description: "Featured speaker on AI-first marketing operating models.",
    verificationStatus: "needs-verification" as const,
  },
  {
    name: "Asia Marketing Federation",
    location: "Regional",
    year: "2023",
    description: "Featured speaker on compounding brand equity across APAC.",
    verificationStatus: "needs-verification" as const,
  },
  {
    name: "FMCG & Consumer Goods Marketing Summit",
    location: "Dhaka, Bangladesh",
    year: "2021",
    description: "Featured speaker on category entry in legacy FMCG portfolios.",
    verificationStatus: "needs-verification" as const,
  },
];
