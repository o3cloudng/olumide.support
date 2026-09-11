import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { TicketInspectionModal } from './TicketInspectionModal';
import { ScrollToTop } from './ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';

interface LayoutProps {
  ticketModalOpen: boolean;
  ticketModalInitialId?: string;
  onOpenTicketModal: (caseStudyId?: string) => void;
  onCloseTicketModal: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  ticketModalOpen,
  ticketModalInitialId,
  onOpenTicketModal,
  onCloseTicketModal,
}) => {
  const location = useLocation();

  // Breadcrumb mapping
  const routeNames: Record<string, string> = {
    '/': 'Overview',
    '/about': 'About & Engineering Background',
    '/case-studies': 'Incident Case Studies (5)',
    '/how-i-work': 'Diagnostic Methodology',
    '/skills': 'Technical Skills Matrix',
    '/cs-strategy': 'Customer Success Strategy',
    '/incident-management': 'Incident Management Protocols',
    '/experience': 'Professional Experience',
    '/resume': 'Resume / Curriculum Vitae',
    '/cover-letter': 'Cover Letter / Executive Pitch',
    '/contact': 'Contact & Availability',
  };

  const currentRouteName = routeNames[location.pathname] || 'Page';
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      <ScrollToTop />
      
      {/* Top Fixed Header */}
      <Navbar onOpenTicketModal={onOpenTicketModal} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        
        {/* Subtle Route Breadcrumb for Sub-Pages */}
        {!isHomePage && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-emerald-400 font-semibold">{currentRouteName}</span>
          </nav>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Ticket Inspector Modal */}
      <TicketInspectionModal
        isOpen={ticketModalOpen}
        onClose={onCloseTicketModal}
        initialCaseStudyId={ticketModalInitialId}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
