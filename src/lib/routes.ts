export const routes = {
  home: "/",
  about: "/about",
  work: "/work",
  services: "/services",
  insights: "/insights",
  playbook: "/playbook",
  speaking: "/speaking",
  recognition: "/recognition",
  press: "/press",
  contact: "/contact",
  newsletter: "/newsletter",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
} as const;

export const insightCategories = [
  "brand-strategy",
  "ai-in-marketing",
  "leadership",
  "crisis-communication",
  "growth",
] as const;

export const insightCategoryLabels: Record<(typeof insightCategories)[number], string> = {
  "brand-strategy": "Brand Strategy",
  "ai-in-marketing": "AI in Marketing",
  "leadership": "Leadership",
  "crisis-communication": "Crisis Communication",
  "growth": "Growth",
};

export const insightCategoryDescriptions: Record<(typeof insightCategories)[number], string> = {
  "brand-strategy":
    "Frameworks on category-defining brand work — architecture, equity, and the operator's discipline.",
  "ai-in-marketing":
    "How AI is integrated into a marketing operating model — with the operator's judgment at the centre.",
  "leadership":
    "On the operator-to-executive transition, the boardroom practice, and the work that compounds across a career.",
  "crisis-communication":
    "The discipline of narrative repair under public scrutiny — stakeholder-first, evidence-led, measurable.",
  "growth":
    "The market, the geography, and the financial lines that decide whether growth compounds.",
};

// WCAG AAA definitions: AI = Artificial Intelligence
