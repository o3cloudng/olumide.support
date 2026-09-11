import { 
  CaseStudy, 
  CertificationItem, 
  EducationItem, 
  ExperienceItem, 
  IncidentSeverity, 
  MetricItem, 
  QuickViewItem, 
  SkillCategory, 
  SolveItem 
} from '../types';

export const PERSONAL_INFO = {
  name: 'Olumide Oderinde',
  title: 'Technical Customer Success & Support Specialist',
  headline: 'I investigate the problems behind the ticket.',
  supportingStatement:
    'Technical support and customer success professional with a software engineering background, experienced in Tier 2/3 troubleshooting, APIs, databases, application diagnostics, incident management, technical documentation, and customer communication.',
  location: 'Nigeria',
  workModel: 'Remote | Available for International Remote Opportunities',
  phone: '+234 806 061 7790',
  email: 'olumideooderinde@gmail.com',
  keyStatement: 'My job is to solve all three.',
  intersection: [
    'CUSTOMER',
    'SUPPORT',
    'TECHNICAL INVESTIGATION',
    'ENGINEERING',
    'RESOLUTION',
    'CUSTOMER SUCCESS',
  ],
  careerProgression: [
    'Software / Technical Background',
    'Application & Systems Support',
    'Tier 2/3 Troubleshooting',
    'Customer-Facing Technical Operations',
    'Customer Success & Technical Support',
  ],
};

export const QUICK_VIEW: QuickViewItem[] = [
  { value: '5+ years', label: 'Technical support/customer-facing technical operations' },
  { value: 'Tier 2/3', label: 'Support capability' },
  { value: '98%+', label: 'High-priority SLA compliance' },
  { value: '30%', label: 'MTTR reduction' },
  { value: '95%', label: 'CSAT' },
  { value: '20%', label: 'Ticket-volume reduction' },
];

export const VERIFIED_EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Technical Systems Support Lead & Scrum Master',
    company: 'Biznovate Tech',
    location: 'Lagos, Nigeria',
    period: 'Jan 2020 – Present',
    bullets: [
      'Technical Support Lead and Scrum Master across a Python/Django SaaS platform.',
      'Primary liaison between engineering teams and enterprise stakeholders.',
      'Facilitated Agile sprint ceremonies using Jira and Trello.',
      'Delivered Tier 2/3 incident resolution across APIs, PostgreSQL, MySQL, and Redis.',
      'Maintained 98%+ SLA compliance on high-priority tickets.',
      'Used Elasticsearch and Docker log analysis to debug complex server and search issues.',
      'Reduced average MTTR by 30%.',
      'Translated complex backend constraints into actionable guidance for non-technical clients.',
      'Achieved 95% Customer Satisfaction.',
    ],
    technologies: [
      'Python',
      'Django',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Elasticsearch',
      'Docker',
      'Jira',
      'Trello',
      'REST APIs',
    ],
  },
  {
    role: 'Technical Support & Systems Specialist',
    company: 'TM30 Global',
    location: 'Lagos, Nigeria',
    period: 'Jan 2019 – Jan 2020',
    bullets: [
      'Tier 2/3 technical support for web platforms, custom telemetry software, and database integrations.',
      'Interface between engineering teams and mobile network operator clients.',
      'Owned client accounts end-to-end.',
      'Analysed application logs and PostgreSQL/MySQL queries.',
      'Coordinated incident resolution across development and product teams using Jira and Microsoft DevOps.',
      'Authored end-user manuals, technical documentation, and onboarding guides.',
      'Reduced client support ticket volume by 20%.',
      'Managed Docker configurations and local server environments.',
    ],
    technologies: [
      'Telemetry Software',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'Linux/Unix',
      'Jira',
      'Microsoft DevOps',
      'Technical Documentation',
    ],
  },
];

export const VERIFIED_EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering (B.Eng.), Electronics & Electrical Engineering',
    institution: 'Ladoke Akintola University of Technology (LAUTECH)',
    location: 'Ogbomoso, Nigeria',
    year: '2007',
  },
];

export const VERIFIED_CERTIFICATIONS: CertificationItem[] = [
  {
    name: 'Advanced Customer Service',
    issuer: 'La Plage Meta Verse',
  },
  {
    name: 'Customer Support',
    issuer: 'HubSpot',
  },
  {
    name: 'Customer Service Fundamentals',
    issuer: 'Elevify',
  },
];

