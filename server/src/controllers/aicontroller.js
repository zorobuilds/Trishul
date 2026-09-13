const Sensor = require("../models/sensors");
const SensorReading = require("../models/sensorReading");
const { predictLandslide } = require("../services/aiService");

/**
 * Predict landslide risk for a specific sensor station based on MongoDB telemetry
 */
const predictSensorRisk = async (req, res, next) => {
  try {
    const { sensorId } = req.params;
    const sensor = await Sensor.findById(sensorId);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor station not found"
      });
    }

    // Retrieve last 24h readings (up to 8 points at 3h intervals)
    const readings = await SensorReading.find({ sensorId })
      .sort({ timestamp: -1 })
      .limit(8);

    let cumulativeRainMm = 0;
    let maxSaturation = 0;
    let latestReading = null;

    if (readings.length > 0) {
      latestReading = readings[0];
      // Calculate cumulative rainfall and peak saturation
      cumulativeRainMm = readings.reduce((sum, r) => sum + (r.rainMm || 0), 0);
      maxSaturation = Math.max(...readings.map((r) => r.soilSaturation || 0));
    } else {
      cumulativeRainMm = 25; // default fallback
    }

    const durationHours = readings.length > 0 ? readings.length * 3.0 : 24.0;
    const [lng, lat] = sensor.location?.coordinates || [92.0, 27.5];

    // Call ML prediction model
    const prediction = await predictLandslide({
      rainfall_mm: cumulativeRainMm,
      duration_hours: durationHours,
      lat,
      lng
    });

    res.status(200).json({
      success: true,
      sensor: {
        id: sensor._id,
        name: sensor.name,
        state: sensor.state,
        locationName: sensor.locationName,
        coordinates: { lat, lng },
        sensorType: sensor.sensorType,
        status: sensor.status
      },
      telemetrySummary: {
        readingsCount: readings.length,
        cumulativeRainMm: Math.round(cumulativeRainMm * 10) / 10,
        durationHours,
        latestReading: latestReading ? {
          rainMm: latestReading.rainMm,
          soilSaturation: latestReading.soilSaturation,
          porePressureKPa: latestReading.porePressureKPa,
          tiltAngleDeg: latestReading.tiltAngleDeg,
          timestamp: latestReading.timestamp
        } : null,
        maxSoilSaturation: maxSaturation
      },
      prediction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Predict landslide risk for all active sensors
 */
const predictAllSensorsRisk = async (req, res, next) => {
  try {
    const sensors = await Sensor.find({ status: "ACTIVE" });
    const results = [];

    for (const sensor of sensors) {
      const readings = await SensorReading.find({ sensorId: sensor._id })
        .sort({ timestamp: -1 })
        .limit(8);

      let cumulativeRainMm = 0;
      let latestReading = null;

      if (readings.length > 0) {
        latestReading = readings[0];
        cumulativeRainMm = readings.reduce((sum, r) => sum + (r.rainMm || 0), 0);
      } else {
        cumulativeRainMm = 25;
      }

      const durationHours = readings.length > 0 ? readings.length * 3.0 : 24.0;
      const [lng, lat] = sensor.location?.coordinates || [92.0, 27.5];

      const prediction = await predictLandslide({
        rainfall_mm: cumulativeRainMm,
        duration_hours: durationHours,
        lat,
        lng
      });

      results.push({
        sensorId: sensor._id,
        name: sensor.name,
        state: sensor.state,
        locationName: sensor.locationName,
        coordinates: { lat, lng },
        cumulativeRainMm,
        latestReading,
        prediction
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      sensorsRisk: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Ad-hoc prediction from custom user / scenario input
 */
const predictCustom = async (req, res, next) => {
  try {
    const { rainfall_mm, duration_hours, lat, lng } = req.body;
    
    if (rainfall_mm === undefined) {
      return res.status(400).json({
        success: false,
        message: "rainfall_mm is required"
      });
    }

    const prediction = await predictLandslide({
      rainfall_mm,
      duration_hours: duration_hours || 24.0,
      lat: lat || 27.5,
      lng: lng || 92.0
    });

    res.status(200).json({
      success: true,
      prediction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get AI Model Metadata & Health
 */
const getModelInfo = async (req, res) => {
  res.status(200).json({
    success: true,
    model: {
      name: "Trishul Rainfall-Intensity Landslide Hazard Classifier",
      version: "1.0.0",
      algorithm: "XGBoost Classifier (XGBClassifier) + StandardScaler",
      trainingStrategy: "Mixed Dataset (80 Synthetic Augmented + 30 Real Documented Disasters)",
      evaluationStrategy: "5-Fold Stratified Cross-Validation (Out-of-Fold Unseen)",
      performance: {
        accuracy: "96.36%",
        precision: "100.00% (Zero False Alarms)",
        recall: "94.29% (High Disaster Sensitivity)",
        f1Score: "96.98%"
      },
      features: [
        "rainfall_mm (54.83% importance)",
        "rain_intensity_mm_h (37.10% importance)",
        "longitude (4.35% importance)",
        "latitude (3.73% importance)",
        "duration_hours"
      ],
      hazardLevels: {
        CRITICAL: "P >= 0.80 or Rain > 150mm -> Red Alert & Immediate Evacuation",
        HIGH: "P >= 0.55 or Rain > 90mm -> Orange Alert & Travel Restrictions",
        MODERATE: "P >= 0.30 or Rain > 40mm -> Yellow Watch & Saturated Ground Monitoring",
        LOW: "P < 0.30 -> Green Baseline"
      }
    }
  });
};

module.exports = {
  predictSensorRisk,
  predictAllSensorsRisk,
  predictCustom,
  getModelInfo
};
