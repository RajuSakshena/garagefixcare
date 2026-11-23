import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Bike, ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { brandPath, modelPath, vehicleModels, type VehicleKind } from '../data/vehicleCatalog';
import { openWhatsAppBooking } from '../utils/whatsapp';

const VehicleCategoryLandingPage: React.FC = () => {
  const kind: VehicleKind = useLocation().pathname.startsWith('/scooty-service') ? 'scooty' : 'bike';
  const isScooty = kind === 'scooty';
  const models = vehicleModels.filter((item) => item.kind === kind);
  const brands = Array.from(new Set(models.map((item) => item.brand)));
  const title = isScooty ? 'Scooty and Scooter Service' : 'Bike and Motorcycle Service';
  const canonical = `https://www.garagefixcare.in/${kind}-service`;

  return <>
    <SEOHelmet
      title={`${title} in Noida Gurugram & Delhi NCR | Garage Fix Care`}
      description={`Browse ${isScooty ? 'scooty and scooter' : 'motorcycle and bike'} models supported for doorstep service enquiries in Noida, Gurugram and Delhi NCR. Select your brand and model to view repair information and request an estimate.`}
      keywords={`${isScooty ? 'scooty service' : 'bike service'}, ${isScooty ? 'scooter repair' : 'motorcycle repair'} Noida, Gurugram, Delhi NCR, model-wise service, Garage Fix Care`}
      canonical={canonical}
      robots="index, follow"
      og={{ title: `${title} | Garage Fix Care`, description: `Browse supported models and request doorstep service in Noida, Gurugram and Delhi NCR.`, url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: `Garage Fix Care ${title}`, type: 'website' }}
      twitter={{ title: `${title} | Garage Fix Care`, description: `Find your model and enquire about doorstep service.`, image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: canonical, description: `Model directory for ${title.toLowerCase()} enquiries in Noida, Gurugram and Delhi NCR.`, mainEntity: { '@type': 'ItemList', itemListElement: models.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: `${item.brand} ${item.model}`, url: `https://www.garagefixcare.in${modelPath(item)}` })) } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: title, item: canonical }] },
      ]}
    />
    <main className="gfc-vehicle-directory pt-[76px]">
      <section className="gfc-directory-hero"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="gfc-eyebrow"><MapPin size={14}/> Noida · Gurugram · Delhi NCR</p><h1>{title} at Your Doorstep</h1><p>Choose your manufacturer and exact model to explore relevant inspection points, service information and WhatsApp booking options.</p><div className="flex flex-wrap gap-3 mt-6"><Link to={isScooty ? '/bike-service' : '/scooty-service'} className="gfc-secondary-cta">{isScooty ? 'Browse bikes' : 'Browse scooties'} <ArrowRight size={16}/></Link><button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: `${title} enquiry`, location: 'Noida / Gurugram / Delhi NCR' })}><MessageCircle size={16}/> Ask on WhatsApp</button></div></div></section>
      <section className="py-14 sm:py-18"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-4 mb-8"><div><p className="gfc-eyebrow">Browse by manufacturer</p><h2 className="gfc-directory-heading">{brands.length} brands · {models.length} model pages</h2></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{brands.map((brand) => { const items = models.filter((item) => item.brand === brand); return <article className="gfc-brand-directory-card" key={brand}><div className="flex items-center justify-between"><span className="gfc-brand-icon"><Bike size={19}/></span><span className="gfc-brand-count">{items.length} models</span></div><h3>{brand}</h3><div className="gfc-model-link-list">{items.map((item) => <Link key={item.slug} to={modelPath(item)}>{item.model}<ChevronRight size={14}/></Link>)}</div><Link to={brandPath(brand)} className="gfc-brand-view-all">View {brand} models <ArrowRight size={14}/></Link></article>; })}</div></div></section>
    </main>
  </>;
};

export default VehicleCategoryLandingPage;