export const PROFESSIONAL_SKILLS_MATRIX = [
  {
    category: 'Support',
    skills: ['Jira', 'Microsoft/Azure DevOps', 'Zendesk', 'Git', 'GitHub'],
    description: 'Enterprise ticketing, version control, and multi-team collaboration platforms.',
  },
  {
    category: 'Programming / Web',
    skills: ['Python', 'Django', 'JavaScript', 'TypeScript', 'REST APIs'],
    description: 'Backend web frameworks, client-side scripting, and endpoint architecture.',
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Redis'],
    description: 'Relational querying, schema inspection, index lookups, and in-memory caching.',
  },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Linux/Unix', 'Elasticsearch'],
    description: 'Containerized environments, shell navigation, and search cluster logging.',
  },
  {
    category: 'Diagnostics',
    skills: [
      'Application log analysis',
      'API troubleshooting',
      'Database diagnostics',
      'Telemetry systems',
      'Root cause analysis (RCA)',
    ],
    description: 'Deep-dive investigation tools and systematic variable isolation frameworks.',
  },
  {
    category: 'Agile & Operations',
    skills: [
      'Scrum',
      'Sprint planning',
      'Daily stand-ups',
      'Retrospectives',
      'Cross-functional collaboration',
    ],
    description: 'Certified Scrum Master practices facilitating sprint velocity and engineering alignment.',
  },
];


export const VERIFIED_METRICS: MetricItem[] = [
  {
    value: '98%+',
    label: 'SLA Compliance',
    description: 'SLA compliance maintained on high-priority and mission-critical tickets through proactive triage.',
  },
  {
    value: '30%',
    label: 'MTTR Reduction',
    description: 'Reduction in average Mean Time to Resolution via diagnostic runbooks and deterministic reproduction.',
  },
  {
    value: '95%',
    label: 'Customer Satisfaction',
    description: 'Consistently achieved CSAT across complex enterprise accounts and tense escalation scenarios.',
  },
  {
    value: '20%',
    label: 'Ticket Volume Reduction',
    description: 'Reduction in repetitive support ticket volume achieved through clear technical documentation and developer guides.',
  },
];

export const WHAT_I_SOLVE: SolveItem[] = [
  {
    title: 'Complex Technical Issues',
    description:
      'Deep-dive Tier 2/3 diagnostics involving webhooks, payload schemas, network proxies, and database record anomalies where standard answers fail.',
    symptoms: [
      'Intermittent API failures & silent 4xx/5xx drops',
      'Database transaction deadlocks & query timeouts',
      'Webhook signature validation mismatches',
    ],
    approach:
      'Isolate variables, inspect network requests/HAR logs, verify against API specifications, and write minimal reproducible test scripts.',
    iconName: 'Cpu',
  },
  {
    title: 'Production Incidents',
    description:
      'High-severity service degradations requiring calm incident command, cross-functional engineering alignment, and timely customer advisories.',
    symptoms: [
      'Elevated error rates impacting core workflows',
      'Third-party integration outages & latency spikes',
      'Customer-facing degradation during peak traffic',
    ],
    approach:
      'Establish incident channels, coordinate with on-call engineers, identify mitigation paths, and publish regular status updates.',
    iconName: 'AlertTriangle',
  },
  {
    title: 'Customer Escalations',
    description:
      'Critical business accounts on the verge of churn due to blocked production rollouts or unresolved blockers.',
    symptoms: [
      'High-friction communication & executive escalations',
      'Misaligned expectations regarding feature behavior',
      'Repeated reopenings of complex support tickets',
    ],
    approach:
      'Acknowledge business impact, de-escalate with transparent technical timelines, provide temporary workarounds, and follow through to permanent fix.',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Recurring Support Problems',
    description:
      'Chronic ticket patterns that drain team bandwidth and indicate underlying UX friction, missing validation, or undocumented edge cases.',
    symptoms: [
      'Repetitive questions on authentication or webhook setup',
      'Frequent configuration mistakes by client developers',
      'Support queue bloat from predictable questions',
    ],
    approach:
      'Analyze ticket clusters, identify root friction, author high-clarity developer runbooks, and advocate for product guardrails.',
    iconName: 'Repeat',
  },
  {
    title: 'Technical Communication',
    description:
      'Translating intricate backend architectural realities into actionable guidance for customers, and translating ambiguous user frustration into clean engineering bug reports.',
    symptoms: [
      'Customers overwhelmed by technical jargon',
      'Engineers receiving vague "it does not work" reports',
      'Information loss across support-engineering handoffs',
    ],
    approach:
      'Structure bug reports with deterministic steps to reproduce, expected vs actual behavior, and request/response payloads.',
    iconName: 'MessageSquareCode',
  },
  {
    title: 'Support Operations',
    description:
      'Optimizing queues, macros, escalation paths, and diagnostic tooling so support teams operate predictably at scale.',
    symptoms: [
      'Undefined escalation boundaries between Tier 1, 2, & 3',
      'SLA breaches due to routing bottlenecks',
      'Siloed troubleshooting knowledge across engineers',
    ],
    approach:
      'Design clear escalation matrices, build shared diagnostic runbooks, and automate repetitive triage checks.',
    iconName: 'Workflow',
  },
];

