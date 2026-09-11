import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { HowIWorkSection } from '../components/sections/HowIWorkSection';
import { SectionId } from '../types';

export const HowIWorkPage: React.FC = () => {
  usePageTitle(
    'Diagnostic Methodology & Troubleshooting Framework',
    'How Olumide investigates issues: from ambiguous customer reports to deterministic reproduction, log triage, database inspection, and permanent deflection.'
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
      <HowIWorkSection onNavigate={handleNavigate} />
    </div>
  );
};
