import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  Send, 
  CheckCircle, 
  Upload, 
  RefreshCw, 
  ShieldAlert, 
  PhoneCall, 
  FileText, 
  Layers, 
  Navigation,
  Clock,
  Compass
} from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import { NER_STATES_DATA } from '../data/nerData';

export const ReportIncident = () => {
  const [searchParams] = useSearchParams();
  const isSosMode = searchParams.get('sos') === 'true';

  const { incidents, offlineQueue, isOnline, setIsOnline, submitIncident, syncOfflineReports } = useIncidents();

  // Form State
  const [formData, setFormData] = useState({
    title: isSosMode ? 'EMERGENCY DISTRESS SOS' : '',
    category: isSosMode ? 'FLASH_FLOOD' : 'LANDSLIDE',
    severity: isSosMode ? 'CRITICAL' : 'HIGH',
    state: 'Sikkim',
    locationName: '',
    lat: 27.3389,
    lng: 88.6065,
    description: '',
    reporterName: '',
    reporterContact: '',
    imageUrl: null
  });

  const [geoLocating, setGeoLocating] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [submittedResult, setSubmittedResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // Auto fetch geolocation on mount
  useEffect(() => {
    handleFetchLocation();
  }, []);

  const handleFetchLocation = () => {
    setGeoLocating(true);
    setGeoError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            lat: parseFloat(pos.coords.latitude.toFixed(5)),
            lng: parseFloat(pos.coords.longitude.toFixed(5)),
            locationName: prev.locationName || `GPS Loc: ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E`
          }));
          setGeoLocating(false);
        },
        (err) => {
          console.warn('Geo error:', err.message);
          setGeoError('GPS unavailable. Default coordinates loaded. You can adjust manually.');
          setGeoLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGeoError('Geolocation not supported by your browser.');
      setGeoLocating(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill out the incident title and description.');
      return;
    }

    const res = submitIncident(formData);
    setSubmittedResult(res);

    // Reset fields
    setFormData({
      title: '',
      category: 'LANDSLIDE',
      severity: 'HIGH',
      state: formData.state,
      locationName: '',
      lat: formData.lat,
      lng: formData.lng,
      description: '',
      reporterName: formData.reporterName,
      reporterContact: formData.reporterContact,
      imageUrl: null
    });
    setImagePreview(null);
  };

  const handleManualSync = () => {
    const count = syncOfflineReports();
    setSyncStatusMsg(`Successfully uploaded & synced ${count} offline report(s) to central disaster database.`);
    setTimeout(() => setSyncStatusMsg(''), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Network & Offline Status Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
            {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5 animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                Connectivity Mode: {isOnline ? 'Connected to Disaster Mesh' : 'Zero-Network Offline Mode'}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE (PWA CACHED)'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isOnline
                ? 'Reports are broadcast immediately to NDRF/SDRF Command Hub.'
                : 'Reports are stored in your device storage and will automatically sync when network returns.'}
            </p>
          </div>
        </div>

        {/* Offline Simulation Toggle & Sync Button */}
        <div className="flex items-center gap-2">
          {offlineQueue.length > 0 && isOnline && (
            <button
              onClick={handleManualSync}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all animate-bounce"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync {offlineQueue.length} Queued Drafts</span>
            </button>
          )}

          <button
            onClick={() => setIsOnline(!isOnline)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors font-mono"
            title="Toggle to test offline-first PWA caching for remote hill areas"
          >
            Simulate: {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Grid: Form Left, Recent Ground Reports Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Report Submission Form */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
          
          {isSosMode && (
            <div className="mb-6 p-4 bg-red-950/60 border border-red-500/60 rounded-xl flex items-center gap-3 text-red-200 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">EMERGENCY SOS MODE ACTIVE</h4>
                <p className="text-xs text-red-300">Your GPS coordinates and distress broadcast will be prioritized to district emergency response units.</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Field Incident & Hazard Reporter
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Geo-tag slope fractures, active rockfalls, structural cracks, or blocked mountain corridors.
            </p>
          </div>

          {/* Submission Success Alert */}
          {submittedResult && (
            <div className={`mb-6 p-4 rounded-xl border ${submittedResult.mode === 'ONLINE' ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200' : 'bg-amber-950/50 border-amber-500/50 text-amber-200'}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                {submittedResult.mode === 'ONLINE' ? 'Incident Transmitted Successfully!' : 'Saved in Local Offline Vault!'}
              </div>
              <p className="text-xs opacity-90">
                {submittedResult.mode === 'ONLINE'
                  ? 'Your geo-tagged report is now visible on the Admin GIS Tactical Map (ID: ' + submittedResult.data.id + ').'
                  : 'No active connection. Report safely queued on your device and will broadcast automatically once signal recovers.'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Major rockfall on NH-10 near KM 32"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hazard Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="LANDSLIDE">🔴 Active Landslide</option>
                  <option value="ROAD_BLOCKAGE">🚧 Highway / Road Blockage</option>
                  <option value="SLOPE_MOVEMENT">⚠️ Slope Tension Cracks / Creep</option>
                  <option value="FLASH_FLOOD">🌊 Flash Flood / Mudflow</option>
                  <option value="BRIDGE_DAMAGE">🌉 Bridge / Culvert Structural Damage</option>
                  <option value="TREE_FALL">🌲 Fallen Trees / Electric Wire Hazard</option>
                </select>
              </div>
            </div>

            {/* Severity & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Perceived Threat Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="CRITICAL">Critical (Life / Route in Immediate Hazard)</option>
                  <option value="HIGH">High (Major Disruption / Fast Movement)</option>
                  <option value="MODERATE">Moderate (Partial Obstruction)</option>
                  <option value="LOW">Low (Precautionary Observation)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">NER State</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  {NER_STATES_DATA.map((st) => (
                    <option key={st.id} value={st.name}>{st.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & GPS Coordinates */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" /> Geolocation & Landmark
                </span>
                <button
                  type="button"
                  onClick={handleFetchLocation}
                  disabled={geoLocating}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  <Navigation className={`w-3.5 h-3.5 ${geoLocating ? 'animate-spin' : ''}`} />
                  <span>{geoLocating ? 'Acquiring GPS...' : 'Re-acquire GPS'}</span>
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Specific Landmark / Milestone (e.g. Mile 29, NH-10 Singtam)"
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Latitude (°N)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Longitude (°E)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                </div>
              </div>
              {geoError && <p className="text-[11px] text-amber-400 font-mono">{geoError}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Details & Ground Observation *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe size of boulder/debris, number of vehicles stranded, continuous rainfall intensity, or slope crack width..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Photo Upload & Preview */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Attach Geo-Tagged Evidence Photo</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-cyan-500 text-slate-300 text-xs font-medium transition-colors">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Upload / Snap Photo</span>
                  <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="Evidence Preview" className="w-12 h-12 rounded-lg object-cover border border-cyan-500" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setFormData({ ...formData, imageUrl: null }); }}
                      className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Reporter Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Name / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Tashi Bhutia / Local Citizen"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Mobile Contact (for Rescue Verification)</label>
                <input
                  type="text"
                  placeholder="+91-XXXXX-XXXXX"
                  value={formData.reporterContact}
                  onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
                  isSosMode
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSosMode
                    ? 'TRANSMIT EMERGENCY DISTRESS REPORT'
                    : isOnline
                    ? 'Submit Geo-Tagged Incident'
                    : 'Save Report in Offline Queue'}
                </span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Active Feed of Citizen & Field Submissions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Live Ground Truth Feed ({incidents.length})
            </h3>
            <span className="text-xs text-slate-400 font-mono">Realtime Mesh</span>
          </div>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {incidents.map((rep) => (
              <div
                key={rep.id}
                className={`bg-slate-900/90 border rounded-xl p-4 space-y-2.5 transition-all ${
                  rep.severity === 'CRITICAL' ? 'border-red-500/40 bg-red-950/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-slate-800 text-cyan-300 border border-slate-700 mr-2">
                      {rep.category.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rep.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {rep.severity}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{rep.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rep.description}</p>

                {rep.imageUrl && (
                  <div className="pt-1">
                    <img src={rep.imageUrl} alt="Incident Evidence" className="w-full h-32 object-cover rounded-lg border border-slate-800" />
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-cyan-400">
                    <MapPin className="w-3 h-3" /> {rep.locationName || `${rep.lat}, ${rep.lng}`}
                  </span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded border ${
                    rep.status === 'VERIFIED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
