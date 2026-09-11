export type SectionId = 
  | 'home'
  | 'about'
  | 'case-studies'
  | 'how-i-work'
  | 'skills'
  | 'cs-strategy'
  | 'incident-management'
  | 'experience'
  | 'resume'
  | 'cover-letter'
  | 'contact';

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

export interface SolveItem {
  title: string;
  description: string;
  symptoms: string[];
  approach: string;
  iconName: string;
}

export type CaseStudyCategory = 
  | 'Incident Management'
  | 'API'
  | 'Database'
  | 'Customer Success'
  | 'Technical Communication'
  | 'Documentation';

export interface InvestigationStep {
  phase: string;
  action: string;
  findings: string;
  status: 'verified' | 'investigating' | 'isolated' | 'mitigated';
  codeOrQuery?: string;
}

export interface EvidenceArtifact {
  title: string;
  type: 'log' | 'curl' | 'json' | 'sql' | 'workflow' | 'diff';
  code: string;
  note?: string;
}

export interface KnowledgeBaseArticle {
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  troubleshootingSteps: string[];
  resolutionSteps: string[];
  whenToEscalate: string[];
  informationSupportNeeds: string[];
}

export interface DualAudienceView {
  engineeringView: {
    diagnosis: string;
    logsAnalysis: string;
    apiBehaviour: string;
    databaseServiceIssue: string;
    remediation: string;
  };
  customerView: {
    impactExplanation: string;
    currentStatus: string;
    resolution: string;
    nextSteps: string;
  };
  keyStatement: string; // "Same incident. Different audience."
}

export interface CaseStudyWorkflowStep {
  stepNumber: string;
  title: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle?: string;
  label: 'Representative Case Study' | 'Portfolio Demonstration';
  category: string; // legacy category for modal compatibility
  tags: CaseStudyCategory[];
  severity: 'P1 - Critical' | 'P2 - High' | 'P3 - Moderate';
  summary: string;
  skills: string[];
  
  // Incoming ticket info
  ticketSnippet: {
    customerName: string;
    reportedIssue: string;
    environment: string;
  };
  
  // 3 Problems Lens (for TicketInspectionModal compatibility)
  theThreeProblems: {
    technical: string;
    customer: string;
    communication: string;
  };

  // Structured 9-Phase Incident Flow:
  // 1. PROBLEM
  problem: {
    reportedStatement: string;
    clarificationProcess: string[];
    technicalContext: string;
  };

  // 2. CUSTOMER IMPACT
  customerImpact: {
    operationalImpact: string;
    businessRisk: string;
    urgencyClassification: string;
  };

  // 3. INVESTIGATION
  investigation: {
    narrative: string;
    steps: InvestigationStep[];
  };

  // 4. EVIDENCE
  evidence: {
    summary: string;
    artifacts: EvidenceArtifact[];
  };

  // 5. ROOT CAUSE
  rootCause: {
    headline: string;
    technicalDetails: string;
  };

  // 6. ACTION
  action: {
    immediateMitigation: string[];
    engineeringEscalation: string[];
  };

  // 7. COMMUNICATION
  communication: {
    strategy: string;
    dualAudience?: DualAudienceView;
    stakeholderUpdates?: string[];
  };

  // 8. RESOLUTION
  resolution: {
    summary: string;
    confirmationSteps: string[];
  };

  // 9. PREVENTION
  prevention: {
    systemicMeasures: string[];
    kbArticle?: KnowledgeBaseArticle;
  };

  // Optional Visual Pipeline (for Case Study 2 & 3)
  customWorkflow?: {
    pipelineName: string;
    stages: CaseStudyWorkflowStep[];
  };

  // Legacy compat
  diagnosticSteps?: string[];
  preventativeMeasures?: string[];
  metricsImpact?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    context: string;
    level: 'Core Diagnostic' | 'Advanced' | 'Operational';
  }[];
}

export interface IncidentSeverity {
  level: string;
  title: string;
  slaResponse: string;
  slaUpdate: string;
  criteria: string;
  actionProtocol: string[];
  badgeColor: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  technologies?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
}

export interface QuickViewItem {
  value: string;
  label: string;
}

