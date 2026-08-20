export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2022 — Present",
    title: "Automation Engineer & Systems Consultant",
    org: "Freelance",
    description:
      "Design and deploy AI-powered workflow automations, internal tools, and business applications for operations, compliance, and customer engagement — integrating APIs, CRMs, databases, and communication platforms end to end.",
  },
  {
    period: "2019 — 2024",
    title: "Growth Specialist & E-Commerce Consultant",
    org: "Freelance",
    description:
      "Managed Shopify stores and customer acquisition, ran Meta advertising and marketing automation, and built lead-generation systems — the operational experience that later informed which automations actually matter.",
  },
];

export const education = [
  {
    title: "Full Stack Development Bootcamp",
    org: "GoIT Philippines",
    description: "HTML, CSS, JavaScript, React, Node.js",
  },
  {
    title: "B.S. Hotel & Restaurant Management",
    org: "University of Baguio",
    description: "",
  },
];

export type Certification = {
  name: string;
  issuer?: string;
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "Claude 101",
    issuer: "Anthropic / Skilljar",
    verifyUrl: "https://verify.skilljar.com/c/65nacj5p3qax",
  },
  {
    name: "Claude Code",
    issuer: "Anthropic / Skilljar",
    verifyUrl: "https://verify.skilljar.com/c/aa92f3ws29aw",
  },
  { name: "Shopify & Facebook Ads Training" },
  { name: "Facebook Messaging Ads Course" },
  { name: "TESOL Certification" },
];
