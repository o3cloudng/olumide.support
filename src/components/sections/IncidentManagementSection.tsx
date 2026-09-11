import React, { useState } from 'react';
import { SectionId } from '../../types';
import { INCIDENT_SEVERITY_LEVELS } from '../../data/portfolioData';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Terminal, 
  FileText,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

interface IncidentManagementSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const IncidentManagementSection: React.FC<IncidentManagementSectionProps> = ({ onNavigate }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('P1');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const activeLevel = INCIDENT_SEVERITY_LEVELS.find((l) => l.level === selectedSeverity) || INCIDENT_SEVERITY_LEVELS[0];

  const templates = [
    {
      id: 'ack',
      title: '1. Initial Outage Acknowledgment (T+10 mins)',
      audience: 'Customer-Facing / Public Status Page',
      content: `[INVESTIGATING] Elevated API Latency & Error Rates
Time: ${new Date().toISOString().substring(0, 16).replace('T', ' ')} UTC
Incident ID: INC-84920

We are actively investigating an issue causing elevated 504 Gateway Timeout errors across our primary API ingestion endpoints. 

Our engineering on-call and technical support teams have been engaged and are actively diagnosing root causes. Impacted customers may experience temporary delays in batch sync jobs.

Next update will be published within 30 minutes, or sooner as telemetry becomes available.`,
    },
    {
      id: 'update',
      title: '2. Active Investigation & Workaround Advisory (T+40 mins)',
      audience: 'High-Priority Enterprise Ticket Update',
      content: `Hi team,

Following up on our active investigation: our engineers have isolated the issue to an index lock contention during automated batch ingestion. 

Current Status:
1. Mitigation in progress: heavy batch ingestion runs have been temporarily paused to restore reader pool bandwidth.
2. Temporary Workaround: If you have urgent single-record lookups, the v2 REST endpoint is currently operating within normal latency thresholds.
3. Next Update: We will provide another update in 30 minutes (or immediately upon production hotfix verification).

Thank you for your patience as we restore full operational capacity.`,
    },
    {
      id: 'resolved',
      title: '3. Incident Mitigation & Recovery Notice (T+90 mins)',
      audience: 'Customer-Facing / Statuspage Resolution',
      content: `[RESOLVED] Elevated API Latency & Error Rates
Time: ${new Date().toISOString().substring(0, 16).replace('T', ' ')} UTC

Between 09:00 UTC and 10:20 UTC, our primary API ingestion endpoints experienced elevated error rates and timeout responses due to unexpected query lock contention.

Mitigation:
A targeted hotfix introducing concurrent database indexing was verified and deployed across our production cluster at 10:15 UTC. Error rates have dropped back to 0.002% baseline and all queued webhooks have processed successfully.

A detailed Root Cause Analysis (RCA) document will be published within 48 hours.`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          High-Stakes Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Incident Management & Severity Protocol
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Calm, disciplined incident triage and SLA protection. How high-severity degradations are classified, isolated, communicated, and documented.
        </p>
      </div>

      {/* Severity Matrix Tabs */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {INCIDENT_SEVERITY_LEVELS.map((sev) => {
            const isSelected = selectedSeverity === sev.level;
            return (
              <button
                key={sev.level}
                onClick={() => setSelectedSeverity(sev.level)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/40 text-white shadow-lg'
                    : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${sev.badgeColor}`}>
                    {sev.level}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {sev.slaResponse}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {sev.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Severity Deep Dive */}
        <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${activeLevel.badgeColor}`}>
                  {activeLevel.level}
                </span>
                <h2 className="text-xl font-bold text-white">
                  {activeLevel.title}
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                {activeLevel.criteria}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0 bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">RESPONSE SLA:</span>
                <span className="text-emerald-400 font-bold">{activeLevel.slaResponse}</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 block text-[10px]">UPDATE FREQUENCY:</span>
                <span className="text-blue-400 font-bold">{activeLevel.slaUpdate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Operational Action Protocol:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeLevel.actionProtocol.map((protocol, pIdx) => (
                <div key={pIdx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {protocol}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Incident Communication Templates */}
      <section className="space-y-6 bg-[#0b0f17] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Enterprise Communication Standards
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Incident Communication Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real communication templates used during live high-severity incidents to provide transparency, reduce ticket storm inquiries, and maintain executive calm.
          </p>
        </div>

        <div className="space-y-4">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">{tpl.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 ml-2 hidden sm:inline">
                    [{tpl.audience}]
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(tpl.id, tpl.content)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  {copiedTemplate === tpl.id ? (
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
              <pre className="p-4 sm:p-5 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto bg-[#0b0f17]/50">
                {tpl.content}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Post-Incident Review (PIR) / RCA Framework */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>BLAMELESS ROOT CAUSE ANALYSIS (RCA)</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          The 5-Whys Post-Mortem Standard
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Every critical incident must make the organization stronger. I lead post-incident analyses focused strictly on system design, telemetry gaps, and preventative guardrails rather than human blame:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800 space-y-1">
            <strong className="text-emerald-400 block font-mono">1. Timeline Reconstruction</strong>
            <span className="text-slate-300">Precise timestamps from first alert trigger to mitigation deployment.</span>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800 space-y-1">
            <strong className="text-blue-400 block font-mono">2. Detection & Recovery Gap</strong>
            <span className="text-slate-300">Why was the issue not caught in staging? What alert threshold was missing?</span>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800 space-y-1">
            <strong className="text-purple-400 block font-mono">3. Preventative Action Items</strong>
            <span className="text-slate-300">Tracked Jira/Linear tickets for schema index hardening, runbook updates, and synthetic tests.</span>
          </div>
        </div>
      </div>

      {/* Next Step Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Want to see my track record and professional journey?
        </span>
        <button
          onClick={() => onNavigate('experience')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>View Professional Experience</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
