import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html not found. Run vite build before prerendering.');
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.garagefixcare\.in(\/[^<]*)?<\/loc>/g)]
  .map((match) => match[1] || '/');

if (!routes.includes('/')) routes.unshift('/');
if (routes.length < 2) {
  throw new Error('No valid routes found in public/sitemap.xml.');
}

const template = fs.readFileSync(templatePath, 'utf8');
const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { AppRoutes } = await vite.ssrLoadModule('/src/App.tsx');
  let completed = 0;

  for (const route of [...new Set(routes)]) {
    const helmetContext = {};
    const app = React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        MemoryRouter,
        { initialEntries: [route] },
        React.createElement(AppRoutes),
      ),
    );

    const renderedApp = renderToString(app);
    const helmet = helmetContext.helmet;

    if (!helmet || !helmet.title || !helmet.title.toString()) {
      throw new Error(`SEO metadata was not rendered for ${route}`);
    }

    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(/<meta\s+name="description"[^>]*>/i, '')
      .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);

    const headMarkup = [
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
    ].filter(Boolean).join('\n');

    html = html.replace('</head>', `${headMarkup}\n</head>`);

    const outputPath = route === '/'
      ? templatePath
      : path.join(distDir, route.replace(/^\/+/, ''), 'index.html');

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf8');
    completed += 1;
  }

  console.log(`Prerendered ${completed} routes into dist/.`);
} finally {
  await vite.close();
}
