import React, { useState } from 'react';
import { SectionId } from '../../types';
import { 
  CheckCircle2, 
  Terminal, 
  Search, 
  GitPullRequest, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Workflow
} from 'lucide-react';

interface HowIWorkSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const HowIWorkSection: React.FC<HowIWorkSectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Triage & Blast Radius Assessment',
      sub: 'Evaluating Severity, SLAs & Business Impact',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      whatIdo: [
        'Classify incoming ticket urgency (P1 to P4) within first 15 minutes to guarantee 98%+ SLA compliance.',
        'Determine the blast radius: is it a single user configuration error, an account-wide permission lock, or a multi-tenant platform degradation?',
        'Send an immediate, reassuring human acknowledgment validating their report and establishing a clear status update schedule.',
      ],
      tools: ['Zendesk / Jira Service Desk', 'PagerDuty', 'Statuspage', 'Internal Admin Portals'],
      keyArtifact: 'Triage Priority Classification & SLA Timer Tracking',
    },
    {
      num: '02',
      title: 'Reproduction & Variable Isolation',
      sub: 'Eliminating Environmental Noise in Staging',
      icon: <Search className="w-5 h-5 text-blue-400" />,
      whatIdo: [
        'Never take symptoms at face value: systematically strip away client-side extensions, cache states, and proxy quirks.',
        'Request or generate browser Network HAR logs and console stack traces to examine network waterfalls.',
        'Recreate the exact request payload in a pristine sandbox or staging tenant to confirm whether the bug is deterministic.',
      ],
      tools: ['Browser DevTools', 'HAR Analyzers', 'Postman / Insomnia', 'Sandbox Testing Environments'],
      keyArtifact: 'Deterministic Step-by-Step Reproduction Checklist',
    },
    {
      num: '03',
      title: 'Deep Technical Diagnostics',
      sub: 'Inspecting Logs, Payloads, Headers & Queries',
      icon: <Terminal className="w-5 h-5 text-purple-400" />,
      whatIdo: [
        'Inspect server-side logs and distributed traces matching request correlation IDs (X-Request-ID).',
        'Analyze HTTP response codes, CORS headers, HMAC signature hashing, and rate-limiting headers.',
        'Query relational databases (PostgreSQL/MySQL) to audit data integrity, inspect foreign key constraints, or examine slow query plans (EXPLAIN ANALYZE).',
      ],
      tools: ['SQL (PostgreSQL/MySQL)', 'Log Management (Datadog/CloudWatch concepts)', 'cURL', 'JWT Debuggers'],
      keyArtifact: 'Root Cause Diagnostic Dossier with Log Traces & Payloads',
    },
    {
      num: '04',
      title: 'Engineering Collaboration & Repro Handoff',
      sub: 'Providing Developers What They Need to Fix Bugs Fast',
      icon: <GitPullRequest className="w-5 h-5 text-amber-400" />,
      whatIdo: [
        'Engineers hate vague complaints. I write clean, structured bug tickets containing: Expected vs Actual Behavior, exact cURL request, response payload, and affected code paths.',
        'Propose temporary mitigations or configuration toggles to unblock the customer immediately while engineering develops a hotfix.',
        'Track engineering PR branches through staging verification prior to production rollout.',
      ],
      tools: ['GitHub / GitLab', 'Linear / Jira Software', 'Slack War Rooms', 'Feature Flag Dashboards'],
      keyArtifact: 'Engineer-Ready Bug Ticket (Drives 30% MTTR Reduction)',
    },
    {
      num: '05',
      title: 'Transparent Customer Resolution',
      sub: 'Restoring Operations and Rebuilding Trust',
      icon: <MessageSquare className="w-5 h-5 text-teal-400" />,
      whatIdo: [
        'Communicate the solution in transparent, jargon-free language tailored to the audience (developer vs non-technical executive).',
        'Verify with the customer that their workflow is completely restored before closing the ticket.',
        'Deliver a courteous summary of what caused the issue, what was repaired, and how recurrence is prevented.',
      ],
      tools: ['Customer Communication Templates', 'Loom Video Walkthroughs', 'Zoom Technical Screen-Shares'],
      keyArtifact: 'Verified Customer Sign-off & 95% CSAT Score',
    },
    {
      num: '06',
      title: 'Post-Mortem & Preventative Runbooks',
      sub: 'Closing the Loop to Deflect Future Tickets',
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      whatIdo: [
        'If a problem required over 15 minutes of investigation, it indicates a documentation gap or missing validation.',
        'Author internal Tier 1/2 troubleshooting runbooks to empower teammates to resolve similar queries in minutes.',
        'Write public developer documentation or sample code snippets to guide self-service and deflect incoming tickets.',
      ],
      tools: ['Notion / Confluence', 'Developer Documentation Portals', 'Knowledge Base CMS'],
      keyArtifact: 'Living Runbooks (Achieved 20% Ticket Volume Deflection)',
    },
  ];

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Operational Methodology
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          How I Work
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          A disciplined, six-stage diagnostic framework engineered to protect customer SLAs, isolate root causes rapidly, and eliminate recurring failure modes.
        </p>
      </div>

      {/* Interactive Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isActive
                  ? 'bg-slate-800 border-emerald-500 text-white font-medium ring-1 ring-emerald-500/40 shadow-md'
                  : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-xs font-mono">
                <span className={isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {step.num}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
              </div>
              <div className="text-xs font-semibold line-clamp-1 text-slate-200">
                {step.title.split('&')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase */}
      <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
        
        {/* Step Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
              {steps[activeStep].icon}
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold mb-0.5">
                <span>STAGE {steps[activeStep].num} OF 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {steps[activeStep].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {steps[activeStep].sub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              ← Prev Stage
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              Next Stage →
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Actions */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Core Actions & Diagnostic Discipline:
            </span>
            <div className="space-y-3">
              {steps[activeStep].whatIdo.map((action, aIdx) => (
                <div key={aIdx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {aIdx + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Artifacts Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Toolkit */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Primary Tooling
              </span>
              <ul className="space-y-2">
                {steps[activeStep].tools.map((tool, tIdx) => (
                  <li key={tIdx} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverable Artifact */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                Deliverable Outcome
              </span>
              <p className="text-xs text-slate-200 font-medium">
                {steps[activeStep].keyArtifact}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Next Step / Skills Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-400">
          Interested in the technical toolkit powering these stages?
        </p>
        <button
          onClick={() => onNavigate('skills')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Explore Technical Skills Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
