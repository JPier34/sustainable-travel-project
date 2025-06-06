import React from "react";
import { Globe } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">ORIZON</span>
        </div>
        <p className="text-gray-400">
          © 2025 GreenTravel. Tutti i diritti riservati.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Created by JPier - Sustainable Travel Platform
        </p>
      </div>
    </footer>
  );
};

export default Footer;
