export const site = {
  name: "Daisy Milan",
  role: "Full-Stack Developer",
  headline: "Full-Stack Developer building AI agents, workflow automation, and intelligent business systems.",
  roleTags: ["AI Systems Engineer", "Automation Architect", "Prompt Engineer"],
  bio: "I build the systems companies use to stop doing things by hand — AI agents that talk to customers, workflows that move data between a dozen tools, and dashboards that tell the truth about what's happening.",
  location: "Baguio City, Philippines",
  locationShort: "Philippines · Remote",
  email: "daisymilan3@gmail.com",
  social: {
    github: "https://github.com/daisymilan",
    linkedin: "https://linkedin.com/in/daisy-milan-04993bb9",
  },
  resumeUrl: "/resume/daisy-milan-resume.pdf",
  url: "https://daisy-portfolio-rho.vercel.app",
  metaDescription:
    "Daisy Milan is a full-stack developer and AI systems engineer building AI agents, workflow automation, and production business systems with Next.js, n8n, and modern LLMs.",
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
] as const;

export const process = [
  {
    step: "01",
    title: "Map the system",
    description:
      "Before any code, I trace how work actually moves today — every handoff, spreadsheet, and copy-paste — to find where automation removes the most friction.",
  },
  {
    step: "02",
    title: "Build the pipeline",
    description:
      "I design the architecture first (agents, APIs, data flow), then build in production-ready increments — not a fragile demo, a system meant to run unattended.",
  },
  {
    step: "03",
    title: "Ship, monitor, iterate",
    description:
      "Every system ships with logging, error recovery, and notifications, so failures surface immediately instead of silently piling up.",
  },
] as const;
