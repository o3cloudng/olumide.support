import React, { useState } from 'react';
import { SectionId, CaseStudy, CaseStudyCategory } from '../../types';
import { CASE_STUDIES } from '../../data/portfolioData';
import { 
  Terminal, 
  Server, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  Search,
  BookOpen,
  Filter,
  Copy,
  Check,
  FileCode,
  Layers,
  Eye,
  Cpu,
  HelpCircle,
  FileText,
  Activity,
  Workflow,
  ShieldCheck,
  Database,
  Zap,
  Split,
  CornerDownRight,
  Sparkles
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onNavigate: (sectionId: SectionId) => void;
  onOpenTicketModal: (caseStudyId?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ 
  onNavigate, 
  onOpenTicketModal 
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string>(CASE_STUDIES[0].id);
  const [activeAudienceView, setActiveAudienceView] = useState<Record<string, 'engineering' | 'customer'>>({
    'cs-dual-audience-communication': 'customer',
  });
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const filterTags: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Case Studies', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Incident Management', label: 'Incident Management', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'API', label: 'API Diagnostics', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'Database', label: 'Database', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'Customer Success', label: 'Customer Success', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'Technical Communication', label: 'Technical Communication', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'Documentation', label: 'Documentation', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  const filteredStudies = selectedTag === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((study) => study.tags.includes(selectedTag as CaseStudyCategory));

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            Centerpiece Portfolio Demonstrations
          </span>
          <span className="text-xs font-mono text-slate-400">
            5 In-Depth Incident Reports
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Technical Incident Reports & Diagnostic Deep Dives
        </h1>
        
        <p className="text-base text-slate-300 leading-relaxed">
          Structured technical incident reports illustrating the complete 9-phase diagnostic methodology: from initial ticket triage and deterministic log isolation to cross-functional engineering handoffs, stakeholder communication, and systemic recurrence prevention.
        </p>

        {/* Portfolio Demonstration Notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-2.5 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-200">Portfolio Context:</strong> These representative case studies are rigorous technical demonstrations based on Olumide's authentic Tier 2/3 diagnostic practice. They utilize synthetic, non-proprietary schemas and sanitized environments to protect organizational confidentiality while demonstrating deep architectural troubleshooting.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-3 sm:p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5 font-semibold">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Filter By Discipline:
          </span>
          {filterTags.map((tab) => {
            const isActive = selectedTag === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTag(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Incident Reports List */}
      <div className="space-y-8">
        {filteredStudies.map((study, studyIdx) => {
          const isExpanded = expandedId === study.id;
          const currentAudience = activeAudienceView[study.id] || 'customer';

          return (
            <article 
              key={study.id}
              className={`bg-[#0f172a] border rounded-2xl transition-all shadow-xl overflow-hidden ${
                isExpanded ? 'border-slate-700 ring-1 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700/80'
              }`}
            >
              
              {/* Report Header Banner */}
              <div 
                onClick={() => toggleExpand(study.id)}
                className="p-6 sm:p-8 cursor-pointer select-none bg-gradient-to-r from-[#0f172a] via-[#111c35] to-[#0f172a] border-b border-slate-800/80"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Title & Metadata */}
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-semibold">
                        REPORT #{studyIdx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {study.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {study.severity}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-emerald-300 transition-colors">
                      {study.title}
                    </h2>

                    {study.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-400 font-medium">
                        {study.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Right Header Controls */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-wrap gap-1 max-w-[240px] justify-end">
                      {study.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                      aria-label="Toggle Expand Case Study"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                </div>

                {/* Summary Box */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {study.summary}
                </p>

                {/* Skills Tag Bar */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/60">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-2 font-semibold">
                    Core Skills Demonstrated:
                  </span>
                  {study.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900/90 text-emerald-300 border border-slate-800 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Collapsed Preview Helper */}
              {!isExpanded && (
                <div 
                  onClick={() => toggleExpand(study.id)}
                  className="px-6 py-3 bg-slate-900/40 text-xs font-mono text-emerald-400 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Click to expand 9-phase incident investigation report & technical evidence...</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    Expand Report <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              )}

              {/* Expanded Incident Report Body (9-Phase Flow) */}
              {isExpanded && (
                <div className="p-6 sm:p-8 space-y-10 divide-y divide-slate-800/80">
                  
                  {/* PHASE 1: PROBLEM */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        1
                      </span>
                      <span>PHASE 1: PROBLEM</span>
                    </div>

                    <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-5 space-y-4">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Incoming Customer Report:
                        </span>
                        <blockquote className="text-base sm:text-lg font-mono text-amber-300 bg-slate-900/90 p-4 rounded-lg border-l-4 border-amber-400 italic">
                          "{study.problem.reportedStatement}"
                        </blockquote>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                            Reporter & Target Architecture
                          </span>
                          <p className="text-slate-200 font-semibold">{study.ticketSnippet.customerName}</p>
                          <p className="text-slate-400 font-mono text-[11px]">{study.ticketSnippet.environment}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                            Triage & Clarification Process
                          </span>
                          <ul className="space-y-1 text-slate-300">
                            {study.problem.clarificationProcess.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">›</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* PHASE 2: CUSTOMER IMPACT */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        2
                      </span>
                      <span>PHASE 2: CUSTOMER IMPACT</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          Operational Blast Radius
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {study.customerImpact.operationalImpact}
                        </p>
                      </div>

                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          Business & Revenue Risk
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {study.customerImpact.businessRisk}
                        </p>
                      </div>

                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                          SLA Urgency Classification
                        </span>
                        <p className="text-slate-200 font-mono font-bold text-sm">
                          {study.customerImpact.urgencyClassification}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* CUSTOM WORKFLOW PIPELINE (FOR CASE STUDY 2 & 3) */}
                  {study.customWorkflow && (
                    <section className="space-y-4 pt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          <Workflow className="w-4 h-4" />
                          <span>{study.customWorkflow.pipelineName}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">Structured Linear Process</span>
                      </div>

                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 sm:p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                          {study.customWorkflow.stages.map((stage, sIdx) => (
                            <div key={sIdx} className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                  {stage.stepNumber}
                                </span>
                                <h4 className="text-xs font-bold text-white mt-2 leading-tight">
                                  {stage.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                {stage.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PHASE 3: INVESTIGATION */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                          3
                        </span>
                        <span>PHASE 3: INVESTIGATION</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {study.investigation.steps.length} Diagnostic Probes
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {study.investigation.narrative}
                    </p>

                    {/* Investigation Steps Timeline */}
                    <div className="space-y-3 pt-2">
                      {study.investigation.steps.map((step, sIdx) => (
                        <div 
                          key={sIdx}
                          className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                            <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                              {step.phase}
                            </span>
                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold self-start sm:self-auto ${
                              step.status === 'isolated'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : step.status === 'mitigated'
                                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              Status: {step.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                            <div className="md:col-span-4 text-slate-400">
                              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Action:</span>
                              {step.action}
                            </div>
                            <div className="md:col-span-8 text-slate-200">
                              <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-0.5">Finding:</span>
                              {step.findings}
                            </div>
                          </div>

                          {step.codeOrQuery && (
                            <div className="pt-2">
                              <pre className="p-2.5 rounded bg-black border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                                <code>{step.codeOrQuery}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* PHASE 4: EVIDENCE */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        4
                      </span>
                      <span>PHASE 4: EVIDENCE</span>
                    </div>

                    <p className="text-xs text-slate-300">
                      {study.evidence.summary}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {study.evidence.artifacts.map((art, aIdx) => (
                        <div key={aIdx} className="bg-[#0b0f17] border border-slate-800 rounded-xl overflow-hidden">
                          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-200 font-semibold flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                              {art.title}
                            </span>
                            <button
                              onClick={() => handleCopyCode(art.code, `${study.id}-${aIdx}`)}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedSnippet === `${study.id}-${aIdx}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          <pre className="p-4 text-xs font-mono text-slate-300 bg-black overflow-x-auto leading-relaxed">
                            <code>{art.code}</code>
                          </pre>

                          {art.note && (
                            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                              Note: {art.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* PHASE 5: ROOT CAUSE */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        5
                      </span>
                      <span>PHASE 5: ROOT CAUSE</span>
                    </div>

                    <div className="bg-[#0b0f17] border border-amber-500/30 rounded-xl p-5 sm:p-6 space-y-3">
                      <h3 className="text-base font-bold text-amber-300 tracking-tight flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{study.rootCause.headline}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {study.rootCause.technicalDetails}
                      </p>
                    </div>
                  </section>

                  {/* PHASE 6: ACTION */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        6
                      </span>
                      <span>PHASE 6: ACTION & MITIGATION</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-5 space-y-3">
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                          Immediate Operational Mitigation:
                        </span>
                        <ul className="space-y-2 text-slate-300">
                          {study.action.immediateMitigation.map((act, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-5 space-y-3">
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
                          Engineering Escalation Package:
                        </span>
                        <ul className="space-y-2 text-slate-300">
                          {study.action.engineeringEscalation.map((esc, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2 leading-relaxed">
                              <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <span>{esc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* PHASE 7: COMMUNICATION */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        7
                      </span>
                      <span>PHASE 7: COMMUNICATION</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300">
                      {study.communication.strategy}
                    </p>

                    {/* DUAL AUDIENCE INTERACTIVE VIEW (FOR CASE STUDY 4) */}
                    {study.communication.dualAudience ? (
                      <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                        
                        {/* Key Statement Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                          <div className="flex items-center gap-2">
                            <Split className="w-5 h-5 text-emerald-400" />
                            <span className="text-base font-bold text-white tracking-tight">
                              {study.communication.dualAudience.keyStatement}
                            </span>
                          </div>

                          {/* Toggle Buttons */}
                          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                            <button
                              onClick={() => setActiveAudienceView({ ...activeAudienceView, [study.id]: 'customer' })}
                              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                                currentAudience === 'customer'
                                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Customer View
                            </button>
                            <button
                              onClick={() => setActiveAudienceView({ ...activeAudienceView, [study.id]: 'engineering' })}
                              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                                currentAudience === 'engineering'
                                  ? 'bg-blue-400 text-slate-950 font-bold shadow-sm'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Engineering View
                            </button>
                          </div>
                        </div>

                        {/* Customer View Tab Content */}
                        {currentAudience === 'customer' && (
                          <div className="space-y-4 animate-in fade-in duration-200">
                            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                              <Users className="w-4 h-4" />
                              <span>CUSTOMER VIEW: Business-Centric, Jargon-Free Reassurance</span>
                            </div>

                            <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-5 space-y-4 text-xs leading-relaxed text-slate-200">
                              <div>
                                <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-emerald-400">
                                  1. Operational Impact Acknowledgment:
                                </strong>
                                <p>{study.communication.dualAudience.customerView.impactExplanation}</p>
                              </div>

                              <div>
                                <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-emerald-400">
                                  2. Current Service Status:
                                </strong>
                                <p>{study.communication.dualAudience.customerView.currentStatus}</p>
                              </div>

                              <div>
                                <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-emerald-400">
                                  3. Root Cause & Immediate Resolution:
                                </strong>
                                <p>{study.communication.dualAudience.customerView.resolution}</p>
                              </div>

                              <div>
                                <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-emerald-400">
                                  4. Long-Term Next Steps & Safeguards:
                                </strong>
                                <p>{study.communication.dualAudience.customerView.nextSteps}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Engineering View Tab Content */}
                        {currentAudience === 'engineering' && (
                          <div className="space-y-4 animate-in fade-in duration-200">
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold">
                              <Server className="w-4 h-4" />
                              <span>ENGINEERING VIEW: Rigorous Technical Diagnosis & Remediation</span>
                            </div>

                            <div className="bg-slate-900/90 border border-blue-500/20 rounded-xl p-5 space-y-4 text-xs font-mono text-slate-300">
                              <div>
                                <span className="text-[11px] uppercase tracking-wider block text-blue-400 font-bold mb-1">
                                  Technical Diagnosis:
                                </span>
                                <p className="text-slate-200">{study.communication.dualAudience.engineeringView.diagnosis}</p>
                              </div>

                              <div>
                                <span className="text-[11px] uppercase tracking-wider block text-blue-400 font-bold mb-1">
                                  Log Analysis:
                                </span>
                                <p className="text-slate-300 bg-black/60 p-2.5 rounded border border-slate-800 text-[11px]">
                                  {study.communication.dualAudience.engineeringView.logsAnalysis}
                                </p>
                              </div>

                              <div>
                                <span className="text-[11px] uppercase tracking-wider block text-blue-400 font-bold mb-1">
                                  API Behaviour:
                                </span>
                                <p className="text-slate-300">{study.communication.dualAudience.engineeringView.apiBehaviour}</p>
                              </div>

                              <div>
                                <span className="text-[11px] uppercase tracking-wider block text-blue-400 font-bold mb-1">
                                  Database / Service Issue:
                                </span>
                                <p className="text-slate-300">{study.communication.dualAudience.engineeringView.databaseServiceIssue}</p>
                              </div>

                              <div>
                                <span className="text-[11px] uppercase tracking-wider block text-blue-400 font-bold mb-1">
                                  Remediation:
                                </span>
                                <p className="text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-500/20">
                                  {study.communication.dualAudience.engineeringView.remediation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    ) : study.communication.stakeholderUpdates ? (
                      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 space-y-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                          Chronological Stakeholder Broadcasts:
                        </span>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {study.communication.stakeholderUpdates.map((msg, mIdx) => (
                            <li key={mIdx} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 leading-relaxed font-mono">
                              {msg}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>

                  {/* PHASE 8: RESOLUTION */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        8
                      </span>
                      <span>PHASE 8: RESOLUTION & VERIFICATION</span>
                    </div>

                    <div className="bg-[#0b0f17] border border-emerald-500/30 rounded-xl p-5 space-y-3 text-xs">
                      <p className="text-sm font-semibold text-white">
                        {study.resolution.summary}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold block">
                          Verification Criteria:
                        </span>
                        <ul className="space-y-1.5 text-slate-300">
                          {study.resolution.confirmationSteps.map((conf, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{conf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* PHASE 9: PREVENTION */}
                  <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs">
                        9
                      </span>
                      <span>PHASE 9: PREVENTION & KNOWLEDGE BASE ARTIFACTS</span>
                    </div>

                    <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block">
                        Systemic Recurrence Protections:
                      </span>
                      <ul className="space-y-2 text-slate-300">
                        {study.prevention.systemicMeasures.map((prev, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                            <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span>{prev}</span>
                          </li>
                        ))}
                      </ul>

                      {/* FULL KNOWLEDGE BASE ARTICLE PREVIEW (FOR CASE STUDY 5) */}
                      {study.prevention.kbArticle && (
                        <div className="pt-4 border-t border-slate-800">
                          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-6 text-slate-200">
                            
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                                <BookOpen className="w-4 h-4" />
                                <span>PUBLISHED KNOWLEDGE BASE ARTICLE (CUSTOMER SELF-SERVICE)</span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-400">Article #KB-7029</span>
                            </div>

                            <h4 className="text-lg font-bold text-white tracking-tight">
                              {study.prevention.kbArticle.title}
                            </h4>

                            {/* KB Symptoms */}
                            <div className="space-y-1.5">
                              <h5 className="text-xs font-mono uppercase text-emerald-400 font-bold">
                                Symptoms Observed:
                              </h5>
                              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                                {study.prevention.kbArticle.symptoms.map((sym, sIdx) => (
                                  <li key={sIdx}>{sym}</li>
                                ))}
                              </ul>
                            </div>

                            {/* KB Likely Causes */}
                            <div className="space-y-1.5">
                              <h5 className="text-xs font-mono uppercase text-amber-300 font-bold">
                                Likely Causes:
                              </h5>
                              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                                {study.prevention.kbArticle.likelyCauses.map((cause, cIdx) => (
                                  <li key={cIdx}>{cause}</li>
                                ))}
                              </ul>
                            </div>

                            {/* KB Troubleshooting Steps */}
                            <div className="space-y-1.5">
                              <h5 className="text-xs font-mono uppercase text-blue-400 font-bold">
                                Step-by-Step Troubleshooting:
                              </h5>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {study.prevention.kbArticle.troubleshootingSteps.map((trb, tIdx) => (
                                  <li key={tIdx} className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px]">
                                    {trb}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* KB Resolution */}
                            <div className="space-y-1.5">
                              <h5 className="text-xs font-mono uppercase text-emerald-400 font-bold">
                                Resolution Methods:
                              </h5>
                              <ul className="space-y-1 text-xs text-slate-300">
                                {study.prevention.kbArticle.resolutionSteps.map((res, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{res}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* KB When to Escalate & Info Support Needs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                                <span className="font-mono text-[11px] font-bold text-amber-400 uppercase block">
                                  When to Escalate to Tier 2:
                                </span>
                                <ul className="space-y-1 text-slate-300 text-[11px]">
                                  {study.prevention.kbArticle.whenToEscalate.map((esc, eIdx) => (
                                    <li key={eIdx}>• {esc}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                                <span className="font-mono text-[11px] font-bold text-blue-400 uppercase block">
                                  Information Support Needs from Customer:
                                </span>
                                <ul className="space-y-1 text-slate-300 text-[11px]">
                                  {study.prevention.kbArticle.informationSupportNeeds.map((inf, iIdx) => (
                                    <li key={iIdx}>• {inf}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Interactive Modal Launcher Card */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-0.5 text-xs">
                      <span className="font-bold text-white block">
                        Want to explore this ticket through the 3-Problem Lens?
                      </span>
                      <span className="text-slate-400">
                        Inspect the raw incoming ticket, technical problem, customer problem, and communication problem side-by-side.
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenTicketModal(study.id)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 flex items-center gap-2 transition-colors shrink-0"
                    >
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Launch Interactive Ticket Lens</span>
                    </button>
                  </div>

                </div>
              )}

            </article>
          );
        })}
      </div>

      {/* Bottom CTA to How I Work / Skills */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
            <Zap className="w-4 h-4" />
            <span>OPERATIONAL CONTINUITY</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            See the Diagnostic Methodology Behind These Reports
          </h3>
          <p className="text-xs text-slate-400">
            Explore the 5-stage diagnostic process, incident severity SLAs, and technical skills applied across every escalation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('how-i-work')}
            className="px-4 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>See How I Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('skills')}
            className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
          >
            <span>Technical Skills Matrix</span>
          </button>
        </div>
      </div>

    </div>
  );
};
