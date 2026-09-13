const { execFile } = require("child_process");
const path = require("path");

const PYTHON_BIN = process.env.PYTHON_PATH || "python3";
const CLI_PATH = path.join(__dirname, "..", "ml", "predict_cli.py");

/**
 * Predict landslide risk using the trained XGBoost model
 */
const predictLandslide = async ({ rainfall_mm = 50.0, duration_hours = 24.0, lat = 27.5, lng = 92.0 }) => {
  return new Promise((resolve) => {
    const args = [CLI_PATH, String(rainfall_mm), String(duration_hours), String(lat), String(lng)];

    execFile(PYTHON_BIN, args, { timeout: 4000 }, (error, stdout) => {
      if (!error && stdout) {
        try {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.success) {
            return resolve({ ...parsed, engine: "XGBoost-Python-Engine" });
          }
        } catch (e) {}
      }

      // Fast analytical fallback if python runtime is offline
      const rain = Number(rainfall_mm);
      const dur = Math.max(Number(duration_hours), 1.0);
      const intensity = rain / dur;
      const prob = 1 / (1 + Math.exp(-((rain - 80) / 25 + (intensity - 3.5) / 2)));
      
      const risk_level = prob >= 0.80 || rain > 150 ? "CRITICAL" : prob >= 0.55 || rain > 90 ? "HIGH" : prob >= 0.30 || rain > 40 ? "MODERATE" : "LOW";
      const action = risk_level === "CRITICAL" ? "Immediate slope evacuation & BRO corridor halt recommended." : risk_level === "HIGH" ? "High landslide susceptibility. Restrict mountain highway travel." : "Normal baseline weather.";

      resolve({
        success: true,
        is_landslide: prob >= 0.5 ? 1 : 0,
        probability: Math.round(prob * 10000) / 10000,
        probability_percent: Math.round(prob * 1000) / 10,
        risk_level,
        action,
        features: { rainfall_mm: rain, duration_hours: dur, rain_intensity_mm_h: Math.round(intensity * 100) / 100, lat: Number(lat), lng: Number(lng) },
        engine: "Analytical-Fallback"
      });
    });
  });
};

module.exports = { predictLandslide };
