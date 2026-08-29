require("dotenv").config();
const mongoose = require("mongoose");
const Sensor = require("./src/models/sensors");
const SensorReading = require("./src/models/sensorReading");
const Incident = require("./src/models/incident");
const Corridor = require("./src/models/corridor");
const Village = require("./src/models/village");

const sensorsData = [
  {
    name: "Singtam Slope Inclinometer Array (SK-01)",
    sensorType: "INCLINOMETER",
    state: "Sikkim",
    locationName: "NH-10, Near Singtam Bridge",
    location: { type: "Point", coordinates: [88.498, 27.235] },
    status: "ACTIVE"
  },
  {
    name: "Dzüdza River Gorge Telemetry (NL-04)",
    sensorType: "RAIN_GAUGE",
    state: "Nagaland",
    locationName: "Dzüdza Bridge Stretch",
    location: { type: "Point", coordinates: [94.108, 25.674] },
    status: "ACTIVE"
  },
  {
    name: "Bhalukpong Mountain Cut Station (AR-02)",
    sensorType: "INCLINOMETER",
    state: "Arunachal Pradesh",
    locationName: "Bhalukpong Valley KM 48",
    location: { type: "Point", coordinates: [92.642, 27.014] },
    status: "ACTIVE"
  },
  {
    name: "Hunthar Veng Retaining Slope (MZ-01)",
    sensorType: "PIEZOMETER",
    state: "Mizoram",
    locationName: "Hunthar Veng, Aizawl",
    location: { type: "Point", coordinates: [92.717, 23.736] },
    status: "ACTIVE"
  },
  {
    name: "Sonapur Tunnel Outskirts (ML-03)",
    sensorType: "INCLINOMETER",
    state: "Meghalaya",
    locationName: "Sonapur Tunnel Outskirts",
    location: { type: "Point", coordinates: [92.365, 25.125] },
    status: "ACTIVE"
  }
];

const incidentsData = [
  {
    title: "Road Subsidence & Mudflow",
    category: "ROAD_BLOCKAGE",
    severity: "CRITICAL",
    state: "Sikkim",
    locationName: "NH-10, Near Singtam Bridge",
    location: { type: "Point", coordinates: [88.498, 27.235] },
    description: "Large boulder collapse with active mud slip. Two vehicles stuck. BRO notified.",
    reporterName: "Tashi Bhutia (Field Officer)",
    reporterContact: "+91-98765-43210",
    status: "VERIFIED",
    clientCreatedAt: new Date(Date.now() - 3600000)
  },
  {
    title: "Retaining Wall Crack & Soil Creep",
    category: "SLOPE_MOVEMENT",
    severity: "HIGH",
    state: "Mizoram",
    locationName: "Hunthar Veng Slope, Aizawl",
    location: { type: "Point", coordinates: [92.717, 23.736] },
    description: "Fissures growing along residential slope retaining wall after 6-hour continuous rain.",
    reporterName: "Lalrinawma (Local Resident)",
    reporterContact: "+91-94361-12345",
    status: "PENDING_REVIEW",
    clientCreatedAt: new Date(Date.now() - 7200000)
  }
];

const corridorsData = [
  {
    corridorId: "nh-10",
    name: "NH-10 (Siliguri - Sevoke - Singtam - Gangtok)",
    state: "Sikkim / West Bengal",
    status: "BLOCKED",
    riskScore: "94%",
    lengthKm: 114,
    vulnerableSections: ["KM 29 (Singtam)", "Setijhora", "Birik Dara"],
    estimatedClearance: "4 Hours (BRO Task Force Swastik on site)",
    alternativeRoutes: [
      {
        name: "Via Melli - Jorethang - Namchi - Gangtok",
        status: "OPEN_CAUTION",
        delayMin: "+45 Mins",
        roadCondition: "Single lane hill cutting. Light vehicles only."
      },
      {
        name: "Via Lava - Algarah - Reshi - Rhenock",
        status: "OPEN_CLEAR",
        delayMin: "+90 Mins",
        roadCondition: "All weather paved bypass. Safe from river flooding."
      }
    ]
  },
  {
    corridorId: "nh-29",
    name: "NH-29 (Dimapur - Chumukedima - Kohima)",
    state: "Nagaland",
    status: "RESTRICTED",
    riskScore: "78%",
    lengthKm: 74,
    vulnerableSections: ["Dzüdza Bridge Stretch", "Old Chumukedima Gate"],
    estimatedClearance: "One-Way Traffic Allowed (Heavy trucks halted)",
    alternativeRoutes: [
      {
        name: "Via Niuland - Kohima Bypass Road",
        status: "OPEN_CLEAR",
        delayMin: "+35 Mins",
        roadCondition: "Graded rural asphalt corridor. Stable soil strata."
      }
    ]
  },
  {
    corridorId: "nh-37",
    name: "NH-37 (Imphal - Jiribam - Silchar)",
    state: "Manipur / Assam",
    status: "OPEN_CAUTION",
    riskScore: "62%",
    lengthKm: 222,
    vulnerableSections: ["Noney Hill Sector", "Awangkhul Stretch"],
    estimatedClearance: "Open with speed limits under active rain surveillance",
    alternativeRoutes: [
      {
        name: "Via Churachandpur - Tipaimukh Route",
        status: "OPEN_CLEAR",
        delayMin: "+110 Mins",
        roadCondition: "Longer route, safe from mudflow."
      }
    ]
  },
  {
    corridorId: "bct-road",
    name: "BCT Road (Balipara - Charduar - Tawang)",
    state: "Arunachal Pradesh",
    status: "BLOCKED",
    riskScore: "89%",
    lengthKm: 310,
    vulnerableSections: ["Bhalukpong Valley KM 48", "Sela Pass Foothills"],
    estimatedClearance: "6 Hours (Rock blasting in progress)",
    alternativeRoutes: [
      {
        name: "Via Orang - Kalaktang - Shergaon - Rupa (OKSR)",
        status: "OPEN_CLEAR",
        delayMin: "+25 Mins",
        roadCondition: "Modern two-lane defense corridor. Fully cleared."
      }
    ]
  },
  {
    corridorId: "nh-06",
    name: "NH-06 (Guwahati - Shillong - Jowai - Silchar)",
    state: "Meghalaya / Assam",
    status: "OPEN_CLEAR",
    riskScore: "35%",
    lengthKm: 387,
    vulnerableSections: ["Sonapur Tunnel Outskirts"],
    estimatedClearance: "Normal traffic flow. Spotters deployed near Sonapur.",
    alternativeRoutes: []
  },
  {
    corridorId: "nh-54",
    name: "NH-54 (Silchar - Kolasib - Aizawl)",
    state: "Mizoram",
    status: "OPEN_CAUTION",
    riskScore: "58%",
    lengthKm: 180,
    vulnerableSections: ["Hunthar Approach Hill", "Kolasib Chhimluang"],
    estimatedClearance: "Open. Precaution advised for nighttime travel.",
    alternativeRoutes: [
      {
        name: "Via Lengpui - Sairang Alternate link",
        status: "OPEN_CLEAR",
        delayMin: "+20 Mins",
        roadCondition: "Paved, minor surface water."
      }
    ]
  }
];

