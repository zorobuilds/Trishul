import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  CloudRain, 
  Navigation, 
  FilePlus, 
  Layers, 
  Cpu, 
  WifiOff, 
  CheckCircle2, 
  ChevronRight,
  BellRing,
  ArrowUpRight
} from 'lucide-react';
import { NER_STATES_DATA, LIVE_BULLETINS, AI_METRICS_SUMMARY } from '../data/nerData';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState(NER_STATES_DATA[0]);
  const [filterThreat, setFilterThreat] = useState('ALL');

  const filteredStates = NER_STATES_DATA.filter(state => {
    if (filterThreat === 'ALL') return true;
    return state.threatLevel === filterThreat;
  });

  const getThreatBadge = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/40 animate-pulse font-bold';
      case 'HIGH':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40 font-bold';
      case 'MODERATE':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40 font-bold';
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40 font-bold';
    }
  };

  return (
    <div className="space-y-12 pb-16 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 pt-10 pb-16 animate-fadeIn">
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30 text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-teal-600 dark:text-teal-400" />
                <span>NER MULTI-HAZARD EARLY WARNING INITIATIVE (SIH 2026)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                AI Early Warning & <br />
                <span className="inline-block text-teal-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-teal-300 dark:via-teal-400 dark:to-amber-400">
                  Landslide Intelligence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
                Protecting life, highways, and isolated mountain communities across North East India with real-time IMD rainfall fusion, slope-stability sensor telemetries, and offline-first crowdsourced incident reporting.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/report"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>{t('reportHazard')}</span>
                </Link>

                <Link
                  to="/safe-routes"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-white text-slate-800 border border-slate-300 hover:border-teal-500 hover:bg-teal-50 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
                >
                  <Navigation className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>{t('checkRoadPasses')}</span>
                </Link>

                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50 dark:hover:bg-red-900/40 transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span>{t('commandCenter')}</span>
                </Link>
              </div>

              {/* Feature Highlights Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-bold text-slate-800 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>GIS Heatmaps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>Offline PWA Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>IMD Radar Fusion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>Multilingual Alert</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Live Telemetry Matrix Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden animate-slideUp">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-pulse" />
                    <span className="font-extrabold text-slate-900 dark:text-white tracking-wide">Live NER Risk Telemetry</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">
                    REALTIME ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-400 block mb-1 font-semibold">Active IoT Sensors</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{AI_METRICS_SUMMARY.totalSensorsActive}</span>
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold block mt-0.5">Piezo, Rain, Inclinometers</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-400 block mb-1 font-semibold">High Risk Sectors</span>
                    <span className="text-2xl font-black text-red-600 dark:text-red-400">{AI_METRICS_SUMMARY.highRiskSectors}</span>
                    <span className="text-[10px] text-red-700 dark:text-red-300 font-bold block mt-0.5">Under Surveillance</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-400 block mb-1 font-semibold">Response Teams Active</span>
                    <span className="text-2xl font-black text-teal-800 dark:text-teal-300">{AI_METRICS_SUMMARY.restorationTeamsActive}</span>
                    <span className="text-[10px] text-teal-700 dark:text-teal-400 font-bold block mt-0.5">BRO / SDRF Taskforces</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-400 block mb-1 font-semibold">AI Prediction Score</span>
                    <span className="text-2xl font-black text-amber-700 dark:text-amber-400">{AI_METRICS_SUMMARY.aiPredictionAccuracy}</span>
                    <span className="text-[10px] text-slate-700 dark:text-slate-400 font-bold block mt-0.5">Antecedent Rain Index</span>
                  </div>
                </div>

                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-red-900 dark:text-red-300 font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <span>Highest Threat: <strong>East Sikkim (NH-10 Sector)</strong></span>
                  </div>
                  <Link to="/safe-routes" className="text-xs text-teal-800 dark:text-teal-300 hover:text-teal-900 font-bold flex items-center gap-0.5">
                    Map <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REGIONAL THREAT MATRIX (8 NER STATES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-slideUp">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold tracking-wider uppercase mb-1">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" /> State-By-State Disaster Watch
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('threatMatrix')}
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
              Click any state card to inspect critical highway corridors, rainfall, and soil saturation telemetry.
            </p>
          </div>

          {/* Threat Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilterThreat(lvl)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filterThreat === lvl
                    ? 'bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950'
                    : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
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
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden animate-fadeIn ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/90 border-teal-600 dark:border-teal-400 shadow-lg shadow-teal-600/10 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{state.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{state.capital}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getThreatBadge(state.threatLevel)}`}>
                    {state.threatLevel}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-700 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><CloudRain className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Rain 24h:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-200">{state.rainfall24h}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" /> Soil Saturation:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-200">{state.soilSaturation}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-500" /> Active Slides:</span>
                    <span className="font-mono font-extrabold text-red-600 dark:text-red-400">{state.activeLandslides} Events</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected State Detailed Drawer Card */}
        {selectedState && (
          <div className="bg-white dark:bg-slate-900 border border-teal-500/30 rounded-2xl p-6 shadow-xl animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    {selectedState.name} Sector Focus
                  </h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${getThreatBadge(selectedState.threatLevel)}`}>
                    {selectedState.threatLevel} SUSCEPTIBILITY
                  </span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedState.statusSummary}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-slate-700 dark:text-slate-400 font-bold self-center">Vulnerable Corridors:</span>
                  {selectedState.vulnerablePasses.map((pass, i) => (
                    <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-teal-900 dark:text-teal-300 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold shadow-sm">
                      🚧 {pass}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  to="/safe-routes"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Inspect Road Corridors</span>
                </Link>
                <Link
                  to="/report"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all shadow-sm cursor-pointer"
                >
                  <FilePlus className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                  <span>Submit Field Incident in {selectedState.name}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. LIVE VERIFIED INCIDENT BULLETINS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 flex items-center justify-center">
                <BellRing className="w-4 h-4 text-red-600 dark:text-red-400 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{t('liveBulletins')}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Crowdsourced alerts confirmed by Field Disaster Officers</p>
              </div>
            </div>
            <Link to="/report" className="text-xs text-teal-800 dark:text-teal-300 hover:text-teal-900 font-extrabold flex items-center gap-1">
              Submit Report <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIVE_BULLETINS.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-teal-500 dark:hover:border-teal-500/40 transition-all flex flex-col justify-between shadow-sm animate-fadeIn"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-teal-800 dark:text-teal-300 font-extrabold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {item.location}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{item.time}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed mb-3 font-medium">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-900 text-[11px]">
                  <span className="text-emerald-800 dark:text-emerald-400 flex items-center gap-1 font-extrabold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Field Verified
                  </span>
                  <span className="text-amber-700 dark:text-amber-400 uppercase font-mono font-black">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono text-teal-800 dark:text-teal-400 uppercase font-black tracking-widest">
            ENGINEERED FOR EXTREME TERRAINS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            How Trishul Solves NER Disaster Blindspots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-teal-500 dark:hover:border-teal-500/40 transition-colors shadow-sm animate-fadeIn">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-teal-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">AI Antecedent Rainfall Index</h3>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              Calculates cumulative 72-hour soil saturation thresholds with terrain slope angles to predict sudden mudslides up to 6 hours before they happen.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500 dark:hover:border-amber-500/40 transition-colors shadow-sm animate-fadeIn">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Zero-Connectivity Offline PWA</h3>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              When landslides sever cellular towers, field officers and citizens can still log GPS-tagged crack reports locally; data auto-syncs when signal recovers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 hover:border-purple-500 dark:hover:border-purple-500/40 transition-colors shadow-sm animate-fadeIn">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/30 flex items-center justify-center text-purple-800 dark:text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Isolated Village Resilience Index</h3>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              Graph-theory routing computes whether mountain hamlets risk total food and medical cutoff when a single bridge or valley pass fails.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
