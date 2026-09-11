import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { SectionId } from '../types';

interface CaseStudiesPageProps {
  onOpenTicketModal: (caseStudyId?: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onOpenTicketModal }) => {
  usePageTitle(
    'Technical Incident Case Studies & RCA',
    'Explore 5 deep-dive technical incident case studies detailing problem statement, investigation probes, SQL logs, root cause analysis, and systemic prevention.'
  );

  const navigate = useNavigate();

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === 'home') {
      navigate('/');
    } else {
      navigate(`/${sectionId}`);
    }
  };

  return (
    <div className="w-full">
      <CaseStudiesSection 
        onNavigate={handleNavigate} 
        onOpenTicketModal={onOpenTicketModal} 
      />
    </div>
  );
};
