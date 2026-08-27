import React from 'react';
import { Shield, PhoneCall, AlertOctagon, HeartHandshake } from 'lucide-react';
// es file mai bs niche ka terms & cond hai or kuch nhi , footer namse hi samaj leta yar
export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-10 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white tracking-wider">PROJECT TRISHUL</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven multi-hazard early warning and real-time landslide risk intelligence system tailored for the fragile terrain of North Eastern India.
            </p>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" /> Emergency Helplines
            </h4>
            <ul className="text-xs space-y-1.5">
              <li className="flex justify-between"><span>NDRF Control Room:</span> <span className="font-mono text-cyan-400 font-semibold">1078 / 011-24363260</span></li>
              <li className="flex justify-between"><span>SDRF Assam/NER:</span> <span className="font-mono text-cyan-400 font-semibold">1070 / 1077</span></li>
              <li className="flex justify-between"><span>Police / Medical SOS:</span> <span className="font-mono text-cyan-400 font-semibold">112</span></li>
              <li className="flex justify-between"><span>BRO Highway Support:</span> <span className="font-mono text-cyan-400 font-semibold">1800-180-2222</span></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-cyan-400" /> NER States Monitored
            </h4>
            <div className="grid grid-cols-2 text-xs gap-1 text-slate-400">
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
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> Stakeholder Integration
            </h4>
            <p className="text-xs text-slate-400">
              Designed for integration with NDMA, Bhuvan/ISRO, IMD Weather Radar Feeds, and Border Roads Organisation (BRO).
            </p>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© 2026 Project Trishul - Smart India Hackathon (SIH) Prototype.</p>
          <div className="flex gap-4">
            <span className="text-cyan-500/80">Low-Bandwidth Optimized</span>
            <span>•</span>
            <span className="text-emerald-500/80">PWA Offline Capable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
