import { Link } from "wouter";
import { TrendingUp, Twitter, Linkedin, Youtube, Send } from "lucide-react";

const quickLinks = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/blogs", label: "Finance Blogs" },
  { href: "/", label: "Market Data" },
  { href: "/admin", label: "Premium Plans" },
  { href: "/", label: "About Us" },
];

const resources = [
  { href: "/", label: "Investment Guide" },
  { href: "/", label: "Tax Calculator" },
  { href: "/", label: "SIP Calculator" },
  { href: "/", label: "API Documentation" },
  { href: "/", label: "Help Center" },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Youtube, label: "YouTube" },
  { href: "#", icon: Send, label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-navy-700 to-navy-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">FinanceAI</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Empowering Indian investors with AI-driven financial insights, personalized advice, and smart tools for wealth creation. Start your financial journey with confidence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-navy-600 hover:bg-navy-700 p-3 rounded-lg transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FinanceAI. All rights reserved. Made with ❤️ for Indian investors.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
