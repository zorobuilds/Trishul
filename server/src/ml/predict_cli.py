import sys, os, json, joblib
import numpy as np

def predict(rainfall_mm, duration_hours=24.0, lat=27.5, lng=92.0):
    dir_path = os.path.dirname(__file__)
    model = joblib.load(os.path.join(dir_path, "landslide_model.joblib"))
    scaler = joblib.load(os.path.join(dir_path, "scaler.joblib"))

    rain = float(rainfall_mm)
    dur = max(float(duration_hours), 1.0)
    intensity = rain / dur
    
    # Scale features & predict
    features = np.array([[rain, dur, intensity, float(lat), float(lng)]])
    prob = float(model.predict_proba(scaler.transform(features))[0, 1])
    is_landslide = int(prob >= 0.5)

    # Determine hazard risk level and action
    if prob >= 0.80 or rain > 150.0:
        risk_level, action = "CRITICAL", "Immediate slope evacuation & BRO corridor halt recommended."
    elif prob >= 0.55 or rain > 90.0:
        risk_level, action = "HIGH", "High landslide susceptibility. Restrict mountain highway travel."
    elif prob >= 0.30 or rain > 40.0:
        risk_level, action = "MODERATE", "Precautionary watch. Saturated overburden surveillance."
    else:
        risk_level, action = "LOW", "Normal baseline weather. No active threat detected."

    return {
        "success": True,
        "is_landslide": is_landslide,
        "probability": round(prob, 4),
        "probability_percent": round(prob * 100, 1),
        "risk_level": risk_level,
        "action": action,
        "features": {"rainfall_mm": rain, "duration_hours": dur, "rain_intensity_mm_h": round(intensity, 2), "lat": lat, "lng": lng}
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        rain = float(sys.argv[1])
        dur = float(sys.argv[2]) if len(sys.argv) > 2 else 24.0
        lat = float(sys.argv[3]) if len(sys.argv) > 3 else 27.5
        lng = float(sys.argv[4]) if len(sys.argv) > 4 else 92.0
        print(json.dumps(predict(rain, dur, lat, lng)))
    else:
        print(json.dumps({"error": "Usage: python predict_cli.py <rainfall_mm> [duration_hours] [lat] [lng]"}))
