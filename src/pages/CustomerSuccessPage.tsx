import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { CustomerSuccessSection } from '../components/sections/CustomerSuccessSection';
import { SectionId } from '../types';

export const CustomerSuccessPage: React.FC = () => {
  usePageTitle(
    'Customer Success Strategy & Account Health',
    'Customer Success frameworks, onboarding architecture, proactive account health, churn deflection, and SLA governance.'
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
      <CustomerSuccessSection onNavigate={handleNavigate} />
    </div>
  );
};
