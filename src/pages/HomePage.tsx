import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { HomeSection } from '../components/sections/HomeSection';
import { SectionId } from '../types';

interface HomePageProps {
  onOpenTicketModal: (caseStudyId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTicketModal }) => {
  usePageTitle(
    'Technical Customer Success & Support Specialist',
    'Olumide Oderinde - Technical Customer Success & Support Specialist specializing in Tier 2/3 diagnostics, APIs, SQL, incident management, and customer success.'
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
      <HomeSection 
        onNavigate={handleNavigate} 
        onOpenTicketModal={onOpenTicketModal} 
      />
    </div>
  );
};
