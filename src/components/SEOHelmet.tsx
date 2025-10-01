import React from 'react';

interface SEOHelmetProps {
  title: string;
  description: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({ title, description }) => {
  React.useEffect(() => {
    document.title = title;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
  }, [title, description]);

  return null;
};

export default SEOHelmet;