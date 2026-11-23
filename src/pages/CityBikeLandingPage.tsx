import CustomerReviews from '../components/CustomerReviews';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Wrench, ShieldCheck, Clock3 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import BikeServicePriceCards from '../components/BikeServicePriceCards';
import { openWhatsAppBooking } from '../utils/whatsapp';
import { brandPath, vehicleBrands } from '../data/vehicleCatalog';

interface Props {
  city: string;
  slug: string;
  areas: string[];
  intro: string;
}

const CityBikeLandingPage: React.FC<Props> = ({ city, slug, areas, intro }) => {
  const canonical = `https://www.garagefixcare.in/best-bike-service-${slug}`;
  const faqs = [
    { q: `Can I book doorstep bike service in ${city}?`, a: `Yes. Share your bike or scooty model, service requirement and location in ${city} on WhatsApp. The team can confirm service coverage and an available slot.` },
    { q: 'How is the service labour charge calculated?', a: 'Published motorcycle labour tiers are based on engine capacity. Engine oil, replacement parts and additional repair work are quoted separately after the vehicle is checked.' },
    { q: 'Can the mechanic diagnose a starting or engine issue?', a: 'You can describe the symptom and share a short video on WhatsApp. The mechanic will inspect the vehicle and explain the estimate before repair work is approved.' },
    { q: 'Which two-wheelers can I enquire about?', a: 'Garage Fix Care accepts enquiries for popular commuter bikes, sports bikes, premium motorcycles and petrol or electric scooters. Share the exact model for confirmation.' },
  ];

  return <>
    <SEOHelmet
      title={`Doorstep Bike & Scooty Service in ${city} | Garage Fix Care`}
      description={`Book doorstep bike and scooty repair in ${city}. Share your model and issue with Garage Fix Care for service availability, an inspection and a clear estimate before work begins.`}
      keywords={`bike service ${city}, bike repair ${city}, scooty service ${city}, doorstep bike mechanic ${city}, motorcycle repair ${city}, Garage Fix Care`}
      canonical={canonical}
      robots="index, follow"
      og={{ title: `Doorstep Bike & Scooty Service in ${city} | Garage Fix Care`, description: `Motorcycle and scooter service enquiries in ${city}. Share your model and get a clear estimate before work begins.`, url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: `Garage Fix Care doorstep bike service in ${city}`, type: 'website' }}
      twitter={{ title: `Bike & Scooty Service in ${city} | Garage Fix Care`, description: `Doorstep motorcycle and scooter service enquiries in ${city}.`, image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[
        { '@context': 'https://schema.org', '@type': 'Service', name: `Doorstep Bike and Scooty Service in ${city}`, serviceType: ['Motorcycle repair', 'Motorcycle maintenance', 'Scooter repair', 'Scooter maintenance'], provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care', url: 'https://www.garagefixcare.in' }, areaServed: { '@type': 'City', name: city }, description: intro, url: canonical },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: `Bike Service ${city}`, item: canonical }] },
      ]}
    />
    <main className="gfc-city-landing gfc-location-landing pt-[76px]">
      <section className="gfc-model-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-12 items-center">
          <div className="gfc-model-hero-copy">
            <p className="gfc-eyebrow"><MapPin size={14}/> Doorstep two-wheeler care · {city}</p>
            <h1>Bike & Scooty Service in <span>{city}</span> at Your Doorstep</h1>
            <p className="gfc-model-lead">{intro}</p>
            <div className="gfc-model-proof-grid">
              {['Service after estimate approval', 'Bike and scooter enquiries', 'Routine service and repair diagnosis', 'Coverage confirmation on WhatsApp'].map((item) => <span key={item}><CheckCircle2 size={15}/>{item}</span>)}
            </div>
            <div className="flex flex-wrap gap-3 mt-7">
              <button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: 'Doorstep bike / scooty service', location: city, vehicle: 'Please ask me for the vehicle model and issue' })}><MessageCircle size={17}/>Book Enquiry</button>
              <Link to="/pricing" className="gfc-secondary-cta">View service pricing <ArrowRight size={16}/></Link>
            </div>
          </div>
          <div className="gfc-video-placeholder" aria-label="Hero video placeholder">
            <div className="gfc-video-frame-mark">GFC / VIDEO 01</div>
            <div className="gfc-video-placeholder-content"><span className="gfc-video-play">▶</span><strong>Hero workshop video</strong><small>Add your city-specific hero video here</small><code>public/videos/city-hero.mp4</code></div>
          </div>
        </div>
      </section>

      <section className="gfc-city-trust-strip"><div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-4">{[{icon:Wrench,title:'Inspection-led repair',copy:'Work scope explained before approval'},{icon:ShieldCheck,title:'Clear estimates',copy:'Parts and labour shown separately'},{icon:Clock3,title:'Slot confirmation',copy:'Availability confirmed on WhatsApp'}].map(({icon:Icon,title,copy})=><div key={title}><Icon size={21}/><span><b>{title}</b><small>{copy}</small></span></div>)}</div></section>

      <BikeServicePriceCards vehicleName={`Bike / scooty in ${city}`} compact />

      <section className="gfc-model-video-band"><div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"><div><p className="gfc-eyebrow">Behind the service</p><h2>See how a doorstep inspection works</h2><p>Use this space for your own workshop, mechanic-at-work or service-process video. Add a caption that explains what viewers will see.</p></div><div className="gfc-video-placeholder gfc-video-placeholder-wide"><div className="gfc-video-frame-mark">GFC / VIDEO 02</div><div className="gfc-video-placeholder-content"><span className="gfc-video-play">▶</span><strong>Service process video</strong><small>Add your own video when ready</small><code>public/videos/service-process.mp4</code></div></div></div></section>

      <section className="gfc-model-services py-16 sm:py-20"><div className="max-w-7xl mx-auto px-4"><div className="max-w-3xl mb-9"><p className="gfc-eyebrow">What we can inspect</p><h2>Bike and scooty repair enquiries in {city}</h2><p>Tell us the symptoms and model. The mechanic can inspect the vehicle and share a repair estimate before any additional work is started.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[
        ['Periodic service','Engine oil, filters, spark plug, chain and routine inspection.'],['Engine and starting concerns','Hard starting, stalling, unusual noise, smoke or loss of pickup.'],['Brake and wheel checks','Brake feel, pad wear, tyre condition, wheel noise and alignment concerns.'],['Electrical and battery checks','Battery health, charging concerns, lights, horn and starting circuit.'],['Clutch and transmission','Clutch play, slipping symptoms, gear-shift feel and chain-sprocket wear.'],['Scooter CVT and drive system','Belt, roller, clutch engagement and transmission noise inspection where applicable.'],
      ].map(([title,copy])=><article className="gfc-service-tile" key={title}><span><Wrench size={18}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="gfc-city-areas py-14"><div className="max-w-7xl mx-auto px-4"><p className="gfc-eyebrow">Service coverage</p><h2>Areas to enquire about in {city}</h2><p>Coverage and slot availability are confirmed for the exact address.</p><div className="flex flex-wrap gap-2 mt-5">{areas.map((area)=><span className="gfc-area-chip" key={area}>{area}</span>)}</div></div></section>

      <section className="gfc-model-brands py-14 sm:py-16"><div className="max-w-7xl mx-auto px-4"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7"><div><p className="gfc-eyebrow">Select your manufacturer</p><h2>Browse bike and scooty brands</h2></div><Link to="/bike-service" className="gfc-text-link">Explore model directory <ArrowRight size={15}/></Link></div><div className="flex flex-wrap gap-2">{vehicleBrands.map((brand)=><Link key={brand} to={brandPath(brand)} className="gfc-brand-chip">{brand}</Link>)}</div></div></section>

      <CustomerReviews />
      <section className="gfc-city-faq py-16"><div className="max-w-4xl mx-auto px-4"><p className="gfc-eyebrow">Quick answers</p><h2>Bike service FAQs for {city}</h2><div className="mt-7 space-y-3">{faqs.map((faq)=><details className="gfc-faq-item" key={faq.q} open={faq === faqs[0]}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>
      <section className="gfc-model-bottom-cta"><div className="max-w-7xl mx-auto px-4"><div><p className="gfc-eyebrow">Ready when you are</p><h2>Need a mechanic in {city}?</h2><p>Send your vehicle model, location and issue. We’ll help confirm the next step.</p></div><button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: 'Bike / scooty repair enquiry', location: city })}><MessageCircle size={17}/> Chat on WhatsApp</button></div></section>
    </main>
  </>;
};

export default CityBikeLandingPage;
