import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4"></div>
        <div>
          <p className=" text-2xl homepage-title text-white p-1">Orizon.</p>
        </div>
      </div>
      <p className="font-['Inter'] text-gray-400">
        © 2025 GreenTravel. Tutti i diritti riservati.
      </p>
      <p className="font-['Inter'] text-gray-500 text-sm mt-2">
        Created by J.Pier
      </p>
    </footer>
  );
};

export default Footer;
