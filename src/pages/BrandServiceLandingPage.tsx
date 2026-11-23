import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Bike, MapPin, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { findBrandModels, modelPath, slugify, type VehicleKind } from '../data/vehicleCatalog';
import { openWhatsAppBooking } from '../utils/whatsapp';

const BrandServiceLandingPage: React.FC = () => {
  const { brand: brandSlug = '' } = useParams();
  const models = findBrandModels(brandSlug);
  const brand = models[0]?.brand || brandSlug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  const bikes = models.filter((item) => item.kind === 'bike');
  const scooties = models.filter((item) => item.kind === 'scooty');
  const canonical = `https://www.garagefixcare.in/two-wheeler-service/${slugify(brand)}`;
  const title = `${brand} Bike and Scooty Service`;

  return <>
    <SEOHelmet
      title={`${brand} Bike & Scooty Service in Noida Gurugram & Delhi NCR | Garage Fix Care`}
      description={`Find model-wise ${brand} bike and scooter service information. Select your exact model for doorstep repair enquiries, inspection details and WhatsApp booking across Noida, Gurugram and Delhi NCR.`}
      keywords={`${brand} service Noida, ${brand} bike repair Delhi NCR, ${brand} scooty service Gurugram, ${brand} motorcycle mechanic, Garage Fix Care`}
      canonical={canonical}
      robots="index, follow"
      og={{ title: `${brand} Bike & Scooty Service | Garage Fix Care`, description: `Model-wise service enquiries for ${brand} two-wheelers in Noida, Gurugram and Delhi NCR.`, url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: `${brand} model-wise service directory`, type: 'website' }}
      twitter={{ title: `${brand} Service in Delhi NCR | Garage Fix Care`, description: `Select your ${brand} model and request service on WhatsApp.`, image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: canonical, mainEntity: { '@type': 'ItemList', itemListElement: models.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: `${brand} ${item.model}`, url: `https://www.garagefixcare.in${modelPath(item)}` })) } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: `${brand} service`, item: canonical }] },
      ]}
    />
    <main className="gfc-brand-page pt-[76px]">
      <section className="gfc-directory-hero"><div className="max-w-7xl mx-auto px-4"><p className="gfc-eyebrow"><MapPin size={14}/> Noida · Gurugram · Delhi NCR</p><h1>{brand} Bike & Scooty Service</h1><p>Choose your exact {brand} model. Each model page includes service information, a video placeholder for your own media, common inspection points and direct WhatsApp enquiry.</p><button className="gfc-primary-cta mt-6" onClick={() => openWhatsAppBooking({ serviceType: `${brand} two-wheeler service`, vehicle: 'Please confirm my exact model', location: 'Noida / Gurugram / Delhi NCR' })}><MessageCircle size={16}/>Enquiry</button></div></section>
      <section className="py-14 sm:py-18"><div className="max-w-7xl mx-auto px-4"><div className="grid lg:grid-cols-2 gap-7">{([['Bike models', bikes, 'bike'], ['Scooty & scooter models', scooties, 'scooty']] as Array<[string, typeof models, VehicleKind]>).filter(([,items]) => items.length > 0).map(([heading, items]) => <div className="gfc-brand-model-group" key={heading}><div className="flex items-center gap-3 mb-5"><span className="gfc-brand-icon"><Bike size={20}/></span><div><h2>{heading}</h2><p>{items.length} listed models</p></div></div><div className="grid sm:grid-cols-2 gap-3">{items.map((item) => <Link to={modelPath(item)} key={item.slug} className="gfc-model-directory-card"><span><b>{brand} {item.model}</b><small>{item.engine} · {item.segment}</small></span><ArrowRight size={16}/></Link>)}</div></div>)}</div></div></section>
    </main>
  </>;
};

export default BrandServiceLandingPage;
