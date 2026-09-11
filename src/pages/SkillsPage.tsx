import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { TechnicalSkillsSection } from '../components/sections/TechnicalSkillsSection';
import { SectionId } from '../types';

export const SkillsPage: React.FC = () => {
  usePageTitle(
    'Technical Skills Matrix & Diagnostic Tooling',
    'Comprehensive technical skills matrix: APIs, SQL databases, Python/Django, Docker, Linux, Redis, Elasticsearch, and Scrum delivery.'
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
      <TechnicalSkillsSection onNavigate={handleNavigate} />
    </div>
  );
};
