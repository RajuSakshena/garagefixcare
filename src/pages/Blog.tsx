import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, BookOpen } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const canonical = 'https://www.garagefixcare.in/blog';
  return <>
    <SEOHelmet
      title="Bike & Scooty Maintenance Guides for Delhi NCR Riders | Garage Fix Care"
      description="Read practical motorcycle and scooter maintenance guides covering engine oil, brakes, chains, CVT belts, batteries, monsoon care and electric scooter safety."
      keywords="bike maintenance blog, scooty maintenance tips, motorcycle repair guide, scooter service tips, Delhi NCR bike care"
      canonical={canonical} robots="index, follow"
      og={{ title: 'Bike & Scooty Maintenance Guides | Garage Fix Care', description: 'Practical two-wheeler care guides for riders in Noida, Gurugram and Delhi NCR.', url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: 'Garage Fix Care maintenance guides', type: 'website' }}
      twitter={{ title: 'Bike & Scooty Maintenance Guides | Garage Fix Care', description: 'Helpful two-wheeler maintenance and repair explainers.', image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[{ '@context': 'https://schema.org', '@type': 'Blog', name: 'Garage Fix Care Bike and Scooty Care Guides', url: canonical, description: 'Practical motorcycle and scooter maintenance guides.', blogPost: blogPosts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, description: post.excerpt, url: `https://www.garagefixcare.in/blog/${post.slug}` })) }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical }] }]}
    />
    <main className="gfc-blog-page pt-[76px]">
      <section className="gfc-directory-hero"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="gfc-eyebrow"><BookOpen size={14}/> Garage Fix Care knowledge hub</p><h1>Bike & Scooty Care Guides</h1><p>Clear, practical explainers to help riders understand routine maintenance, common symptoms and when to arrange a professional inspection.</p><div className="gfc-blog-stats"><span>{blogPosts.length} practical guides</span><span>Motorcycles · Scooters · EVs</span><span>Noida · Gurugram · Delhi NCR</span></div></div></section>
      <section className="py-14 sm:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">{blogPosts.map((post, index) => <article className="gfc-blog-card" key={post.slug}><Link to={`/blog/${post.slug}`} className="gfc-blog-image-placeholder" aria-label={`Open ${post.title}`}><img src={post.image} alt={post.imageAlt} loading="lazy" /></Link><div className="gfc-blog-card-content"><div className="flex items-center justify-between gap-3"><span className="gfc-blog-category">{post.category}</span><span className="gfc-blog-readtime"><Clock3 size={13}/>{post.readTime}</span></div><h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link to={`/blog/${post.slug}`} className="gfc-text-link">Read guide <ArrowRight size={15}/></Link></div></article>)}</div></div></section>
    </main>
  </>;
};

export default Blog;
