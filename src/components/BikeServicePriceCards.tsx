import React, { useState } from 'react';
import { Bike, CheckCircle2, ChevronDown, MessageCircle } from 'lucide-react';
import { openWhatsAppBooking } from '../utils/whatsapp';

const packages = [
  { title: 'At-Home City Service', cc: '100 CC – 135 CC', price: '₹299', detail: 'For everyday commuter motorcycles and scooters' },
  { title: 'At-Home Premium Service', cc: '220 CC – 300 CC', price: '₹450', detail: 'For everyday and entry-level performance motorcycles' },
  { title: 'At-Home Royal Service', cc: '350 CC – 450 CC', price: '₹499', detail: 'For mid-capacity roadsters and touring motorcycles' },
  { title: 'At-Home Sports Service', cc: '500 CC – 650 CC', price: '₹599', detail: 'For higher-capacity street and sport motorcycles' },
  { title: 'At-Home Superbike Service', cc: '650 CC – 900 CC', price: '₹750', detail: 'For premium performance and touring motorcycles' },
  { title: 'At-Home Elite Superbike Service', cc: 'Above 900 CC', price: '₹899', detail: 'For large-capacity premium motorcycles' },
];

const included = [
  'Complete vehicle condition and safety inspection',
  'Engine oil level check and leak inspection',
  'Air filter cleaning (replacement if required, extra)',
  'Spark plug cleaning and ignition check (where applicable)',
  'Battery health, charging and electrical check',
  'Headlight, tail-light, indicators and horn check',
  'Front and rear brake inspection and adjustment',
  'Clutch, throttle and control cable inspection',
  'Chain cleaning, adjustment and lubrication (where applicable)',
  'Tyre pressure, tread and visible damage check',
  'Basic exterior wash and body-panel cleaning',
  'Mudguard, wheel and accessible area cleaning',
  'Seat, mirrors and handlebar wipe-down',
  'General nut-and-bolt and fastener check',
  'Final start-up check and service feedback',
];

// Shared published labour-tier resolver used by both pricing cards and model-page SEO headings.
export const getBikeServicePackageForCc = (engineCc: number | null | undefined) => {
  if (engineCc == null || engineCc === 0) return null;
  const bounded = packages
    .map((item) => {
      const values = item.cc.match(/\d+/g)?.map(Number) ?? [];
      if (item.cc.startsWith('Above')) return { item, min: 901, max: Number.POSITIVE_INFINITY };
      return values.length >= 2 ? { item, min: values[0], max: values[1] } : null;
    })
    .filter((entry): entry is { item: typeof packages[number]; min: number; max: number } => entry !== null);
  const exact = bounded.find(({ min, max }) => engineCc >= min && engineCc <= max);
  if (exact) return exact.item;
  return bounded
    .map((entry) => ({
      ...entry,
      distance: engineCc < entry.min ? entry.min - engineCc : engineCc > entry.max ? engineCc - entry.max : 0,
    }))
    .sort((a, b) => a.distance - b.distance)[0]?.item ?? null;
};

interface Props {
  vehicleName?: string;
  compact?: boolean;
  title?: string;
  description?: string;
  engineCc?: number | null;
}

const BikeServicePriceCards: React.FC<Props> = ({
  vehicleName = 'Your bike',
  compact = false,
  title = 'Transparent Doorstep Bike Service Pricing',
  description = 'Choose the published labour-charge tier by engine capacity. Oil, replacement parts and additional repair work are quoted separately after inspection.',
  engineCc = null,
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const matchingPackage = getBikeServicePackageForCc(engineCc);
  const modelPackages = engineCc == null
    ? packages
    : matchingPackage
      ? [matchingPackage]
      : [{
          title: `${engineCc === 0 ? vehicleName : `${engineCc} CC`} Model-Specific Estimate`,
          cc: engineCc === 0 ? 'ELECTRIC' : `${engineCc} CC`,
          price: 'On enquiry',
          detail: 'This vehicle does not map to a published engine-capacity tier. Confirm the price for this exact model on WhatsApp.',
        }];

  return (
    <section className={`gfc-price-section ${compact ? 'gfc-price-section-compact' : ''} py-14 sm:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-9 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] gfc-price-eyebrow mb-3">Clear charges · No surprises</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gfc-price-title">{title}</h2>
          <p className="mt-3 text-sm sm:text-base gfc-price-description leading-relaxed">{description}</p>
        </div>

        <div className={`grid grid-cols-1 ${engineCc != null ? 'max-w-md mx-auto' : 'sm:grid-cols-2 xl:grid-cols-5'} gap-4 lg:gap-5 items-stretch`}>
          {modelPackages.map((item, index) => (
            <article key={item.cc} className={`gfc-tier-card ${index === 0 ? 'gfc-tier-card-featured' : ''} ${engineCc != null ? 'gfc-tier-card-model-specific' : ''}`}>
              {engineCc == null && index === 0 && <span className="gfc-tier-badge">Popular starting tier</span>}
              <div className="gfc-tier-card-head">
                <div className="flex items-center justify-between mb-5">
                  <span className="gfc-tier-index">0{index + 1}</span>
                  <Bike size={25} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-75">{item.cc}</p>
                <h3 className="text-lg font-bold leading-tight mt-2">{item.title}</h3>
              </div>
              <div className="gfc-tier-card-body">
                <p className="gfc-tier-price">{item.price}{item.price !== 'On enquiry' && <span>/ labour</span>}</p>
                <p className="gfc-tier-detail">{item.detail}</p>
                <button
                  type="button"
                  className="gfc-tier-expand"
                  aria-expanded={expanded === index}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  What's included <ChevronDown size={15} className={expanded === index ? 'rotate-180' : ''} />
                </button>
                {expanded === index && (
                  <ul className="gfc-tier-includes">
                    {included.map((feature) => <li key={feature}><CheckCircle2 size={14} />{feature}</li>)}
                  </ul>
                )}
                <button
                  type="button"
                  className="gfc-tier-book"
                  onClick={() => openWhatsAppBooking({ serviceType: item.title, vehicle: `${vehicleName} · ${item.cc}`, price: item.price === 'On enquiry' ? 'Please share a vehicle-specific estimate' : item.price, location: 'Noida / Gurugram / Delhi NCR' })}
                >
                  <MessageCircle size={16} />Book</button>
              </div>
            </article>
          ))}
        </div>
        <p className="text-center text-xs sm:text-sm gfc-price-footnote mt-6"> {engineCc == null ? 'Published labour tiers apply to the listed engine-capacity ranges. Engine oil and parts are extra.' : matchingPackage ? `Showing the applicable published labour tier for ${engineCc} CC. If the model falls between listed ranges, the nearest CC band is used. Engine oil and replacement parts are extra.` : 'Electric vehicles require a vehicle-specific estimate. Engine oil and parts are extra.'}</p>
      </div>
    </section>
  );
};

export default BikeServicePriceCards;