import { CASE_STUDIES_DATA } from './caseStudiesData';

export const CASE_STUDIES: CaseStudy[] = CASE_STUDIES_DATA;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'API & Network Diagnostics',
    icon: 'Network',
    description: 'Diagnosing protocols, payloads, authentication headers, and proxy handshakes.',
    skills: [
      { name: 'RESTful API Troubleshooting', context: 'Request/response payload validation, schema drift, endpoint debugging', level: 'Core Diagnostic' },
      { name: 'cURL & Postman Craft', context: 'Crafting exact reproduction requests, testing auth scopes, payload testing', level: 'Core Diagnostic' },
      { name: 'HTTP Status & Headers', context: 'Deep comprehension of 4xx, 5xx, CORS headers, Content-Type mismatch', level: 'Core Diagnostic' },
      { name: 'Webhooks & Event Sync', context: 'Signature validation (HMAC SHA-256), idempotency keys, delivery retry queues', level: 'Advanced' },
      { name: 'OAuth2 & JWT Inspection', context: 'Token lifecycles, bearer headers, refresh flows, claim validation', level: 'Advanced' },
      { name: 'Rate Limiting & Backoff', context: '429 diagnostics, exponential backoff, jitter strategies, header inspection', level: 'Operational' },
    ],
  },
  {
    title: 'Databases & Application State',
    icon: 'Database',
    description: 'Verifying data consistency, investigating record anomalies, and query profiling.',
    skills: [
      { name: 'SQL Querying & Inspection', context: 'SELECT queries, JOIN verification, transaction audits, record discrepancy isolation', level: 'Core Diagnostic' },
      { name: 'Relational Schemas', context: 'Foreign key constraints, composite keys, indexing concepts, data normalization', level: 'Advanced' },
      { name: 'PostgreSQL & MySQL', context: 'Reading slow query outputs, execution plans (EXPLAIN), connection pool states', level: 'Advanced' },
      { name: 'Data Consistency Auditing', context: 'Identifying sync drift between primary database and third-party SaaS caches', level: 'Core Diagnostic' },
    ],
  },
  {
    title: 'Application Diagnostics & Observability',
    icon: 'Terminal',
    description: 'Pinpointing where the system failed through logs, traces, and browser state.',
    skills: [
      { name: 'Browser DevTools & Network HAR', context: 'Inspecting request waterfalls, console exceptions, payload payloads', level: 'Core Diagnostic' },
      { name: 'Log & Metrics Inspection', context: 'Correlating timestamps, tracing request IDs across microservices, log parsing', level: 'Core Diagnostic' },
      { name: 'Observability Concepts', context: 'APM traces, error frequency spikes, latency percentiles (p95, p99)', level: 'Advanced' },
      { name: 'Reproducible Bug Isolation', context: 'Translating noisy client reports into minimal, deterministic step-by-step reproduction scripts', level: 'Core Diagnostic' },
    ],
  },
  {
    title: 'Support Operations & Incident Command',
    icon: 'ShieldCheck',
    description: 'Managing crisis communications, SLA governance, and operational resilience.',
    skills: [
      { name: 'Tier 2/3 Technical Escalation', context: 'Managing high-severity queues, complex troubleshooting, eng handoff', level: 'Core Diagnostic' },
      { name: 'Incident Command & SLA', context: 'P1-P4 triage, SLA monitoring (98%+ compliance), war room liaison', level: 'Core Diagnostic' },
      { name: 'Root Cause Analysis (RCA)', context: 'Post-incident reviews (PIR), 5 Whys, blameless timeline reconstruction', level: 'Advanced' },
      { name: 'Executive De-escalation', context: 'Communicating transparently with enterprise stakeholders during outages', level: 'Core Diagnostic' },
      { name: 'Technical Documentation', context: 'Living runbooks, troubleshooting knowledge bases, developer guides', level: 'Core Diagnostic' },
      { name: 'Tooling Ecosystem', context: 'Zendesk, Jira, Linear, Slack, Intercom, PagerDuty, Notion/Confluence', level: 'Operational' },
    ],
  },
];

