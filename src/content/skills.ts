export type SkillCategory = {
  category: string;
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "AI & LLMs",
    description: "Designing systems that reason, retrieve, and act — not just chat.",
    items: [
      "OpenAI GPT",
      "Claude & Claude Code",
      "Gemini",
      "Prompt Engineering",
      "AI Agents",
      "RAG / Vector Search",
      "MCP",
    ],
  },
  {
    category: "Automation & Orchestration",
    description: "The plumbing that makes AI systems reliable in production.",
    items: [
      "n8n",
      "Power Automate",
      "Make.com",
      "Zapier",
      "Webhooks",
      "REST APIs",
      "Workflow Design",
    ],
  },
  {
    category: "Full-Stack Development",
    description: "Shipping the interfaces and services around the automation.",
    items: [
      "Next.js",
      "React",
      "TypeScript / JavaScript",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "GraphQL",
    ],
  },
  {
    category: "Business Systems",
    description: "Fluent in the tools the automation actually connects to.",
    items: [
      "Shopify",
      "WooCommerce",
      "HubSpot",
      "Klaviyo",
      "Salesforce",
      "Airtable",
      "Stripe",
      "Twilio",
    ],
  },
];
