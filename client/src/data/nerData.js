export const NER_STATES_DATA = [
  {
    id: 'sikkim',
    name: 'Sikkim',
    capital: 'Gangtok',
    threatLevel: 'CRITICAL',
    threatColor: 'red',
    rainfall24h: '142 mm',
    activeLandslides: 4,
    vulnerablePasses: ['NH-10 (Sevoke-Gangtok)', 'North Sikkim Highway'],
    soilSaturation: '92%',
    statusSummary: 'Multiple slope failures between Rangpo and Singtam. Heavy downpour continuing.'
  },
  {
    id: 'assam',
    name: 'Assam',
    capital: 'Dispur',
    threatLevel: 'HIGH',
    threatColor: 'orange',
    rainfall24h: '98 mm',
    activeLandslides: 3,
    vulnerablePasses: ['Dima Hasao Hill Section', 'Haflong-Silchar Link'],
    soilSaturation: '84%',
    statusSummary: 'Railway cutting mudslips in Dima Hasao. Waterlogging along hill skirts.'
  },
  {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    threatLevel: 'HIGH',
    threatColor: 'orange',
    rainfall24h: '115 mm',
    activeLandslides: 2,
    vulnerablePasses: ['Balipara-Charduar-Tawang (BCT) Road', 'Trans-Arunachal Highway'],
    soilSaturation: '86%',
    statusSummary: 'Blockage reported near Bhalukpong. Restoration team dispatched by BRO.'
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    capital: 'Shillong',
    threatLevel: 'MODERATE',
    threatColor: 'yellow',
    rainfall24h: '65 mm',
    activeLandslides: 1,
    vulnerablePasses: ['Umiam Lake Bypass', 'Shillong-Dawki Highway'],
    soilSaturation: '71%',
    statusSummary: 'Minor debris flow on Guwahati-Shillong corridor. Traffic moving slowly.'
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    capital: 'Kohima',
    threatLevel: 'HIGH',
    threatColor: 'orange',
    rainfall24h: '82 mm',
    activeLandslides: 2,
    vulnerablePasses: ['NH-29 (Dimapur-Kohima)', 'Pfutsero Road'],
    soilSaturation: '79%',
    statusSummary: 'Subsidence observed at Dzüdza bridge stretch. Heavy vehicles restricted.'
  },
  {
    id: 'manipur',
    name: 'Manipur',
    capital: 'Imphal',
    threatLevel: 'MODERATE',
    threatColor: 'yellow',
    rainfall24h: '54 mm',
    activeLandslides: 1,
    vulnerablePasses: ['NH-37 (Imphal-Jiribam)'],
    soilSaturation: '68%',
    statusSummary: 'Mudslide cleared near Noney. One-way traffic permitted.'
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    capital: 'Aizawl',
    threatLevel: 'MODERATE',
    threatColor: 'yellow',
    rainfall24h: '48 mm',
    activeLandslides: 1,
    vulnerablePasses: ['Aizawl-Lunglei Highway', 'Bawngkawn Slope'],
    soilSaturation: '65%',
    statusSummary: 'Slope tension cracks monitored via piezo sensors in Hunthar locality.'
  },
  {
    id: 'tripura',
    name: 'Tripura',
    capital: 'Agartala',
    threatLevel: 'LOW',
    threatColor: 'emerald',
    rainfall24h: '22 mm',
    activeLandslides: 0,
    vulnerablePasses: ['NH-8 Hill Stretches'],
    soilSaturation: '42%',
    statusSummary: 'Normal conditions. Continuous rain forecast for upcoming 48 hours.'
  }
];

export const LIVE_BULLETINS = [
  {
    id: 1,
    time: '10 Mins Ago',
    location: 'NH-10, Mile 29 (Sikkim)',
    type: 'ROAD_BLOCK',
    severity: 'critical',
    title: 'Major rockfall & mudflow near Singtam',
    desc: 'Traffic completely halted. BRO Task Force Project Swastik deployed with heavy excavators. Evacuation diversion via Melli.',
    verified: true
  },
  {
    id: 2,
    time: '25 Mins Ago',
    location: 'Dima Hasao, Jatinga Valley (Assam)',
    type: 'SLOPE_MOVEMENT',
    severity: 'warning',
    title: 'Soil creep & railway embankment cracks',
    desc: 'Automated piezometer alarm triggered at KM 44. Speed restrictions imposed for hill trains.',
    verified: true
  },
  {
    id: 3,
    time: '45 Mins Ago',
    location: 'Bhalukpong-Bomdila (Arunachal)',
    type: 'WEATHER_ALERT',
    severity: 'high',
    title: 'IMD Red Alert: 180mm extreme rain forecast',
    desc: 'Flash flood and secondary debris slides expected along Kameng river basin in next 12 hours.',
    verified: true
  },
  {
    id: 4,
    time: '1 Hour Ago',
    location: 'Hunthar Veng, Aizawl (Mizoram)',
    type: 'CITIZEN_REPORT',
    severity: 'warning',
    title: 'Geo-tagged citizen report: 3cm retaining wall fracture',
    desc: 'Verified by local Disaster Management Field Officer. 12 families issued precautionary advisory.',
    verified: true
  }
];

export const AI_METRICS_SUMMARY = {
  totalSensorsActive: 342,
  highRiskSectors: 14,
  restorationTeamsActive: 9,
  offlineCachedReportsToday: 68,
  aiPredictionAccuracy: '94.2%'
};
