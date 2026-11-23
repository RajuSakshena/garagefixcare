import React, { useState } from 'react';
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';
import CustomerReviews from '../components/CustomerReviews';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, PlayCircle, ShieldCheck, Wrench } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import BikeServicePriceCards, { getBikeServicePackageForCc } from '../components/BikeServicePriceCards';
import { findVehicleModel, modelPath, vehicleModels, brandPath, type VehicleKind } from '../data/vehicleCatalog';
import { openWhatsAppBooking } from '../utils/whatsapp';

const ModelServiceLandingPage: React.FC = () => {
  const { brand = '', model = '' } = useParams();
  const kind: VehicleKind = useLocation().pathname.startsWith('/scooty-service/') ? 'scooty' : 'bike';
  const vehicle = findVehicleModel(kind, brand, model);
  const [heroVideoIndex, setHeroVideoIndex] = useState(0);
  const heroVideos = [insideVideo, outsideVideo];

  if (!vehicle) return <main className="gfc-directory-hero pt-28"><div className="max-w-4xl mx-auto px-4"><h1>Model page not found</h1><p>Choose your vehicle from the model directory.</p><Link to={kind === 'bike' ? '/bike-service' : '/scooty-service'} className="gfc-text-link">Browse models <ArrowRight size={16}/></Link></div></main>;

  const vehicleName = `${vehicle.brand} ${vehicle.model}`;
  const isScooty = vehicle.kind === 'scooty';
  const isElectric = vehicle.engine === 'Electric';
  const engineCc = isElectric ? 0 : Number.parseFloat(vehicle.engine.replace(/[^0-9.]/g, '')) || null;
  const canonical = `https://www.garagefixcare.in${modelPath(vehicle)}`;
  const modelLabourPrice = getBikeServicePackageForCc(engineCc)?.price ?? 'Price on Enquiry';
  const modelHeading = `${vehicleName} Service & Repair in Noida, Gurugram & Delhi NCR At ${modelLabourPrice}`;
  const segmentFocus: Record<string, string[]> = {
    Commuter: ['Engine oil, air-filter and spark-plug checks', 'Clutch free play, chain slack and sprocket wear', 'Brake adjustment, tyre pressure and tread condition', 'Battery, starter and everyday electrical checks'],
    Street: ['Throttle, clutch and control operation', 'Chain-sprocket wear and drive-chain adjustment', 'Brake pads, disc condition and tyre inspection', 'Cooling, battery and electrical-system checks'],
    Sport: ['Brake pads, discs and lever feel under inspection', 'Clutch operation, chain condition and drivetrain checks', 'Tyre condition, wheel alignment and suspension inspection', 'Cooling system, battery and electrical checks where applicable'],
    Adventure: ['Front fork, rear suspension and steering checks', 'Tyre tread, wheel condition and brake inspection', 'Chain-sprocket wear and drive-system adjustment', 'Cooling, battery and controls inspection for touring use'],
    Touring: ['Engine oil, cooling and visible leak inspection', 'Brake condition, tyre wear and wheel checks', 'Chain or final-drive inspection as applicable', 'Battery, charging and accessory electrical checks'],
    Cruiser: ['Clutch operation and drive-system inspection', 'Brake feel, disc condition and tyre checks', 'Suspension, steering and wheel-bearing inspection', 'Battery, charging and electrical-system checks'],
    Classic: ['Engine oil, filter and ignition checks', 'Clutch operation and chain-sprocket inspection', 'Brake adjustment, tyres and wheel condition', 'Battery, lighting and electrical checks'],
    Roadster: ['Engine oil and routine filter inspection', 'Clutch, chain and sprocket condition', 'Brake, tyre and suspension checks', 'Battery and electrical-system diagnosis'],
    Scrambler: ['Suspension travel and steering inspection', 'Tyre tread, wheel and brake checks', 'Chain-sprocket wear and clutch operation', 'Engine, cooling and electrical checks'],
    Sporty: ['Engine and ignition inspection', 'Brake, tyre and wheel checks', 'Clutch and transmission operation', 'Battery and electrical-system checks'],
  };
  const focus = isElectric
    ? ['Battery health and range-related symptoms', 'Charging port, charger and electrical inspection', 'Motor, controller and warning-indicator diagnosis', 'Tyres, brakes, suspension and general safety checks']
    : isScooty
      ? ['Engine oil and air-filter checks where applicable', 'CVT belt, roller and clutch inspection', 'Brake, tyre and suspension checks', 'Battery, starter and electrical diagnosis']
      : (segmentFocus[vehicle.segment] || segmentFocus.Street);
  const faq = [
    { q: `Can I book ${vehicleName} service at home in Noida?`, a: `Send your ${vehicleName} model, sector or locality and the issue on WhatsApp. Garage Fix Care can confirm whether a doorstep slot is available for your address.` },
    { q: `Do you repair ${vehicleName} engine and electrical issues?`, a: `You can enquire about engine, starting, electrical, brake, suspension and routine maintenance concerns. The mechanic checks the symptoms and shares an estimate before repair work is approved.` },
    { q: `How much does ${vehicleName} servicing cost?`, a: `The published bike labour tiers depend on engine capacity. This model's final estimate can vary with the exact variant, service scope, oil and replacement parts. Share the model and year on WhatsApp for confirmation.` },
    { q: `Do you cover Gurugram and Delhi NCR for ${vehicleName}?`, a: `Service enquiries are accepted for Noida, Gurugram and Delhi NCR. Exact address coverage and slot availability are confirmed before booking.` },
  ];
  const related = vehicleModels.filter((item) => item.kind === vehicle.kind && item.brand === vehicle.brand && item.slug !== vehicle.slug).slice(0, 6);

  return <>
    <SEOHelmet
      title={`${modelHeading} | Garage Fix Care`}
      description={`Doorstep ${vehicleName} service and repair enquiries in Noida, Gurugram and Delhi NCR. Explore model-specific inspection points, service options and request an estimate on WhatsApp.`}
      keywords={`${vehicleName} service Noida, ${vehicleName} repair Delhi NCR, ${vehicleName} mechanic Gurugram, ${vehicleName} maintenance, ${vehicle.brand} service, Garage Fix Care`}
      canonical={canonical}
      robots="index, follow"
      og={{ title: `${modelHeading} | Garage Fix Care`, description: `Model-wise ${vehicleName} repair and service enquiries across Noida, Gurugram and Delhi NCR.`, url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: `${vehicleName} service by Garage Fix Care`, type: 'website' }}
      twitter={{ title: `${modelHeading} | Garage Fix Care`, description: `Request a doorstep ${vehicleName} service estimate on WhatsApp.`, image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[
        { '@context': 'https://schema.org', '@type': 'Service', name: `${vehicleName} Service and Repair`, serviceType: [`${vehicleName} maintenance`, `${vehicleName} repair`, 'Doorstep two-wheeler service'], provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care', url: 'https://www.garagefixcare.in' }, areaServed: ['Noida', 'Gurugram', 'Delhi NCR'], description: `Model-specific service enquiries for ${vehicleName}. Exact scope and estimate are confirmed after inspection.`, url: canonical },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: vehicle.brand, item: `https://www.garagefixcare.in${brandPath(vehicle.brand)}` }, { '@type': 'ListItem', position: 3, name: vehicleName, item: canonical }] },
      ]}
    />
    <main className="gfc-model-page pt-[76px]">
      <section className="gfc-model-hero gfc-model-hero-fullbleed">
        <div className="gfc-model-hero-video-bg" aria-label="Garage Fix Care workshop video">
          <video
            key={heroVideos[heroVideoIndex]}
            src={heroVideos[heroVideoIndex]}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setHeroVideoIndex((current) => (current + 1) % heroVideos.length)}
            aria-label="Garage Fix Care workshop service video"
          />
          <div className="gfc-model-hero-video-overlay" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gfc-model-hero-fullbleed-content">
          <div className="gfc-model-hero-copy">
            <p className="gfc-eyebrow"><MapPin size={14}/> Noida · Gurugram · Delhi NCR</p>
            <h1>{vehicleName} <span>Service &amp; Repair in Noida, Gurugram &amp; Delhi NCR At {modelLabourPrice}</span></h1>
            <p className="gfc-model-lead">Model-wise service enquiries for the {vehicleName}, listed as a {vehicle.segment.toLowerCase()} in our directory. Share the model year, location and symptoms so the mechanic can confirm the right inspection and repair estimate.</p>
            <div className="gfc-model-meta"><span>{vehicle.engine}</span><span>{vehicle.segment}</span><span>{isScooty ? 'Scooty / scooter' : 'Motorcycle'}</span></div>
            <div className="gfc-model-proof-grid">{['Model-specific inspection checklist', 'Estimate before repair approval', 'Routine service and repair enquiries', 'WhatsApp slot confirmation'].map((item)=><span key={item}><CheckCircle2 size={15}/>{item}</span>)}</div>
            <div className="flex flex-wrap gap-3 mt-7">
              <button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: `${vehicleName} service and repair`, vehicle: `${vehicleName} · ${vehicle.engine}`, location: 'Noida / Gurugram / Delhi NCR' })}><MessageCircle size={17}/>Book Enquiry</button>
              <Link to="/pricing" className="gfc-secondary-cta">View labour tiers <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gfc-model-facts"><div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-4"><div><span>Vehicle</span><b>{vehicleName}</b></div><div><span>Engine / powertrain</span><b>{vehicle.engine}</b></div><div><span>Service locations</span><b>Noida · Gurugram · Delhi NCR</b></div></div></section>

      <section className="gfc-model-services py-16 sm:py-20"><div className="max-w-7xl mx-auto px-4"><div className="max-w-3xl mb-9"><p className="gfc-eyebrow">Model-specific care</p><h2>{vehicleName} maintenance and repair checks</h2><p>These are inspection areas to discuss with the mechanic. The exact work depends on the vehicle's condition, service history and manufacturer guidance.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{focus.map((item,index)=><article className="gfc-model-check-card" key={item}><span>0{index+1}</span><Wrench size={19}/><p>{item}</p></article>)}</div></div></section>

      <BikeServicePriceCards vehicleName={vehicleName} engineCc={engineCc} compact title={`${vehicleName} Service Labour Price Guide`} description="Use the published engine-capacity labour tiers as a guide. Final charges depend on the exact variant and approved work; engine oil and parts are extra." />

      <section className="gfc-model-video-band"><div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"><div><p className="gfc-eyebrow">Add your own media</p><h2>{vehicleName} service walkthrough</h2><p>This dedicated video slot is reserved for your model-specific service footage. You can add a mechanic walkthrough, inspection clip or repair demonstration later.</p><ul className="gfc-video-bullets"><li><CheckCircle2 size={16}/> Model-specific repair footage</li><li><CheckCircle2 size={16}/> Clear captions and service steps</li><li><CheckCircle2 size={16}/> Your own original video content</li></ul></div><div className="gfc-video-placeholder gfc-video-placeholder-wide"><div className="gfc-video-frame-mark">MODEL VIDEO / 02</div><div className="gfc-video-placeholder-content"><PlayCircle size={44}/><strong>{vehicleName} repair video</strong><small>Drop your video here when ready</small><code>public/videos/models/{vehicle.slug}-service.mp4</code></div></div></div></section>

      <section className="gfc-model-benefits py-16"><div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"><div><p className="gfc-eyebrow">Garage Fix Care process</p><h2>Clear steps for your {vehicleName}</h2><p>Start with a model and symptom enquiry. Confirm the service location, receive the inspection findings and approve the estimate before repair work begins.</p></div><div className="gfc-model-steps">{[['01','Share details','Model, variant, year, location and issue'],['02','Confirm slot','Team checks coverage and availability'],['03','Inspect and estimate','Mechanic explains findings and costs'],['04','Approve the work','Additional repair starts after your approval']].map(([n,title,copy])=><div key={n}><b>{n}</b><span><strong>{title}</strong><small>{copy}</small></span></div>)}</div></div></section>

      <section className="gfc-city-areas py-14"><div className="max-w-7xl mx-auto px-4"><p className="gfc-eyebrow">Where we serve</p><h2>{vehicleName} service in Noida, Gurugram & Delhi NCR</h2><p>Exact address coverage and appointment availability are confirmed on WhatsApp.</p><div className="flex flex-wrap gap-2 mt-5">{[{label:'Noida',to:'/best-bike-service-noida'},{label:'Greater Noida',to:'/best-bike-service-greater-noida-west'},{label:'Gurugram',to:'/best-bike-service-gurgaon'},{label:'Delhi',to:'/best-bike-service-delhi'},{label:'Ghaziabad',to:'/best-bike-service-ghaziabad'}].map((place)=><Link className="gfc-area-chip" key={place.to} to={place.to}>{place.label}</Link>)}<span className="gfc-area-chip">Faridabad</span></div></div></section>

      {related.length > 0 && <section className="gfc-model-related py-14"><div className="max-w-7xl mx-auto px-4"><div className="flex items-end justify-between gap-4 mb-6"><div><p className="gfc-eyebrow">More from {vehicle.brand}</p><h2>Related models</h2></div><Link to={brandPath(vehicle.brand)} className="gfc-text-link">All {vehicle.brand} models <ArrowRight size={15}/></Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{related.map((item)=><Link to={modelPath(item)} className="gfc-model-directory-card" key={item.slug}><span><b>{item.brand} {item.model}</b><small>{item.engine} · {item.segment}</small></span><ArrowRight size={16}/></Link>)}</div></div></section>}

      <CustomerReviews />

      <section className="gfc-city-faq py-16"><div className="max-w-4xl mx-auto px-4"><p className="gfc-eyebrow">Model service FAQs</p><h2>{vehicleName} service questions</h2><div className="mt-7 space-y-3">{faq.map((item)=><details className="gfc-faq-item" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
      <section className="gfc-model-bottom-cta"><div className="max-w-7xl mx-auto px-4"><div><p className="gfc-eyebrow">Need help with your vehicle?</p><h2>Book {vehicleName} service on WhatsApp</h2><p>Send your exact model, year, location and repair concern to get started.</p></div><button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: `${vehicleName} repair enquiry`, vehicle: `${vehicleName} · ${vehicle.engine}`, location: 'Noida / Gurugram / Delhi NCR' })}><MessageCircle size={17}/> Chat on WhatsApp</button></div></section>
    </main>
  </>;
};

export default ModelServiceLandingPage;
