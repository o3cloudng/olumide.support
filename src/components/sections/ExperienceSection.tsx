import React from 'react';
import { SectionId } from '../../types';
import { 
  VERIFIED_EXPERIENCES, 
  VERIFIED_EDUCATION, 
  VERIFIED_CERTIFICATIONS,
  QUICK_VIEW
} from '../../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Globe2,
  FileText,
  GraduationCap,
  Award,
  Zap
} from 'lucide-react';

interface ExperienceSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Career Trajectory & Track Record
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Professional Experience
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          5+ years in technical systems support, Tier 2/3 incident resolution, Scrum facilitation, and customer-facing operations. Bridging software engineering platforms with enterprise stakeholder success.
        </p>
      </div>

      {/* Quick View Metrics Bar */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>VERIFIED PERFORMANCE SUMMARY</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_VIEW.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">{item.value}</div>
              <div className="text-[11px] text-slate-300 leading-tight mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-4 before:w-0.5 before:bg-slate-800 before:hidden md:before:block">
        {VERIFIED_EXPERIENCES.map((exp, idx) => (
          <div 
            key={idx}
            className="relative md:pl-10 space-y-4"
          >
            {/* Timeline indicator node */}
            <div className="hidden md:flex absolute -left-0.5 top-6 w-8 h-8 rounded-full bg-[#0b0f17] border-2 border-emerald-500/80 items-center justify-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>

            {/* Experience Card */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 hover:border-slate-700 transition-colors shadow-lg">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400">
                    <span className="font-semibold text-white">{exp.company}</span>
                    <span className="text-slate-500">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 shrink-0 space-y-1">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 font-semibold">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Key Achievements & Responsibilities:
                </span>
                <ul className="space-y-2.5">
                  {exp.bullets.map((item, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              {exp.technologies && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                    Technologies & Platforms Utilized:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Education & Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Education Card */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>EDUCATION</span>
          </div>
          
          {VERIFIED_EDUCATION.map((edu, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-bold text-white leading-snug">
                {edu.degree}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {edu.institution}
              </p>
              <div className="text-xs font-mono text-slate-400">
                {edu.location} — {edu.year}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Card */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold">
            <Award className="w-4 h-4" />
            <span>CERTIFICATIONS & TRAINING</span>
          </div>
          
          <div className="space-y-2.5">
            {VERIFIED_CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-white font-medium">{cert.name}</span>
                <span className="text-emerald-400 font-mono text-[11px] font-semibold">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Next Step / Resume Link */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Need a formal, printable version of this experience?</h3>
          <p className="text-xs text-slate-400">Access the full formatted ATS-friendly resume with 1-click print and copy options.</p>
        </div>
        <button
          onClick={() => onNavigate('resume')}
          className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Open Full Resume</span>
        </button>
      </div>

    </div>
  );
};
