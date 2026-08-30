import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  ShieldAlert, 
  Activity, 
  Layers, 
  Radio, 
  BellRing, 
  Send, 
  Truck, 
  CloudRain, 
  Check, 
  CheckCircle,
  MapPin
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { TacticalGisMap } from '../components/TacticalGisMap';
import { useIncidents } from '../context/IncidentContext';
import { RESPONSE_ASSETS } from '../data/adminData';
import { NER_STATES_DATA } from '../data/nerData';

export const AdminDashboard = () => {
  const { incidents, updateIncidentStatus } = useIncidents();
  const [, setSelectedIncident] = useState(null);

  // Live state
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [telemetryData, setTelemetryData] = useState([]);
  const [liveSensorAlert, setLiveSensorAlert] = useState(null);

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

  // Fetch sensors and handle real-time WebSockets
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/sensors');
        const data = await res.json();
        if (data.success && data.sensors.length > 0) {
          const formatted = data.sensors.map((s) => ({
            id: s._id,
            name: s.name,
            state: s.state,
            lat: s.location.coordinates[1],
            lng: s.location.coordinates[0],
            type: s.sensorType,
            porePressureKPa: 98.4,
            tiltAngleDeg: 1.2,
            rainGauge1hMm: 12.0,
            soilSaturation: 60,
            status: s.status,
            battery: '94%',
            lastPing: 'Just now'
          }));
          setSensors(formatted);
          setSelectedSensor(formatted[0]);
        }
      } catch (err) {
        console.error('Error fetching sensors:', err);
      }
    };

    fetchSensors();

    // Listen for WebSocket alarms
    const socket = io('http://localhost:5000');
    socket.on('sensorAlert', (alert) => {
      // Find the sensor name for alert display
      setLiveSensorAlert(alert);
      // Auto clear alert banner after 12 seconds
      setTimeout(() => {
        setLiveSensorAlert(null);
      }, 12000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch telemetry history when selected sensor changes
  useEffect(() => {
    if (!selectedSensor) return;

    const fetchTelemetry = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/sensors/${selectedSensor.id}/telemetry`);
        const data = await res.json();
        if (data.success && data.telemetry.length > 0) {
          setTelemetryData(data.telemetry);
          
          // Hydrate selectedSensor values with the latest telemetry reading
          const latest = data.telemetry[data.telemetry.length - 1];
          setSelectedSensor((prev) => ({
            ...prev,
            rainGauge1hMm: latest.rainMm,
            soilSaturation: latest.soilSaturation,
            porePressureKPa: latest.porePressureKPa,
            tiltAngleDeg: latest.tiltAngleDeg
          }));
        }
      } catch (err) {
        console.error('Error fetching telemetry:', err);
      }
    };

    fetchTelemetry();
  }, [selectedSensor?.id]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors duration-200">
      
      {/* WebSocket Telemetry Siren Banner */}
      {liveSensorAlert && (
        <div className="bg-red-600 text-white px-5 py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl border border-red-500 animate-bounce z-50">
          <div className="flex items-center gap-3">
            <BellRing className="w-6 h-6 animate-pulse text-white" />
            <div>
              <span className="font-mono font-black text-sm tracking-wider uppercase">⚠️ CRITICAL SLOPE SIREN TRIGGERED</span>
              <p className="text-xs font-semibold mt-0.5">
                IoT Sensor Station reports high soil saturation of {liveSensorAlert.soilSaturation}% (Pore Pressure: {liveSensorAlert.porePressureKPa} kPa, Tilt Shift: {liveSensorAlert.tiltAngleDeg}°). Landslide likelihood high.
              </p>
            </div>
          </div>
          <button
            onClick={() => setLiveSensorAlert(null)}
            className="px-3.5 py-1 text-xs font-bold bg-white text-red-700 rounded-lg hover:bg-slate-100 transition-colors shadow-sm self-start sm:self-center"
          >
            Dismiss Siren
          </button>
        </div>
      )}

      {/* 1. Header Banner & Live Authority Operations Summary */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-mono font-black tracking-wider uppercase mb-1">
            <Radio className="w-4 h-4 animate-pulse text-red-600 dark:text-red-400" /> NER DISASTER AUTHORITY HUB (SDRF / NDRF / BRO)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Real-Time Tactical Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 mt-0.5 font-semibold">
            GIS Multi-Hazard Surveillance, Sensor Telemetry Curves, Incident Verification & Geo-fenced Emergency Sirens.
          </p>
        </div>

        {/* Live System Indicators */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300">ISRO Radar: <strong>LINKED</strong></span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300">Sensors Active: <strong>{sensors.length}</strong></span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-bounce"></span>
            <span className="text-xs font-mono font-bold text-red-700 dark:text-red-300">Incidents: <strong>{incidents.length}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Tactical GIS Map Section */}
      <div className="bg-white dark:bg-slate-900 border-2 border-teal-500/40 dark:border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-700 dark:text-amber-500" />
              North East India Tactical GIS Multi-Layer Map
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">Toggle GIS layers to monitor sensor arrays, crowd reports, and relief units</p>
          </div>

          {/* Layer Toggle Controls */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => toggleLayer('incidents')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeLayers.incidents ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Incidents ({incidents.length})</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLayer('sensors')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeLayers.sensors ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>IoT Sensors ({sensors.length})</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLayer('assets')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeLayers.assets ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
          sensors={sensors}
          assets={RESPONSE_ASSETS}
          activeLayers={activeLayers}
          onSelectIncident={(inc) => setSelectedIncident(inc)}
        />
      </div>

      {/* 3. AI Early Warning Telemetry & Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 Cols): Rainfall Accumulation Curve vs. Landslide Threshold */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                AI Rainfall vs. Soil Saturation Threshold Curve
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-400 font-semibold">Antecedent Rain Index (ARI) - Cumulative pore pressure tipping curve</p>
            </div>
            
            {/* Dynamic Station Selector Dropdown */}
            {sensors.length > 0 && (
              <select
                value={selectedSensor?.id || ''}
                onChange={(e) => {
                  const found = sensors.find(s => s.id === e.target.value);
                  if (found) setSelectedSensor(found);
                }}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                {sensors.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="rainMm" name="Rain (mm)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRain)" />
                <Area type="monotone" dataKey="soilSaturation" name="Soil Saturation (%)" stroke="#ef4444" fillOpacity={1} fill="url(#colorSoil)" />
                <ReferenceLine y={50} label="Safe Threshold" stroke="#10b981" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {selectedSensor && (
            <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-500 font-bold block text-[10px]">Pore Pressure</span>
                <span className={`font-extrabold text-sm ${selectedSensor.porePressureKPa > 120 ? 'text-red-600 dark:text-red-400' : 'text-slate-850 dark:text-white'}`}>
                  {selectedSensor.porePressureKPa} kPa
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-500 font-bold block text-[10px]">Slope Incline Shift</span>
                <span className={`font-extrabold text-sm ${selectedSensor.tiltAngleDeg > 3.0 ? 'text-red-600 dark:text-red-400' : 'text-slate-850 dark:text-white'}`}>
                  +{selectedSensor.tiltAngleDeg}° {selectedSensor.tiltAngleDeg > 3.0 ? 'Critical' : 'Normal'}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-500 font-bold block text-[10px]">Landslide Probability</span>
                <span className={`font-extrabold text-sm ${selectedSensor.soilSaturation > 80 ? 'text-red-600 dark:text-red-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                  {selectedSensor.soilSaturation > 80 ? '94.8% Probable' : 'Low Risk'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right (5 Cols): Incident Triage & Verification Workflow */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              Incident Triage & Verification
            </h3>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-400">{incidents.length} Total Incidents</span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                  inc.status === 'RESOLVED'
                    ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/50 opacity-75'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-extrabold uppercase bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-400 border border-slate-200 dark:border-slate-800 mr-1.5">
                      {inc.category}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">{inc.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    inc.status === 'RESOLVED'
                      ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                      : inc.status === 'VERIFIED'
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}>
                    {inc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-300 line-clamp-2 font-medium">{inc.description}</p>
                <div className="text-[11px] text-slate-700 dark:text-slate-400 font-mono font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" /> {inc.locationName || `${inc.lat}, ${inc.lng}`}
                </div>

                {/* Authority Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-900">
                  {inc.status === 'PENDING_REVIEW' && (
                    <button
                      type="button"
                      onClick={() => updateIncidentStatus(inc.id, 'VERIFIED')}
                      className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Verify & Alert Public
                    </button>
                  )}

                  {inc.status === 'VERIFIED' && (
                    <button
                      type="button"
                      onClick={() => updateIncidentStatus(inc.id, 'RESOLVED')}
                      className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}

                  {inc.status === 'RESOLVED' && (
                    <span className="text-[11px] text-slate-600 dark:text-slate-500 font-mono font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-slate-500" /> Case Closed & Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Emergency Siren & Multilingual Broadcast Studio */}
      <div className="bg-white dark:bg-slate-900 border border-red-300 dark:border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Geo-Fenced Emergency Broadcast Studio</h3>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">Dispatch multilingual SMS, WhatsApp & Cell Broadcast sirens to citizens in hazard polygons</p>
          </div>
        </div>

        <form onSubmit={handleBroadcast} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 mb-1">Target Sector / State</label>
            <select
              value={broadcastTargetState}
              onChange={(e) => setBroadcastTargetState(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500 font-bold"
            >
              {NER_STATES_DATA.map((st) => (
                <option key={st.id} value={st.name}>{st.name} (All Sectors)</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 mb-1">Alert Level</label>
            <select
              value={broadcastSeverity}
              onChange={(e) => setBroadcastSeverity(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-red-700 dark:text-red-400 focus:outline-none focus:border-red-500 font-extrabold"
            >
              <option value="RED_ALERT">🔴 RED ALERT (Evacuate / Halt Travel)</option>
              <option value="ORANGE_ALERT">🟠 ORANGE ALERT (High Susceptibility)</option>
              <option value="YELLOW_ALERT">🟡 YELLOW WATCH (Precautionary Advisory)</option>
            </select>
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-300 mb-1">Multilingual Warning Broadcast Message</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium"
              />
              <button
                type="submit"
                disabled={isBroadcasting}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <Send className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-spin' : ''}`} />
                <span>{isBroadcasting ? 'Broadcasting...' : 'TRIGGER SIREN'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Broadcast Transmission Confirmation Card */}
        {broadcastSentLog && (
          <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/50 rounded-xl text-xs text-red-950 dark:text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fadeIn">
            <div>
              <span className="font-black block text-red-950 dark:text-white">✓ Broadcast Dispatched to {broadcastSentLog.targetState} at {broadcastSentLog.time}</span>
              <p className="text-red-800 dark:text-red-300/90 text-[11px] mt-0.5 font-mono font-bold">Channel: {broadcastSentLog.recipientsReached}</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-extrabold">
              {broadcastSentLog.severity}
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
