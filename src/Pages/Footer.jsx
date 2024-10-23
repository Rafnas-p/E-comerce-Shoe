import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter your email');

  const handleFocus = () => {
    setPlaceholder(''); // Clear placeholder on focus
  };

  const handleBlur = () => {
    if (!email) {
      setPlaceholder('Enter your email'); // Reset placeholder if input is empty
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log('Subscribed with email:', email);
    setEmail(''); // Clear the input after submission
    setPlaceholder('Thank you for subscribing!'); // Optionally show a thank-you message
  };

  return (
    <footer className="footer bg-gray-800 text-white py-4 md:py-6">
      <div className="footer-content container mx-auto flex flex-col md:flex-row justify-between items-start px-4">
        {/* Quick Links Section */}
        <div className="footer-section links mb-4 md:mb-0">
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="footer-links space-y-1">
            <li><Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
            <li><Link to="/support" className="hover:text-gray-300">Support</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section social mb-4 md:mb-0">
          <h2 className="text-lg font-bold mb-2">Follow Us</h2>
          <ul className="social-links space-y-1">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Twitter</a></li>
            <li><a href="https://www.instagram.com/invites/contact/?igsh=16k1u9lo3tp0s&utm_content=p26ds9s" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">LinkedIn</a></li>
          </ul>
        </div>

        
        <div className="footer-section newsletter w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Newsletter</h2>
          <p className="mb-2">Stay updated with our latest products and exclusive offers!</p>
          <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              required
              className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-gray-600 mb-2 sm:mb-0 sm:mr-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom text-center mt-4">
        <p className="text-sm">© 2024 Wano Shops. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
