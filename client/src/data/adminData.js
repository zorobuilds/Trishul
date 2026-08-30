export const IOT_SENSOR_STATIONS = [
  {
    id: 'sen-01',
    name: 'Singtam Slope Inclinometer Array (SK-01)',
    state: 'Sikkim',
    lat: 27.235,
    lng: 88.498,
    type: 'INCLINOMETER_PIEZO',
    porePressureKPa: 142.5,
    tiltAngleDeg: 4.8,
    rainGauge1hMm: 28.4,
    status: 'ALERT_HIGH',
    battery: '94%',
    lastPing: '2 mins ago'
  },
  {
    id: 'sen-02',
    name: 'Dzüdza River Gorge Telemetry (NL-04)',
    state: 'Nagaland',
    lat: 25.674,
    lng: 94.108,
    type: 'SOIL_MOISTURE_PROBE',
    porePressureKPa: 118.2,
    tiltAngleDeg: 3.2,
    rainGauge1hMm: 19.1,
    status: 'WARNING',
    battery: '88%',
    lastPing: '4 mins ago'
  },
  {
    id: 'sen-03',
    name: 'Bhalukpong Mountain Cut Station (AR-02)',
    state: 'Arunachal Pradesh',
    lat: 27.014,
    lng: 92.642,
    type: 'SURFACE_CRACKMETER',
    porePressureKPa: 156.0,
    tiltAngleDeg: 5.6,
    rainGauge1hMm: 34.2,
    status: 'ALERT_HIGH',
    battery: '91%',
    lastPing: '1 min ago'
  },
  {
    id: 'sen-04',
    name: 'Hunthar Veng Retaining Slope (MZ-01)',
    state: 'Mizoram',
    lat: 23.736,
    lng: 92.717,
    type: 'PIEZOMETER',
    porePressureKPa: 98.4,
    tiltAngleDeg: 2.1,
    rainGauge1hMm: 12.0,
    status: 'NORMAL',
    battery: '97%',
    lastPing: '6 mins ago'
  },
  {
    id: 'sen-05',
    name: 'Sonapur Tunnel Outskirts (ML-03)',
    state: 'Meghalaya',
    lat: 25.125,
    lng: 92.365,
    type: 'INCLINOMETER',
    porePressureKPa: 84.1,
    tiltAngleDeg: 1.4,
    rainGauge1hMm: 8.5,
    status: 'NORMAL',
    battery: '82%',
    lastPing: '8 mins ago'
  }
];

export const RESPONSE_ASSETS = [
  {
    id: 'ast-01',
    name: 'SDRF Quick Response Unit 1',
    base: 'Gangtok Depot',
    type: 'RESCUE_TEAM',
    lat: 27.331,
    lng: 88.613,
    status: 'DEPLOYED_SINGTAM',
    equipment: '2x Hydraulic Cutters, 1x Satellite Comms, 12 Personnel'
  },
  {
    id: 'ast-02',
    name: 'BRO Project Swastik Taskforce',
    base: 'Rangpo Heavy Depot',
    type: 'HEAVY_MACHINERY',
    lat: 27.176,
    lng: 88.528,
    status: 'ON_SITE',
    equipment: '4x JCB Heavy Excavators, 2x Rock Breakers, 6x Tippers'
  },
  {
    id: 'ast-03',
    name: 'NDRF 1st Battalion Helivac Unit',
    base: 'Guwahati Airbase',
    type: 'AIR_EVAC',
    lat: 26.106,
    lng: 91.585,
    status: 'STANDBY_ALERT',
    equipment: 'Mi-17 Evacuation Helicopter, Medical Trauma Pod'
  },
  {
    id: 'ast-04',
    name: 'Emergency Relief Supply Depot',
    base: 'Dimapur Logistics Hub',
    type: 'RELIEF_STOCK',
    lat: 25.906,
    lng: 93.727,
    status: 'READY',
    equipment: '4000x Rations, Water Purification Units, 800 Tents'
  }
];

export const HOURLY_RAINFALL_TREND = [
  { time: '00:00', rainMm: 4, soilSaturation: 62, riskThreshold: 50 },
  { time: '03:00', rainMm: 8, soilSaturation: 66, riskThreshold: 50 },
  { time: '06:00', rainMm: 15, soilSaturation: 73, riskThreshold: 50 },
  { time: '09:00', rainMm: 28, soilSaturation: 82, riskThreshold: 50 },
  { time: '12:00', rainMm: 42, soilSaturation: 89, riskThreshold: 50 },
  { time: '15:00', rainMm: 38, soilSaturation: 93, riskThreshold: 50 },
  { time: '18:00', rainMm: 49, soilSaturation: 96, riskThreshold: 50 },
  { time: '21:00 (Now)', rainMm: 54, soilSaturation: 98, riskThreshold: 50 }
];
