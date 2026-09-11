import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { CoverLetterSection } from '../components/sections/CoverLetterSection';
import { SectionId } from '../types';

export const CoverLetterPage: React.FC = () => {
  usePageTitle(
    'Cover Letter & Executive Pitch',
    'Executive pitch and value proposition for hiring managers and recruiters seeking an international remote Technical Customer Success & Support Specialist.'
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
      <CoverLetterSection onNavigate={handleNavigate} />
    </div>
  );
};
