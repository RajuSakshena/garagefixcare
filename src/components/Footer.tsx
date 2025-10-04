
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Phone as PhoneIcon, Mail as MailIcon, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import logo41 from "../images/logo44.svg";

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
      setJoinUsPhoneNumber('');
    } catch (error) {
      alert('Failed to submit. Please try again.');
      console.error('Error submitting join us form:', error);
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-300 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* TOP SECTION: Logo & Corporate Office */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row items-center space-x-2 sm:space-x-4">
            <img src={logo41} alt="Garage Fix Care" className="w-32 sm:w-36 h-16 sm:h-20 bg-sky-100 rounded-b-2xl" />
            <div className="text-left mt-2 sm:mt-0">
              <h3 className="text-lg sm:text-xl font-bold text-white">Corporate Office</h3>
              <p className="text-sm sm:text-base">3rd Floor, Corenthum Tower, Sector 62, Noida, UP 201301</p>
            </div>
          </div>
        </div>

        {/* HORIZONTAL LINE SEPARATOR */}
        <div className="border-t border-gray-800 my-2 sm:my-4"></div>

        {/* BOTTOM SECTION: Other sections */}
        <div className="flex flex-col md:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          
          {/* Company Links */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Company</h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li><Link to="/contact" className="hover:text-red-600">Contact Us</Link></li>
              <li><Link to="/book" className="hover:text-red-600">Book Service</Link></li>
              <li><Link to="/policy" className="hover:text-red-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-600">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Contact</h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li className="flex items-center"><MailIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> <a href="mailto:garagefixcare@gmail.com" className="hover:text-red-600">garagefixcare@gmail.com</a></li>
              <li className="flex items-center"><PhoneIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> <a href="tel:+919318478483" className="hover:text-red-600">+91 9318478483</a></li>
              <li className="flex items-center"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> <a href="https://garagefixcare.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">garagefixcare.com</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Social Media</h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li className="flex items-center"><Facebook className="h-4 w-4 mr-1" /><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Facebook</a></li>
              <li className="flex items-center"><Twitter className="h-4 w-4 mr-1" /><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Twitter</a></li>
              <li className="flex items-center"><Instagram className="h-4 w-4 mr-1" /><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">Instagram</a></li>
              <li className="flex items-center"><Linkedin className="h-4 w-4 mr-1" /><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">LinkedIn</a></li>
              <li className="flex items-center"><Youtube className="h-4 w-4 mr-1" /><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">YouTube</a></li>
            </ul>
          </div>

          {/* Available In */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Available In</h3>
            <ul className="space-y-1 text-sm sm:text-base">
              <li><span className="text-red-600 text-base mr-1">◆</span> Delhi</li>
              <li><span className="text-red-600 text-base mr-1">◆</span> Noida</li>
              <li><span className="text-red-600 text-base mr-1">◆</span> Greater Noida</li>
              <li><span className="text-red-600 text-base mr-1">◆</span> Gurugram</li>
              <li><span className="text-red-600 text-base mr-1">◆</span> Ghaziabad</li>
              <li><span className="text-red-600 text-base mr-1">◆</span> Faridabad</li>
            </ul>
          </div>
          
          {/* Join Us */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Join Us</h3>
            <p className="text-sm mb-2">Join for expert bike service at your location.</p>
            <form onSubmit={handleJoinUsSubmit} className="flex flex-col sm:flex-row gap-1">
              <input
                type="tel"
                placeholder="Phone Number*"
                required
                value={joinUsPhoneNumber}
                onChange={(e) => setJoinUsPhoneNumber(e.target.value)}
                className="px-2 py-1 w-full rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-red-600 text-sm"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 text-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-2 pt-2 text-center text-xs sm:text-sm text-white">
          <p>Copyright 2022, GarageFixCare. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
