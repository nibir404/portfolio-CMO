export type VerificationStatus = "verified" | "draft" | "needs-verification";

export type InsightCategory =
  | "brand-strategy"
  | "ai-in-marketing"
  | "leadership"
  | "crisis-communication"
  | "growth";

export type InsightFormat = "Essay" | "Reel" | "Short" | "Podcast" | "LinkedIn" | "Note";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedAt?: string;
  updatedAt?: string;
  noIndex?: boolean;
};

export type SeoKeyword = {
  primary: string;
  secondary?: string[];
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  intro: string;
  audience: string[];
  problems: string[];
  deliverables: string[];
  process: string[];
  outcomes: string[];
  engagementModels: string[];
  faqs: FaqEntry[];
  relatedWorkSlugs: string[];
  relatedInsightSlugs: string[];
  keywords: SeoKeyword;
  seo: PageSeo;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  context?: string;
};

export type CaseStudyBody = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type WorkCaseStudy = {
  slug: string;
  chapter: string;
  title: string;
  company: string;
  sector: string;
  timeframe: string;
  role: string;
  summary: string;
  scope: string;
  situation: string;
  decision: string;
  approach: string[];
  execution: string[];
  outcome: string;
  metrics: CaseStudyMetric[];
  whatTransferred: string;
  relatedServiceSlugs: string[];
  relatedInsightSlugs: string[];
  relatedWorkSlugs?: string[];
  image: string;
  imageAlt: string;
  verificationStatus: VerificationStatus;
  claimNotes: string[];
  keywords: SeoKeyword;
  seo: PageSeo;
};

export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  pullQuote?: string;
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  format: InsightFormat;
  duration: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  featured: boolean;
  poster: string;
  posterAlt: string;
  hasVideo?: boolean;
  hasAudio?: boolean;
  hasPdf?: boolean;
  keyTakeaways: string[];
  body: InsightSection[];
  relatedServiceSlugs: string[];
  relatedWorkSlugs: string[];
  relatedInsightSlugs?: string[];
  verificationStatus: VerificationStatus;
  keywords: SeoKeyword;
  seo: PageSeo;
};

export type SpeakingTopic = {
  slug: string;
  title: string;
  shortAbstract: string;
  fullAbstract: string;
  audiences: string[];
  takeaways: string[];
  formats: string[];
  durationOptions: string[];
  customizationNote: string;
  relatedInsightSlugs: string[];
  verificationStatus: VerificationStatus;
};

export type RecognitionCategory = "International" | "Government & National" | "Industry & Institutional";

export type RecognitionItem = {
  title: string;
  issuer: string;
  year: string;
  context?: string;
  sourceUrl?: string;
  verificationStatus: VerificationStatus;
};

export type RecognitionGroup = {
  category: RecognitionCategory;
  items: RecognitionItem[];
};

export type PressItemType = "feature" | "interview" | "appearance" | "mention";

export type PressItem = {
  title: string;
  outlet: string;
  type: PressItemType;
  date?: string;
  summary: string;
  url?: string;
  verificationStatus: VerificationStatus;
};

export type EducationMilestone = {
  year: string;
  institution: string;
  program: string;
  status: string;
  verificationStatus: VerificationStatus;
};

export type Principle = {
  n: string;
  title: string;
  description: string;
};

export type ProofStat = {
  value: string;
  label: string;
  context?: string;
  verificationStatus: VerificationStatus;
};

export type CareerMilestone = {
  year: string;
  role: string;
  organisation: string;
  note?: string;
};

export type Profile = {
  name: string;
  jobTitle: string;
  worksFor: string;
  location: string;
  shortBio: string;
  paragraphs: string[];
  email: string;
  phone?: string;
  calCom: string;
  social: Array<{ label: string; href: string }>;
  sameAs: string[];
  credentials: string[];
  career: CareerMilestone[];
  beyond: string[];
};

export type Site = {
  origin: string;
  name: string;
  description: string;
  locale: string;
  officeEmail: string;
  speakingEmail: string;
  pressEmail: string;
  phone?: string;
  calCom: string;
  social: Array<{ label: string; href: string }>;
  sameAs: string[];
  navItems: Array<{ label: string; href: string }>;
  footerGroups: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
};
