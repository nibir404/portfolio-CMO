import type { RecognitionGroup } from "@/types/content";

export const recognition: RecognitionGroup[] = [
  {
    category: "International",
    items: [
      {
        title: "Global Brand Leadership Award",
        issuer: "World Brand Congress, Mumbai",
        year: "2024",
        verificationStatus: "needs-verification",
      },
      {
        title: "Asia Pacific Marketing Excellence Award",
        issuer: "Asia Marketing Federation",
        year: "2023",
        verificationStatus: "needs-verification",
      },
      {
        title: "International Corporate Communication Excellence Award",
        issuer: "International Association of Business Communicators (IABC)",
        year: "2022",
        verificationStatus: "needs-verification",
      },
      {
        title: "Commonwealth Marketing Innovation Recognition",
        issuer: "Commonwealth Business Council, London",
        year: "2021",
        verificationStatus: "needs-verification",
      },
    ],
  },
  {
    category: "Government & National",
    items: [
      {
        title: "Digital Bangladesh Innovation Award",
        issuer: "ICT Division, Government of Bangladesh",
        year: "2023",
        verificationStatus: "needs-verification",
      },
      {
        title: "National Marketing Excellence Award",
        issuer: "Ministry of Commerce, Government of Bangladesh",
        year: "2022",
        verificationStatus: "needs-verification",
      },
      {
        title: "Meritorious Service Recognition",
        issuer: "Bangladesh Navy, Ministry of Defence",
        year: "2018",
        verificationStatus: "needs-verification",
      },
      {
        title: "Community Development Excellence Award",
        issuer: "Bangladesh Scouts, National Headquarters",
        year: "2016",
        verificationStatus: "needs-verification",
      },
    ],
  },
  {
    category: "Industry & Institutional",
    items: [
      {
        title: "Outstanding Brand Builder Award",
        issuer: "FMCG & Consumer Goods Marketing Summit, Dhaka",
        year: "2021",
        verificationStatus: "needs-verification",
      },
      {
        title: "Corporate Communication Excellence Award",
        issuer: "Public Relations Society of Bangladesh",
        year: "2020",
        verificationStatus: "needs-verification",
      },
      {
        title: "Scout Wood Badge · Leadership Training Award",
        issuer: "Bangladesh Scouts, Naval Region",
        year: "2015",
        verificationStatus: "needs-verification",
      },
      {
        title: "Youth Leadership Recognition Award",
        issuer: "Daffodil International University",
        year: "2014",
        verificationStatus: "needs-verification",
      },
    ],
  },
];

export const recognitionSummary = {
  total: recognition.reduce((acc, group) => acc + group.items.length, 0),
  international: recognition[0]?.items.length ?? 0,
  government: recognition[1]?.items.length ?? 0,
  industry: recognition[2]?.items.length ?? 0,
};
