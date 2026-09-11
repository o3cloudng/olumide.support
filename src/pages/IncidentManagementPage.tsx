import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { IncidentManagementSection } from '../components/sections/IncidentManagementSection';
import { SectionId } from '../types';

export const IncidentManagementPage: React.FC = () => {
  usePageTitle(
    'Incident Management & Triage Protocols',
    'Enterprise incident management: Severity tier matrix (P1 to P4), escalation protocols, cross-functional SLA governance, and post-mortem blameless reviews.'
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
      <IncidentManagementSection onNavigate={handleNavigate} />
    </div>
  );
};
