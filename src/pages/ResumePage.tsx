import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SectionId } from '../types';

export const ResumePage: React.FC = () => {
  usePageTitle(
    'Resume & Curriculum Vitae',
    'ATS-optimized resume of Olumide Oderinde, Technical Customer Success & Support Specialist: experience, verified metrics, education, and skills.'
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
      <ResumeSection onNavigate={handleNavigate} />
    </div>
  );
};
