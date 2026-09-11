import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Terminal, 
  Menu, 
  X, 
  FileText, 
  Mail, 
  ChevronRight,
  Activity
} from 'lucide-react';

interface NavbarProps {
  onOpenTicketModal?: (caseStudyId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTicketModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/how-i-work', label: 'How I Work' },
    { path: '/skills', label: 'Skills' },
    { path: '/cs-strategy', label: 'CS Strategy' },
    { path: '/incident-management', label: 'Incidents' },
    { path: '/experience', label: 'Experience' },
    { path: '/resume', label: 'Resume' },
    { path: '/cover-letter', label: 'Cover Letter' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' 
          : 'bg-[#0b0f17]/80 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Positioning */}
          <Link 
            to="/"
            className="flex items-center gap-3 group text-left focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded-lg p-1 -ml-1"
            id="nav-logo-btn"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors shadow-inner">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <span>{PERSONAL_INFO.name}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Tier 2/3 & CS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Technical Customer Success & Support
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-1.5 rounded-md text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm text-emerald-300'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenTicketModal && (
              <button
                onClick={() => onOpenTicketModal()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                id="nav-quick-ticket-btn"
                title="Launch Diagnostic Ticket Inspector"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Ticket Inspector</span>
              </button>
            )}

            <Link
              to="/resume"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-slate-800/70 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              id="nav-quick-resume-btn"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Resume</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              id="nav-quick-contact-btn"
            >
              <Mail className="w-3.5 h-3.5 text-slate-950" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/contact"
              className="sm:hidden px-3 py-1.5 min-h-[40px] text-xs font-semibold text-slate-900 bg-emerald-400 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none flex items-center justify-center"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer-menu"
              id="mobile-nav-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="xl:hidden bg-[#0b0f17] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-md text-xs font-medium text-left transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isActive
                      ? 'bg-slate-800 text-emerald-300 border border-slate-700 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {onOpenTicketModal && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTicketModal();
                }}
                className="w-full min-h-[44px] py-2 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open Diagnostic Ticket Inspector</span>
              </button>
            )}

            <div className="flex gap-2">
              <Link
                to="/resume"
                className="flex-1 min-h-[44px] py-2 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Full Resume</span>
              </Link>
              <Link
                to="/contact"
                className="flex-1 min-h-[44px] py-2 rounded-md bg-emerald-400 text-slate-950 text-xs font-semibold flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Olumide</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
