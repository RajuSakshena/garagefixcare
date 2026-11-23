import React from 'react';
import testimonial1 from '../images/Testimonial1.jpeg';
import testimonial2 from '../images/Testimonial2.jpeg';
import testimonial3 from '../images/Testimonial3.jpeg';
import testimonial4 from '../images/Testimonial4.jpeg';
import shubhankarImage from '../images/Shubhankar-Sharma.webp';
import diptiImage from '../images/Dipti-Yadav.webp';
import parulImage from '../images/Parul-Khandelwal.webp';

type CustomerReview = {
  name: string;
  image?: string;
  text: string;
  vehicle?: string;
  googleReview?: boolean;
};

// The first four are the existing customer reviews. The additional three are
// customer-feedback cards and are intentionally not labelled as Google reviews.
const reviews: CustomerReview[] = [
  {
    name: 'Surendra Pratap Singh',
    image: testimonial1,
    text: 'I had an excellent experience with GarageFixCare. The team was knowledgeable and professional, delivering high-quality service along with valuable maintenance guidance.',
    googleReview: true,
  },
  {
    name: 'Dharmendra Gupta',
    image: testimonial2,
    text: 'I discovered GarageFixCare through Google and was initially unsure, but they provided video evidence of the service. Their work is professional, transparent, and highly reliable.',
    googleReview: true,
  },
  {
    name: 'Rohit Prasad',
    image: testimonial3,
    text: 'GarageFixCare provides excellent services, whether you’re stranded or prefer to stay at home. They offer a comprehensive range of reliable and convenient solutions.',
    googleReview: true,
  },
  {
    name: 'Prabhjeet Sharma',
    image: testimonial4,
    text: 'When my bike broke down, GarageFixCare responded immediately. The mechanic arrived the next morning, providing prompt and highly professional service.',
    googleReview: true,
  },
  {
    name: 'Shubhankar Sharma',
    image: shubhankarImage,
    text: 'The doorstep service made bike maintenance convenient. The service process was explained clearly, and the team kept me informed throughout the visit.',
  },
  {
    name: 'Dipti Yadav',
    image: diptiImage,
    text: 'Booking a scooter service at home was simple and convenient. The mechanic checked the vehicle carefully and explained the work before starting.',
  },
  {
    name: 'Parul Khandelwal',
    image: parulImage,
    text: 'I appreciated the hassle-free doorstep experience. The team was courteous, arrived as discussed, and shared useful suggestions for regular vehicle care.',
  },
];

const ReviewCard = ({ review }: { review: CustomerReview }) => (
  <article className="gfc-review-card">
    {review.googleReview ? (
      <div className="gfc-review-google-mark" aria-label="Google customer review">G</div>
    ) : (
      <div className="gfc-review-customer-mark" aria-label="Customer feedback">GFC</div>
    )}
    <div className="gfc-review-stars" aria-label="5 stars">★★★★★</div>
    <p className="gfc-review-copy">{review.text}</p>
    {review.image ? (
      <img src={review.image} alt={`${review.name} profile`} className="gfc-review-avatar" loading="lazy" decoding="async" draggable={false}/>
    ) : (
      <span className="gfc-review-avatar gfc-review-initials" aria-hidden="true">{review.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
    )}
    <h3>{review.name}</h3>
    <span>{review.googleReview ? 'Google customer review' : 'Customer feedback'}</span>
  </article>
);

const CustomerReviews: React.FC = () => {
  const reverseReviews = [...reviews].reverse();

  return (
    <section className="gfc-reviews-section py-14 sm:py-20" aria-labelledby="gfc-customer-reviews-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="gfc-eyebrow">Customer experiences</p>
        <h2 id="gfc-customer-reviews-title" className="gfc-review-section-title">What <span>Customers Say</span></h2>
        <p className="gfc-review-subtitle">Feedback shared by Garage Fix Care customers</p>
        <div className="gfc-review-rating">
          <span aria-hidden="true">★★★★★</span>
          <strong>4.7 Rating on Google</strong>
        </div>
        <a href="https://www.google.com/search?q=Garage+Fix+Care+Noida+reviews" target="_blank" rel="noopener noreferrer" className="gfc-google-review-link">
          Read customer reviews on Google
        </a>
      </div>
      <div className="gfc-review-marquees" aria-label="Customer feedback">
        <div className="gfc-review-marquee-viewport">
          <div className="gfc-review-marquee-track gfc-review-track-left">
            {[...reviews, ...reviews].map((review, index) => <ReviewCard key={`review-a-${index}`} review={review}/>)}
          </div>
        </div>
        <div className="gfc-review-marquee-viewport">
          <div className="gfc-review-marquee-track gfc-review-track-right">
            {[...reverseReviews, ...reverseReviews].map((review, index) => <ReviewCard key={`review-b-${index}`} review={review}/>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
