import React from 'react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, Phone, Mail, MapPin, Globe2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800/80 text-slate-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800/60">
          
          {/* Identity & Scope */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            
            <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
              {PERSONAL_INFO.title}. Software engineering background applied to Tier 2/3 troubleshooting, APIs, databases, incident management, and customer success.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for International Remote Opportunities</span>
            </div>

            <div className="pt-2 text-xs text-slate-400 font-mono flex flex-wrap items-center gap-y-2 gap-x-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                Remote (UTC / CET / US Overlap)
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About & Engineering
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-emerald-400 transition-colors">
                  Technical Case Studies (5)
                </Link>
              </li>
              <li>
                <Link to="/how-i-work" className="hover:text-emerald-400 transition-colors">
                  How I Work (Troubleshooting)
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-emerald-400 transition-colors">
                  Technical Skills Matrix
                </Link>
              </li>
              <li>
                <Link to="/cs-strategy" className="hover:text-emerald-400 transition-colors">
                  Customer Success Strategy
                </Link>
              </li>
              <li>
                <Link to="/incident-management" className="hover:text-emerald-400 transition-colors">
                  Incident Management
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-emerald-400 transition-colors">
                  Verified Experience
                </Link>
              </li>
              <li>
                <Link to="/cover-letter" className="hover:text-emerald-400 transition-colors">
                  Executive Pitch / Letter
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Direct Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Verified Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">Direct Email</span>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="text-white hover:text-emerald-300 font-mono text-xs flex items-center gap-1.5 transition-colors mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="break-all">{PERSONAL_INFO.email}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">Phone</span>
                <a 
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} 
                  className="text-white hover:text-emerald-300 font-mono text-xs flex items-center gap-1.5 transition-colors mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700 hover:border-slate-600 transition-all font-mono"
                >
                  <span>Download / Print Resume</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              98%+ High-Priority SLA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              30% MTTR Reduction
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              95% CSAT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
