import React, { useState } from 'react';
import { SectionId } from '../../types';
import { PROFESSIONAL_SKILLS_MATRIX } from '../../data/portfolioData';
import { 
  Network, 
  Database, 
  Terminal, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
  Code2,
  Server,
  Activity,
  Users2,
  FolderGit2
} from 'lucide-react';

interface TechnicalSkillsSectionProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Support':
        return <FolderGit2 className="w-5 h-5 text-emerald-400" />;
      case 'Programming / Web':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Databases':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Infrastructure':
        return <Server className="w-5 h-5 text-amber-400" />;
      case 'Diagnostics':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Agile & Operations':
        return <Users2 className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const filteredMatrix = PROFESSIONAL_SKILLS_MATRIX.filter((cat) => {
    const matchesCategory = selectedCategory === 'all' || cat.category === selectedCategory;
    const matchesSearch = 
      cat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Applied Technical Competencies
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Professional Skills Matrix
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Structured, recruiter-friendly technical matrix grounded in software systems, database diagnostics, telemetry, and Agile operations—without artificial percentage bars.
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-md">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search technologies, tools, or diagnostics (e.g. Python, Docker, PostgreSQL)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedCategory === 'all'
                ? 'bg-emerald-400 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories
          </button>
          {PROFESSIONAL_SKILLS_MATRIX.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === cat.category
                  ? 'bg-emerald-400 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

      </div>

      {/* Professional Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatrix.map((cat, idx) => (
          <div 
            key={idx}
            className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg space-y-5"
          >
            <div className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {cat.category}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {cat.skills.length} core proficiencies
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {cat.description}
              </p>

              {/* Skills List as Professional Badges */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Verified Tools & Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5 hover:border-slate-700 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Matrix Operational Note */}
            <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Enterprise Ready</span>
              <span className="text-emerald-400 font-medium">Production Verified</span>
            </div>

          </div>
        ))}
      </div>

      {filteredMatrix.length === 0 && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No matching skills found</h3>
          <p className="text-xs text-slate-400">Try searching for another technology or clearing your search query.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Applied Diagnostic Methodology Note */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>APPLIED IN PRODUCTION</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            How these skills translate into measurable customer outcomes
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every technology in this matrix was utilized to isolate root causes, protect SLAs (98%+ compliance), reduce MTTR by 30%, or deflect support ticket volume by 20% across SaaS and telemetry platforms.
          </p>
        </div>

        <button
          onClick={() => onNavigate('case-studies')}
          className="px-5 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <span>Explore Diagnostic Case Studies</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
