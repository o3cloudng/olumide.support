import React, { useState } from 'react';
import { PERSONAL_INFO, VERIFIED_METRICS } from '../../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe2, 
  Copy, 
  Check, 
  Send, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('interview');
  
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [messageSentFeedback, setMessageSentFeedback] = useState(false);

  const templates: Record<string, { label: string; subject: string; body: string }> = {
    interview: {
      label: 'Interview Opportunity',
      subject: 'Interview Request: Technical Customer Success & Support Role',
      body: `Hi Olumide,

We reviewed your portfolio and were impressed by your technical investigation discipline, Tier 2/3 diagnostic background, and verified metrics (98%+ SLA, 30% MTTR reduction).

We would like to invite you to an introductory interview for an international remote opportunity at our company.

Please let us know your availability for a 30-minute discussion this week.`,
    },
    tier3: {
      label: 'Tier 2/3 Support Role',
      subject: 'Opportunity: Tier 2/3 Technical Support Engineer',
      body: `Hi Olumide,

We are actively hiring for an international remote Tier 2/3 Technical Support Engineer to handle complex API integrations, database diagnostics, and cross-functional engineering escalations.

Your experience in root-cause isolation and deterministic bug reproduction aligns with what our team needs. Let's connect to discuss the role.`,
    },
    cs: {
      label: 'Technical Customer Success',
      subject: 'Opportunity: Technical Customer Success Specialist',
      body: `Hi Olumide,

We have an opening for a Technical Customer Success Specialist to bridge technical onboarding, proactive account health, and high-stakes customer de-escalations.

Your framework of solving the technical, customer, and communication problems simultaneously is exactly what we're looking for. Are you open to a conversation?`,
    },
    general: {
      label: 'General Inquiry',
      subject: 'Inquiry for Olumide Oderinde',
      body: `Hi Olumide,

I came across your portfolio and wanted to connect regarding potential technical collaboration or an upcoming remote position.`,
    },
  };

  const handleCopy = (type: 'email' | 'phone', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTpl = templates[selectedTemplate];
    const subject = encodeURIComponent(currentTpl.subject + (senderCompany ? ` - ${senderCompany}` : ''));
    
    let fullBody = currentTpl.body;
    if (senderName || senderCompany || customMessage) {
      fullBody = `From: ${senderName || 'Anonymous'} ${senderCompany ? `(${senderCompany})` : ''}\n\n${customMessage || currentTpl.body}`;
    }
    
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailtoUrl;

    setMessageSentFeedback(true);
    setTimeout(() => setMessageSentFeedback(false), 4000);
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Direct Contact & Availability
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          I am based in Nigeria and actively available for international remote opportunities. Reach out directly via email, phone, or the message composer below.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Message Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Verified Contact Cards & Timezone Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Contact Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
              Verified Contact Information
            </span>

            <div className="space-y-4">
              
              {/* Email Block */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    Direct Email
                  </span>
                  <button
                    onClick={() => handleCopy('email', PERSONAL_INFO.email)}
                    className="text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-white font-mono text-xs sm:text-sm font-semibold hover:text-emerald-300 transition-colors break-all block"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone Block */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    Direct Phone / WhatsApp
                  </span>
                  <button
                    onClick={() => handleCopy('phone', PERSONAL_INFO.phone)}
                    className="text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-white font-mono text-sm font-semibold hover:text-emerald-300 transition-colors block"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location & Remote Scope */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Location & Availability
                </span>
                <div className="text-xs font-semibold text-white">
                  {PERSONAL_INFO.location}
                </div>
                <div className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded inline-block">
                  Available for International Remote Opportunities
                </div>
              </div>

            </div>
          </div>

          {/* Timezone & Overlap Advantage */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>TIME ZONE OVERLAP MATRIX</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Based in Nigeria (West Africa Time / UTC+1). This geographic position offers significant operational overlap with primary tech hubs:
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">United Kingdom (GMT / BST)</span>
                <span className="text-emerald-400 font-bold">100% (0–1h diff)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">Europe (CET / CEST)</span>
                <span className="text-emerald-400 font-bold">100% (0h diff)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">US East Coast (EST / EDT)</span>
                <span className="text-emerald-400 font-bold">4–5 Hours Overlap</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">APAC / Asia-Pacific</span>
                <span className="text-emerald-400 font-bold">Full Async Alignment</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pre-populated Message Composer */}
        <div className="lg:col-span-7">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>DIRECT INQUIRY COMPOSER</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Send an Email to Olumide
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select an inquiry template or customize your message. Clicking send opens your email client directly.
              </p>
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Select Message Context:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(templates).map(([key, tpl]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(key);
                      setCustomMessage(tpl.body);
                    }}
                    className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                      selectedTemplate === key
                        ? 'bg-slate-800 border-emerald-500 text-white font-medium shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold">{tpl.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Your Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Your Company / Team (Optional):
                  </label>
                  <input
                    type="text"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block">
                  Subject:
                </label>
                <input
                  type="text"
                  readOnly
                  value={templates[selectedTemplate].subject + (senderCompany ? ` - ${senderCompany}` : '')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono select-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block">
                  Message Body:
                </label>
                <textarea
                  rows={8}
                  value={customMessage || templates[selectedTemplate].body}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                />
              </div>

              {messageSentFeedback && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your email application has been launched with the drafted message.</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Recipient: {PERSONAL_INFO.email}
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-950/20"
                  id="send-email-btn"
                >
                  <span>Launch Email Client</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
