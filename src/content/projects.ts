export type Metric = { label: string; value: string };
export type ChallengeSolution = { challenge: string; solution: string };
export type CapabilityGroup = { title: string; items: string[] };

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
  /** Pull-quote style positioning statement, shown near the hero for flagship projects. */
  positioning?: string;
  /** Feature areas grouped by subsystem, e.g. "AI Lead Intelligence", "Security". */
  capabilities?: CapabilityGroup[];
  challenges?: ChallengeSolution[];
  /** Notable architecture/engineering decisions, shown as a standalone list. */
  engineeringDecisions?: string[];
  /** Testing and verification approach. */
  testing?: string[];
  impact: string;
  metrics?: Metric[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  github?: string;
  demo?: string;
  /** Short label for what kind of work this was, e.g. "Client work · in production". */
  status?: string;
  /** What Daisy personally did on it. */
  role?: string;
};

export const projects: Project[] = [
  {
    slug: "opspilot",
    status: "Personal project · deployed",
    role: "Sole developer — design, build, and deployment",
    name: "OpsPilot",
    category: "AI Systems / Automation / Full-Stack",
    featured: true,
    order: 0,
    summary:
      "A full-stack AI operations platform that analyzes leads, orchestrates workflows, routes high-risk actions through human approval, and maintains an auditable execution trail.",
    overview:
      "OpsPilot is a production-oriented AI operations platform that connects lead intake, AI intelligence, business rules, human approval, workflow orchestration, and operational monitoring into a single system. A lead moves from intake through AI analysis, confidence and priority evaluation, business-rule decisions, human approval when required, workflow execution, and audit logging — all as one traceable pipeline instead of five disconnected tools.",
    problem:
      "AI-generated recommendations and automated workflows are easy to prototype separately, but hard to trust together — most 'AI automation' stacks either let the model act unchecked or bottleneck everything behind a human, with no structured way to decide which actions need a person and no record of what actually happened.",
    businessGoal:
      "Give every lead a consistent path from intake to resolution: AI does the first-pass analysis, business rules decide what's safe to automate, a human approves anything higher-risk, and every step — AI output, decision, approval, execution — is written to an auditable trail.",
    solution:
      "A Next.js app on Vercel handles intake, dashboards, and the approval UI, backed by Supabase/PostgreSQL with Row Level Security for multi-tenant data isolation. Leads are analyzed through an AI provider abstraction currently backed by Anthropic Claude, producing structured output — confidence score, priority, and recommended action — that business rules evaluate to decide whether a workflow can run automatically or needs human approval first. n8n acts as a thin orchestration layer that triggers and sequences workflow execution once a lead is cleared to proceed, while the application itself owns the business logic, authorization, and audit logging.",
    architectureDiagram: `flowchart TD
    A[Lead Intake] --> B[Next.js / Vercel]
    B --> C[(Supabase / PostgreSQL + RLS)]
    C --> D[AI Analysis — Claude]
    D --> E[Confidence + Priority Scoring]
    E --> F[Business Rules Engine]
    F -->|Auto-approved| G[n8n Orchestration]
    F -->|Requires review| H[Human Approval Center]
    H -->|Approved| G
    H -->|Rejected| K[Audit Trail]
    G --> I[Workflow Execution]
    I --> J[Execution Explorer]
    I --> K
    J --> K`,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Row Level Security",
      "n8n",
      "Anthropic Claude",
      "REST APIs",
      "Webhooks",
      "Server Actions",
      "Zod",
      "Vitest",
      "Vercel",
    ],
    highlights: [
      "AI lead intelligence",
      "Human approval workflow",
      "Multi-tenant Row Level Security",
      "n8n workflow orchestration",
      "Append-only audit trail",
      "Operations dashboard",
      "Webhook authentication",
      "Production deployment",
    ],
    positioning:
      "Built a multi-tenant AI operations platform where AI analysis, workflow orchestration, database security, human approval, and operational monitoring work as one system — not five separate tools stitched together.",
    capabilities: [
      {
        title: "AI Lead Intelligence",
        items: [
          "Lead intake and persistence",
          "AI-powered lead analysis with structured output",
          "Confidence scoring and priority classification",
          "Recommended-action generation",
          "Business-rule evaluation",
          "AI provider abstraction with Anthropic Claude integration for structured lead intelligence",
        ],
      },
      {
        title: "Human Approval Center",
        items: [
          "Pending approval queue with AI score, confidence, priority, and reasoning surfaced inline",
          "Recently-decided approvals history",
          "Approve/reject workflow with required rejection reasons",
          "Role-based authorization",
          "Database-level authorization enforced through RLS",
        ],
      },
      {
        title: "Execution Explorer",
        items: [
          "Workflow execution history with status and timeline",
          "Execution detail views",
          "Audit events per execution",
          "Failed-execution handling with retry support",
        ],
      },
      {
        title: "Operations Dashboard",
        items: [
          "Lead and analysis KPIs",
          "Execution metrics, including average execution duration",
          "Database health",
          "n8n health",
          "AI-provider health state",
        ],
      },
      {
        title: "Security",
        items: [
          "Organization-based multi-tenancy",
          "Supabase authentication",
          "PostgreSQL Row Level Security for tenant isolation",
          "Service-role separation for protected system tables",
          "Webhook secret authentication with timing-safe comparison",
          "Append-only audit logging",
          "Role-based approval permissions",
          "Server-side AI and API calls",
        ],
      },
      {
        title: "Production Architecture",
        items: [
          "GitHub → Vercel deployment",
          "Supabase Cloud",
          "n8n Cloud",
          "Production webhooks",
          "Environment-based secret management",
          "Production error handling",
          "Automated CI checks",
        ],
      },
    ],
    challenges: [
      {
        challenge: "Letting AI drive business actions directly creates unbounded risk — but requiring human approval on everything defeats the point of automation.",
        solution:
          "Kept n8n as a thin orchestration layer and business logic in application services: AI output feeds a business-rules evaluation that decides per lead whether execution can proceed automatically or must route through the Human Approval Center first, with confidence and priority as the deciding signals.",
      },
      {
        challenge: "AI responses are naturally unstructured text, but downstream business rules and the approval UI need reliable, typed data to act on.",
        solution:
          "Wrapped the AI provider behind an abstraction that validates structured output (confidence score, priority, recommended action) with Zod before it reaches business rules, so a malformed or unexpected AI response fails loudly instead of silently corrupting a decision.",
      },
      {
        challenge: "Multi-tenant data with an orchestration layer and AI calls all touching the same tables is a wide attack surface for cross-tenant leaks.",
        solution:
          "Enforced tenant isolation at the database layer with PostgreSQL Row Level Security rather than relying on application-level filtering alone, and separated service-role writes for protected system tables (like audit logs) from the RLS-scoped access used everywhere else.",
      },
      {
        challenge: "n8n workflows need to trigger protected application actions over webhooks without becoming an open door into the system.",
        solution:
          "Authenticated inbound webhooks with a shared secret compared using timing-safe comparison, keeping n8n's role limited to sequencing and execution rather than trusted business logic.",
      },
    ],
    engineeringDecisions: [
      "n8n is used strictly as a thin orchestration layer — sequencing and triggering execution — while all business logic, validation, and authorization live in the application, so the automation platform never becomes the source of truth for decisions.",
      "AI output is validated as structured, typed data (via Zod) rather than trusted as free text, so downstream business rules and the approval UI always work against a known shape.",
      "Tenant isolation is enforced at the database layer with PostgreSQL Row Level Security, not just in application code, so a bug in a query can't leak data across organizations.",
      "Writes to protected system tables (like the audit log) go through a separate service-role path from normal RLS-scoped user access, keeping the append-only audit trail tamper-resistant from the application layer itself.",
      "High-risk or low-confidence actions are routed through an explicit Human Approval Center rather than a blanket approval-for-everything or approval-for-nothing rule, using confidence and priority scoring to decide which leads need a person.",
      "Every stage — AI analysis, business-rule decision, approval outcome, workflow execution — writes to an audit trail, so the system's behavior is reconstructable after the fact, not just observable while it runs.",
    ],
    testing: [
      "Vitest test suite",
      "Automated CI checks running on GitHub before deployment",
      "Explicit failed-execution states with retry support, exercised through the Execution Explorer",
      "Production error handling across the Next.js, Supabase, and n8n boundaries",
    ],
    impact:
      "OpsPilot is a real, deployed system connecting AI analysis, workflow orchestration, database security, human approval, and operational monitoring into a single auditable pipeline — built to demonstrate production-grade AI systems engineering, not a scripted demo.",
    lessonsLearned: [
      "Keeping the orchestration layer (n8n) intentionally thin made the system far easier to reason about — every important decision has one place to look, the application, instead of being split across workflow nodes.",
      "Structured-output validation at the AI boundary caught more integration issues than any amount of prompt tuning would have.",
    ],
    futureImprovements: [
      "Expand the AI provider abstraction to support additional models behind the same structured-output contract.",
      "Add configurable business rules per organization instead of a single shared rule set.",
    ],
    github: "https://github.com/daisymilan/opspilot-ai-automation",
  },
  {
    slug: "enterprise-ai-voice-call-center",
    status: "Client work · anonymized",
    role: "Designed and built the call flows and integrations",
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
    status: "Client work · in production",
    role: "Designed and built the workflows end to end",
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
      {
        challenge: "Staff sometimes update a case by hand in the dashboard, which would leave the automation out of step.",
        solution:
          "A database trigger calls the matching workflow whenever a case's status changes, so a manual edit advances the pipeline the same way an automated step does.",
      },
      {
        challenge: "Payments arrive through more than one payment account, as deposits or in full, and a missed or double-counted payment stalls a case.",
        solution:
          "A polling workflow merges both accounts, looks back over a short overlapping window, de-duplicates by payment ID, and only advances cases still at the payment stage — with final results held until the balance is paid.",
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
    status: "Architecture design",
    role: "Designed the system architecture",
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
    status: "Client work · anonymized",
    role: "Designed retrieval, prompts, and the chat workflow",
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
    status: "Client work · anonymized",
    role: "Designed and built the automation",
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
    slug: "architecture-firm-website-search-recovery",
    status: "Client work · live",
    role: "Sole developer — site build, audit, and search work",
    name: "Architecture Firm Website & Search Recovery",
    category: "Full-Stack / SEO & AI Visibility",
    featured: true,
    order: 5.1,
    summary:
      "Built a multilingual lead-generation site for a licensed architecture firm, then ran an evidence-first audit when inquiries dropped — and found the real leaks were outside the website.",
    overview:
      "A statically generated Next.js site for a small architecture and interior design firm in the Philippines: portfolio, services, location pages, and guides, with content in seven languages. A few weeks after launch, inquiries dropped to almost nothing. Instead of guessing, I audited the whole path a prospect takes — search result, business listing, site, contact form, inbox — ranked each possible cause with a confidence level, and only then changed anything.",
    problem:
      "Inquiries fell to few or none, including from overseas repeat clients. The obvious suspect was the new website, but nothing in the site's own data explained it, and changing things at random risked making it worse.",
    businessGoal:
      "Find out where prospects were actually being lost, fix those points with the owner's approval at each step, and grow the firm's visibility in local search and in AI answers so new clients can find it in the first place.",
    solution:
      "All content lives as typed data and is rendered into static pages with structured data (LocalBusiness, Article, FAQ, VideoObject), an image-and-video sitemap with real last-modified dates, and separate server-rendered Filipino pages linked with hreflang. The audit worked in phases — what changed in git, the contact path, indexing, then listings and availability — with every finding logged in an issue register and verified on the live site after the fix.",
    architectureDiagram: `flowchart TD
    A[Typed content data] --> B[Next.js static pages]
    B --> C[Structured data + sitemap]
    B --> D[Filipino pages with hreflang]
    C --> E[Google / Bing index]
    D --> E
    E --> F[Search results + AI answers]
    G[Business listings] --> F
    F --> H[Visitor on site]
    H --> I[Inquiry via chat app or email]
    I --> J[Firm's inbox]`,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Cloudflare DNS",
      "JSON-LD",
      "Google Search Console",
      "Google Business Profile",
      "Bing Webmaster Tools",
      "Lighthouse",
    ],
    highlights: [
      "Seven-language content",
      "Static generation",
      "Structured data",
      "Evidence-first audit",
      "Local search",
      "AI-answer visibility",
      "Strict security headers",
    ],
    challenges: [
      {
        challenge: "The contact form was the prime suspect, but 'it seems broken' isn't evidence.",
        solution:
          "Sent a labelled test submission and matched it one-for-one through the form service to the inbox, which ruled the backend out. The same test exposed two real weaknesses — the form hung forever on a network failure, and the form service's free tier can report success while sending nothing once over its limit — so I replaced it with a form that opens the visitor's chat app or email with the inquiry already written.",
      },
      {
        challenge: "The biggest leaks weren't in the code at all.",
        solution:
          "Following the prospect's path outside the site turned up a business listing still showing an old phone number, a map pin placed in the ocean because of how service areas had been configured, and a social-page chat button pointing at a number nobody checked. All three were fixed with the owner.",
      },
      {
        challenge: "Half the site's pages weren't in Google's index.",
        solution:
          "Expanded thin location pages from roughly 150 to 600 words, added guides and an overseas-client landing page, made the Filipino pages indexable with hreflang, and corrected sitemap dates so crawlers could trust them.",
      },
      {
        challenge: "A 37 MB walkthrough video was too heavy to serve directly.",
        solution:
          "Re-encoded it to about 6 MB with no visible quality loss, moved hosting to a video platform, and embedded it so the player only loads when clicked.",
      },
    ],
    engineeringDecisions: [
      "No backend, API routes, or environment variables — the site is fully static, which removes whole categories of failure for a business with no technical staff.",
      "Business facts (phone, address, hours) live in one file that feeds the pages, the structured data, and a plain-text summary for AI tools, so they can't drift apart.",
      "Every production change required owner approval first and a check on the live site after.",
    ],
    impact:
      "Within a month, Google went from indexing about half the site to nearly all of it, and the firm reached page one for most of the searches being tracked. I'm deliberately not claiming a lead recovery yet: rankings for some searches are still volatile, and inquiry volume is being monitored on a schedule rather than assumed.",
    metrics: [
      { label: "Pages in Google's index (Oct 20 → Nov 18)", value: "14 → 39" },
      { label: "Tracked searches on page one (Oct 20 → Nov 10)", value: "4 of 14 → 11 of 20" },
      { label: "Search clicks per 28 days (Nov 3 → Nov 18)", value: "32 → 81" },
      { label: "Mobile Lighthouse performance / SEO, home page", value: "95 / 100" },
    ],
    lessonsLearned: [
      "When leads drop after a launch, audit the whole path from search result to inbox — the website is only one link in it.",
      "Writing down a confidence level for each suspected cause stopped me from 'fixing' things that weren't broken.",
    ],
    futureImprovements: [
      "Add automated tests and a CI check; today the only gate is the hosting platform's build.",
      "Keep the scheduled follow-up checks running until there's enough data to say whether inquiries recovered.",
    ],
  },
  {
    slug: "brokerage-transaction-commission-dashboard",
    status: "Client work · in production",
    role: "Developer on the build — features, fixes, and deployment",
    name: "Brokerage Transaction & Commission Dashboard",
    category: "Internal Tools / Full-Stack",
    featured: true,
    order: 5.2,
    summary:
      "An internal app for a real-estate brokerage that tracks every deal, calculates commission splits, generates the payout paperwork, and uses AI to review each submission before it goes to accounting.",
    overview:
      "A web app used by a residential real-estate brokerage to track pending, closed, and cancelled transactions, calculate commission splits, and produce disbursement forms and commission sheets, with reports for owners, the accountant, and agents. It also covers agents, appointments, call logs, vendors, and lead sources.",
    problem:
      "Commission math has many branches — percentage or flat fee, inbound or outbound referrals, tiered program fees — and each deal ends in a signed payout form. Done by hand, every one of those is a chance for an error that reaches accounting.",
    businessGoal:
      "One place to record a deal, get the split right every time, produce the payout document automatically, and catch mistakes before submission rather than after.",
    solution:
      "A Node.js/Express server exposes about 40 API routes over a cloud SQL database and serves the single-page front end. Sign-in is handled by the company's Microsoft identity provider, with new users landing as read-only until an admin approves them. Payout forms are rendered to PDF on the server, stored in cloud storage, and linked on the transaction. Before submission, server-side math checks are passed to Claude, which returns a structured pass/score/errors review.",
    architectureDiagram: `flowchart TD
    A[Staff sign-in — company identity] --> B[Single-page app]
    B --> C[Express API]
    C --> D[(Cloud SQL database)]
    C --> E[Commission engine]
    E --> F[AI pre-submission review — Claude]
    C --> G[PDF render]
    G --> H[Cloud file storage]
    C --> I[Email + SMS notifications]
    J[AI call-center flows] --> C`,
    techStack: [
      "Node.js",
      "Express",
      "Azure SQL",
      "Azure App Service",
      "Microsoft Entra ID",
      "Azure Blob Storage",
      "Puppeteer",
      "Anthropic Claude",
      "Twilio",
      "Power Automate",
      "GitHub Actions",
    ],
    highlights: [
      "Commission engine",
      "AI submission review",
      "PDF generation",
      "Role-based access",
      "CI/CD to Azure",
      "Workflow-locked records",
    ],
    challenges: [
      {
        challenge: "Commission rules branch in many directions and the result has to match what accounting expects to the cent.",
        solution:
          "Built the split calculation as one engine on the server — percentage vs. flat fee, referrals in either direction, tiered program fees, agent split computed from gross minus referral — so the form, the PDF, and the reports all read the same numbers.",
      },
      {
        challenge: "An LLM can't be trusted to do the arithmetic itself.",
        solution:
          "The server computes the math checks first and hands the results to the model, which only judges and explains them and must answer in a fixed JSON shape.",
      },
      {
        challenge: "Financial records shouldn't be casually editable.",
        solution:
          "Deletes are only allowed within ten minutes of creation, status moves only through workflow buttons, and locked transactions need an explicit unlock step.",
      },
    ],
    impact:
      "Gave the brokerage a single system for deals, commission splits, and payout paperwork, deployed automatically on every push to the main branch.",
    lessonsLearned: [
      "Let the code do the math and the model do the reviewing — mixing the two is where AI features in finance go wrong.",
      "Date and currency bugs (a timezone shift, a currency field that wouldn't save) were the ones users noticed first; they deserve tests before anything else.",
    ],
    futureImprovements: [
      "Add automated tests around the commission engine.",
      "Handle daylight-saving time in the scheduled weekly emails instead of a fixed offset.",
    ],
  },
  {
    slug: "building-materials-price-comparison",
    status: "Personal project",
    role: "Developer — scrapers, data pipeline, and front end",
    name: "Building Materials Price Comparison",
    category: "Data Pipelines / Web Scraping",
    featured: true,
    order: 5.3,
    summary:
      "A price-comparison app for construction materials, fed by 18 store scrapers that run on a daily schedule and report honestly on which sources are actually live.",
    overview:
      "A web app that compares prices for construction and hardware materials across Philippine retailers, so builders and homeowners don't have to check each store's site one by one. Eighteen scraper modules — one per store — collect products into a single normalized dataset on a daily automated run.",
    problem:
      "Every store runs a different e-commerce platform, several block or break scrapers without notice, and a pipeline that quietly falls back to stale data looks exactly like one that's working.",
    businessGoal:
      "Keep one comparable dataset of products and prices across stores, updated daily without a server or a database to maintain, and make it obvious which sources are fresh.",
    solution:
      "Each scraper tries a live source first — a storefront's product feed, parsed HTML, or the JSON a site embeds in its own pages — and falls back to a seed list if that fails. A runner executes stores one at a time, normalizes units, brands, and categories, and merges results into a products-and-offers file that only ever adds or updates. A scheduled GitHub Actions job runs it daily and commits the result; an admin page shows each store as live or not, with a labelled reason.",
    architectureDiagram: `flowchart TD
    A[Daily schedule — GitHub Actions] --> B[Scraper runner]
    B --> C[18 store scrapers]
    C -->|live source| D[Normalize units, brand, category]
    C -->|fallback| E[Seed data]
    E --> D
    D --> F[Merge — add or update, never delete]
    F --> G[Dataset committed to repo]
    F --> H[Scraper health report]
    G --> I[React front end]
    H --> J[Admin health page]`,
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Cheerio", "GitHub Actions", "Vercel"],
    highlights: [
      "18 store scrapers",
      "Daily scheduled runs",
      "Data normalization",
      "Scraper health reporting",
      "No server or database",
      "Bundle-size reduction",
    ],
    challenges: [
      {
        challenge: "Stores weren't running the platform they appeared to be.",
        solution:
          "Checked each one by hand and documented it in the scraper: two 'storefront-feed' stores were really a different platform, so the old scraper was following a catch-all redirect and only ever found about four products; another's prices were available in JSON embedded in the page, which avoided needing a headless browser at all.",
      },
      {
        challenge: "Some catalogs use 999999 to mean 'price not set', which would have shown up as the most expensive item in every comparison.",
        solution:
          "Filtered placeholder prices with a rule strict enough to drop them while keeping genuine prices that happen to be all nines.",
      },
      {
        challenge: "A data-safety check was failing the scheduled job on every run, so real failures were lost in the noise.",
        solution:
          "The check compared totals in a way that didn't hold once the dataset grew daily and only some stores scraped live. I downgraded it to a warning and added a per-store health report with the captured failure reason instead.",
      },
      {
        challenge: "Shipping the dataset inside the app made the JavaScript bundle huge.",
        solution:
          "Moved the data out of the bundle to load in the background and replaced a quadratic category count with a single pass.",
      },
    ],
    impact:
      "A daily, unattended pipeline that grew the dataset to tens of thousands of products — and that says plainly which stores it could and couldn't reach on the last run. In the most recent run, 8 of the 18 stores scraped live; the rest are labelled with why not.",
    metrics: [
      { label: "Store scrapers", value: "18" },
      { label: "Products in the dataset (latest run)", value: "28,053" },
      { label: "Consecutive daily automated runs", value: "105" },
      { label: "App JavaScript size", value: "3.3 MB → 305 KB" },
    ],
    lessonsLearned: [
      "A fallback that looks like success is worse than a failure — every source needs a visible live / not-live status.",
      "Identify the platform before writing the scraper; most 'broken' scrapers were pointed at the wrong kind of site.",
    ],
    futureImprovements: [
      "Serve the daily dataset to the front end directly — the app currently loads an older snapshot.",
      "Add tests for the normalizer and a build check to the scheduled workflow.",
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
    slug: "multiplayer-browser-fps",
    status: "Prototype · in progress",
    name: "Multiplayer Browser Shooter",
    category: "Real-Time / Game Dev",
    featured: false,
    order: 9.5,
    summary:
      "A work-in-progress multiplayer first-person shooter that runs in the browser — a 64-tick game server, WebSocket networking, and a 3D client with physics-based movement.",
    overview:
      "A prototype multiplayer FPS with nothing to install. The client renders with Three.js and uses a physics engine for movement (sprint, crouch, slide, jump); the Node.js server runs lobbies and matchmaking, ticks the game 64 times a second, and broadcasts snapshots 20 times a second while the client draws other players slightly in the past to smooth them out. Accounts, match history, and a ranked leaderboard are stored in Postgres. It's an honest prototype: hits are reported by the client and sanity-checked by the server for fire rate and range, and full server-side reconciliation isn't built yet.",
    techStack: ["React", "TypeScript", "Three.js", "cannon-es", "Socket.IO", "Node.js", "Express", "Supabase", "PostgreSQL", "JWT"],
    highlights: ["Real-time networking", "Server tick loop", "Snapshot interpolation", "Matchmaking", "Leaderboard"],
    impact:
      "A hands-on way to learn real-time systems — tick rates, snapshot interpolation, and where to draw the line between client and server trust.",
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
