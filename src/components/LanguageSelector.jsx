import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, GripVertical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ mode = 'header' }) {
  const { currentLang, setCurrentLang, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Position state for floating draggable mode
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('trishul_lang_pos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing stored position:', e);
      }
    }
    // Default position: bottom-right float area
    return { x: window.innerWidth - 180, y: window.innerHeight - 100 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0, moved: false });

  // Bound position within visible viewport
  const boundPosition = (x, y) => {
    const margin = 12;
    const elementWidth = 140;
    const elementHeight = 44;
    const maxX = Math.max(margin, window.innerWidth - elementWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - elementHeight - margin);

    return {
      x: Math.min(Math.max(margin, x), maxX),
      y: Math.min(Math.max(margin, y), maxY)
    };
  };

  // Adjust on window resize to ensure element stays on screen
  useEffect(() => {
    const handleResize = () => {
      if (mode === 'floating') {
        setPosition((prev) => boundPosition(prev.x, prev.y));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode]);

  // Persist position when updated
  useEffect(() => {
    if (mode === 'floating') {
      localStorage.setItem('trishul_lang_pos', JSON.stringify(position));
    }
  }, [position, mode]);

  // Outside click listener to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Pointer event handlers for smooth dragging
  const handlePointerDown = (e) => {
    if (mode !== 'floating') return;
    // Capture pointer to ensure smooth drag tracking even when pointer leaves target
    if (e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback gracefully
      }
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
      moved: false
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || mode !== 'floating') return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.hypot(dx, dy) > 5) {
      dragStartRef.current.moved = true;
    }

    const newX = dragStartRef.current.posX + dx;
    const newY = dragStartRef.current.posY + dy;
    setPosition(boundPosition(newX, newY));
  };

  const handlePointerUp = (e) => {
    if (mode !== 'floating') return;
    if (e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Fallback
      }
    }
    setIsDragging(false);
  };

  const handleToggleOpen = (e) => {
    e.stopPropagation();
    // If we moved during pointerdown/move, don't toggle open/close
    if (dragStartRef.current.moved) {
      dragStartRef.current.moved = false;
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectLanguage = (code) => {
    setCurrentLang(code);
    setIsOpen(false);
  };

  const currentObj = languages.find((l) => l.code === currentLang) || languages[0];

  // Render HEADER Embedded Mode
  if (mode === 'header') {
    return (
      <div className="relative inline-block text-left" ref={containerRef}>
        <button
          type="button"
          onClick={handleToggleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-sm cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Select Language"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{currentObj.code}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-1.5 z-50 animate-fadeIn overflow-hidden">
            <div className="px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
              Select Language
            </div>
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.nativeName} ({lang.code})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Render FLOATING Draggable Mode
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        touchAction: 'none'
      }}
      className={`select-none transition-shadow ${isDragging ? 'cursor-grabbing scale-105 shadow-2xl' : 'cursor-grab'}`}
    >
      <div className="relative">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleToggleOpen}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border-2 border-teal-500/60 dark:border-teal-400/60 shadow-xl backdrop-blur-md text-slate-800 dark:text-slate-100 text-xs font-bold transition-transform hover:scale-105"
        >
          <GripVertical className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 cursor-grab" />
          <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse" />
          <span>{currentObj.code}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute right-0 bottom-12 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-fadeIn overflow-hidden">
            <div className="px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
              Select Language (Draggable)
            </div>
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.nativeName} ({lang.code})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
