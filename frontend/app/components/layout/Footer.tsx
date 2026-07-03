"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Shield,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Home,
  Compass,
  BarChart3,
  Info,
} from "lucide-react";

const Footer = () => {
  const mainLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "How It Works", path: "/how-it-works", icon: Compass },
    { name: "Impact", path: "/impact", icon: BarChart3 },
    { name: "About", path: "/about", icon: Info },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy", icon: Shield },
    { name: "Terms of Service", path: "/terms", icon: FileText },
    { name: "Contact Support", path: "/contact", icon: HelpCircle },
  ];

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Top Grid Panel - Clean sequential allocation (4 + 2 + 3 + 3 = 12 columns total) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-200">
          {/* Column 1: Brand Presentation (4/12) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-block transition-transform active:scale-98"
            >
              <Image
                src="/logo.png"
                alt="SewaSetu Logo"
                width={120}
                height={38}
                className="h-auto w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
              SewaSetu is a digital bridge transforming excess into opportunity.
              We securely connect verified donors with dedicated NGOs to support
              local communities.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/60">
              <span>Platform Status:</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-600">Fully Operational</span>
            </div>
          </div>

          {/* Column 2: Explore Navigation (2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Legal & Support (3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Legal & Support
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Get in Touch (3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a
                  href="mailto:support@sewasetu.org"
                  className="hover:text-emerald-600 transition break-all"
                >
                  support@sewasetu.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="leading-tight text-gray-500 font-medium">
                  Connecting Communities across Cities, Nepal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-gray-400 tracking-tight text-center sm:text-left">
            © {new Date().getFullYear()} SewaSetu Foundation. All rights
            reserved.
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-gray-400 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-xs">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 animate-pulse" />
            <span className="text-gray-600 font-extrabold">
              for local impact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
