import type { Site } from "@/types/content";

export const site: Site = {
  origin: "https://abdullahalamin.me",
  name: "Abdullah Al Alamin",
  description:
    "Business Transformation Advisor & AI Business Strategist. Scoped corporate transformation, brand repositioning, system scaling, and international market entry for ambitious conglomerates and category leaders across South Asia and APAC.",
  locale: "en_GB",
  officeEmail: "office@abdullahalamin.me",
  speakingEmail: "speaking@abdullahalamin.me",
  pressEmail: "press@abdullahalamin.me",
  phone: undefined,
  calCom: "https://cal.com/abdullah-al-alamin",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-al-alamin" },
    { label: "X", href: "https://x.com/abdullah_alamin" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/abdullah-al-alamin",
    "https://x.com/abdullah_alamin",
  ],
  navItems: [
    { label: "Leadership", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Capabilities", href: "/services" },
    { label: "Insights", href: "/insights" },
    { label: "Speaking", href: "/speaking" },
    { label: "About", href: "/about" },
  ],
  footerGroups: [
    {
      title: "Explore",
      links: [
        { label: "Leadership", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Capabilities", href: "/services" },
        { label: "Speaking", href: "/speaking" },
        { label: "Recognition", href: "/recognition" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "AI Business Transformation", href: "/services/ai-business-transformation" },
        { label: "Brand Transformation", href: "/services/brand-transformation" },
        { label: "Business Growth & Scaling", href: "/services/growth-scaling" },
        { label: "International Expansion", href: "/services/international-expansion" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Book a call", href: "/contact" },
        { label: "Get the playbook", href: "/playbook" },
        { label: "AlaminWeekly", href: "/newsletter" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-al-alamin" },
      ],
    },
  ],
};

export const currentYear = new Date().getFullYear();

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
