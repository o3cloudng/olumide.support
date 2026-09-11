import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { ContactSection } from '../components/sections/ContactSection';

export const ContactPage: React.FC = () => {
  usePageTitle(
    'Contact & Interview Availability',
    'Get in touch with Olumide Oderinde for international remote opportunities in Technical Customer Success, Tier 2/3 Technical Support, or Customer Success Engineering.'
  );

  return (
    <div className="w-full">
      <ContactSection />
    </div>
  );
};
