# Garage Fix Care Website

Serverless React 18 + Vite + Tailwind CSS website for Garage Fix Care.

## Features
- React 18 and React Router website
- Static HTML prerendering for every route listed in `public/sitemap.xml`
- Route-specific title, description, canonical, Open Graph and JSON-LD metadata
- WhatsApp-first booking and enquiry forms
- No Express server, API backend, database, or environment variables
- Responsive pages for services, pricing, contact, and Delhi NCR locations
- Vercel static deployment

## Local development

Requirements: Node.js 20 LTS or newer and npm.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build first creates the Vite assets, then prerenders every URL in `public/sitemap.xml` to a route-specific `dist/<route>/index.html`. The final SEO check verifies route/sitemap parity, canonical URLs, unique titles, one H1 per route, and the generated HTML.

Deploy to Vercel with:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required

## WhatsApp booking

Booking buttons open WhatsApp with a pre-filled message. The customer must press **Send** in WhatsApp to submit the request. The business number is configured in `src/utils/whatsapp.ts`.

## Search Console after deployment

1. Confirm `https://www.garagefixcare.in/sitemap.xml` opens successfully.
2. In Google Search Console, open **Sitemaps** and submit `sitemap.xml`.
3. Use URL Inspection on the homepage and the main service/location pages, then choose **Request indexing**.
4. Check **Page indexing** after Google recrawls. Indexing and ranking are determined by Google; this build cannot guarantee inclusion of every URL.

## Repository hygiene
- `node_modules/` and `dist/` are intentionally excluded from source control.
- Never commit `.env` files, credentials, private keys, or database passwords.
