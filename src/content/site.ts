import type { Site } from "@/types/content";

export const site: Site = {
  origin: "https://abdullahalamin.me",
  name: "Abdullah Al Alamin",
  description:
    "Group CMO of Betopia Group. Fractional CMO mandates, board advisory, 90-day growth sprints, and AI marketing transformation for category leaders in Bangladesh and South Asia.",
  locale: "en_GB",
  officeEmail: "office@abdullahalamin.me",
  speakingEmail: "speaking@abdullahalamin.me",
  pressEmail: "press@abdullahalamin.me",
  // Add a verified business number here. The UI hides the phone block while empty.
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
    { label: "Services", href: "/services" },
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
        { label: "Insights", href: "/insights" },
        { label: "Speaking", href: "/speaking" },
        { label: "Recognition", href: "/recognition" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Fractional CMO", href: "/services/fractional-cmo" },
        { label: "Board Advisory", href: "/services/board-advisory" },
        { label: "90-Day Growth Sprint", href: "/services/growth-sprint" },
        { label: "AI Marketing Transformation", href: "/services/ai-marketing-transformation" },
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
