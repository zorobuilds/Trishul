// ThemeToggle.jsx - toggles dark/light mode and persists preference
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Default to dark mode if not specified
    if (saved) return saved === 'dark';
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
        isDark
          ? 'bg-slate-900/90 border-slate-700 hover:border-accent text-accent hover:bg-slate-800'
          : 'bg-white/90 border-teal-200 hover:border-teal-400 text-teal-900 hover:bg-teal-50'
      }`}
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-teal-800 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}


