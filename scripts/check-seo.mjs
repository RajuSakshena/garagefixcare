
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const app = fs.readFileSync(
  path.join(root, 'src', 'App.tsx'),
  'utf8'
);

const sitemap = fs.readFileSync(
  path.join(root, 'public', 'sitemap.xml'),
  'utf8'
);

const routePatterns = [
  ...app.matchAll(/<Route path="([^"]+)" element=\{<\w+\s*\/>\} \/>/g)
]
  .map((match) => match[1])
  .map((route) =>
    new RegExp(
      `^${route
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/:[^/]+/g, '[^/]+')}/?$`
    )
  );

const sitemapRoutes = [
  ...sitemap.matchAll(
    /<loc>https:\/\/www\.garagefixcare\.in(\/[^<]*)?<\/loc>/g
  )
].map((match) => match[1] || '/');

const errors = [];
const seen = new Set();

for (const route of sitemapRoutes) {
  if (seen.has(route)) {
    errors.push(`Duplicate sitemap URL: ${route}`);
  }

  seen.add(route);

  if (!routePatterns.some((pattern) => pattern.test(route))) {
    errors.push(`Sitemap URL is not matched by an App route: ${route}`);
    continue;
  }

  const outputPath =
    route === '/'
      ? path.join(root, 'dist', 'index.html')
      : path.join(root, 'dist', route.replace(/^\/+/, ''), 'index.html');

  if (!fs.existsSync(outputPath)) {
    errors.push(`Prerendered HTML missing: ${route}`);
    continue;
  }

  const html = fs.readFileSync(outputPath, 'utf8');

  const expectedCanonical = `https://www.garagefixcare.in${route}`;

  // Read canonical regardless of attribute order
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];

  const canonicalTag = linkTags.find((tag) =>
    /\brel=["']canonical["']/i.test(tag)
  );

  const canonical = canonicalTag?.match(
    /\bhref=["']([^"']+)["']/i
  )?.[1];

  // Read title even when data-rh is present
  const title = html.match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  )?.[1];

  // Read description regardless of attribute order
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  const descriptionTag = metaTags.find((tag) =>
    /\bname=["']description["']/i.test(tag)
  );

  const description = descriptionTag?.match(
    /\bcontent=["']([^"']*)["']/i
  )?.[1];

  const h1Count = [...html.matchAll(/<h1\b/gi)].length;

  if (canonical !== expectedCanonical) {
    errors.push(
      `Canonical mismatch for ${route}: ${canonical || 'missing'}`
    );
  }

  if (!title || !title.trim()) {
    errors.push(`Title missing for ${route}`);
  }

  if (!description || !description.trim()) {
    errors.push(`Meta description missing for ${route}`);
  }

  if (h1Count !== 1) {
    errors.push(`Expected one H1 in ${route}; found ${h1Count}`);
  }
}

if (errors.length) {
  console.error(
    `SEO validation failed with ${errors.length} issue(s):`
  );

  for (const error of errors.slice(0, 80)) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `SEO validation passed: ${sitemapRoutes.length} sitemap URLs matched App routes; all prerendered pages have unique canonicals, titles, descriptions and one H1.`
);
