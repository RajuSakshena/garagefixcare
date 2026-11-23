# Garage Fix Care — Homepage, model directory, blog and conversion update

## Visual fixes from the supplied screenshots
- Fixed the major-bike-brand summary panel: the panel is now ivory with dark readable text and clickable brand links, instead of dark text on a charcoal surface.
- Rebuilt the homepage customer feedback area as two continuous marquee rows moving in opposite directions. Hover/focus pauses the movement; reduced-motion preferences disable animation.
- Kept the four existing customer review names and supplied wording intact.
- Added eight clearly marked sample layout cards. They are NOT presented as Google reviews and must be replaced with genuine, customer-approved text and photos before production. Temporary profile photos reuse one of the existing four local testimonial photos so they can be swapped later.
- Added non-selectable, cropped testimonial avatars to prevent accidental text/image highlighting and dragging.
- Added alternating warm ivory, sand, sage, graphite and muted-gold surfaces to reduce repeated same-colour sections.

## Shared service pricing
- Added `src/components/BikeServicePriceCards.tsx` and reused it on the homepage, pricing page, Noida landing page and every new model landing page.
- Published labour tiers: 220–300 CC ₹450; 350–450 CC ₹499; 500–650 CC ₹599; 650–900 CC ₹750; above 900 CC ₹899.
- The cards explain that oil, replacement parts and additional repair work are extra and that models outside listed tiers need a vehicle-specific estimate.

## Noida city page
- Replaced the legacy Noida page with the same shared premium city landing-page system used for the new model pages.
- Includes a hero video placeholder, shared labour cards, a second video placeholder, service inspection categories, Noida area coverage, brand directory links and FAQ content.

## Bike and scooty model directory
- Added 155 individual model landing pages from 24 manufacturers: 111 motorcycle models and 44 scooter/e-scooter models.
- Added `/bike-service` and `/scooty-service` model directories.
- Added `/two-wheeler-service/{brand}` brand pages with separate bike and scooter model lists where applicable.
- Added individual routes: `/bike-service/{brand}/{model}` and `/scooty-service/{brand}/{model}`.
- Each model page has a unique title, description, canonical URL, model-specific service copy, inspection points, FAQ schema, breadcrumb schema, related-model links, a hero video placeholder and a mid-page video placeholder.
- Page titles and local service copy target Noida, Gurugram and Delhi NCR. The directory covers popular/current and commonly seen models; it is not a claim that every historical or international variant is listed.

## Blogs
- Replaced the old 3-card blog list with 15 ready-to-publish maintenance guides.
- Added individual article pages with unique title/description/canonical metadata, BlogPosting schema, breadcrumbs, article sections, takeaways and safety disclaimers.
- Every blog has an image placeholder and a suggested image filename under `public/images/blog/`.

## WhatsApp conversion
- Changed all `/book` CTA links found in the project to open the Garage Fix Care WhatsApp chat directly (89 legacy CTA links converted, plus the new direct WhatsApp booking actions).
- Updated the homepage hero booking button to open WhatsApp immediately.
- Existing booking forms that collect a phone number now submit the details through the WhatsApp helper.
- Call buttons remain phone links; they are contact actions, not booking links.

## SEO / GEO / AEO
- Added internal linking from the homepage brand marquees and brand summary to manufacturer pages, and from manufacturer pages to individual models.
- Added the new directories, 24 brand pages, 155 model pages and 15 article pages to `public/sitemap.xml`.
- The existing `robots.txt` already references the sitemap and was retained.
- Added CollectionPage/ItemList schema for directories and brands, Service/FAQPage/BreadcrumbList schema for model/city pages, and BlogPosting schema for individual articles.
- Removed 37 stale ₹299 Offer entries from legacy bike-location structured data so those snippets do not contradict the published engine-capacity labour tiers.
- No fabricated AggregateRating or review count was added.

## Validation
- `node node_modules/typescript/bin/tsc --noEmit` passed.
- Sitemap validation found 248 unique URLs and every URL matches a static or dynamic React Router route.
- A full Vite build/prerender could not be completed in this Linux packaging environment because the bundled dependency folder contains the Windows Rollup native optional package but not `@rollup/rollup-linux-x64-gnu`. On the Windows development machine, run `npm ci` followed by `npm run build` so npm installs the matching platform binary before deployment.

## Add your media later
- Blog photo paths are shown in each article card and article page; guidance is in `public/images/blog/README.md`.
- City and model video placeholder paths are shown on the page; guidance is in `public/videos/README.md`.
