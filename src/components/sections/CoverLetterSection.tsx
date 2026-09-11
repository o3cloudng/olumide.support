import React, { useState } from 'react';
import { SectionId } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Globe2, 
  ArrowRight,
  FileText,
  UserCheck
} from 'lucide-react';

interface CoverLetterSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<'specialist' | 'tier3' | 'lead'>('specialist');
  const [copied, setCopied] = useState(false);

  const getLetterContent = () => {
    if (selectedRole === 'tier3') {
      return {
        title: 'Tier 2/3 Technical Support Engineer',
        text: `Dear Hiring Team,

I am writing to express my strong interest in joining your team as a Tier 2/3 Technical Support Engineer. With a background rooted in software engineering and an engineering degree (B.Eng. in Electronics & Electrical Engineering), my professional positioning is centered on one commitment: I investigate the problems behind the ticket.

Over 5+ years of technical support and systems leadership—including serving as Technical Support Lead and Scrum Master at Biznovate Tech and Technical Support Specialist at TM30 Global—I have specialized in bridging the gap between customer-reported symptoms and backend systems:
• Delivered Tier 2/3 incident resolution across Python/Django SaaS platforms, APIs, PostgreSQL, MySQL, Redis, Docker, and Elasticsearch log analysis.
• Diagnosed complex telemetry systems and database integrations for mobile network operator enterprise clients.
• Reduced average MTTR by 30% by supplying engineering teams with deterministic reproduction scripts, exact cURL commands, and request/response payloads.
• Maintained 98%+ SLA compliance on high-priority tickets.

Operating from Nigeria with full remote infrastructure (redundant power and high-speed fiber internet), I offer seamless working-hour alignment across Europe, the UK, and generous overlap with US East Coast business hours, backed by strong asynchronous communication hygiene.

I look forward to discussing how my diagnostic discipline can strengthen your technical support operations and protect your customer experience.

Sincerely,

Olumide Oderinde
Technical Customer Success & Support Specialist
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
Location: Nigeria | Available for International Remote Opportunities`,
      };
    }

    if (selectedRole === 'lead') {
      return {
        title: 'Support Operations & Escalations Lead',
        text: `Dear Hiring Team,

I am writing to submit my application for the Support Operations & Escalations role. I operate at the critical intersection of customer advocacy, technical investigation, engineering alignment, and preventative support operations.

As Technical Systems Support Lead and Scrum Master across SaaS and telemetry platforms:
• Facilitated Agile sprint ceremonies (sprint planning, daily stand-ups, retrospectives) using Jira, Trello, and Azure DevOps to keep engineering and support queues strictly aligned.
• Managed incident resolution across APIs, PostgreSQL, Redis, and Docker environments, maintaining 98%+ SLA compliance on high-priority incidents.
• Reduced client support ticket volume by 20% by authoring developer onboarding guides, troubleshooting manuals, and living runbooks.
• Translated complex backend constraints into transparent, actionable guidance for non-technical enterprise clients, achieving a 95% Customer Satisfaction (CSAT) rating.

Based in Nigeria and seeking international remote opportunities, I thrive in asynchronous, cross-functional cultures that value documentation, clear ownership, and systematic root-cause elimination.

I would welcome the opportunity to discuss how I can help scale your support operations and protect enterprise customer retention.

Sincerely,

Olumide Oderinde
Technical Customer Success & Support Specialist
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
Location: Nigeria | Available for International Remote Opportunities`,
      };
    }

    // Default: Technical Customer Success & Support Specialist
    return {
      title: 'Technical Customer Success & Support Specialist',
      text: `Dear Hiring Team,

I am writing to apply for the Technical Customer Success & Support Specialist position. My career is defined by a simple principle: "I investigate the problems behind the ticket."

With an academic foundation in Electronics & Electrical Engineering (B.Eng.) and 5+ years of hands-on experience in software systems support, I do not view customer success or technical support as merely closing tickets or copying canned responses. I position myself at the exact operational intersection where the customer meets the code:

Software / Technical Background → Application & Systems Support → Tier 2/3 Troubleshooting → Customer-Facing Technical Operations → Customer Success & Technical Support

Throughout my tenures leading technical support and systems operations at Biznovate Tech (Python/Django SaaS) and TM30 Global (telemetry systems & mobile network operator integrations), I have treated every issue as three simultaneous challenges:
1. The Technical Problem: What is actually failing in the codebase, payload, database query, or container logs?
2. The Customer Problem: What critical business operation is blocked?
3. The Communication Problem: What transparent timeline and interim workaround does the customer need to stay calm?

Through this diagnostic discipline, I have consistently achieved:
• 98%+ SLA compliance on high-priority tickets
• 30% reduction in average Mean Time to Resolution (MTTR)
• 95% Customer Satisfaction (CSAT) rating across complex enterprise accounts
• 20% reduction in recurring support ticket volume through documentation and living runbooks

Based in Nigeria and fully prepared for international remote roles, I offer seamless cross-timezone overlap with European and North American teams, complete with asynchronous documentation fluency and dedicated home infrastructure.

I welcome the opportunity to speak with your team about how I can safeguard your enterprise account health and streamline your technical support pipeline.

Sincerely,

Olumide Oderinde
Technical Customer Success & Support Specialist
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
Location: Nigeria | Available for International Remote Opportunities`,
    };
  };

  const currentLetter = getLetterContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLetter.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Tailored Candidate Introduction
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Cover Letter
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Articulating my value proposition for international remote SaaS teams. Select a role profile below to preview a tailored candidate statement.
        </p>
      </div>

      {/* Role Profile Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        <span className="text-xs font-mono text-slate-400 mr-2">Target Profile:</span>
        <button
          onClick={() => setSelectedRole('specialist')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            selectedRole === 'specialist'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
          }`}
        >
          Technical CS & Support Specialist (Primary)
        </button>
        <button
          onClick={() => setSelectedRole('tier3')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            selectedRole === 'tier3'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
          }`}
        >
          Tier 2/3 Technical Support Engineer
        </button>
        <button
          onClick={() => setSelectedRole('lead')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            selectedRole === 'lead'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
          }`}
        >
          Support Operations & Escalations Lead
        </button>
      </div>

      {/* Letter Container */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl shadow-xl overflow-hidden max-w-3xl">
        
        {/* Letter Top Bar */}
        <div className="px-6 py-4 bg-[#0b0f17] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">{currentLetter.title}</span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700"
            id="copy-cover-letter-btn"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Letter</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Cover Letter</span>
              </>
            )}
          </button>
        </div>

        {/* Letter Body */}
        <div className="p-6 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <div className="text-xs font-mono text-slate-400 space-y-1 border-b border-slate-800 pb-4">
            <div><strong className="text-white">Applicant:</strong> {PERSONAL_INFO.name}</div>
            <div><strong className="text-white">Location:</strong> {PERSONAL_INFO.location} | Remote</div>
            <div><strong className="text-white">Email:</strong> {PERSONAL_INFO.email}</div>
            <div><strong className="text-white">Phone:</strong> {PERSONAL_INFO.phone}</div>
          </div>

          <div className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed space-y-4">
            {currentLetter.text.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </div>

      {/* Next Step / Contact Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Ready to schedule a technical discussion or request an interview?
        </span>
        <button
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Go to Contact Information</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
