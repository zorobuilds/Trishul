import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Compass, 
  Mountain, 
  Truck, 
  ChevronRight
} from 'lucide-react';

export const SafeRoutes = () => {
  const [corridors, setCorridors] = useState([]);
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [villages, setVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Interactive Route Planner State
  const [origin, setOrigin] = useState('Siliguri Junction');
  const [destination, setDestination] = useState('Gangtok, Sikkim');
  const [calculatedRoute, setCalculatedRoute] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch highway corridors and villages on mount
  useEffect(() => {
    const fetchCorridors = async () => {
      try {
        const res = await fetch('https://tr-0946e6036e9a417eadb3b8b3b0a3b88d.ecs.eu-north-1.on.aws/api/corridors');
        const data = await res.json();
        if (data.success && data.corridors.length > 0) {
          setCorridors(data.corridors);
          setSelectedCorridor(data.corridors[0]);
        }
      } catch (err) {
        console.error('Error fetching corridors:', err);
      }
    };

    const fetchVillages = async () => {
      try {
        const res = await fetch('https://tr-0946e6036e9a417eadb3b8b3b0a3b88d.ecs.eu-north-1.on.aws/api/villages');
        const data = await res.json();
        if (data.success) {
          setVillages(data.villages);
        }
      } catch (err) {
        console.error('Error fetching villages:', err);
      }
    };

    fetchCorridors();
    fetchVillages();
  }, []);

  const filteredCorridors = corridors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'BLOCKED':
        return 'bg-red-100 text-red-900 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/40 animate-pulse font-bold';
      case 'RESTRICTED':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40 font-bold';
      case 'OPEN_CAUTION':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40 font-bold';
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40 font-bold';
    }
  };

  const handleCalculateRoute = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setErrorMessage('');
    setCalculatedRoute(null);

    try {
      const res = await fetch('https://tr-0946e6036e9a417eadb3b8b3b0a3b88d.ecs.eu-north-1.on.aws/api/routes/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ origin, destination })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCalculatedRoute(data);
      } else {
        setErrorMessage(data.message || 'Detour path cannot be computed due to disconnected graph pathways.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Route planner server offline. Please try again later.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 transition-colors duration-200">
      
      {/* 1. Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30 text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>NER HIGHWAY PASSES & INTELLIGENT DETOUR ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Mountain Road Connectivity & Safe Route Navigator
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Real-time status of critical North Eastern national highways, BRO clearance operations, AI slope risk scores, and automatic bypass recommendations for travelers and supply convoys.
          </p>
        </div>
      </div>

      {/* 2. Interactive AI Safe Route Calculator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-lg font-black text-slate-900 dark:text-white">AI Evacuation & Safe Bypass Route Finder</h2>
        </div>

        <form onSubmit={handleCalculateRoute} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-400 mb-1">Starting Point (Origin)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute left-3 top-3" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
              >
                <option value="Siliguri Junction">Siliguri Junction</option>
                <option value="Sevoke">Sevoke Junction</option>
                <option value="Melli">Melli Gate</option>
                <option value="Rangpo">Rangpo Border</option>
                <option value="Singtam">Singtam Town</option>
                <option value="Gangtok, Sikkim">Gangtok</option>
                <option value="Dimapur">Dimapur Station</option>
                <option value="Chumukedima">Chumukedima Gate</option>
                <option value="Kohima">Kohima (Central)</option>
                <option value="Balipara">Balipara Depot</option>
                <option value="Bhalukpong">Bhalukpong Cut</option>
                <option value="Tawang">Tawang</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-400 mb-1">Destination in NER</label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-amber-600 dark:text-amber-500 absolute left-3 top-3" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
              >
                <option value="Gangtok, Sikkim">Gangtok, Sikkim</option>
                <option value="Singtam">Singtam, East Sikkim</option>
                <option value="Kohima">Kohima, Nagaland</option>
                <option value="Tawang">Tawang, Arunachal</option>
                <option value="Siliguri Junction">Siliguri Junction</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-4 flex items-end">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-black text-sm rounded-xl shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Computing Stable Slopes...' : 'Compute Safe Route'}</span>
            </button>
          </div>
        </form>

        {/* Calculated Result Card */}
        {calculatedRoute && (
          <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-950 border border-teal-500/40 rounded-xl space-y-4 shadow-sm animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <span className="font-extrabold text-slate-900 dark:text-white text-base">Recommended Safe Corridor: {calculatedRoute.recommendedSafeRoute}</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${
                calculatedRoute.riskGrade === 'HIGH-RISK'
                  ? 'bg-red-100 text-red-900 border-red-300 dark:bg-red-500/20 dark:text-red-400'
                  : calculatedRoute.riskGrade === 'MODERATE-RISK'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300'
              }`}>
                {calculatedRoute.riskGrade}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Direct Pass Hazard:</span>
                <span className="text-red-700 dark:text-red-400 font-extrabold font-mono">{calculatedRoute.primaryHighway} - {calculatedRoute.primaryStatus}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Detour Distance & ETA:</span>
                <span className="text-teal-800 dark:text-teal-300 font-extrabold font-mono">{calculatedRoute.distance} · {calculatedRoute.estimatedTime}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Terrain Clearance:</span>
                <span className="text-slate-900 dark:text-slate-200 font-medium">{calculatedRoute.advisory}</span>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-900 border border-red-200 rounded-xl text-xs font-bold animate-fadeIn">
            ❌ {errorMessage}
          </div>
        )}
      </div>

      {/* 3. National Highway Corridors Status Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              Strategic Highway Corridors Status
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-semibold">Live BRO / SDRF mountain road clearance telemetry</p>
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
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
              />
            </div>

            <div className="flex gap-1 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
              {['ALL', 'BLOCKED', 'RESTRICTED', 'OPEN_CAUTION', 'OPEN_CLEAR'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors cursor-pointer ${
                    filterStatus === st ? 'bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950' : 'text-slate-800 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
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
            const isSelected = selectedCorridor?.corridorId === corridor.corridorId;
            return (
              <div
                key={corridor.corridorId}
                onClick={() => setSelectedCorridor(corridor)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/90 border-teal-600 dark:border-teal-400 shadow-lg shadow-teal-600/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-400">{corridor.state}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(corridor.status)}`}>
                      {corridor.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">{corridor.name}</h3>

                  <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-400 font-bold">AI Landslide Risk:</span>
                      <span className="font-mono font-extrabold text-red-600 dark:text-red-400">{corridor.riskScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-400 font-bold">Corridor Length:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-300">{corridor.lengthKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-400 font-bold">Clearance Status:</span>
                      <span className="text-teal-800 dark:text-teal-300 font-extrabold truncate max-w-[170px]">{corridor.estimatedClearance}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                  <span>Updated: Just Now</span>
                  <span className="text-teal-800 dark:text-teal-300 font-black flex items-center gap-0.5">
                    View Detours <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Corridor Detailed Inspection Drawer */}
        {selectedCorridor && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mt-4 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-teal-800 dark:text-teal-300 uppercase font-black">{selectedCorridor.state} Highway Sector</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedCorridor.name}</h3>
              </div>
              <span className={`self-start sm:self-auto text-xs px-3 py-1 rounded-full border ${getStatusBadge(selectedCorridor.status)}`}>
                STATUS: {selectedCorridor.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vulnerable Sections & Clearance */}
              <div className="space-y-3 text-xs">
                <h4 className="font-extrabold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500" /> Active Hazard Bottlenecks
                </h4>
                <div className="space-y-1.5">
                  {selectedCorridor.vulnerableSections.map((sec, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-900 dark:text-slate-300 font-mono font-bold">
                      <span>🚧 {sec}</span>
                      <span className="text-red-600 dark:text-red-400 text-[10px] uppercase font-black">Slope Failure</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400">
                  <span className="text-slate-800 dark:text-slate-300 font-bold block mb-1">Restoration Plan:</span>
                  <p className="text-slate-900 dark:text-slate-300 leading-relaxed font-medium">{selectedCorridor.estimatedClearance}</p>
                </div>
              </div>

              {/* Alternative Bypass Corridors */}
              <div className="space-y-3 text-xs">
                <h4 className="font-extrabold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-teal-700 dark:text-teal-400" /> Verified Alternative Bypass Routes
                </h4>
                {selectedCorridor.alternativeRoutes && selectedCorridor.alternativeRoutes.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCorridor.alternativeRoutes.map((alt, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between font-extrabold text-slate-900 dark:text-white">
                          <span>{alt.name}</span>
                          <span className="text-teal-800 dark:text-teal-300 font-mono text-[11px] font-bold">{alt.delayMin}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-400 text-[11px] font-medium">{alt.roadCondition}</p>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 font-mono font-bold">
                          ✓ {alt.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 text-center font-semibold">
                    No bypass required. Main corridor is operating normally.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Isolated Mountain Village Cutoff Risk */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mountain className="w-5 h-5 text-purple-700 dark:text-purple-400" />
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Isolated Village Cutoff Vulnerability Tracker</h3>
              <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">SIH Resilience Metric: Evaluates remote hamlets at risk of total isolation</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-900 dark:bg-purple-500/10 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
            GRAPH RESILIENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {villages.map((item) => (
            <div key={item.villageId} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{item.village}</h4>
                  <span className="text-[11px] text-slate-600 dark:text-slate-500 font-mono font-bold">{item.district}, {item.state}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-400 border border-red-300 dark:border-red-500/40">
                  {item.riskOfIsolation}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-400 pt-1 font-semibold">
                <div><span className="text-slate-600 dark:text-slate-500">Population:</span> <strong className="text-slate-900 dark:text-slate-200">{item.population.toLocaleString()} citizens</strong></div>
                <div><span className="text-slate-600 dark:text-slate-500">Access Link:</span> <span className="text-amber-700 dark:text-amber-300 font-mono font-bold">{item.primaryRoad}</span></div>
                <div><span className="text-slate-600 dark:text-slate-500">Lifeline:</span> <span className="text-slate-900 dark:text-slate-300">{item.lifelineStatus}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-500 font-semibold">Emergency Rations:</span>
                <span className="text-emerald-800 dark:text-emerald-400 font-bold font-mono">{item.emergencySuppliesDaysLeft} Days Buffer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
