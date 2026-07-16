import React from 'react';
import { Helmet } from 'react-helmet-async';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface OpenGraphProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  siteName?: string;
  locale?: string;
}

interface TwitterProps {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

type JsonLdObject = Record<string, unknown>;

export interface SEOHelmetProps {
  title?: string;
  description?: string;

  keywords?: string;
  author?: string;

  canonical?: string;
  robots?: string;

  og?: OpenGraphProps;
  twitter?: TwitterProps;

  structuredData?: JsonLdObject | JsonLdObject[];
}

// ─────────────────────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────────────────────

const SITE_NAME = 'Garage Fix Care';

const DEFAULT_TITLE =
  'Bike & Car Service in Noida, Gurgaon & Delhi NCR ₹299 | Garage Fix Care';

const DEFAULT_DESCRIPTION =
  'Doorstep bike service and doorstep car service across Noida, Greater Noida, Delhi, New Delhi, Gurgaon, Gurugram, Ghaziabad, Faridabad and Delhi NCR, starting from ₹299. Same-day service from trusted mechanics who come straight to your doorstep.';

const DEFAULT_KEYWORDS =
  'bike service near me, car service near me, bike repair noida, bike repair delhi, bike repair gurgaon, bike repair ghaziabad, car service noida, car service delhi, car service gurgaon, car service ghaziabad, doorstep bike service, doorstep car service, mechanic near me, garage fix care, greater noida, faridabad, delhi ncr, bike repair delhi ncr, bike service delhi ncr, doorstep mechanic delhi ncr, bike repair greater noida, bike repair faridabad, car service greater noida, car service faridabad';

const DEFAULT_AUTHOR = 'Garage Fix Care';

const DEFAULT_ROBOTS = 'index, follow';

const SITE_ORIGIN = 'https://www.garagefixcare.in';

// Only used as a last-resort fallback (e.g. during SSR/build where `window`
// is unavailable). In the browser we always derive the canonical from the
// current path so a page can never silently inherit the homepage's
// canonical just because it forgot to pass one in explicitly.
const DEFAULT_CANONICAL = `${SITE_ORIGIN}/`;

const DEFAULT_OG_IMAGE =
  'https://www.garagefixcare.in/og-banner.png';

const DEFAULT_OG_IMAGE_ALT =
  'Garage Fix Care Doorstep Bike & Car Service';

const SITE_TWITTER = '@garagefixcare';

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  author = DEFAULT_AUTHOR,

  canonical,
  robots = DEFAULT_ROBOTS,

  og = {},
  twitter = {},

  structuredData,
}) => {

  // IMPORTANT: every page should pass its own `canonical` prop explicitly.
  // This fallback exists purely as a safety net — it derives the canonical
  // from the page's actual current path (not a hardcoded homepage URL), so
  // a landing page that forgets to pass `canonical` still points to itself
  // rather than incorrectly pointing to "/".
  const resolvedCanonical =
    canonical ??
    (typeof window !== 'undefined'
      ? `${SITE_ORIGIN}${window.location.pathname}`
      : DEFAULT_CANONICAL);

  const ogTitle =
    og.title ?? title;

  const ogDescription =
    og.description ?? description;

  const ogType =
    og.type ?? 'website';

  const ogSiteName =
    og.siteName ?? SITE_NAME;

  const ogLocale =
    og.locale ?? 'en_IN';

  const ogImage =
    og.image ?? DEFAULT_OG_IMAGE;

  const ogImageAlt =
    og.imageAlt ?? DEFAULT_OG_IMAGE_ALT;

  const twitterCard =
    twitter.card ?? 'summary_large_image';

  const twitterTitle =
    twitter.title ?? title;

  const twitterDescription =
    twitter.description ?? description;

  const twitterSite =
    twitter.site ?? SITE_TWITTER;

  const twitterImage =
    twitter.image ?? DEFAULT_OG_IMAGE;

  const twitterImageAlt =
    twitter.imageAlt ?? DEFAULT_OG_IMAGE_ALT;

  const schemas: JsonLdObject[] =
    structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];

  return (
    <Helmet>

      {/* Primary SEO */}

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="author"
        content={author}
      />

      <meta
        name="robots"
        content={robots}
      />

      {/* Canonical */}

      <link
        rel="canonical"
        href={resolvedCanonical}
      />

      {/* Local SEO */}

      <meta
        name="geo.region"
        content="IN-UP"
      />

      <meta
        name="geo.placename"
        content="Noida, Greater Noida, Delhi, New Delhi, Gurgaon, Gurugram, Ghaziabad, Faridabad, Delhi NCR"
      />

      <meta
        name="distribution"
        content="global"
      />

      <meta
        name="language"
        content="English"
      />

      {/* Open Graph */}

      <meta
        property="og:title"
        content={ogTitle}
      />

      <meta
        property="og:description"
        content={ogDescription}
      />

      <meta
        property="og:type"
        content={ogType}
      />

      <meta
        property="og:site_name"
        content={ogSiteName}
      />

      <meta
        property="og:locale"
        content={ogLocale}
      />

      <meta
        property="og:url"
        content={og.url ?? resolvedCanonical}
      />

      <meta
        property="og:image"
        content={ogImage}
      />

      <meta
        property="og:image:alt"
        content={ogImageAlt}
      />

      {/* Twitter */}

      <meta
        name="twitter:card"
        content={twitterCard}
      />

      <meta
        name="twitter:title"
        content={twitterTitle}
      />

      <meta
        name="twitter:description"
        content={twitterDescription}
      />

      <meta
        name="twitter:site"
        content={twitterSite}
      />

      <meta
        name="twitter:image"
        content={twitterImage}
      />

      <meta
        name="twitter:image:alt"
        content={twitterImageAlt}
      />

      {twitter.creator && (
        <meta
          name="twitter:creator"
          content={twitter.creator}
        />
      )}

      {/* Structured Data */}

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}

    </Helmet>
  );
};

export default SEOHelmet;
