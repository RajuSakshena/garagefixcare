import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setShowSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHelmet 
        title="Contact Us - Get in Touch | GarageOnCall Mobile Auto Service"
        description="Contact GarageOnCall for mobile auto repair services. Call (555) 123-4567 or send us a message. Available 24/7 for emergency automotive services."
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-blue-600">Contact</span> <span className="text-orange-600">Us</span>
              </h1>

              <p className="text-xl text-white max-w-3xl mx-auto">
                Get in touch with our team for questions, quotes, or to schedule 
                your mobile automotive service.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="bg-sky-100 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-brandRed mb-6">
                    Get In <span className="text-orange-600">Touch</span>
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-600 mb-1">Phone</h3>
                        <p className="text-gray-900">+919318478483</p>
                        <p className="text-sm text-gray-900">Available 24/7 for emergencies</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-600 mb-1">Email</h3>
                        <p className="text-gray-900">garagefixcare@gmail.com</p>
                        <p className="text-sm text-gray-900">Response within 10 Mins</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-600 mb-1">Service Area</h3>
                        <p className="text-gray-900">All Major Cities</p>
                        <p className="text-sm text-gray-900">Within 25 mile radius</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-600 mb-1">Business Hours</h3>
                        <p className="text-gray-900">Mon - Sunday: 7AM - 11PM</p>
                        <p className="text-lg text-gray-900">Emergency service available 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-sky-100 rounded-lg">
                    <h3 className="font-semibold text-brandRed mb-2">Emergency Service</h3>
                    <p className="text-gray-900 text-sm mb-3">
                      Need immediate assistance? Call our emergency line for 24/7 support.
                    </p>
                    <a
                      href="tel:+919318478483"
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 inline-block"
                    >
                      Call Emergency Line
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-sky-100 p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">
                    <span className="text-green-600">Send Us</span> <span className="text-orange-600">a Message</span>
                  </h2>

                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">{errorMsg}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+919318478483"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general-inquiry">General Inquiry</option>
                          <option value="service-question">Service Question</option>
                          <option value="pricing-quote">Pricing Quote</option>
                          <option value="emergency-service">Emergency Service</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about your automotive service needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
