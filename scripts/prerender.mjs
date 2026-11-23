
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'vite';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  throw new Error(
    'dist/index.html not found. Run vite build before prerendering.'
  );
}

if (!fs.existsSync(sitemapPath)) {
  throw new Error('public/sitemap.xml not found.');
}

// Read existing sitemap. Do not modify it.
const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const routes = [
  ...sitemap.matchAll(
    /<loc>\s*https:\/\/www\.garagefixcare\.in(\/[^<]*)?\s*<\/loc>/gi
  ),
].map((match) => match[1] || '/');

if (!routes.includes('/')) {
  routes.unshift('/');
}

const uniqueRoutes = [...new Set(routes)];

if (uniqueRoutes.length < 2) {
  throw new Error('Insufficient routes found in sitemap.');
}

const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});

try {
  // Load the server renderer from the same Vite module graph.
  const serverEntry = await vite.ssrLoadModule('/src/entry-server.tsx');

  if (typeof serverEntry.render !== 'function') {
    throw new Error(
      'src/entry-server.tsx must export a render(url) function.'
    );
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  let completed = 0;

  for (const route of uniqueRoutes) {
    console.log(`Prerendering: ${route}`);

    const result = serverEntry.render(route);

    if (!result || typeof result.html !== 'string') {
      throw new Error(`HTML rendering failed for ${route}`);
    }

    const helmet = result.helmet;

    if (!helmet) {
      throw new Error(
        `Helmet metadata was not collected for ${route}.`
      );
    }

    const headMarkup = [
      helmet.title?.toString() || '',
      helmet.meta?.toString() || '',
      helmet.link?.toString() || '',
      helmet.script?.toString() || '',
      helmet.noscript?.toString() || '',
      helmet.style?.toString() || '',
    ]
      .filter(Boolean)
      .join('\n');

    if (!headMarkup.trim()) {
      throw new Error(
        `SEO head metadata is empty for ${route}.`
      );
    }

    // Remove default Vite title and existing description.
    let html = template
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, '')
      .replace(
        /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/gi,
        ''
      );

    // Inject rendered React application.
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${result.html}</div>`
    );

    // Inject Helmet metadata into document head.
    html = html.replace(
      '</head>',
      `${headMarkup}\n</head>`
    );

    const outputPath =
      route === '/'
        ? templatePath
        : path.join(
            distDir,
            route.replace(/^\/+/, ''),
            'index.html'
          );

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    fs.writeFileSync(outputPath, html, 'utf8');

    completed += 1;
  }

  console.log(
    `Successfully prerendered ${completed} routes into dist/.`
  );
} finally {
  await vite.close();
}
