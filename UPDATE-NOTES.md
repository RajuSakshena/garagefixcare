# Garage Fix Care — Two-Colour Consistency Update

## Visual system
- Standardized the site around two alternating background surfaces: warm cream (#F5F1E8) and chocolate (#211F1B).
- Retained restrained gold as an accent only; WhatsApp remains green for recognizability.
- Standardized typography across routes: Inter/system sans for body and Georgia for editorial headings.
- Applied the same palette and font system to homepage, model pages, category pages, pricing, car service, blogs, and city landing pages.

## Homepage
- Added a three-card vehicle directory row immediately before “Hot Deals This Week”.
- All Bike Models links to /bike-service.
- All Scooty Models links to /scooty-service.
- All Car Models links to /car.
- Image areas are intentionally blank placeholders for the owner's future photos.

## Customer reviews
- Created a shared CustomerReviews component rendered after route content, so the same four real customer reviews appear on every route.
- Preserved the supplied customer names, feedback text and profile photos.
- Removed the eight unfinished placeholder testimonials from the homepage; no invented Google reviews or customer names are published.
- Two marquee rows move in opposite directions and pause on hover.

## Model-specific pricing
- BikeServicePriceCards now accepts each model's engine capacity and shows one applicable labour tier on that model's bike/scooty page.
- Added the user-provided 125–135 CC tier at ₹299. Existing tiers remain 220–300 CC (₹450), 350–450 CC (₹499), 500–650 CC (₹599), 650–900 CC (₹750), and above 900 CC (₹899).
- If a model's CC is between published ranges, the closest range by distance to its boundary is selected automatically. For example, Aprilia RS 457 (457 CC) maps to 350–450 CC at ₹499 because 457 is 7 CC above that band and 43 CC below the next band.
- Electric models show a vehicle-specific WhatsApp estimate because they do not have an engine CC.

## Validation
- TypeScript: `tsc --noEmit` passed.
- Static checks: category-card placement, route-wide review component, removal of placeholder testimonials, and 457 CC quote fallback passed.
- Production build was attempted but the packaging runtime returned `vite: Permission denied`; run `npm ci` then `npm run build` on the local Windows machine before deployment.


## Latest booking CTA and contrast polish
- Replaced visible booking CTA wording with concise labels: `Book Enquiry` and `Enquiry`; no button says `Book on WhatsApp` or `Book Service on WhatsApp`.
- Kept booking actions connected to the existing business WhatsApp number (+91 95405 53759). Location-page CTAs use WhatsApp links; modal-based CTAs continue to open WhatsApp with the collected enquiry details.
- Updated the homepage vehicle selector from navy/blue to warm cream and chocolate, with chocolate active selection and cream inactive selection.
- Updated the homepage customer-stat panels to cream.
- Fixed the bike-brand directory heading contrast and brand chip text so the names remain readable on cream chips inside the chocolate panel.
- TypeScript check passed after these updates.


## Homepage section order and location-page theme
- Homepage order is now: genuine Customer Reviews component, then FAQ, then Service Locations & Popular Pages.
- Reused the existing CustomerReviews component and its real review content/images; no new review text or profiles were fabricated.
- Added a shared location-landing theme wrapper to 44 standalone bike/car location pages and the shared Noida city landing template.
- Location landing sections now alternate cream and chocolate surfaces, with dark text on cream sections and light text on chocolate sections, following the homepage's two-colour palette.
- Kept route definitions, page titles, canonical metadata, structured data, and page copy unchanged.
- TypeScript check passed. Production build could not run in this environment because the Vite executable was unavailable/permission-denied in the extracted package.


## Location-page contrast and vehicle selector correction
- Fixed the hero vehicle selector across 43 bike/car location landing pages: cream surface, dark readable label, chocolate active Bike & Scooty option, and warm cream inactive Cars option.
- Corrected the location-page section alternation selector. It now targets direct child sections after the photographic hero, alternating chocolate and cream like the homepage instead of leaving every section chocolate.
- Applied readable text colours and retained gold accents; pricing cards keep their existing dark/light card styling.
- The photographic hero section remains unchanged.
- TypeScript check passed.


## Location FAQ and customer review consistency
- Replaced the legacy static testimonial panels on location landing pages with the same animated `CustomerReviews` component used on the homepage.
- Added the shared moving two-row review marquee to all 45 location/city templates, including the shared Noida city template. The same four genuine review records already present in the homepage component are shown; no extra/fabricated customer reviews were created.
- Fixed FAQ section contrast on location pages: cream question cards, dark readable question text, warm beige answer panels and readable answer copy.
- Set the first FAQ answer open by default on accordion-based location pages; remaining questions continue to expand/collapse on click. The shared city template opens its first native details item by default.
- Corrected legacy location pricing card contrast: cream card bodies now use dark readable prices/features, while dark headers and white CTA labels remain intact.
- TypeScript check passed (`npx tsc --noEmit`).


## Location page alternating section colours
- Fixed the repeated dark section issue across all 40 bike/scooty location templates that use the Hot Deals, Brands We Service and At-Home Service Price List sections.
- Applied a consistent warm alternating sequence: Hot Deals = chocolate, Brands We Service = light cream, Price List = chocolate.
- Brand heading, eyebrow, description and brand tiles now use readable chocolate/gold tones on cream; price cards remain independently styled and retain their readable card text.
- Used explicit section classes instead of relying on `nth-of-type`, which did not reliably match the nested page structure.


## Ghaziabad and model-page heading update
- Ghaziabad landing page SEO title and visible hero heading now read: "Best Bike, Scooty and Car Service & Repair in Ghaziabad — Doorstep Service Just ₹450".
- Model-specific bike and scooty landing pages now use: "[Vehicle] Service & Repair in Noida, Gurugram & Delhi NCR At [applicable labour price]".
- The model-page price is resolved from the same published CC labour tiers used by BikeServicePriceCards, including nearest-band handling for CC values between published ranges. Electric models display "Price on Enquiry".
- Updated model-page SEO title, Open Graph title and Twitter title to follow the same model-specific heading.
- TypeScript validation passed with `npx tsc --noEmit`.

## Vite parser error fix
- Replaced literal `\\n` character sequences accidentally inserted into TypeScript source with real line breaks in `ModelServiceLandingPage.tsx` and `BikeServicePriceCards.tsx`.
- `npx tsc --noEmit` passes after the fix.

## Model landing page updates
- Corrected the published entry-level labour band to 100 CC–135 CC at ₹299.
- Fixed the CC-range parser to use a digit matcher (`/\d+/g`), so 123.92 CC Honda Dio 125 resolves to the ₹299 tier instead of incorrectly falling through to the Above 900 CC tier.
- Reused the homepage `inside.mp4` workshop footage in the first model-page hero video slot on every bike and scooty model page.
- Kept the second model-page video placeholder intact for the owner's own service walkthrough footage.
- Added the existing genuine CustomerReviews carousel to model pages before their model-specific FAQ section.
- Model FAQ entries remain generated from each vehicle's brand/model and service type; FAQPage structured data continues to use those same questions and answers.
- Added responsive video sizing styles for the model hero footage.
- Validation: `npx tsc --noEmit` passes. A production build could not be run in this environment because the extracted project has no local Vite package executable available.
