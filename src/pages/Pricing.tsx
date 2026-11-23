import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import BikeServicePriceCards from '../components/BikeServicePriceCards';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { CarFront, ClipboardCheck, MapPin, ShieldCheck } from 'lucide-react';

const Pricing: React.FC = () => (
  <>
    <SEOHelmet
      title="Bike Service Labour Charges in Noida Delhi NCR & Gurugram | Garage Fix Care"
      description="View published doorstep bike service labour tiers from ₹450 to ₹899 by engine capacity. Oil, parts and additional repairs are quoted separately across Noida, Gurugram and Delhi NCR."
      keywords="bike service price Noida, bike repair charges Delhi NCR, bike service labour cost Gurugram, doorstep bike service pricing, motorcycle service price"
      canonical="https://www.garagefixcare.in/pricing"
      robots="index, follow"
      og={{ title: 'Doorstep Bike Service Pricing | Garage Fix Care', description: 'Transparent bike service labour tiers for Noida, Gurugram and Delhi NCR.', url: 'https://www.garagefixcare.in/pricing', image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: 'Garage Fix Care service pricing', type: 'website' }}
      twitter={{ title: 'Doorstep Bike Service Pricing | Garage Fix Care', description: 'Published labour tiers by engine capacity. Parts and oil extra.', image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[
        {
          '@context': 'https://schema.org', '@type': 'Service', name: 'Doorstep Bike Service Pricing',
          provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care', url: 'https://www.garagefixcare.in' },
          areaServed: ['Noida', 'Gurugram', 'Delhi NCR'], url: 'https://www.garagefixcare.in/pricing',
          description: 'Published labour charge tiers by motorcycle engine capacity. Engine oil, replacement parts and additional repairs are quoted separately.',
          hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Bike Service Labour Tiers', itemListElement: [
            ['125 CC–135 CC', '299'], ['220 CC–300 CC', '450'], ['350 CC–450 CC', '499'], ['500 CC–650 CC', '599'], ['650 CC–900 CC', '750'], ['Above 900 CC', '899'],
          ].map(([name, price]) => ({ '@type': 'Offer', name, priceCurrency: 'INR', price })) },
        },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' },
          { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.garagefixcare.in/pricing' },
        ] },
      ]}
    />
    <main className="gfc-pricing-page pt-[76px] sm:pt-[90px]">
      <section className="gfc-pricing-intro py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] mb-3">Garage Fix Care · Delhi NCR</p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">Straightforward Service Pricing. <span>Clear Before We Start.</span></h1>
          <p className="max-w-3xl mx-auto mt-5 text-base sm:text-lg leading-relaxed">Explore the published labour-charge tiers for doorstep motorcycle service. The exact estimate depends on your vehicle, engine capacity and the work approved after inspection.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <span><ShieldCheck size={16}/> Estimate before work</span>
            <span><ClipboardCheck size={16}/> Work after approval</span>
            <span><MapPin size={16}/> Noida · Gurugram · Delhi NCR</span>
          </div>
        </div>
      </section>
      <BikeServicePriceCards title="At-Home Bike Service Price List" description="The same published labour tiers shown on our bike service pages. Engine oil, replacement parts and additional repairs are charged separately after approval." />
      <section className="gfc-car-enquiry py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="gfc-car-enquiry-card">
            <div className="gfc-car-icon"><CarFront size={30}/></div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.18em] font-bold mb-2">Car service estimate</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Need a car service quote?</h2>
              <p className="mt-2 text-sm sm:text-base">Car service pricing varies by vehicle make, model, year and requested work. Share your car details on WhatsApp for an estimate.</p>
              <button className="gfc-car-enquiry-cta mt-5" onClick={() => openWhatsAppBooking({ serviceType: 'Car service price enquiry', vehicle: 'Please share make, model and year', location: 'Noida / Gurugram / Delhi NCR' })}>Get car service estimate on WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default Pricing;
