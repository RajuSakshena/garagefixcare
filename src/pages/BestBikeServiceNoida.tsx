import React from 'react';
import CityBikeLandingPage from './CityBikeLandingPage';

const BestBikeServiceNoida: React.FC = () => (
  <CityBikeLandingPage
    city="Noida"
    slug="noida"
    intro="Doorstep motorcycle and scooty service enquiries across Noida. Share your exact model, symptoms and sector so the team can confirm coverage, availability and an estimate before repair work begins."
    areas={['Sector 62', 'Sector 18', 'Sector 15', 'Sector 16', 'Sector 27', 'Sector 37', 'Sector 50', 'Sector 51', 'Sector 52', 'Sector 61', 'Sector 63', 'Sector 76', 'Sector 78', 'Sector 104', 'Sector 137', 'Noida Extension']}
  />
);

export default BestBikeServiceNoida;
