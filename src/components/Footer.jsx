import { FaLinkedin, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Footer() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    domainOfInternship: '',
    state: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    alert('Thank you for contacting us! We will get back to you soon.');
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      domainOfInternship: '',
      state: '',
      message: ''
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Contact Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fill the form to contact us
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto border border-gray-600 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="domainOfInternship"
                    placeholder="Domain of Internship"
                    value={formData.domainOfInternship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 text-gray-900 placeholder-gray-500 resize-vertical"
                ></textarea>
              </div>
              
              <div className="text-left">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-teal-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Original Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <img src={logo} alt="INLIGHN TECH" className="h-16 w-auto" />
            <p className="text-gray-300 text-sm leading-relaxed">
              At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Menu</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/programs" className="text-gray-300 hover:text-white transition-colors">Programs</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-white transition-colors">Login To Portal</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Term & Conditions</a></li>
              <li><a href="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ's</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Corporate Office- Office No: VO-301, WeWork Prestige Central, Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-gray-400" />
                <a href="tel:+919368842663" className="text-gray-300 hover:text-white transition-colors">
                  +91 9368842663
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a href="mailto:info@inlighntech.com" className="text-gray-300 hover:text-white transition-colors">
                  info@inlighntech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          Copyright 2025 INLIGHN TECH | All Rights Reserved | Design By Gdscreatives
        </div>
      </div>
    </footer>
  );
}