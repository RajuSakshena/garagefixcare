
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const distDir = path.join(root, 'dist');
const appPath = path.join(root, 'src', 'App.tsx');

if (!fs.existsSync(sitemapPath)) {
  throw new Error('public/sitemap.xml not found.');
}

if (!fs.existsSync(appPath)) {
  throw new Error('src/App.tsx not found.');
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

const SITE_ORIGIN = 'https://www.garagefixcare.in';

// Extract registered React Router paths.
const routePatterns = [
  ...app.matchAll(
    /<Route\s+path=["']([^"']+)["']/g
  ),
].map((match) => {
  const route = match[1];

  const escaped = route
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[^/]+/g, '[^/]+');

  return new RegExp(`^${escaped}/?$`);
});

// Extract sitemap URLs.
const sitemapRoutes = [
  ...sitemap.matchAll(
    /<loc>\s*https:\/\/www\.garagefixcare\.in(\/[^<]*)?\s*<\/loc>/gi
  ),
].map((match) => match[1] || '/');

const errors = [];
const seen = new Set();

if (sitemapRoutes.length === 0) {
  errors.push('No valid URLs found in sitemap.xml.');
}

for (const route of sitemapRoutes) {
  if (seen.has(route)) {
    errors.push(`Duplicate sitemap URL: ${route}`);
  }

  seen.add(route);

  // Check route registration.
  if (!routePatterns.some((pattern) => pattern.test(route))) {
    errors.push(`Sitemap URL is not matched by an App route: ${route}`);
    continue;
  }

  // Check prerendered HTML.
  const outputPath =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(
          distDir,
          route.replace(/^\/+/, ''),
          'index.html'
        );

  if (!fs.existsSync(outputPath)) {
    errors.push(`Prerendered HTML missing: ${route}`);
    continue;
  }

  const html = fs.readFileSync(outputPath, 'utf8');

  // Extract title.
  const title = html.match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  )?.[1];

  // Extract meta description regardless of attribute order.
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  const descriptionTag = metaTags.find((tag) =>
    /\bname=["']description["']/i.test(tag)
  );

  const description = descriptionTag?.match(
    /\bcontent=["']([^"']*)["']/i
  )?.[1];

  // Extract canonical regardless of attribute order.
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];

  const canonicalTag = linkTags.find((tag) =>
    /\brel=["']canonical["']/i.test(tag)
  );

  const canonical = canonicalTag?.match(
    /\bhref=["']([^"']+)["']/i
  )?.[1];

  const expectedCanonical =
    route === '/'
      ? `${SITE_ORIGIN}/`
      : `${SITE_ORIGIN}${route.replace(/\/+$/, '')}`;

  // Count H1 elements.
  const h1Count = [
    ...html.matchAll(/<h1\b/gi),
  ].length;

  if (!title?.trim()) {
    errors.push(`Title missing for ${route}`);
  }

  if (!description?.trim()) {
    errors.push(`Meta description missing for ${route}`);
  }

  if (canonical !== expectedCanonical) {
    errors.push(
      `Canonical mismatch for ${route}: ${canonical || 'missing'} (expected ${expectedCanonical})`
    );
  }

  if (h1Count !== 1) {
    errors.push(
      `Expected one H1 in ${route}; found ${h1Count}`
    );
  }
}

if (errors.length > 0) {
  console.error(
    `SEO validation failed with ${errors.length} issue(s):`
  );

  for (const error of errors.slice(0, 100)) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `SEO validation passed: ${sitemapRoutes.length} sitemap URLs matched App routes. All pages have titles, descriptions, canonicals and exactly one H1.`
);
