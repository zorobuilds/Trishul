import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  CloudRain, 
  Eye, 
  Navigation, 
  FilePlus, 
  Layers, 
  Cpu, 
  WifiOff, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  BellRing,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { NER_STATES_DATA, LIVE_BULLETINS, AI_METRICS_SUMMARY } from '../data/nerData';

export const Home = () => {
  const [selectedState, setSelectedState] = useState(NER_STATES_DATA[0]);
  const [filterThreat, setFilterThreat] = useState('ALL');

  const filteredStates = NER_STATES_DATA.filter(state => {
    if (filterThreat === 'ALL') return true;
    return state.threatLevel === filterThreat;
  });

  const getThreatBadge = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'MODERATE':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 pt-10 pb-16">
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>NER MULTI-HAZARD EARLY WARNING INITIATIVE (SIH 2026)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                AI Early Warning & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  Landslide Intelligence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Protecting life, highways, and isolated mountain communities across North East India with real-time IMD rainfall fusion, slope-stability sensor telemetries, and offline-first crowdsourced incident reporting.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/report"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>Report Hazard / Crack</span>
                </Link>

                <Link
                  to="/safe-routes"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white hover:bg-slate-800/80 transition-all"
                >
                  <Navigation className="w-5 h-5 text-cyan-400" />
                  <span>Check Road Passes</span>
                </Link>

                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-red-950/40 border border-red-800/50 hover:bg-red-900/40 text-red-300 transition-all"
                >
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <span>Command Center</span>
                </Link>
              </div>

              {/* Feature Highlights Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>GIS Heatmaps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Offline PWA Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>IMD Radar Fusion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Multilingual Alert</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Live Telemetry Matrix Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span className="font-bold text-white tracking-wide">Live NER Risk Telemetry</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    REALTIME ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Active IoT Sensors</span>
                    <span className="text-2xl font-black text-white">{AI_METRICS_SUMMARY.totalSensorsActive}</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Piezo, Rain, Inclinometers</span>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">High Risk Sectors</span>
                    <span className="text-2xl font-black text-red-400">{AI_METRICS_SUMMARY.highRiskSectors}</span>
                    <span className="text-[10px] text-red-300/80 block mt-0.5">Under Active Surveillance</span>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Response Teams Active</span>
                    <span className="text-2xl font-black text-cyan-400">{AI_METRICS_SUMMARY.restorationTeamsActive}</span>
                    <span className="text-[10px] text-cyan-300/80 block mt-0.5">BRO / SDRF Taskforces</span>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">AI Prediction Score</span>
                    <span className="text-2xl font-black text-emerald-400">{AI_METRICS_SUMMARY.aiPredictionAccuracy}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Antecedent Rain Index</span>
                  </div>
                </div>

                <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Highest Threat: <strong>East Sikkim (NH-10 Sector)</strong></span>
                  </div>
                  <Link to="/safe-routes" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5">
                    Map <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REGIONAL THREAT MATRIX (8 NER STATES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-1">
              <MapPin className="w-4 h-4" /> State-By-State Disaster Watch
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              North Eastern States Threat Matrix
            </h2>
            <p className="text-sm text-slate-400">
              Click any state card to inspect critical highway corridors, rainfall, and soil saturation telemetry.
            </p>
          </div>

          {/* Threat Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterThreat(lvl)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterThreat === lvl
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* State Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {filteredStates.map((state) => {
            const isSelected = selectedState.id === state.id;
            return (
              <div
                key={state.id}
                onClick={() => setSelectedState(state)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-white">{state.name}</h3>
                    <p className="text-xs text-slate-400">{state.capital}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getThreatBadge(state.threatLevel)}`}>
                    {state.threatLevel}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1"><CloudRain className="w-3.5 h-3.5 text-cyan-400" /> Rain 24h:</span>
                    <span className="font-mono font-bold text-slate-200">{state.rainfall24h}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-amber-400" /> Soil Saturation:</span>
                    <span className="font-mono font-bold text-slate-200">{state.soilSaturation}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Active Slides:</span>
                    <span className="font-mono font-bold text-red-400">{state.activeLandslides} Events</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected State Detailed Drawer Card */}
        {selectedState && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    {selectedState.name} Sector Focus
                  </h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getThreatBadge(selectedState.threatLevel)}`}>
                    {selectedState.threatLevel} SUSCEPTIBILITY
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedState.statusSummary}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-slate-400 font-semibold self-center">Vulnerable Corridors:</span>
                  {selectedState.vulnerablePasses.map((pass, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                      🚧 {pass}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  to="/safe-routes"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Inspect Road Corridors</span>
                </Link>
                <Link
                  to="/report"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                >
                  <FilePlus className="w-4 h-4 text-cyan-400" />
                  <span>Submit Field Incident in {selectedState.name}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. LIVE VERIFIED INCIDENT BULLETINS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <BellRing className="w-4 h-4 text-red-400 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live Verified Incident Bulletins</h3>
                <p className="text-xs text-slate-400">Crowdsourced alerts confirmed by Field Disaster Officers</p>
              </div>
            </div>
            <Link to="/report" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              Submit Report <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIVE_BULLETINS.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-cyan-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {item.location}
                    </span>
                    <span className="text-slate-500">{item.time}</span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Field Verified
                  </span>
                  <span className="text-slate-500 uppercase font-mono">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY ARCHITECTURAL PILLARS (Why Trishul Wins in NER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-widest">
            ENGINEERED FOR EXTREME TERRAINS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            How Trishul Solves NER Disaster Blindspots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Antecedent Rainfall Index</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates cumulative 72-hour soil saturation thresholds with terrain slope angles to predict sudden mudslides up to 6 hours before they happen.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero-Connectivity Offline PWA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When landslides sever cellular towers, field officers and citizens can still log GPS-tagged crack reports locally; data auto-syncs when signal recovers.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Isolated Village Resilience Index</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Graph-theory routing computes whether mountain hamlets risk total food and medical cutoff when a single bridge or valley pass fails.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
