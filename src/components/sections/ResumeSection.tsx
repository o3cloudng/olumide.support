import React, { useState } from 'react';
import { SectionId } from '../../types';
import { 
  PERSONAL_INFO, 
  QUICK_VIEW,
  VERIFIED_CERTIFICATIONS, 
  VERIFIED_EDUCATION, 
  VERIFIED_EXPERIENCES, 
  PROFESSIONAL_SKILLS_MATRIX 
} from '../../data/portfolioData';
import { 
  Printer, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Globe2, 
  ArrowRight,
  FileText,
  CheckCircle2,
  GraduationCap,
  Award,
  Zap
} from 'lucide-react';

interface ResumeSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const plainResumeText = `OLUMIDE ODERINDE
Technical Customer Success & Support Specialist
Location: Nigeria | Remote | Available for International Remote Opportunities
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}

CORE POSITIONING
"I investigate the problems behind the ticket."
Technical support and customer success professional with a software engineering background, experienced in Tier 2/3 troubleshooting, APIs, databases, application diagnostics, incident management, technical documentation, and customer communication.

CAREER STRENGTH & PROGRESSION
Software / Technical Background → Application & Systems Support → Tier 2/3 Troubleshooting → Customer-Facing Technical Operations → Customer Success & Technical Support

QUICK VIEW & VERIFIED OUTCOMES
• 5+ years — Technical support/customer-facing technical operations
• Tier 2/3 — Support capability
• 98%+ — High-priority SLA compliance
• 30% — MTTR reduction
• 95% — CSAT (Customer Satisfaction)
• 20% — Ticket-volume reduction through technical documentation

PROFESSIONAL EXPERIENCE

Technical Systems Support Lead & Scrum Master
Biznovate Tech — Lagos, Nigeria | Jan 2020 – Present
• Technical Support Lead and Scrum Master across a Python/Django SaaS platform.
• Primary liaison between engineering teams and enterprise stakeholders.
• Facilitated Agile sprint ceremonies using Jira and Trello.
• Delivered Tier 2/3 incident resolution across APIs, PostgreSQL, MySQL, and Redis.
• Maintained 98%+ SLA compliance on high-priority tickets.
• Used Elasticsearch and Docker log analysis to debug complex server and search issues.
• Reduced average MTTR by 30%.
• Translated complex backend constraints into actionable guidance for non-technical clients.
• Achieved 95% Customer Satisfaction.

Technical Support & Systems Specialist
TM30 Global — Lagos, Nigeria | Jan 2019 – Jan 2020
• Tier 2/3 technical support for web platforms, custom telemetry software, and database integrations.
• Interface between engineering teams and mobile network operator clients.
• Owned client accounts end-to-end.
• Analysed application logs and PostgreSQL/MySQL queries.
• Coordinated incident resolution across development and product teams using Jira and Microsoft DevOps.
• Authored end-user manuals, technical documentation, and onboarding guides.
• Reduced client support ticket volume by 20%.
• Managed Docker configurations and local server environments.

EDUCATION
Bachelor of Engineering (B.Eng.), Electronics & Electrical Engineering
Ladoke Akintola University of Technology (LAUTECH), Ogbomoso, Nigeria — 2007

CERTIFICATIONS / TRAINING
• Advanced Customer Service — La Plage Meta Verse
• Customer Support — HubSpot
• Customer Service Fundamentals — Elevify

TECHNICAL SKILLS MATRIX
• Support: Jira, Microsoft/Azure DevOps, Zendesk, Git, GitHub
• Programming/Web: Python, Django, JavaScript, TypeScript, REST APIs
• Databases: PostgreSQL, MySQL, Redis
• Infrastructure: Docker, Linux/Unix
• Diagnostics: Application log analysis, API troubleshooting, database diagnostics, telemetry systems, root cause analysis
• Agile: Scrum, sprint planning, stand-ups, retrospectives, cross-functional collaboration
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(plainResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:hidden">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Curriculum Vitae
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Resume: Olumide Oderinde
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Formatted for technical recruiters, hiring managers, and ATS compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
            id="copy-resume-btn"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Plaintext</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy as Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold shadow-sm transition-colors"
            id="print-resume-btn"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Container */}
      <div 
        id="resume-document"
        className="bg-white text-slate-900 rounded-xl p-8 sm:p-12 lg:p-16 shadow-2xl space-y-7 font-sans max-w-4xl mx-auto print:p-0 print:shadow-none print:max-w-none print:text-black"
      >
        
        {/* Header Information */}
        <div className="border-b-2 border-slate-900 pb-5 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
              {PERSONAL_INFO.workModel}
            </span>
          </div>

          <div className="text-base font-semibold text-slate-800">
            {PERSONAL_INFO.title}
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-700 pt-1 font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-900" />
              {PERSONAL_INFO.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-900" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">
                {PERSONAL_INFO.email}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-900" />
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="hover:underline">
                {PERSONAL_INFO.phone}
              </a>
            </span>
          </div>
        </div>

        {/* Quick View Snapshot */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Recruiter Quick View & Verified Impact
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
            {QUICK_VIEW.map((item, idx) => (
              <div key={idx} className="bg-slate-100 p-2 rounded border border-slate-300">
                <div className="text-base font-bold font-mono text-emerald-800">{item.value}</div>
                <div className="text-[10px] font-medium text-slate-800 leading-tight mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-800">
            <strong>"{PERSONAL_INFO.headline}"</strong> — {PERSONAL_INFO.supportingStatement}
          </p>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Experience
          </h2>

          <div className="space-y-4 text-xs text-slate-800">
            {VERIFIED_EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold text-slate-950">
                  <span className="text-sm">{exp.role}</span>
                  <span className="text-slate-600 font-mono text-[11px]">{exp.period}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-medium font-mono">
                  {exp.company} — {exp.location}
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed pt-0.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Education
            </h2>
            {VERIFIED_EDUCATION.map((edu, idx) => (
              <div key={idx} className="text-xs text-slate-800 space-y-0.5">
                <div className="font-semibold text-slate-950">{edu.degree}</div>
                <div className="text-slate-700">{edu.institution}</div>
                <div className="text-[11px] font-mono text-slate-600">{edu.location} — {edu.year}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Certifications & Training
            </h2>
            <div className="space-y-1.5 text-xs text-slate-800">
              {VERIFIED_CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <span className="font-medium text-slate-900">{cert.name}</span>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Technical Skills Matrix */}
        <div className="space-y-2 pt-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Technical Skills Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-800 pt-1">
            {PROFESSIONAL_SKILLS_MATRIX.map((cat, idx) => (
              <div key={idx}>
                <strong className="text-slate-950 font-semibold">{cat.category}: </strong>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA to Cover Letter / Contact */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 print:hidden">
        <span className="text-xs text-slate-400">
          Looking for a targeted introduction for your team?
        </span>
        <button
          onClick={() => onNavigate('cover-letter')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Read Tailored Cover Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