export const INCIDENT_SEVERITY_LEVELS: IncidentSeverity[] = [
  {
    level: 'P1',
    title: 'Critical Outage',
    slaResponse: '15 Minutes',
    slaUpdate: 'Every 30 Minutes',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    criteria: 'Core platform down or catastrophic data loss. Significant revenue or operational disruption across multiple enterprise accounts.',
    actionProtocol: [
      'Immediate incident commander notification and dedicated Slack war room spun up.',
      'Publish initial customer acknowledgment: "Investigating elevated failure rates; updates every 30m."',
      'Isolate blast radius and identify quick mitigation (failover, rollback, feature flag disable).',
      'Conduct post-incident review (PIR) and publish customer-facing root-cause analysis (RCA) within 48 hours.',
    ],
  },
  {
    level: 'P2',
    title: 'Major Degradation',
    slaResponse: '1 Hour',
    slaUpdate: 'Every 2 Hours',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    criteria: 'Key feature or integration degraded. Core platform operational, but essential workflow blocked for key accounts with no immediate workaround.',
    actionProtocol: [
      'Engage on-call engineering lead with diagnostic telemetry and reproduction traces.',
      'Identify and supply temporary operational workarounds to unblock impacted accounts.',
      'Track engineering hotfix branch through staging deployment and customer verification.',
    ],
  },
  {
    level: 'P3',
    title: 'Moderate Issue',
    slaResponse: '4 Hours',
    slaUpdate: 'Daily / On Progress',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    criteria: 'Non-critical functionality affected. Workaround exists, or issue impacts a small subset of non-critical operations.',
    actionProtocol: [
      'Investigate root cause and confirm reproduction steps in test sandbox.',
      'Log prioritized issue in engineering backlog (Jira/Linear) with clear acceptance criteria.',
      'Provide client with clean workaround and subscribe ticket to release notification.',
    ],
  },
  {
    level: 'P4',
    title: 'Minor / General Inquiry',
    slaResponse: '8-12 Hours',
    slaUpdate: 'Upon Resolution',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
    criteria: 'Cosmetic issues, minor documentation errors, general API configuration questions, or feature feedback.',
    actionProtocol: [
      'Provide contextual knowledge base guides and clear configuration examples.',
      'Log documentation enhancement tasks or product feature requests for product review.',
    ],
  },
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    name: 'CUSTOMER',
    sub: 'Origin of Request',
    focus: 'Raw problem, emotional urgency, business impact',
    description: 'The user experiences a blocker, error, or data discrepancy and submits a support ticket or escalation.',
    olumideLens: 'Identify what the customer is trying to accomplish and protect their business continuity.',
  },
  {
    step: '02',
    name: 'SUPPORT TRIAGE',
    sub: 'Severity & SLA Guard',
    focus: 'SLA assessment, urgency classification, initial acknowledgment',
    description: 'Immediate categorization of ticket priority (P1-P4), blast radius estimation, and empathetic acknowledgment.',
    olumideLens: 'Set expectations early: ensure SLA adherence (98%+) and acknowledge the problem immediately.',
  },
  {
    step: '03',
    name: 'TECHNICAL INVESTIGATION',
    sub: 'The Core Diagnostic',
    focus: 'Logs, APIs, DB state, Network HAR, code inspection',
    description: 'Digging beneath the surface: inspecting timestamps, payload headers, database records, and reproduction sandboxes.',
    olumideLens: 'Investigate the problem behind the ticket. Isolate whether it is network, configuration, query, or bug.',
  },
  {
    step: '04',
    name: 'ENGINEERING / PRODUCT',
    sub: 'Deterministic Handoff',
    focus: 'Clean bug reports, reproducible test scripts, stack traces',
    description: 'Engaging engineering not with vague complaints, but with exact cURL commands, logs, and root cause hypotheses.',
    olumideLens: 'Engineers solve bugs faster when given deterministic repros. This cuts MTTR by 30%.',
  },
  {
    step: '05',
    name: 'RESOLUTION',
    sub: 'Validation & Deployment',
    focus: 'Testing hotfixes, customer verification, data patch',
    description: 'Validating the fix in staging/production, verifying customer state, and deploying the solution.',
    olumideLens: 'Confirm the resolution directly with the customer. Never close a ticket without verified customer success.',
  },
  {
    step: '06',
    name: 'CUSTOMER SUCCESS',
    sub: 'Preventative Retention',
    focus: 'Runbooks, documentation, product feedback, account health',
    description: 'Transforming an incident into long-term trust: writing documentation to prevent recurrence and sharing feedback with Product.',
    olumideLens: 'A solved ticket should eliminate future tickets. 20% reduction achieved through proactive documentation.',
  },
];
