import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { SectionId } from '../types';

export const ExperiencePage: React.FC = () => {
  usePageTitle(
    'Professional Experience & Track Record',
    'Verified career track record at Biznovate Tech and TM30 Global: Technical Systems Support Lead, Scrum Master, and Application Support Specialist.'
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
      <ExperienceSection onNavigate={handleNavigate} />
    </div>
  );
};