const villagesData = [
  {
    villageId: "v-1",
    village: "Lachung Valley Hamlets",
    district: "North Sikkim",
    state: "Sikkim",
    population: 3200,
    riskOfIsolation: "CRITICAL (92%)",
    primaryRoad: "Chungthang-Lachung Link (Severed)",
    lifelineStatus: "Relying on Army Helipad at Pegong",
    emergencySuppliesDaysLeft: 6
  },
  {
    villageId: "v-2",
    village: "Dzongu Lepcha Reserve",
    district: "Mangan",
    state: "Sikkim",
    population: 4800,
    riskOfIsolation: "HIGH (84%)",
    primaryRoad: "Sankalang Bailey Bridge Link",
    lifelineStatus: "Suspension footbridge operating for rations",
    emergencySuppliesDaysLeft: 9
  },
  {
    villageId: "v-3",
    village: "Mahur Hill Settlement",
    district: "Dima Hasao",
    state: "Assam",
    population: 2900,
    riskOfIsolation: "MODERATE (65%)",
    primaryRoad: "Haflong Rural Bypass",
    lifelineStatus: "Single-lane access intact",
    emergencySuppliesDaysLeft: 14
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clean up
    await Sensor.deleteMany({});
    await SensorReading.deleteMany({});
    await Incident.deleteMany({});
    await Corridor.deleteMany({});
    await Village.deleteMany({});
    console.log("Cleaned up existing records.");

    // Seed Sensors
    const createdSensors = await Sensor.insertMany(sensorsData);
    console.log(`Seeded ${createdSensors.length} sensors.`);

    // Seed Incidents
    const createdIncidents = await Incident.insertMany(incidentsData);
    console.log(`Seeded ${createdIncidents.length} incidents.`);

    // Seed Corridors
    const createdCorridors = await Corridor.insertMany(corridorsData);
    console.log(`Seeded ${createdCorridors.length} corridors.`);

    // Seed Villages
    const createdVillages = await Village.insertMany(villagesData);
    console.log(`Seeded ${createdVillages.length} villages.`);

    // Generate historical telemetry (past 24h) for each sensor
    const telemetryEntries = [];
    const now = new Date();

    for (const sensor of createdSensors) {
      // Create 8 data points, 3 hours apart
      for (let i = 7; i >= 0; i--) {
        const timePoint = new Date(now.getTime() - i * 3 * 60 * 60 * 1000);

        // Base telemetry ranges slightly randomized per sensor
        let rainBase = 5 + (7 - i) * 6; // starts at 5, grows to 47
        let saturationBase = 60 + (7 - i) * 5; // starts at 60%, grows to 95%
        let pressureBase = 80 + (7 - i) * 8; // pore pressure
        let tiltBase = 1.0 + (7 - i) * 0.5;

        // Customize some sensors to have lower danger status
        if (sensor.name.includes("Sonapur") || sensor.name.includes("Hunthar")) {
          rainBase = 2 + (7 - i) * 2;
          saturationBase = 40 + (7 - i) * 3;
          pressureBase = 50 + (7 - i) * 4;
          tiltBase = 0.5 + (7 - i) * 0.2;
        }

        telemetryEntries.push({
          sensorId: sensor._id,
          rainMm: Math.min(Math.round(rainBase + Math.random() * 3), 100),
          soilSaturation: Math.min(Math.round(saturationBase + Math.random() * 2), 100),
          porePressureKPa: Math.round(pressureBase + Math.random() * 5),
          tiltAngleDeg: Math.round((tiltBase + Math.random() * 0.3) * 10) / 10,
          timestamp: timePoint
        });
      }
    }

    const createdTelemetry = await SensorReading.insertMany(telemetryEntries);
    console.log(`Seeded ${createdTelemetry.length} sensor reading points.`);

    // Update sensors with their lastReading timestamp
    for (const sensor of createdSensors) {
      const readingsForSensor = createdTelemetry.filter((t) => t.sensorId.toString() === sensor._id.toString());
      if (readingsForSensor.length > 0) {
        const lastRead = readingsForSensor[readingsForSensor.length - 1];
        await Sensor.findByIdAndUpdate(sensor._id, { lastReading: lastRead.timestamp });
      }
    }
    console.log("Updated last readings on sensors.");

    console.log("Seeding process completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
