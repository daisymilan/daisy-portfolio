export type Service = {
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    title: "AI Agents & Automation Systems",
    description:
      "End-to-end design and build of AI-powered workflows — voice, chat, or backend agents that make decisions and take action, not just generate text.",
    deliverables: [
      "Intent detection & conversational routing",
      "RAG / knowledge-base assistants",
      "Multi-step orchestration (n8n, Power Automate)",
      "Production monitoring & error recovery",
    ],
  },
  {
    title: "Business Process Automation",
    description:
      "Replacing manual, repetitive operational work — data entry, approvals, notifications, reporting — with automated pipelines that run unattended.",
    deliverables: [
      "CRM & lead management automation",
      "Document processing & generation",
      "Payment & compliance workflows",
      "Cross-platform API integrations",
    ],
  },
  {
    title: "Full-Stack Application Development",
    description:
      "Dashboards, internal tools, and customer-facing apps built on Next.js and modern back-ends — the interface layer around the automation.",
    deliverables: [
      "Next.js / React applications",
      "Supabase / PostgreSQL data layer",
      "REST & GraphQL API integration",
      "Internal tools & admin dashboards",
    ],
  },
  {
    title: "Automation & AI Consulting",
    description:
      "Auditing how work actually moves through your business today and identifying where automation or AI will pay off first — before writing a line of code.",
    deliverables: [
      "Process mapping & opportunity assessment",
      "Tool & architecture recommendations",
      "Prompt engineering & AI feasibility review",
      "Implementation roadmap",
    ],
  },
];

export const engagementFaq = [
  {
    question: "What does a typical engagement look like?",
    answer:
      "I start by mapping how the process works today, propose an architecture, then build in staged, working increments so you see progress every step instead of waiting for one big reveal at the end.",
  },
  {
    question: "Do you work with existing systems, or only greenfield builds?",
    answer:
      "Most of my work integrates with what a business already runs — CRMs, e-commerce platforms, spreadsheets, legacy tools. The goal is usually to connect and automate what exists, not replace it.",
  },
  {
    question: "How involved do I need to be during the build?",
    answer:
      "Minimal but not zero — I need access/credentials for the systems involved and a short check-in at key milestones. Day-to-day implementation is on me.",
  },
  {
    question: "Can you work within an existing team's codebase and process?",
    answer:
      "Yes — several of the case studies on this site were built inside existing production systems alongside other engineers, not as standalone greenfield projects.",
  },
];
