import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Activity,
  MapPin,
  Radio,
  LifeBuoy,
  FileText,
  Menu,
  X,
  Globe,
  AlertTriangle
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const location = useLocation();

  const navLinks = [
    { name: 'Live Overview', path: '/' },
    { name: 'Citizen & Field Report', path: '/report' },
    { name: 'Roads & Safe Route', path: '/safe-routes' },
    { name: 'Command Center (Admin)', path: '/admin' },
  ];

  const languages = ['EN', 'HI (हिंदी)', 'AS (অসমীয়া)', 'BN (বাংলা)', 'MZ (Mizo)'];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-primary/30">
      {/* Emergency Alert Marquee Header */}
      <div className="bg-red-950/60 border-b border-red-800/40 px-4 py-1 text-xs text-red-300 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-bold tracking-wider uppercase text-red-200">LIVE ADVISORY:</span>
          <span>Heavy rainfall alert in East Sikkim & Dima Hasao (Assam). High landslide susceptibility on NH-29.</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-red-400">
          <span className="flex items-center gap-1 font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" /> NER Sensor Mesh: ACTIVE
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">TRISHUL</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-semibold">NER AI</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">Landslide & Disaster Early Warning System</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang}</span>
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLang(lang.split(' ')[0])}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Quick SOS Trigger */}
            <Link
              to="/report?sos=true"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span>SOS DISTRESS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/report?sos=true"
              className="px-2.5 py-1 text-xs font-bold bg-red-600 text-white rounded-md"
            >
              SOS
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs text-slate-400">Language:</span>
            <div className="flex gap-2">
              {['EN', 'HI', 'AS', 'BN'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs rounded ${lang === l ? 'bg-primary text-white' : 'bg-slate-900 text-slate-300'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
