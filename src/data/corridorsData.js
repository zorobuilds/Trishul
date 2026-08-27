export const NER_HIGHWAY_CORRIDORS = [
  {
    id: 'nh-10',
    name: 'NH-10 (Siliguri - Sevoke - Singtam - Gangtok)',
    state: 'Sikkim / West Bengal',
    status: 'BLOCKED',
    statusColor: 'red',
    riskScore: '94%',
    lengthKm: 114,
    vulnerableSections: ['KM 29 (Singtam)', 'Setijhora', 'Birik Dara'],
    estimatedClearance: '4 Hours (BRO Task Force Swastik on site)',
    alternativeRoutes: [
      {
        name: 'Via Melli - Jorethang - Namchi - Gangtok',
        status: 'OPEN_CAUTION',
        delayMin: '+45 Mins',
        roadCondition: 'Single lane hill cutting. Light vehicles only.'
      },
      {
        name: 'Via Lava - Algarah - Reshi - Rhenock',
        status: 'OPEN_CLEAR',
        delayMin: '+90 Mins',
        roadCondition: 'All weather paved bypass. Safe from river flooding.'
      }
    ],
    lastUpdated: '15 Mins Ago'
  },
  {
    id: 'nh-29',
    name: 'NH-29 (Dimapur - Chumukedima - Kohima)',
    state: 'Nagaland',
    status: 'RESTRICTED',
    statusColor: 'amber',
    riskScore: '78%',
    lengthKm: 74,
    vulnerableSections: ['Dzüdza Bridge Stretch', 'Old Chumukedima Gate'],
    estimatedClearance: 'One-Way Traffic Allowed (Heavy trucks halted)',
    alternativeRoutes: [
      {
        name: 'Via Niuland - Kohima Bypass Road',
        status: 'OPEN_CLEAR',
        delayMin: '+35 Mins',
        roadCondition: 'Graded rural asphalt corridor. Stable soil strata.'
      }
    ],
    lastUpdated: '30 Mins Ago'
  },
  {
    id: 'nh-37',
    name: 'NH-37 (Imphal - Jiribam - Silchar)',
    state: 'Manipur / Assam',
    status: 'OPEN_CAUTION',
    statusColor: 'yellow',
    riskScore: '62%',
    lengthKm: 222,
    vulnerableSections: ['Noney Hill Sector', 'Awangkhul Stretch'],
    estimatedClearance: 'Open with speed limits under active rain surveillance',
    alternativeRoutes: [
      {
        name: 'Via Churachandpur - Tipaimukh Route',
        status: 'OPEN_CLEAR',
        delayMin: '+110 Mins',
        roadCondition: 'Longer route, safe from mudflow.'
      }
    ],
    lastUpdated: '1 Hour Ago'
  },
  {
    id: 'bct-road',
    name: 'BCT Road (Balipara - Charduar - Tawang)',
    state: 'Arunachal Pradesh',
    status: 'BLOCKED',
    statusColor: 'red',
    riskScore: '89%',
    lengthKm: 310,
    vulnerableSections: ['Bhalukpong Valley KM 48', 'Sela Pass Foothills'],
    estimatedClearance: '6 Hours (Rock blasting in progress)',
    alternativeRoutes: [
      {
        name: 'Via Orang - Kalaktang - Shergaon - Rupa (OKSR)',
        status: 'OPEN_CLEAR',
        delayMin: '+25 Mins',
        roadCondition: 'Modern two-lane defense corridor. Fully cleared.'
      }
    ],
    lastUpdated: '40 Mins Ago'
  },
  {
    id: 'nh-06',
    name: 'NH-06 (Guwahati - Shillong - Jowai - Silchar)',
    state: 'Meghalaya / Assam',
    status: 'OPEN_CLEAR',
    statusColor: 'emerald',
    riskScore: '35%',
    lengthKm: 387,
    vulnerableSections: ['Sonapur Tunnel Outskirts'],
    estimatedClearance: 'Normal traffic flow. Spotters deployed near Sonapur.',
    alternativeRoutes: [],
    lastUpdated: '10 Mins Ago'
  },
  {
    id: 'nh-54',
    name: 'NH-54 (Silchar - Kolasib - Aizawl)',
    state: 'Mizoram',
    status: 'OPEN_CAUTION',
    statusColor: 'yellow',
    riskScore: '58%',
    lengthKm: 180,
    vulnerableSections: ['Hunthar Approach Hill', 'Kolasib Chhimluang'],
    estimatedClearance: 'Open. Precaution advised for nighttime travel.',
    alternativeRoutes: [
      {
        name: 'Via Lengpui - Sairang Alternate link',
        status: 'OPEN_CLEAR',
        delayMin: '+20 Mins',
        roadCondition: 'Paved, minor surface water.'
      }
    ],
    lastUpdated: '2 Hours Ago'
  }
];

export const ISOLATED_VILLAGES_RESILIENCE = [
  {
    id: 'v-1',
    village: 'Lachung Valley Hamlets',
    district: 'North Sikkim',
    state: 'Sikkim',
    population: 3200,
    riskOfIsolation: 'CRITICAL (92%)',
    primaryRoad: 'Chungthang-Lachung Link (Severed)',
    lifelineStatus: 'Relying on Army Helipad at Pegong',
    emergencySuppliesDaysLeft: 6
  },
  {
    id: 'v-2',
    village: 'Dzongu Lepcha Reserve',
    district: 'Mangan',
    state: 'Sikkim',
    population: 4800,
    riskOfIsolation: 'HIGH (84%)',
    primaryRoad: 'Sankalang Bailey Bridge Link',
    lifelineStatus: 'Suspension footbridge operating for rations',
    emergencySuppliesDaysLeft: 9
  },
  {
    id: 'v-3',
    village: 'Mahur Hill Settlement',
    district: 'Dima Hasao',
    state: 'Assam',
    population: 2900,
    riskOfIsolation: 'MODERATE (65%)',
    primaryRoad: 'Haflong Rural Bypass',
    lifelineStatus: 'Single-lane access intact',
    emergencySuppliesDaysLeft: 14
  }
];
