import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3, MapPin } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { getBlogPost, blogPosts } from '../data/blogPosts';
import { openWhatsAppBooking } from '../utils/whatsapp';

const BlogPost: React.FC = () => {
  const { slug = '' } = useParams();
  const post = getBlogPost(slug);
  if (!post) return <main className="gfc-directory-hero pt-28"><div className="max-w-4xl mx-auto px-4"><h1>Article not found</h1><Link to="/blog" className="gfc-text-link">Back to all guides <ArrowRight size={15}/></Link></div></main>;
  const canonical = `https://www.garagefixcare.in/blog/${post.slug}`;
  const related = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  return <>
    <SEOHelmet
      title={`${post.title} | Garage Fix Care`}
      description={post.excerpt}
      keywords={`${post.category.toLowerCase()}, bike maintenance, scooty service, motorcycle repair, Delhi NCR, Garage Fix Care`}
      canonical={canonical} robots="index, follow"
      og={{ title: post.title, description: post.excerpt, url: canonical, image: 'https://www.garagefixcare.in/og-banner.png', imageAlt: post.imageAlt, type: 'article' }}
      twitter={{ title: post.title, description: post.excerpt, image: 'https://www.garagefixcare.in/og-banner.png' }}
      structuredData={[{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: '2026-11-14', dateModified: '2026-11-14', author: { '@type': 'Organization', name: 'Garage Fix Care' }, publisher: { '@type': 'Organization', name: 'Garage Fix Care', url: 'https://www.garagefixcare.in' }, mainEntityOfPage: canonical, articleSection: post.category, inLanguage: 'en-IN' }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.garagefixcare.in/blog' }, { '@type': 'ListItem', position: 3, name: post.title, item: canonical }] }]}
    />
    <main className="gfc-blog-article pt-[76px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Link to="/blog" className="gfc-text-link mb-7 inline-flex"><ArrowLeft size={15}/> All maintenance guides</Link>
        <div className="flex flex-wrap items-center gap-3 mb-4"><span className="gfc-blog-category">{post.category}</span><span className="gfc-blog-readtime"><Clock3 size={13}/>{post.readTime}</span><span className="gfc-blog-readtime"><MapPin size={13}/> Delhi NCR riders</span></div>
        <h1 className="gfc-article-title">{post.title}</h1>
        <p className="gfc-article-excerpt">{post.excerpt}</p>
        <div className="gfc-article-image-placeholder"><img src={post.image} alt={post.imageAlt} /></div>
        <div className="gfc-article-body"><p className="gfc-article-intro">{post.intro}</p>{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="gfc-article-takeaway"><strong>Key takeaway</strong><p>{post.takeaway}</p></div><p className="gfc-article-disclaimer">This guide is general information, not a substitute for your vehicle’s owner manual or a physical inspection. Always follow manufacturer instructions and use a qualified technician for safety-critical repairs.</p></div>
        <div className="gfc-article-cta"><div><p className="gfc-eyebrow">Need help with your vehicle?</p><h2>Ask Garage Fix Care</h2><p>Share your bike or scooty model, symptoms and location for a service enquiry.</p></div><button className="gfc-primary-cta" onClick={() => openWhatsAppBooking({ serviceType: `Question about: ${post.title}`, location: 'Noida / Gurugram / Delhi NCR' })}>Ask on WhatsApp <ArrowRight size={15}/></button></div>
      </div>
      {related.length > 0 && <section className="gfc-related-articles py-12"><div className="max-w-7xl mx-auto px-4"><h2>Related guides</h2><div className="grid md:grid-cols-3 gap-4 mt-5">{related.map((item) => <Link className="gfc-related-article" to={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span><b>{item.title}</b><small>Read guide <ArrowRight size={13}/></small></Link>)}</div></div></section>}
    </main>
  </>;
};

export default BlogPost;
