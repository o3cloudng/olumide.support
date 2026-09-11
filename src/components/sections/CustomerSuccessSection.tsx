import React from 'react';
import { SectionId } from '../../types';
import { VERIFIED_METRICS } from '../../data/portfolioData';
import { 
  Users, 
  TrendingUp, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  FileCheck2
} from 'lucide-react';

interface CustomerSuccessSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const CustomerSuccessSection: React.FC<CustomerSuccessSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Retention & Account Health
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Customer Success Strategy
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Technical support is the frontline of customer retention. When enterprise accounts encounter critical blockers, their confidence in renewing is won or lost by the technical depth, speed, and transparency of support.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              Proactive Telemetry vs. Reactive Firefighting
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monitoring error rate spikes, webhook delivery failures, and 429 rate limit triggers in real time. Reaching out to account leads with solutions before their executive leadership flags an outage.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            Outcome: Eliminates surprise churn risks
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              The High-Stakes De-escalation Framework
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a VIP account threatens cancellation, panic achieves nothing. I validate their business pain, outline exact diagnostic findings, commit to predictable updates, and provide interim operational workarounds.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            Outcome: Sustained 95% Customer CSAT
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              Technical Onboarding & Enablement
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Accelerating Time-to-First-Value (TTFV) for developer teams integrating our APIs. Creating interactive cURL collections, clear webhook signature verification guides, and payload schemas that prevent initial confusion.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            Outcome: 20% Ticket Inflow Deflection
          </div>
        </div>

      </div>

      {/* De-escalation Flow: How I Turn Crisis Into Retention */}
      <section className="bg-[#0b0f17] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            De-escalation In Action
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How I Handle an Escalated Enterprise Customer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">STEP 01</span>
            <h3 className="text-sm font-semibold text-white">Acknowledge & Validate Urgency</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No automated bot responses. Confirm exact business impact immediately and take ownership of the ticket.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">STEP 02</span>
            <h3 className="text-sm font-semibold text-white">Provide Immediate Workaround</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unblock their revenue or staff workflow using temporary script workarounds or configuration overrides while investigating root causes.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">STEP 03</span>
            <h3 className="text-sm font-semibold text-white">Transparent Progress Cadence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deliver updates precisely every 30-60 minutes without fail, even if the update is "engineering continues active staging verification."
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">STEP 04</span>
            <h3 className="text-sm font-semibold text-white">Blameless Post-Mortem & Fix</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deliver a clear summary of what occurred, how it was patched, and what safeguards prevent recurrence.
            </p>
          </div>

        </div>
      </section>

      {/* Voice of Customer Feedback Loop */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
          <Lightbulb className="w-4 h-4" />
          <span>CLOSING THE PRODUCT FEEDBACK LOOP</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Turning Support Tickets Into Product Roadmap Improvements
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Support tickets are unvarnished product usability data. By categorizing root friction points (confusing UI validation, uninformative API error messages, or missing batch parameters), I translate recurring customer pain into concrete product feature requests with quantified ticket-frequency data.
        </p>
      </div>

      {/* Next Step Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          How do these principles hold up during critical system outages?
        </span>
        <button
          onClick={() => onNavigate('incident-management')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>View Incident Management Framework</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
