import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Layers, 
  Radio, 
  BellRing, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Truck, 
  Cpu, 
  CloudRain, 
  Check, 
  CheckCircle,
  XCircle, 
  Flame, 
  ExternalLink,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { TacticalGisMap } from '../components/TacticalGisMap';
import { useIncidents } from '../context/IncidentContext';
import { IOT_SENSOR_STATIONS, RESPONSE_ASSETS, HOURLY_RAINFALL_TREND } from '../data/adminData';
import { NER_STATES_DATA } from '../data/nerData';

export const AdminDashboard = () => {
  const { incidents, updateIncidentStatus } = useIncidents();
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Map layer controls
  const [activeLayers, setActiveLayers] = useState({
    incidents: true,
    sensors: true,
    assets: true
  });

  // Emergency Siren Broadcast Form State
  const [broadcastTargetState, setBroadcastTargetState] = useState('Sikkim');
  const [broadcastMessage, setBroadcastMessage] = useState(
    'EMERGENCY WARNING: High risk of slope failure along NH-10 corridor in next 3 hours due to heavy rain. Avoid mountain travel immediately.'
  );
  const [broadcastSeverity, setBroadcastSeverity] = useState('RED_ALERT');
  const [broadcastSentLog, setBroadcastSentLog] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const toggleLayer = (layerName) => {
    setActiveLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSentLog({
        id: `bc-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        targetState: broadcastTargetState,
        message: broadcastMessage,
        severity: broadcastSeverity,
        recipientsReached: '184,200 Citizens & Field Radios (SMS + WebPush + Cell Broadcast)'
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header Banner & Live Authority Operations Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold tracking-wider uppercase mb-1">
            <Radio className="w-4 h-4 animate-pulse text-red-400" /> NER DISASTER AUTHORITY HUB (SDRF / NDRF / BRO)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Real-Time Tactical Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            GIS Multi-Hazard Surveillance, Sensor Telemetry Curves, Incident Verification & Geo-fenced Emergency Sirens.
          </p>
        </div>

        {/* Live System Indicators */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300">ISRO Radar: <strong>LINKED</strong></span>
          </div>
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono text-slate-300">Sensors Active: <strong>{IOT_SENSOR_STATIONS.length}</strong></span>
          </div>
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-bounce"></span>
            <span className="text-xs font-mono text-red-300">Incidents: <strong>{incidents.length}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Tactical GIS Map Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              North East India Tactical GIS Multi-Layer Map
            </h2>
            <p className="text-xs text-slate-400">Toggle GIS layers to monitor sensor arrays, crowd reports, and relief units</p>
          </div>

          {/* Layer Toggle Controls */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => toggleLayer('incidents')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeLayers.incidents ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Incidents ({incidents.length})</span>
            </button>

            <button
              onClick={() => toggleLayer('sensors')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeLayers.sensors ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>IoT Sensors ({IOT_SENSOR_STATIONS.length})</span>
            </button>

            <button
              onClick={() => toggleLayer('assets')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeLayers.assets ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Response Teams ({RESPONSE_ASSETS.length})</span>
            </button>
          </div>
        </div>

        {/* The Leaflet Map Component */}
        <TacticalGisMap
          incidents={incidents}
          sensors={IOT_SENSOR_STATIONS}
          assets={RESPONSE_ASSETS}
          activeLayers={activeLayers}
          onSelectIncident={(inc) => setSelectedIncident(inc)}
        />
      </div>

      {/* 3. AI Early Warning Telemetry & Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 Cols): Rainfall Accumulation Curve vs. Landslide Threshold */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-cyan-400" />
                AI Rainfall vs. Soil Saturation Threshold Curve
              </h3>
              <p className="text-xs text-slate-400">Antecedent Rain Index (ARI) - Cumulative pore pressure tipping curve</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/30">
              TIPPING POINT EXCEEDED
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_RAINFALL_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1120', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="rainMm" name="Rain (mm)" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRain)" />
                <Area type="monotone" dataKey="soilSaturation" name="Soil Saturation (%)" stroke="#ef4444" fillOpacity={1} fill="url(#colorSoil)" />
                <ReferenceLine y={50} label="Safe Threshold" stroke="#10b981" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Pore Pressure</span>
              <span className="font-bold text-red-400 text-sm">142.5 kPa</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Slope Incline Shift</span>
              <span className="font-bold text-amber-400 text-sm">+4.8° Critical</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Landslide Probability</span>
              <span className="font-bold text-red-500 text-sm">94.8% Probable</span>
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Incident Triage & Verification Workflow */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              Incident Triage & Verification
            </h3>
            <span className="text-xs font-mono text-slate-400">{incidents.length} Total Incidents</span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                  inc.status === 'RESOLVED'
                    ? 'bg-slate-950/40 border-slate-800/50 opacity-75'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-slate-900 text-cyan-400 border border-slate-800 mr-1.5">
                      {inc.category}
                    </span>
                    <span className="text-xs font-bold text-white">{inc.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    inc.status === 'RESOLVED'
                      ? 'bg-slate-800 text-slate-400 border border-slate-700'
                      : inc.status === 'VERIFIED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {inc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{inc.description}</p>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" /> {inc.locationName || `${inc.lat}, ${inc.lng}`}
                </div>

                {/* Authority Action Buttons - Hidden once Resolved */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                  {inc.status === 'PENDING_REVIEW' && (
                    <button
                      onClick={() => updateIncidentStatus(inc.id, 'VERIFIED')}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3 h-3" /> Verify & Alert Public
                    </button>
                  )}

                  {inc.status === 'VERIFIED' && (
                    <button
                      onClick={() => updateIncidentStatus(inc.id, 'RESOLVED')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}

                  {inc.status === 'RESOLVED' && (
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-slate-400" /> Case Closed & Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Emergency Siren & Multilingual Broadcast Studio */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Geo-Fenced Emergency Broadcast Studio</h3>
            <p className="text-xs text-slate-400">Dispatch multilingual SMS, WhatsApp & Cell Broadcast sirens to citizens in hazard polygons</p>
          </div>
        </div>

        <form onSubmit={handleBroadcast} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Sector / State</label>
            <select
              value={broadcastTargetState}
              onChange={(e) => setBroadcastTargetState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              {NER_STATES_DATA.map((st) => (
                <option key={st.id} value={st.name}>{st.name} (All Sectors)</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Alert Level</label>
            <select
              value={broadcastSeverity}
              onChange={(e) => setBroadcastSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-red-400 focus:outline-none focus:border-red-500 font-bold"
            >
              <option value="RED_ALERT">🔴 RED ALERT (Evacuate / Halt Travel)</option>
              <option value="ORANGE_ALERT">🟠 ORANGE ALERT (High Susceptibility)</option>
              <option value="YELLOW_ALERT">🟡 YELLOW WATCH (Precautionary Advisory)</option>
            </select>
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Multilingual Warning Broadcast Message</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium"
              />
              <button
                type="submit"
                disabled={isBroadcasting}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <Send className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-spin' : ''}`} />
                <span>{isBroadcasting ? 'Broadcasting...' : 'TRIGGER SIREN'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Broadcast Transmission Confirmation Card */}
        {broadcastSentLog && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fadeIn">
            <div>
              <span className="font-bold block text-white">✓ Broadcast Dispatched to {broadcastSentLog.targetState} at {broadcastSentLog.time}</span>
              <p className="text-red-300/90 text-[11px] mt-0.5 font-mono">Channel: {broadcastSentLog.recipientsReached}</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-mono font-bold">
              {broadcastSentLog.severity}
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
