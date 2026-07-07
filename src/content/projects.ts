export type Metric = { label: string; value: string };
export type ChallengeSolution = { challenge: string; solution: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  featured: boolean;
  order: number;
  summary: string;
  overview: string;
  problem?: string;
  businessGoal?: string;
  solution?: string;
  architectureDiagram?: string;
  techStack: string[];
  highlights: string[];
  challenges?: ChallengeSolution[];
  impact: string;
  metrics?: Metric[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "enterprise-ai-voice-call-center",
    name: "Enterprise AI Voice Call Center",
    category: "AI Voice & Telephony",
    featured: true,
    order: 1,
    summary:
      "An AI-powered voice call center that answers inbound calls, understands intent, and routes conversations into the right workflow automatically.",
    overview:
      "Built an AI-powered voice call center that automatically handles inbound phone calls, identifies caller intent using an LLM, and routes conversations into specialized workflows for different request types. The system conducts natural voice conversations, collects structured information, stores it in a database, and automatically notifies the appropriate team.",
    problem:
      "Every inbound call had to be answered, triaged, and routed by a human before any actual work could start. Simple, repetitive requests (status checks, basic intake) consumed the same attention as urgent ones, and nothing was categorized until someone manually wrote it down.",
    businessGoal:
      "Answer every call immediately, classify intent automatically, and get structured information into the right workflow and the right inbox without a human doing the first pass.",
    solution:
      "A Twilio Voice number feeds live audio into a Power Automate flow, which streams the conversation through GPT for real-time intent detection. Based on the detected intent, the call is routed into one of several specialized conversational flows, each responsible for collecting a specific set of structured fields through natural dialogue rather than rigid IVR menus.",
    architectureDiagram: `flowchart TD
    A[Inbound Call] --> B[Twilio Voice]
    B --> C[Power Automate Flow]
    C --> D[OpenAI GPT — Intent Detection]
    D -->|Intent A| E[Workflow: Lead Intake]
    D -->|Intent B| F[Workflow: Support Request]
    D -->|Intent C| G[Workflow: General Inquiry]
    E --> H[SharePoint — Structured Data]
    F --> H
    G --> H
    H --> I[Automated Notification]
    I --> J[Team Inbox / Teams Channel]`,
    techStack: ["Power Automate", "OpenAI GPT", "Twilio Voice", "SharePoint", "HTTP APIs", "XML/TwiML"],
    highlights: [
      "Multi-flow conversational AI",
      "Intelligent intent detection",
      "Dynamic voice responses",
      "Lead qualification",
      "Automated notifications",
      "CRM integration",
      "End-to-end workflow automation",
    ],
    challenges: [
      {
        challenge: "TwiML responses need to feel like a conversation, not a phone tree, while still being generated dynamically per turn.",
        solution:
          "Built a flow that generates TwiML on the fly from the LLM's response text, so the voice prompt changes naturally based on what the caller just said instead of playing from a fixed script.",
      },
      {
        challenge: "Misrouted intent early in the call wastes the entire conversation.",
        solution:
          "Intent detection runs on the first meaningful utterance and is re-checked if the caller's answers don't match the expected shape for that workflow, allowing a mid-call correction instead of a dead end.",
      },
    ],
    impact:
      "Reduced manual call handling while ensuring every inquiry is automatically categorized and routed to the correct workflow — no call goes untriaged, and structured data is available immediately instead of after manual note-taking.",
    lessonsLearned: [
      "Voice UX is a different discipline from chat UX — latency and turn-taking matter more than response quality alone.",
      "Designing the intent taxonomy up front (before building flows) prevented a lot of rework later.",
    ],
    futureImprovements: [
      "Add sentiment detection to flag frustrated callers for immediate human handoff.",
      "Persist full call transcripts for QA and intent-model tuning.",
    ],
  },
  {
    slug: "driver-compliance-automation-platform",
    name: "Driver Compliance Automation Platform",
    category: "Business Process Automation",
    featured: true,
    order: 2,
    summary:
      "A production automation platform that runs an entire driver compliance process end to end — intake, payment, AI document review, and generated paperwork — with almost no manual steps.",
    overview:
      "Built a production-ready automation platform that manages an entire driver compliance process from intake to completion. The platform orchestrates multiple workflows, processes payments, analyzes uploaded documents with AI, automates browser tasks, generates compliance documents, monitors results, and sends notifications throughout the lifecycle.",
    problem:
      "Driver compliance was a manual, multi-step process spread across payment collection, document review, third-party portal entry, and paperwork generation — each handoff was a place for delay or error, and status was invisible until someone checked in on it.",
    businessGoal:
      "Turn a case from intake to compliant status with minimal human intervention, while keeping every step auditable and recoverable if something fails partway through.",
    solution:
      "Nine interconnected n8n workflows orchestrate the full lifecycle: intake triggers a Stripe payment, uploaded documents are analyzed by an AI model for validity and data extraction, Playwright drives browser automation against a third-party portal where no API exists, and Supabase/PostgreSQL tracks case state throughout — with Twilio, Gmail, and Slack notifications firing at each milestone.",
    architectureDiagram: `flowchart TD
    A[Intake Form] --> B[n8n Orchestrator]
    B --> C[Stripe — Payment]
    C --> D[Document Upload]
    D --> E[AI Document Analysis]
    E --> F[Playwright — Browser Automation]
    F --> G[Third-Party Portal]
    B --> H[(Supabase / PostgreSQL)]
    E --> H
    F --> H
    H --> I[Status Monitoring]
    I --> J[Twilio SMS]
    I --> K[Gmail]
    I --> L[Slack]`,
    techStack: ["n8n", "Supabase", "PostgreSQL", "Stripe", "Twilio", "Gmail", "Slack", "Playwright", "Fly.io", "REST APIs"],
    highlights: [
      "9 interconnected workflows",
      "AI document processing",
      "Browser automation",
      "Payment automation",
      "Status monitoring",
      "Database orchestration",
      "Automated notifications",
      "Error recovery",
      "Production deployment",
    ],
    challenges: [
      {
        challenge: "The third-party compliance portal has no API, so the only way in is a browser.",
        solution:
          "Used Playwright to automate the portal directly, with explicit wait conditions and retry logic since the portal's own reliability, not just the automation, had to be accounted for.",
      },
      {
        challenge: "Nine workflows means nine places a case can silently get stuck.",
        solution:
          "Every workflow writes state transitions to Postgres, and a dedicated monitoring flow polls for cases that haven't advanced within an expected window, escalating to Slack instead of failing silently.",
      },
    ],
    impact:
      "Replaced a complex manual compliance workflow with a fully automated pipeline capable of processing cases with minimal human intervention, from payment through to a completed compliance record.",
    lessonsLearned: [
      "Browser automation against a third-party UI is inherently more fragile than an API integration — building in retries and alerting from day one paid off repeatedly.",
      "Splitting the pipeline into small, single-responsibility workflows made debugging any one stage far easier than one monolithic flow would have.",
    ],
    futureImprovements: [
      "Add a case-status dashboard for non-technical staff instead of relying on Slack alerts alone.",
      "Explore a direct integration if the third-party portal ever exposes an API.",
    ],
  },
  {
    slug: "ai-social-media-publishing-platform",
    name: "AI Social Media Publishing Platform",
    category: "AI Content & Marketing",
    featured: true,
    order: 3,
    summary:
      "Architecture for a platform where users generate social content and images with AI agents, then preview, schedule, and publish across multiple platforms from one dashboard.",
    overview:
      "Designed the architecture for an AI-powered content generation and publishing platform that enables users to generate social media content through AI agents, create images, preview posts, and publish or schedule them across multiple platforms from a single interface.",
    problem:
      "Producing on-brand social content and getting it live across multiple platforms are two separate jobs — writing/design tools don't publish, and publishing tools don't generate — forcing teams to stitch several point solutions together by hand.",
    businessGoal:
      "Give a user one interface to generate content and imagery with AI, preview exactly what will be posted, and publish or schedule it across platforms — collapsing the content and distribution steps into one workflow.",
    solution:
      "A Next.js dashboard backed by Convex handles auth, scheduling state, and user-provided API keys. AI agents generate copy variations per platform; Replicate/FLUX generates accompanying imagery; the Late API handles multi-platform publishing and scheduling through OAuth-connected accounts, with a preview layer showing exactly how each post will render before it goes live.",
    architectureDiagram: `flowchart TD
    A[User] --> B[Next.js Dashboard]
    B --> C[Convex Backend]
    C --> D[AI Agent — Content Generation]
    D --> E[Replicate / FLUX — Image Generation]
    D --> F[Kimi API — Copy Variants]
    B --> G[Preview Layer]
    G --> H[Late API — Scheduling & Publishing]
    H --> I[Connected Social Accounts — OAuth]`,
    techStack: ["Next.js", "Convex", "AI Agents", "Late API", "Replicate", "FLUX", "Kimi API", "TypeScript"],
    highlights: [
      "AI content generation",
      "Multi-platform publishing",
      "OAuth integrations",
      "Image generation",
      "Scheduling",
      "User API keys",
      "Dashboard UI",
      "Social account management",
    ],
    challenges: [
      {
        challenge: "Each social platform has different content constraints (length, image ratio, formatting) for the same underlying post.",
        solution:
          "Content generation is platform-aware from the start — the AI agent produces per-platform variants rather than one post force-fit into every format, with the preview layer catching mismatches before publishing.",
      },
      {
        challenge: "Letting users bring their own API keys means the architecture can't assume a single shared provider account.",
        solution:
          "Designed a per-user credential layer so API keys and connected accounts are scoped to the user, keeping usage and cost attribution correct.",
      },
    ],
    impact:
      "Created a scalable architecture for managing AI-generated marketing content across multiple social networks from one centralized platform, rather than juggling separate generation and publishing tools.",
    lessonsLearned: [
      "Designing the preview layer early forced good decisions about platform-specific formatting that would have been painful to retrofit.",
      "Treating scheduling and publishing as a first-class backend concern (not a UI afterthought) made multi-platform support far more tractable.",
    ],
    futureImprovements: [
      "Add analytics feedback so AI content generation can learn from what actually performs per platform.",
      "Support team accounts with shared content calendars and approval steps.",
    ],
  },
  {
    slug: "ai-knowledge-base-assistant",
    name: "AI Knowledge Base Assistant",
    category: "AI Agents & RAG",
    featured: true,
    order: 4,
    summary:
      "A RAG-powered chatbot that answers questions from a company's own documentation, with retrieval and prompt design tuned for accurate, context-grounded responses.",
    overview:
      "Built an AI chatbot powered by a structured knowledge base capable of answering questions using company documentation. Designed retrieval workflows, prompt engineering, and context-aware responses to reduce manual customer support and improve information accessibility.",
    problem:
      "Answers to common questions already existed somewhere in scattered documentation, but finding them meant searching multiple documents manually or asking a person who happened to know — slow for users and repetitive for whoever kept answering the same questions.",
    businessGoal:
      "Let anyone ask a question in plain language and get an accurate answer grounded in the actual documentation, instead of a generic LLM guess or a manual search.",
    solution:
      "Documentation is chunked and embedded into a Supabase vector store. Incoming questions are embedded and matched against that store to retrieve the most relevant passages, which are then passed as grounded context to Claude/OpenAI along with a prompt designed to answer only from the retrieved material and say so when it can't.",
    architectureDiagram: `flowchart TD
    A[User Question] --> B[Next.js Chat UI]
    B --> C[n8n Orchestration]
    C --> D[Embed Query]
    D --> E[(Supabase — Vector Search)]
    E --> F[Retrieved Context]
    F --> G[Claude / OpenAI — Answer Generation]
    G --> H[Context-Aware Response]
    H --> B`,
    techStack: ["Claude", "OpenAI", "Supabase", "Vector Search", "Next.js", "n8n"],
    highlights: [
      "RAG architecture",
      "Knowledge retrieval",
      "Prompt engineering",
      "Semantic search",
      "AI chatbot",
      "Context-aware responses",
    ],
    challenges: [
      {
        challenge: "An LLM will confidently answer even when the retrieved context doesn't actually contain the answer.",
        solution:
          "Constrained the system prompt to answer strictly from retrieved passages and explicitly say when the knowledge base doesn't cover a question, rather than falling back on the model's general knowledge.",
      },
      {
        challenge: "Chunking documentation naively breaks answers across chunk boundaries.",
        solution:
          "Tuned chunk size and overlap against real documentation structure so retrieved passages stay coherent instead of cutting answers in half.",
      },
    ],
    impact:
      "Reduced manual, repetitive support questions by giving users a direct, self-serve path to accurate answers grounded in existing documentation.",
    lessonsLearned: [
      "Retrieval quality matters more than model choice — a better retriever with a mid-tier model consistently beat a great model on bad retrieval.",
      "Explicitly designing for 'I don't know' responses builds more trust than an assistant that always sounds confident.",
    ],
    futureImprovements: [
      "Add source citations so users can verify answers against the original document.",
      "Feed unanswered/low-confidence questions back into a documentation-gap report.",
    ],
  },
  {
    slug: "rental-lead-automation-platform",
    name: "Rental Lead Automation Platform",
    category: "Lead & CRM Automation",
    featured: true,
    order: 5,
    summary:
      "Turns an inbound rental inquiry email into a fully created guest card in the property management system automatically — no manual data entry.",
    overview:
      "Developed an automation that processes incoming rental inquiry emails, extracts prospect information, matches properties through a lookup system, and creates guest cards automatically using a property management API.",
    problem:
      "Every rental inquiry email had to be read, its details manually typed into the property management system, and matched to the right property by hand — a repetitive, error-prone process every single time a lead came in.",
    businessGoal:
      "Get a new inquiry into the property management system as a guest card, correctly matched to its property, within seconds of the email arriving — with zero manual re-typing.",
    solution:
      "A Power Automate flow triggers on incoming inquiry emails, parses the unstructured email body into structured prospect fields, cross-references the property using an Excel Online lookup table, and calls the property management REST API to create the guest card — sending a success or error notification on completion.",
    architectureDiagram: `flowchart LR
    A[Inbound Inquiry Email] --> B[Power Automate Trigger]
    B --> C[Parse Prospect Data]
    C --> D[Excel Online — Property Lookup]
    D --> E[Property Management REST API]
    E --> F[Guest Card Created]
    E --> G[Success / Error Notification]`,
    techStack: ["Power Automate", "Excel Online", "REST API", "HTTP", "Email Automation"],
    highlights: [
      "Email parsing",
      "Property matching",
      "API integration",
      "Automated lead creation",
      "Success/error notifications",
    ],
    challenges: [
      {
        challenge: "Inquiry emails aren't structured — property names are written inconsistently across different lead sources.",
        solution:
          "Built a fuzzy-matching lookup against the property table instead of requiring an exact string match, with a fallback notification when no confident match is found so no lead silently disappears.",
      },
    ],
    impact:
      "Reduced manual lead entry from several minutes per inquiry to a fully automated process completed in seconds, saving significant daily administrative time.",
    metrics: [
      { label: "Manual entry time (before)", value: "~5–10 min / inquiry" },
      { label: "Automated processing time", value: "Seconds" },
    ],
    lessonsLearned: [
      "The messiest part of automating a 'simple' process is almost always the unstructured input, not the API integration at the end.",
    ],
    futureImprovements: [
      "Add confidence scoring on property matches and route low-confidence matches to a human review queue instead of a hard fail.",
    ],
  },
  {
    slug: "ai-website-builder-qa-system",
    name: "AI Website Builder QA System",
    category: "QA & Testing",
    featured: false,
    order: 6,
    summary:
      "QA and test planning for an AI-powered website editor that lets users modify page sections with natural language.",
    overview:
      "Led quality assurance and testing for a next-generation AI website editor that allows users to modify individual page sections using natural language. Designed comprehensive testing plans covering UI behavior, AI editing workflows, responsiveness, regression testing, and production readiness.",
    techStack: ["Next.js", "AI Editing", "Vercel", "QA Testing", "UX Testing", "Bug Reporting"],
    highlights: [
      "Test planning",
      "Regression testing",
      "AI feature validation",
      "Mobile testing",
      "UX validation",
      "Bug reporting",
      "Production readiness",
    ],
    impact:
      "Improved confidence in product stability before release by systematically validating AI-assisted editing workflows across multiple scenarios.",
  },
  {
    slug: "sales-page-generator",
    name: "Sales Page Generator",
    category: "AI Content & Marketing",
    featured: false,
    order: 7,
    summary:
      "An AI app that generates complete, editable sales pages — copy, layout, and content — from a single prompt.",
    overview:
      "Developed an AI-powered application that generates complete sales pages from simple prompts. The system creates marketing copy, page structures, and editable website content while supporting AI-assisted section editing and iterative refinements.",
    techStack: ["Next.js", "AI", "React", "TypeScript", "Vercel"],
    highlights: [
      "AI copy generation",
      "Landing page generation",
      "Section editing",
      "Prompt engineering",
      "Responsive UI",
    ],
    impact:
      "Gave users a way to go from a one-line idea to a complete, editable sales page without a designer or copywriter in the loop.",
  },
  {
    slug: "ai-book-recommendation-assistant",
    name: "AI Book Recommendation Assistant",
    category: "AI Agents & RAG",
    featured: false,
    order: 8,
    summary:
      "A conversational AI assistant that recommends books based on a reader's interests, with natural explanations for each suggestion.",
    overview:
      "Created an AI assistant that recommends books based on user interests and reading preferences, using conversational AI to deliver personalized recommendations with natural explanations.",
    techStack: ["LLM", "React", "Node.js"],
    highlights: ["Conversational recommendations", "Preference modeling", "Natural-language explanations"],
    impact:
      "Delivered personalized book suggestions through natural conversation rather than static filters and star ratings.",
  },
  {
    slug: "luxury-fragrance-ai-assistant",
    name: "Luxury Fragrance AI Assistant",
    category: "AI Agents & RAG",
    featured: false,
    order: 9,
    summary:
      "An AI assistant that recommends fragrances based on scent preferences and occasion, with detailed, personalized product guidance.",
    overview:
      "Developed an AI-powered assistant that recommends fragrances based on scent preferences, occasions, and personal taste while providing detailed product information and personalized suggestions.",
    techStack: ["AI", "Prompt Engineering", "React"],
    highlights: ["Preference-based recommendations", "Occasion-aware suggestions", "Detailed product guidance"],
    impact:
      "Replicated the guidance of an in-store fragrance consultant through a conversational interface.",
  },
  {
    slug: "marketing-and-workflow-automation-systems",
    name: "Marketing & Workflow Automation Systems",
    category: "Business Process Automation",
    featured: false,
    order: 10,
    summary:
      "A sample of 15+ smaller automations connecting CRMs, e-commerce platforms, marketing tools, and databases across different clients and use cases.",
    overview:
      "Designed and implemented numerous business automation solutions connecting CRMs, marketing platforms, e-commerce systems, databases, and communication tools. Built AI-powered workflows to eliminate repetitive tasks, synchronize data, automate reporting, and improve operational efficiency.",
    techStack: ["n8n", "Power Automate", "APIs", "Supabase", "Shopify", "WooCommerce", "HubSpot", "Klaviyo", "Stripe", "Twilio"],
    highlights: [
      "API integrations",
      "CRM automation",
      "Workflow orchestration",
      "Marketing automation",
      "AI agents",
      "Database synchronization",
      "Reporting automation",
    ],
    impact:
      "Automated business processes that reduced manual work, improved data accuracy, and accelerated operational workflows across a range of clients and platforms.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
export const gridProjects = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
