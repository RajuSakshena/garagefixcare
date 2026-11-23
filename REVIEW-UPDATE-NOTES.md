# Customer review carousel update

- Updated the shared `src/components/CustomerReviews.tsx` component to show seven distinct cards: the four existing Google customer reviews plus Shubhankar Sharma, Dipti Yadav and Parul Khandelwal.
- Added the three supplied/generated profile images as optimized WebP assets in `src/images/`.
- Kept the two-row, opposite-direction animated carousel. Every page that already uses the shared component automatically receives the same seven-card carousel, including the homepage, city/location landing pages, car-service location pages, bike/scooty model pages and the bike/scooty directory landing page.
- The original four cards retain their Google-review label. The three added cards are labelled “Customer feedback” and are not represented as verified Google reviews.
