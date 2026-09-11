import React from 'react';
import { SectionId } from '../../types';
import { 
  PERSONAL_INFO, 
  QUICK_VIEW,
  VERIFIED_CERTIFICATIONS, 
  VERIFIED_EDUCATION 
} from '../../data/portfolioData';
import { 
  Code2, 
  Search, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  FileText, 
  ShieldCheck,
  Clock,
  Compass,
  GraduationCap,
  Award,
  Layers,
  Zap
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 md:space-y-20">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          About Olumide Oderinde
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Engineering Foundations & High-Stakes Technical Operations
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          With 5+ years of customer-facing technical operations and systems support, my career is grounded in a deep software engineering foundation—bridging complex application diagnostics, enterprise customer success, and Agile product delivery.
        </p>
      </div>

      {/* Strategic Positioning Progression Banner */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
          <Layers className="w-4 h-4" />
          <span>CAREER TRAJECTORY & VALUE PROPOSITION</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Positioning Technical Support as an Engineering Discipline
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          Olumide's background combines software engineering, technical support, customer-facing technical operations, Agile/Scrum, troubleshooting, and technical documentation. Rather than viewing support as a disconnected front-line desk, Olumide leverages this technical foundation as a core operational advantage:
        </p>

        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono">
            {PERSONAL_INFO.careerProgression.map((stage, idx) => (
              <React.Fragment key={stage}>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-semibold shadow-sm">
                  {stage}
                </span>
                {idx < PERSONAL_INFO.careerProgression.length - 1 && (
                  <span className="text-emerald-400 font-bold text-base">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Core Philosophy & Background Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Bridge & Operational Scope */}
        <div className="lg:col-span-7 space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>The Problem With Traditional Support</span>
            </h2>
            <p>
              In most SaaS environments, a painful disconnect exists between front-line support and core engineering. Support teams often lack the technical depth to query relational databases, inspect API payloads, or isolate containerized log anomalies. In response, they copy-paste generic responses or escalate unverified, noisy complaints to engineering.
            </p>
            <p>
              Meanwhile, software engineers get overwhelmed by vague bug reports: <span className="text-amber-300 font-mono text-xs">"Customer says the integration is failing."</span> Valuable engineering sprints are burned merely attempting to replicate basic errors.
            </p>
            <p className="font-medium text-slate-100 border-l-2 border-emerald-500 pl-4 py-1 italic">
              "My mission is to eliminate that friction. With a software engineering background, I don't guess what failed—I test the API endpoint with cURL, inspect PostgreSQL execution plans, verify Docker logs, analyze Elasticsearch clusters, and hand engineers deterministic reproduction scripts."
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Technical Empathy & Agile Collaboration</span>
            </h2>
            <p>
              Technical troubleshooting is only half the equation. When an enterprise account suffers an API degradation or a webhook drop, critical business operations and revenue are on the line.
            </p>
            <p>
              Having served as both a <strong>Technical Support Lead and Scrum Master</strong> across Python/Django SaaS platforms, I bridge technical precision with empathetic, calm stakeholder communication. I facilitate cross-functional sprint planning, eliminate engineering blockers, and translate complex backend constraints into actionable guidance for non-technical executives.
            </p>
          </div>
        </div>

        {/* Right Column: Quick View, Education & Certifications */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Stats Card */}
          <div className="bg-gradient-to-b from-[#0f172a] to-[#0b0f17] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Verified Track Record
              </span>
              <span className="text-[11px] font-mono text-slate-400">5+ Years Ops</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {QUICK_VIEW.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-400">{item.value}</div>
                  <div className="text-xs text-slate-300 mt-1 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>FORMAL EDUCATION</span>
            </div>
            
            {VERIFIED_EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-sm font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {edu.institution}
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  {edu.location} — {edu.year}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold">
              <Award className="w-4 h-4" />
              <span>CERTIFICATIONS & TRAINING</span>
            </div>
            
            <div className="space-y-2">
              {VERIFIED_CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-white font-medium">{cert.name}</span>
                  <span className="text-emerald-400 font-mono text-[11px]">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Remote Work Readiness */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
              <Globe2 className="w-4 h-4" />
              <span>INTERNATIONAL REMOTE READINESS</span>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Time Zone Adaptability:</strong> Based in Nigeria (WAT / UTC+1). Seamless 100% overlap with UK/Europe (GMT/BST/CET) and generous morning overlap with US East Coast (EST).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Asynchronous Fluency:</strong> Detailed ticket handoffs, reproduction traces, and living documentation ensuring zero blockers across distributed global teams.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* 4 Pillars of My Work */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Standard Operating Principles
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How I Approach Every Technical Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-semibold text-white">Investigate Code & Logs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyze Elasticsearch queries, Docker logs, and database records before asking the customer for redundant information.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-semibold text-white">Deterministic Reproduction</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never pass a bug to engineering until it can be reliably replicated with exact payloads, cURL commands, or query traces.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-semibold text-white">Customer-First Transparency</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Give honest timelines, validate customer impact, communicate in plain language, and maintain a 95% CSAT standard.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
              04
            </div>
            <h3 className="text-base font-semibold text-white">Eliminate Recurrence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Turn resolved issues into onboarding guides and technical runbooks, driving a verified 20% reduction in support ticket volume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Interested in my verified company experience?</h3>
          <p className="text-xs text-slate-400">Review my roles at Biznovate Tech and TM30 Global.</p>
        </div>
        <button
          onClick={() => onNavigate('experience')}
          className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <span>View Professional Experience</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

