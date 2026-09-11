import React, { useState } from 'react';
import { SectionId } from '../../types';
import { 
  PERSONAL_INFO, 
  QUICK_VIEW,
  VERIFIED_METRICS, 
  WHAT_I_SOLVE, 
  WORKFLOW_STAGES 
} from '../../data/portfolioData';
import { 
  ArrowRight, 
  FileText, 
  Mail, 
  MapPin, 
  Globe2, 
  Cpu, 
  AlertTriangle, 
  ShieldAlert, 
  Repeat, 
  MessageSquareCode, 
  Workflow, 
  CheckCircle2, 
  Search, 
  Terminal,
  Activity,
  Layers,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Check,
  X,
  Phone,
  Copy,
  Briefcase
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (sectionId: SectionId) => void;
  onOpenTicketModal: (caseStudyId?: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ 
  onNavigate, 
  onOpenTicketModal 
}) => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(2); // Default to TECHNICAL INVESTIGATION
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  // Icon mapping for "What I Solve"
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5 text-purple-400" />;
      case 'MessageSquareCode':
        return <MessageSquareCode className="w-5 h-5 text-blue-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-teal-400" />;
      default:
        return <Layers className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-4">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        
        <div className="max-w-4xl space-y-8">
          
          {/* Status Badge & Location */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for International Remote Opportunities</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nigeria | Remote Worldwide</span>
            </div>
          </div>

          {/* 15-SECOND RECRUITER & HIRING MANAGER EXECUTIVE BRIEF */}
          <aside aria-label="15-Second Recruiter Snapshot" className="bg-gradient-to-br from-slate-900/90 via-[#0f172a] to-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                  15-Second Recruiter & Hiring Manager Snapshot
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                Verified Candidate Summary
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Target Roles</span>
                <p className="text-slate-100 font-semibold leading-tight">
                  Technical CS Specialist • Tier 2/3 Support Engineer • Customer Success Engineer
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Technical Foundation</span>
                <p className="text-slate-100 font-semibold leading-tight">
                  Software Engineering degree + Tier 2/3 diagnostics (APIs, SQL, Redis, logs, Django)
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Verified Experience</span>
                <p className="text-slate-100 font-semibold leading-tight">
                  Biznovate Tech (Lead & Scrum Master, 2020–Pres.) • TM30 Global (Support & Dev)
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Customer Communication</span>
                <p className="text-slate-100 font-semibold leading-tight">
                  Dual-audience mastery: calm C-suite status updates & reproducible engineering packages
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Evidence On Site</span>
                <p className="text-slate-100 font-semibold leading-tight">
                  5 full-depth incident reports with SQL logs, cURL traces, and KB guides
                </p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Direct Contact</span>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="mailto:olumideooderinde@gmail.com"
                    className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-2 break-all"
                  >
                    olumideooderinde@gmail.com
                  </a>
                  <button
                    onClick={() => handleCopy('olumideooderinde@gmail.com', 'email')}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedContact === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
              <span className="text-[11px] text-slate-400 italic">
                Looking for proof of Tier 2/3 diagnostic depth?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('case-studies')}
                  className="px-3 py-1.5 rounded-md bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Inspect 5 Incident Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('resume')}
                  className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Core Name & Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm uppercase tracking-widest font-mono text-emerald-400 font-semibold">
                Technical Customer Success & Support Specialist
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          {/* Primary Headline */}
          <div className="relative pl-6 border-l-2 border-emerald-500/80 py-1">
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight leading-snug">
              "{PERSONAL_INFO.headline}"
            </p>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            {PERSONAL_INFO.supportingStatement}
          </p>

          {/* Position at the Intersection */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 shadow-inner space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-2 font-semibold">
                The Operational Intersect:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono">
                {PERSONAL_INFO.intersection.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className={`px-2.5 py-1 rounded border ${
                      step === 'TECHNICAL INVESTIGATION' 
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}>
                      {step}
                    </span>
                    {idx < PERSONAL_INFO.intersection.length - 1 && (
                      <span className="text-slate-500">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3">
              <span className="text-[11px] uppercase tracking-wider font-mono text-emerald-400 block mb-2 font-semibold">
                Technical Strength & Career Progression:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-mono text-slate-300">
                {PERSONAL_INFO.careerProgression.map((stage, sIdx) => (
                  <React.Fragment key={stage}>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-200">
                      {stage}
                    </span>
                    {sIdx < PERSONAL_INFO.careerProgression.length - 1 && (
                      <span className="text-emerald-500">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('case-studies')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-950/20"
              id="hero-cta-case-studies"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              id="hero-cta-resume"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              id="hero-cta-contact"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Contact Me</span>
            </button>
          </div>

        </div>
      </section>

      {/* RECRUITER-FRIENDLY QUICK VIEW */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#0b0f17] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>RECRUITER & HIRING MANAGER SNAPSHOT</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Quick View
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Verified Professional Summary
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_VIEW.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {item.value}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-2 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF, NOT PROMISES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Verified Operational Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Proof, Not Promises
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Strictly Verified Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VERIFIED_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-[#0f172a] border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 tracking-tight">
                  {metric.value}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
              </div>
              <h3 className="text-sm font-semibold text-slate-100">
                {metric.label}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY OLUMIDE VS CONVENTIONAL SUPPORT */}
      <section className="space-y-8 bg-gradient-to-b from-[#0f172a]/60 to-[#0b0f17] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>THE STRATEGIC ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Olumide vs. Conventional Support
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Conventional customer support forwards tickets and hopes for the best. A software-engineered support specialist investigates the root cause, shields core developers from repetitive noise, and preserves customer retention with high-integrity technical communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          
          {/* Conventional Support */}
          <div className="bg-[#0b0f17] border border-red-500/20 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <X className="w-4 h-4 text-red-400" />
                <span>Conventional Customer Support</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Surface-Level Triage</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                <span><strong>Issue Clarification:</strong> Relies on canned macros ("clear cache and restart"), leaves technical ambiguity to the customer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                <span><strong>Diagnostic Scope:</strong> Limited to browser UI clicks; cannot inspect application logs, SQL tables, or API response bodies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                <span><strong>Escalation Style:</strong> Forwards raw customer complaints ("the app is failing") straight to engineers without reproducible evidence.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                <span><strong>Communication:</strong> Either panics clients with raw unparsed stack traces or goes silent while waiting for engineering.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                <span><strong>Prevention:</strong> Solves the same inquiry 100 times without ever addressing the root UX or documentation deficiency.</span>
              </li>
            </ul>
          </div>

          {/* Olumide Oderinde */}
          <div className="bg-[#0b0f17] border border-emerald-500/40 rounded-xl p-5 sm:p-6 space-y-4 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Olumide Oderinde (Software-Engineered Support)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Tier 2/3 Investigation</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span><strong>Deterministic Reproduction:</strong> Formulates exact cURL commands, tests edge cases in staging, and isolates parameters.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span><strong>Deep Systemic Diagnostics:</strong> Inspects Nginx/Gunicorn worker logs, profiles SQL lock queries, and verifies Redis cache health.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span><strong>Engineering-Ready Escalations:</strong> Delivers complete Jira tickets with reproduction payloads, stack traces, and blast-radius data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span><strong>Dual-Audience Translation:</strong> Shields clients from panic with clear operational impact, while giving developers exact technical data.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span><strong>Permanent Deflection:</strong> Authors developer-grade Knowledge Base guides and brings actionable backlog tickets into Scrum ceremonies.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* HOW I THINK ABOUT A SUPPORT TICKET */}
      <section className="space-y-8 bg-[#0b0f17] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            The Diagnostic Mindset
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How I Think About a Support Ticket
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed pt-1">
            A support ticket is not merely an inbox queue item to be closed as quickly as possible. Every technical issue contains three distinct layers that must be resolved simultaneously:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Lens 1 */}
          <div className="bg-[#0f172a] border border-blue-500/20 rounded-xl p-6 space-y-3 hover:border-blue-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-white">
              1. Technical Problem
            </h3>
            <p className="text-xs font-mono text-blue-300">
              What is actually failing?
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dissecting the failure beneath the symptoms: investigating status codes, payload parsing, database constraints, timeout logs, and race conditions.
            </p>
          </div>

          {/* Lens 2 */}
          <div className="bg-[#0f172a] border border-amber-500/20 rounded-xl p-6 space-y-3 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-white">
              2. Customer Problem
            </h3>
            <p className="text-xs font-mono text-amber-300">
              What is the customer unable to accomplish?
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating the human and business fallout: is an automated billing sync stalled? Are executive dashboards hanging? Is customer trust eroding?
            </p>
          </div>

          {/* Lens 3 */}
          <div className="bg-[#0f172a] border border-purple-500/20 rounded-xl p-6 space-y-3 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-white">
              3. Communication Problem
            </h3>
            <p className="text-xs font-mono text-purple-300">
              What does the customer need to know?
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Translating complex diagnostics into transparent timelines, actionable workarounds, and proactive updates without overwhelming or confusing them.
            </p>
          </div>

        </div>

        {/* Key Statement Callout */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              The Guiding Statement:
            </span>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              "{PERSONAL_INFO.keyStatement}"
            </span>
          </div>
          <button
            onClick={() => onOpenTicketModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 transition-colors self-start sm:self-auto"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Inspect Ticket Examples</span>
          </button>
        </div>
      </section>

      {/* VISUAL WORKFLOW */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Process Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Incident & Support Lifecycle
          </h2>
          <p className="text-sm text-slate-300">
            How requests move seamlessly from panic to engineering resolution and lasting customer retention:
          </p>
        </div>

        {/* Interactive Lifecycle Stages */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isSelected = activeWorkflowIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 text-white shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/50'
                    : 'bg-[#0f172a] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {stage.step}
                    </span>
                    {idx < WORKFLOW_STAGES.length - 1 && (
                      <span className="text-slate-400 hidden lg:inline">↓</span>
                    )}
                  </div>
                  <div className="text-xs font-bold tracking-tight mb-1">
                    {stage.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {stage.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Banner */}
        {activeWorkflowIndex !== null && (
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-semibold">
                  Stage {WORKFLOW_STAGES[activeWorkflowIndex].step}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {WORKFLOW_STAGES[activeWorkflowIndex].name} — {WORKFLOW_STAGES[activeWorkflowIndex].sub}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Focus: {WORKFLOW_STAGES[activeWorkflowIndex].focus}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  What Happens Here:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {WORKFLOW_STAGES[activeWorkflowIndex].description}
                </p>
              </div>

              <div className="space-y-2 bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  Olumide's Diagnostic Value:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {WORKFLOW_STAGES[activeWorkflowIndex].olumideLens}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* WHAT I SOLVE */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Core Scope of Resolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What I Solve
          </h2>
          <p className="text-sm text-slate-300">
            Specialized in complex technical bottlenecks where standard customer service stops and deep investigation begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_I_SOLVE.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Common Symptoms:
                  </span>
                  <ul className="space-y-1">
                    {item.symptoms.map((sym, sIdx) => (
                      <li key={sIdx} className="text-slate-300 flex items-start gap-1.5 text-[11px]">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-0.5 font-semibold">
                    My Approach:
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.approach}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK EXPLORE / ACTION FOOTER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Ready to dive into real technical investigation scenarios?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Explore 5 detailed technical incident reports covering web worker timeouts, pattern recognition from repeated tickets, step-by-step API debugging, dual-audience engineering/customer communications, and knowledge base authoring.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('case-studies')}
            className="px-5 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 transition-colors"
          >
            <span>Contact Olumide</span>
          </button>
        </div>
      </section>

    </div>
  );
};
