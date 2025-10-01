import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Phone as PhoneIcon, Mail as MailIcon, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import logo41 from "../images/logo44.svg";

// Define the type for the API response
interface JoinUsResponse {
    success: boolean;
    message: string;
}

const Footer = () => {
  const [joinUsPhoneNumber, setJoinUsPhoneNumber] = useState('');

  const handleJoinUsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<JoinUsResponse>('http://localhost:3001/api/join-us', { phoneNumber: joinUsPhoneNumber });
      
      alert(response.data.message);
      setJoinUsPhoneNumber(''); // Clear the input after successful submission
    } catch (error) {
      alert('Failed to submit. Please try again.');
      console.error('Error submitting join us form:', error);
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-300 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Logo & Corporate Office (Horizontal) */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
            <div className="flex flex-col md:flex-row items-center space-x-4">
                {/* Logo size increased from h-16 to h-24 */}
                <img src={logo41} alt="Garage Fix Care" className="w-44 h-28 bg-sky-100 rounded-b-2xl" />
                <div className="text-left mt-4 md:mt-0">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Corporate Office</h3>
                    <p className="text-base">3rd Floor, Corenthum Tower, Sector 62, Noida, UP 201301</p>
                </div>
            </div>
        </div>

        {/* HORIZONTAL LINE SEPARATOR */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM SECTION: Other sections (Horizontal Line with Gaps) */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
          
          {/* Company Links */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-base">
                
                <li><Link to="/contact" className="hover:text-red-600 transition-colors">Contact Us</Link></li>
                <li><Link to="/book" className="hover:text-red-600 transition-colors">Book service</Link></li>
                <li><Link to="/policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-red-600 transition-colors">Term & Condition</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-base">
                <li className="flex items-center"><MailIcon className="h-4 w-4 mr-2" /> <a href="mailto:garagefixcare@gmail.com" className="hover:text-red-600 transition-colors">garagefixcare@gmail.com</a></li>
                <li className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2" /> <a href="tel:+919318478483" className="hover:text-red-600 transition-colors">+91 9318478483</a></li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> <a href="https://garagefixcare.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">https://garagefixcare.com</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Social Media</h3>
            <ul className="space-y-2 text-base">
                <li className="flex items-center"><Facebook className="h-6 w-6 mr-2" /><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Facebook</a></li>
                <li className="flex items-center"><Twitter className="h-6 w-6 mr-2" /><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Twitter</a></li>
                <li className="flex items-center"><Instagram className="h-6 w-6 mr-2" /><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Instagram</a></li>
                <li className="flex items-center"><Linkedin className="h-6 w-6 mr-2" /><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Linkedin</a></li>
                <li className="flex items-center"><Youtube className="h-6 w-6 mr-2" /><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Youtube</a></li>
            </ul>
          </div>

          {/* Available In */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Available In</h3>
            <ul className="space-y-2 text-base">
                <li><span className="text-red-600 text-lg mr-2">◆</span> Delhi</li>
                <li><span className="text-red-600 text-lg mr-2">◆</span> Noida</li>
                <li><span className="text-red-600 text-lg mr-2">◆</span> Greater Noida</li>
                <li><span className="text-red-600 text-lg mr-2">◆</span> Gurugram</li>
                <li><span className="text-red-600 text-lg mr-2">◆</span> Ghaziabad</li>
                <li><span className="text-red-600 text-lg mr-2">◆</span> Faridabad</li>
            </ul>
          </div>
          
          {/* Join Us */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Join Us</h3>
            <p className="text-base mb-4">Join us to get the best doorstep bike service at your location by experts.</p>
            <form onSubmit={handleJoinUsSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="tel"
                    placeholder="Phone Number*"
                    required
                    value={joinUsPhoneNumber}
                    onChange={(e) => setJoinUsPhoneNumber(e.target.value)}
                    className="px-4 py-2 w-full rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-red-600"
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                    Join
                </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-sm text-white">
            <p>Copyright 2022, GarageFixCare. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;