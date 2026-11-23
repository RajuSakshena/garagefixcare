
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const templatePath = path.join(distDir, 'index.html');
const manifestPath = path.join(distDir, '.vite', 'manifest.json');

if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html not found.');
}

if (!fs.existsSync(sitemapPath)) {
  throw new Error('public/sitemap.xml not found.');
}

if (!fs.existsSync(manifestPath)) {
  throw new Error('Vite manifest missing. Check build.manifest in vite.config.ts.');
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const routes = [
  ...sitemap.matchAll(
    /<loc>\s*https:\/\/www\.garagefixcare\.in(\/[^<]*)?\s*<\/loc>/gi
  ),
].map((match) => match[1] || '/');

if (!routes.includes('/')) routes.unshift('/');

const uniqueRoutes = [...new Set(routes)];

const manifest = JSON.parse(
  fs.readFileSync(manifestPath, 'utf8')
);

const assetMap = new Map();

for (const [key, value] of Object.entries(manifest)) {
  if (value.file) {
    assetMap.set(
      `/${key.replace(/^\/+/, '')}`,
      `/${value.file.replace(/^\/+/, '')}`
    );
  }
}

function fixImagePaths(html) {
  for (const [source, output] of assetMap) {
    html = html.split(source).join(output);
  }

  return html;
}

const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const serverEntry = await vite.ssrLoadModule('/src/entry-server.tsx');

  if (typeof serverEntry.render !== 'function') {
    throw new Error('render(url) is missing from entry-server.tsx');
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  let completed = 0;

  for (const route of uniqueRoutes) {
    console.log(`Prerendering: ${route}`);

    const result = serverEntry.render(route);

    if (!result || typeof result.html !== 'string') {
      throw new Error(`Rendering failed for ${route}`);
    }

    const helmet = result.helmet;

    if (!helmet) {
      throw new Error(`Helmet metadata missing for ${route}`);
    }

    const headMarkup = [
      helmet.title?.toString() || '',
      helmet.meta?.toString() || '',
      helmet.link?.toString() || '',
      helmet.script?.toString() || '',
      helmet.noscript?.toString() || '',
      helmet.style?.toString() || '',
    ].filter(Boolean).join('\n');

    if (!headMarkup.trim()) {
      throw new Error(`SEO head is empty for ${route}`);
    }

    let renderedApp = fixImagePaths(result.html);
    let html = template
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, '')
      .replace(
        /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/gi,
        ''
      );

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedApp}</div>`
    );

    html = html.replace(
      '</head>',
      `${headMarkup}\n</head>`
    );

    const outputPath = route === '/'
      ? templatePath
      : path.join(
          distDir,
          route.replace(/^\/+/, ''),
          'index.html'
        );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf8');

    completed++;
  }

  console.log(`Successfully prerendered ${completed} routes.`);
} finally {
  await vite.close();
}
