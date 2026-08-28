import React from 'react';
import { Shield, PhoneCall, AlertOctagon, HeartHandshake } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-10 pb-8 text-slate-700 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-700 dark:bg-teal-600 flex items-center justify-center shadow-md">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-slate-900 dark:text-white tracking-wider text-base">PROJECT TRISHUL</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              AI-driven multi-hazard early warning and real-time landslide risk intelligence system tailored for the fragile terrain of North Eastern India.
            </p>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" /> Emergency Helplines
            </h4>
            <ul className="text-xs space-y-2">
              <li className="flex justify-between font-medium">
                <span className="text-slate-800 dark:text-slate-300">NDRF Control Room:</span>
                <span className="font-mono text-teal-800 dark:text-teal-400 font-bold">1078 / 011-24363260</span>
              </li>
              <li className="flex justify-between font-medium">
                <span className="text-slate-800 dark:text-slate-300">SDRF Assam/NER:</span>
                <span className="font-mono text-teal-800 dark:text-teal-400 font-bold">1070 / 1077</span>
              </li>
              <li className="flex justify-between font-medium">
                <span className="text-slate-800 dark:text-slate-300">Police / Medical SOS:</span>
                <span className="font-mono text-amber-700 dark:text-amber-400 font-extrabold">112</span>
              </li>
              <li className="flex justify-between font-medium">
                <span className="text-slate-800 dark:text-slate-300">BRO Highway Support:</span>
                <span className="font-mono text-teal-800 dark:text-teal-400 font-bold">1800-180-2222</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" /> NER States Monitored
            </h4>
            <div className="grid grid-cols-2 text-xs gap-1.5 text-slate-700 dark:text-slate-400 font-medium">
              <span>• Sikkim</span>
              <span>• Assam</span>
              <span>• Arunachal</span>
              <span>• Meghalaya</span>
              <span>• Nagaland</span>
              <span>• Manipur</span>
              <span>• Mizoram</span>
              <span>• Tripura</span>
            </div>
          </div>

          {/* Institutional Compliance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Stakeholder Integration
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              Designed for integration with NDMA, Bhuvan/ISRO, IMD Weather Radar Feeds, and Border Roads Organisation (BRO).
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 dark:text-slate-500 gap-2">
          <p className="font-medium">© 2026 Project Trishul - Smart India Hackathon (SIH) Prototype.</p>
          <div className="flex gap-4 font-bold">
            <span className="text-teal-800 dark:text-teal-400">Low-Bandwidth Optimized</span>
            <span>•</span>
            <span className="text-amber-700 dark:text-amber-400">PWA Offline Capable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
