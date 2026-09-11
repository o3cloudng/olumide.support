import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/portfolioData';
import { X, CheckCircle, AlertCircle, MessageSquare, Terminal, Server, Users, ArrowRight } from 'lucide-react';

interface TicketInspectionModalProps {
  isOpen: boolean;
  initialCaseStudyId?: string;
  onClose: () => void;
}

export const TicketInspectionModal: React.FC<TicketInspectionModalProps> = ({ 
  isOpen,
  initialCaseStudyId, 
  onClose 
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialCaseStudyId || CASE_STUDIES[0].id);
  const [activeLens, setActiveLens] = useState<'all' | 'technical' | 'customer' | 'communication'>('all');

  const study = CASE_STUDIES.find((cs) => cs.id === selectedId) || CASE_STUDIES[0];

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Ticket Lens"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-[#0f172a] border border-slate-700/80 rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onMouseDown={(event) => event.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0b0f17] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Interactive Ticket Lens
            </span>
            <span className="text-sm font-semibold text-white">
              The 3-Lens Support Diagnostic Model
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            id="close-ticket-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Case Study Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Select Investigation Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {CASE_STUDIES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    selectedId === item.id
                      ? 'bg-slate-800 border-emerald-500/60 text-white font-medium shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="font-mono text-[10px] text-emerald-400 mb-1">{item.severity}</div>
                  <div className="line-clamp-1 font-semibold">{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Ticket Preview */}
          <div className="bg-[#0b0f17] border border-slate-800 rounded-lg p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                Raw Incoming Ticket: #{study.id.toUpperCase()}
              </span>
              <span className="text-slate-400 text-[11px]">{study.category}</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="text-slate-400"><span className="text-slate-400">Reporter:</span> {study.ticketSnippet.customerName}</div>
              <div className="text-slate-400"><span className="text-slate-400">Environment:</span> {study.ticketSnippet.environment}</div>
              <div className="pt-2 text-slate-100 bg-slate-900/80 p-3 rounded border border-slate-800 italic">
                "{study.ticketSnippet.reportedIssue}"
              </div>
            </div>
          </div>

          {/* Lens Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-400 mr-2">Focus Lens:</span>
            <button
              onClick={() => setActiveLens('all')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeLens === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              All 3 Problems
            </button>
            <button
              onClick={() => setActiveLens('technical')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeLens === 'technical'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              1. Technical Problem
            </button>
            <button
              onClick={() => setActiveLens('customer')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeLens === 'customer'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              2. Customer Problem
            </button>
            <button
              onClick={() => setActiveLens('communication')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeLens === 'communication'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              3. Communication Problem
            </button>
          </div>

          {/* The 3 Problems Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Technical Problem */}
            {(activeLens === 'all' || activeLens === 'technical') && (
              <div className="bg-slate-900/70 border border-blue-500/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
                  <Server className="w-4 h-4" />
                  <span>1. TECHNICAL PROBLEM</span>
                </div>
                <div className="text-[11px] font-mono text-blue-300/80">
                  What is actually failing?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {study.theThreeProblems.technical}
                </p>
              </div>
            )}

            {/* 2. Customer Problem */}
            {(activeLens === 'all' || activeLens === 'customer') && (
              <div className="bg-slate-900/70 border border-amber-500/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                  <Users className="w-4 h-4" />
                  <span>2. CUSTOMER PROBLEM</span>
                </div>
                <div className="text-[11px] font-mono text-amber-300/80">
                  What is customer unable to accomplish?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {study.theThreeProblems.customer}
                </p>
              </div>
            )}

            {/* 3. Communication Problem */}
            {(activeLens === 'all' || activeLens === 'communication') && (
              <div className="bg-slate-900/70 border border-purple-500/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  <span>3. COMMUNICATION PROBLEM</span>
                </div>
                <div className="text-[11px] font-mono text-purple-300/80">
                  What does customer need to know?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {study.theThreeProblems.communication}
                </p>
              </div>
            )}

          </div>

          {/* Statement callout */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                The Guiding Principle
              </span>
              <p className="text-sm font-semibold text-white mt-0.5">
                "My job is to solve all three."
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Demonstrated Outcome:</span>
              <span className="text-xs font-mono font-medium text-emerald-400">{study.metricsImpact || study.resolution.summary}</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0b0f17] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
