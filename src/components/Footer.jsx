// Footer.tsx
import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Logo and Copyright */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/25">
                <ZapIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FitAI Pro
              </span>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              © {new Date().getFullYear()} FitAI Pro - All rights reserved
            </p>
            <p className="text-gray-400 text-sm">
              Revolutionizing fitness with cutting-edge AI technology
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Product</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  About
                </Link>
                <Link href="/features" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Features
                </Link>
                <Link href="/pricing" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Support</h3>
              <div className="space-y-3">
                <Link href="/help" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Help
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Contact
                </Link>
                <Link href="/terms" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Terms
                </Link>
                <Link href="/privacy" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Privacy
                </Link>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-start lg:items-end space-y-4">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-500/25" />
              <span className="text-sm font-medium text-gray-300">SYSTEM OPERATIONAL</span>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>AI Models: Online</p>
              <p>Response Time: &lt;200ms</p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;