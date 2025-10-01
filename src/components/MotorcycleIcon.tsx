import React from 'react';

const MotorcycleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="5.5" cy="17.5" r="4.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M12 17H7l-1.5-6.5h8.5l2-4.5H19" />
    <path d="M16 17v-4h3l2-3.5" />
  </svg>
);

export default MotorcycleIcon;