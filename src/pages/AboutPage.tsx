import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { AboutSection } from '../components/sections/AboutSection';
import { SectionId } from '../types';

export const AboutPage: React.FC = () => {
  usePageTitle(
    'About & Engineering Background',
    'Software engineering foundation applied to technical support, customer-facing technical operations, and cross-functional engineering escalation.'
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
      <AboutSection onNavigate={handleNavigate} />
    </div>
  );
};
