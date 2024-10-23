import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} WanoSHOE. All rights reserved. |{' '}
        <a href="/terms" className="text-blue-400 hover:underline">
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
