import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { AlertCircle, Home, ArrowRight, FileText } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  usePageTitle('Page Not Found', 'The requested page could not be located.');

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The route you are trying to access does not exist or has been relocated within the portfolio navigation.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-xs inline-flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Overview</span>
        </Link>
        <Link
          to="/case-studies"
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 inline-flex items-center gap-2 transition-colors"
        >
          <span>View Case Studies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/resume"
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 inline-flex items-center gap-2 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>View Resume</span>
        </Link>
      </div>
    </div>
  );
};
