
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-4 mt-auto shadow-inner">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
      <p className="text-sm flex items-center gap-1">
        © 2025 LMS Portal. Made with <Heart size={16} className="text-red-500 animate-pulse" /> by Monika
      </p>
      <div className="flex gap-4">
        <a
          href="#"
          className="hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          🌐 Website
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          📧 Contact
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          📄 Privacy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
