import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Radio,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('liveOverview'), path: '/' },
    { name: t('fieldReport'), path: '/report' },
    { name: t('safeRoutes'), path: '/safe-routes' },
    { name: t('commandAdmin'), path: '/admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Emergency Advisory Marquee Bar */}
      <div className="bg-red-100 dark:bg-red-950/80 border-b border-red-200 dark:border-red-800/50 px-4 py-1.5 text-xs text-red-950 dark:text-red-200 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
          </span>
          <span className="font-extrabold tracking-wider uppercase text-red-700 dark:text-red-200">{t('liveAdvisory')}</span>
          <span className="font-semibold text-slate-800 dark:text-red-100 truncate max-w-[280px] sm:max-w-none">
            {t('advisoryText')}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-red-800 dark:text-red-300 font-bold">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-600 dark:text-red-400" /> {t('sensorMesh')}
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-gradient-to-tr dark:from-teal-600 dark:to-cyan-500 flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">TRISHUL</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/30 font-mono font-bold">NER AI</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">Landslide & Disaster Early Warning System</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-800 border border-teal-300 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30 font-bold shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSelector mode="header" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Quick SOS Trigger */}
            <Link
              to="/report?sos=true"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 transition-all hover:scale-105"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span>{t('sosDistress')}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/report?sos=true"
              className="px-3 py-1.5 text-xs font-extrabold bg-red-600 text-white rounded-lg shadow-md"
            >
              SOS
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive(link.path)
                  ? 'bg-teal-50 text-teal-800 border border-teal-300 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-500/30 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Select Language:</span>
            <LanguageSelector mode="header" />
          </div>
        </div>
      )}
    </header>
  );
};
