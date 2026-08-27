import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Layers, 
  AlertOctagon, 
  Sparkles, 
  Search, 
  Car, 
  Compass, 
  Mountain, 
  Truck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NER_HIGHWAY_CORRIDORS, ISOLATED_VILLAGES_RESILIENCE } from '../data/corridorsData';

export const SafeRoutes = () => {
  const [selectedCorridor, setSelectedCorridor] = useState(NER_HIGHWAY_CORRIDORS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Interactive Route Planner State
  const [origin, setOrigin] = useState('Siliguri Junction');
  const [destination, setDestination] = useState('Gangtok, Sikkim');
  const [calculatedRoute, setCalculatedRoute] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const filteredCorridors = NER_HIGHWAY_CORRIDORS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'BLOCKED':
        return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
      case 'RESTRICTED':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'OPEN_CAUTION':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  const handleCalculateRoute = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setCalculatedRoute({
        origin,
        destination,
        primaryHighway: 'NH-10 (Direct corridor)',
        primaryStatus: 'BLOCKED (Mile 29 Mudflow)',
        recommendedSafeRoute: 'Via Melli - Jorethang - Namchi Bypass',
        distance: '148 km',
        estimatedTime: '4 hrs 50 mins (+55 min detour)',
        riskGrade: 'LOW-RISK (Avoids river erosion zone)',
        advisory: 'Paved, stable gradient. Night movement permitted for light motor vehicles.'
      });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>NER HIGHWAY PASSES & INTELLIGENT DETOUR ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mountain Road Connectivity & Safe Route Navigator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Real-time status of critical North Eastern national highways, BRO clearance operations, AI slope risk scores, and automatic bypass recommendations for travelers and supply convoys.
          </p>
        </div>
      </div>

      {/* 2. Interactive AI Safe Route Calculator */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">AI Evacuation & Safe Bypass Route Finder</h2>
        </div>

        <form onSubmit={handleCalculateRoute} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Point (Origin)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Destination in NER</label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex items-end">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Computing Stable Slopes...' : 'Compute Safe Route'}</span>
            </button>
          </div>
        </form>

        {/* Calculated Result Card */}
        {calculatedRoute && (
          <div className="mt-6 p-5 bg-slate-950/80 border border-emerald-500/40 rounded-xl space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-base">Recommended Safe Corridor: {calculatedRoute.recommendedSafeRoute}</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {calculatedRoute.riskGrade}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Direct Pass Hazard:</span>
                <span className="text-red-400 font-bold font-mono">{calculatedRoute.primaryHighway} - {calculatedRoute.primaryStatus}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Detour Distance & ETA:</span>
                <span className="text-cyan-300 font-bold font-mono">{calculatedRoute.distance} · {calculatedRoute.estimatedTime}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Terrain Clearance:</span>
                <span className="text-slate-200">{calculatedRoute.advisory}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. National Highway Corridors Status Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-cyan-400" />
              Strategic Highway Corridors Status
            </h2>
            <p className="text-xs text-slate-400">Live BRO / SDRF mountain road clearance telemetry</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search highway or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {['ALL', 'BLOCKED', 'RESTRICTED', 'OPEN_CAUTION', 'OPEN_CLEAR'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
                    filterStatus === st ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Highway Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredCorridors.map((corridor) => {
            const isSelected = selectedCorridor.id === corridor.id;
            return (
              <div
                key={corridor.id}
                onClick={() => setSelectedCorridor(corridor)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-400">{corridor.state}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(corridor.status)}`}>
                      {corridor.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{corridor.name}</h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">AI Landslide Risk:</span>
                      <span className="font-mono font-bold text-red-400">{corridor.riskScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Corridor Length:</span>
                      <span className="font-mono text-slate-300">{corridor.lengthKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clearance Status:</span>
                      <span className="text-cyan-400 font-medium truncate max-w-[170px]">{corridor.estimatedClearance}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Updated: {corridor.lastUpdated}</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                    View Detours <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Corridor Detailed Inspection Drawer */}
        {selectedCorridor && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">{selectedCorridor.state} Highway Sector</span>
                <h3 className="text-xl font-bold text-white">{selectedCorridor.name}</h3>
              </div>
              <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(selectedCorridor.status)}`}>
                STATUS: {selectedCorridor.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vulnerable Sections & Clearance */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Active Hazard Bottlenecks
                </h4>
                <div className="space-y-1.5">
                  {selectedCorridor.vulnerableSections.map((sec, i) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300 font-mono">
                      <span>🚧 {sec}</span>
                      <span className="text-red-400 text-[10px] uppercase font-bold">Slope Failure</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
                  <span className="text-slate-500 font-bold block mb-1">Restoration Plan:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedCorridor.estimatedClearance}</p>
                </div>
              </div>

              {/* Alternative Bypass Corridors */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-cyan-400" /> Verified Alternative Bypass Routes
                </h4>
                {selectedCorridor.alternativeRoutes.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCorridor.alternativeRoutes.map((alt, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{alt.name}</span>
                          <span className="text-cyan-400 font-mono text-[11px]">{alt.delayMin}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{alt.roadCondition}</p>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                          ✓ {alt.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-center">
                    No bypass required. Main corridor is operating normally.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Isolated Mountain Village Cutoff Risk (Graph Resilience) */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mountain className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Isolated Village Cutoff Vulnerability Tracker</h3>
              <p className="text-xs text-slate-400">SIH Resilience Metric: Evaluates remote hamlets at risk of total isolation</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
            GRAPH RESILIENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ISOLATED_VILLAGES_RESILIENCE.map((item) => (
            <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{item.village}</h4>
                  <span className="text-[11px] text-slate-500 font-mono">{item.district}, {item.state}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                  {item.riskOfIsolation}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-400 pt-1">
                <div><span className="text-slate-500">Population:</span> <strong className="text-slate-200">{item.population.toLocaleString()} citizens</strong></div>
                <div><span className="text-slate-500">Access Link:</span> <span className="text-amber-300 font-mono">{item.primaryRoad}</span></div>
                <div><span className="text-slate-500">Lifeline:</span> <span className="text-slate-300">{item.lifelineStatus}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="text-slate-500">Emergency Rations:</span>
                <span className="text-emerald-400 font-bold font-mono">{item.emergencySuppliesDaysLeft} Days Buffer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
