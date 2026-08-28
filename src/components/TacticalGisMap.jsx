import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default leaflet marker icon issue in webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored SVG pin generator
const createSvgIcon = (color, text = '') => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <path fill="${color}" stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="3.5" fill="#ffffff"/>
    </svg>
  `;
  return L.divIcon({
    html: svgString,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const incidentIconCritical = createSvgIcon('#ef4444');
const incidentIconWarning = createSvgIcon('#f59e0b');
const sensorIcon = createSvgIcon('#14b8a6');
const assetIcon = createSvgIcon('#10b981');

export const TacticalGisMap = ({ incidents, sensors, assets, activeLayers, onSelectIncident }) => {
  // Center of North Eastern Region (Assam/Meghalaya focal point)
  const defaultCenter = [26.2006, 92.9376];
  const defaultZoom = 7;

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl z-0">
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-xl text-[11px] space-y-1.5 pointer-events-auto">
        <span className="font-bold text-white uppercase text-[10px] tracking-wider block border-b border-slate-800 pb-1">
          Tactical Map Legend
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-slate-300">Critical Landslide Incident</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
          <span className="text-slate-300">IoT Telemetry Station</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300">Disaster Response Asset / BRO</span>
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <LayersControl position="topright">
          {/* Base Layer 1: OpenStreetMap Standard (100% Free, No API key) */}
          <LayersControl.BaseLayer checked name="OpenStreetMap Standard">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Base Layer 2: Topographic Relief (OpenTopoMap, Free) */}
          <LayersControl.BaseLayer name="Topographic Relief">
            <TileLayer
              attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (&copy; <a href="https://openstreetmap.org/copyright">OSM</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Base Layer 3: Esri Satellite Imagery (Free, No API key) */}
          <LayersControl.BaseLayer name="Satellite Imagery">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* 1. Render Incidents */}
        {activeLayers.incidents && incidents.map((inc) => {
          if (!inc.lat || !inc.lng) return null;
          const isCritical = inc.severity === 'CRITICAL';
          return (
            <React.Fragment key={inc.id}>
              <Marker
                position={[inc.lat, inc.lng]}
                icon={isCritical ? incidentIconCritical : incidentIconWarning}
                eventHandlers={{
                  click: () => onSelectIncident && onSelectIncident(inc)
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 space-y-1 text-xs">
                    <span className="font-mono font-bold text-red-600 block">{inc.category}</span>
                    <h4 className="font-bold text-slate-900">{inc.title}</h4>
                    <p className="text-slate-600">{inc.locationName}</p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Status: <strong>{inc.status}</strong></span>
                      <span>Sev: <strong>{inc.severity}</strong></span>
                    </div>
                  </div>
                </Popup>
              </Marker>
              {/* Risk Perimeter Radius Circle */}
              <Circle
                center={[inc.lat, inc.lng]}
                radius={isCritical ? 5000 : 2500}
                pathOptions={{
                  color: isCritical ? '#ef4444' : '#f59e0b',
                  fillColor: isCritical ? '#ef4444' : '#f59e0b',
                  fillOpacity: 0.15,
                  weight: 1
                }}
              />
            </React.Fragment>
          );
        })}

        {/* 2. Render IoT Sensor Stations */}
        {activeLayers.sensors && sensors.map((sen) => (
          <Marker
            key={sen.id}
            position={[sen.lat, sen.lng]}
            icon={sensorIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 space-y-1 text-xs">
                <span className="font-mono text-cyan-700 font-bold block">IoT TELEMETRY STATION</span>
                <h4 className="font-bold text-slate-900">{sen.name}</h4>
                <div className="text-slate-700 text-[11px] space-y-0.5 pt-1 font-mono">
                  <div>• Pore Pressure: <strong>{sen.porePressureKPa} kPa</strong></div>
                  <div>• Tilt Angle: <strong>{sen.tiltAngleDeg}°</strong></div>
                  <div>• Rain Gauge: <strong>{sen.rainGauge1hMm} mm/h</strong></div>
                  <div>• Battery: <strong>{sen.battery}</strong></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 3. Render Response Assets */}
        {activeLayers.assets && assets.map((ast) => (
          <Marker
            key={ast.id}
            position={[ast.lat, ast.lng]}
            icon={assetIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 space-y-1 text-xs">
                <span className="font-mono text-emerald-700 font-bold block">RESPONSE DEPLOYMENT</span>
                <h4 className="font-bold text-slate-900">{ast.name}</h4>
                <p className="text-slate-600">Base: {ast.base}</p>
                <div className="pt-1 text-[10px] text-slate-600">
                  <span>Equip: {ast.equipment}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};
