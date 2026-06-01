import React from 'react';
import { Helmet } from 'react-helmet-async';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  site?: string;    // Twitter @handle of website, e.g. "@garagefixcare"
  creator?: string; // Twitter @handle of content creator
}

// JSON-LD structured data — pass any valid Schema.org object
type JsonLdObject = Record<string, unknown>;

export interface SEOHelmetProps {
  // Core
  title?: string;
  description?: string;

  // Canonical & indexing
  canonical?: string;  // Full URL, e.g. "https://garagefixcare.in/noida"
  robots?: string;     // e.g. "index, follow" (default) or "noindex, nofollow"

  // Open Graph (social sharing previews)
  og?: OpenGraphProps;

  // Twitter Card
  twitter?: TwitterProps;

  // JSON-LD structured data (can pass multiple schemas as an array)
  structuredData?: JsonLdObject | JsonLdObject[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_ROBOTS      = 'index, follow';
const SITE_NAME           = 'Garage Fix Care';
const SITE_TWITTER        = '@garagefixcare';
const DEFAULT_CANONICAL   = 'https://garagefixcare.in/';
const DEFAULT_OG_IMAGE    = 'https://garagefixcare.in/og-banner.png';
const DEFAULT_OG_IMAGE_ALT = 'Garage Fix Care Bike & Car Service in Noida';

const DEFAULT_TITLE = 'Bike & Car Service in Noida ₹299 | Doorstep Repair Near Me';
const DEFAULT_DESCRIPTION =
  'Bike & car service in Noida starting at just ₹299. Doorstep repair, oil change, battery replacement, puncture repair & trusted mechanics near you. Same-day service by Garage Fix Care.';

// ─── Component ────────────────────────────────────────────────────────────────

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title       = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  robots = DEFAULT_ROBOTS,
  og = {},
  twitter = {},
  structuredData,
}) => {

  // Resolved canonical — prop takes priority, else site default
  const resolvedCanonical = canonical ?? DEFAULT_CANONICAL;

  // Merge OG defaults with provided values
  const ogTitle       = og.title       ?? title;
  const ogDescription = og.description ?? description;
  const ogType        = og.type        ?? 'website';
  const ogSiteName    = og.siteName    ?? SITE_NAME;
  const ogLocale      = og.locale      ?? 'en_IN';
  const ogImage       = og.image       ?? DEFAULT_OG_IMAGE;
  const ogImageAlt    = og.imageAlt    ?? DEFAULT_OG_IMAGE_ALT;

  // Merge Twitter defaults
  const twitterCard        = twitter.card        ?? 'summary_large_image';
  const twitterTitle       = twitter.title       ?? title;
  const twitterDescription = twitter.description ?? description;
  const twitterSite        = twitter.site        ?? SITE_TWITTER;
  const twitterImage       = twitter.image       ?? DEFAULT_OG_IMAGE;
  const twitterImageAlt    = twitter.imageAlt    ?? DEFAULT_OG_IMAGE_ALT;

  // Normalise structured data to always be an array
  const schemas: JsonLdObject[] = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* ── Canonical ── */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── Robots ── */}
      <meta name="robots" content={robots} />

      {/* ── Open Graph ── */}
      <meta property="og:title"       content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:site_name"   content={ogSiteName} />
      <meta property="og:locale"      content={ogLocale} />
      <meta property="og:url"         content={og.url ?? resolvedCanonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:alt"   content={ogImageAlt} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content={twitterCard} />
      <meta name="twitter:title"       content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:site"        content={twitterSite} />
      <meta name="twitter:image"       content={twitterImage} />
      <meta name="twitter:image:alt"   content={twitterImageAlt} />
      {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}

      {/* ── JSON-LD Structured Data ── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHelmet;
