import os, re, joblib
import pandas as pd
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import StratifiedKFold, cross_validate

def get_duration_hours(text):
    text = str(text).lower()
    hr = re.search(r'(\d+(?:\.\d+)?)\s*(?:hr|hour|h)', text)
    if hr: return float(hr.group(1))
    day = re.search(r'(\d+(?:\.\d+)?)\s*(?:day|d)', text)
    if day: return float(day.group(1)) * 24.0
    return 24.0

# 1. Load and prepare dataset
csv_path = os.path.join(os.path.dirname(__file__), "dataset.csv")
df = pd.read_csv(csv_path)

df['rainfall_mm'] = pd.to_numeric(df['rainfall_mm'], errors='coerce').fillna(0.0)
df['duration_hours'] = df['rainfall_period'].apply(get_duration_hours)
df['rain_intensity_mm_h'] = df['rainfall_mm'] / df['duration_hours'].replace(0, 1.0)
df['latitude'] = pd.to_numeric(df['latitude'], errors='coerce').fillna(27.5)
df['longitude'] = pd.to_numeric(df['longitude'], errors='coerce').fillna(92.0)

feature_cols = ['rainfall_mm', 'duration_hours', 'rain_intensity_mm_h', 'latitude', 'longitude']
X = df[feature_cols].values
y = df['is_landslide'].astype(int).values

# 2. Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 3. 5-Fold Stratified Cross Validation Test
model = XGBClassifier(n_estimators=100, max_depth=3, learning_rate=0.08, random_state=42)
scores = cross_validate(model, X_scaled, y, cv=StratifiedKFold(5, shuffle=True, random_state=42),scoring=['accuracy', 'precision', 'recall', 'f1'])

print("=" * 55)
print(f"  TRISHUL XGBOOST MODEL TRAINING ({len(df)} records)")
print("=" * 55)
print(f"  Accuracy : {scores['test_accuracy'].mean()*100:.2f}%  (+/- {scores['test_accuracy'].std()*100:.2f}%)")
print(f"  Precision: {scores['test_precision'].mean()*100:.2f}%")
print(f"  Recall   : {scores['test_recall'].mean()*100:.2f}%")
print(f"  F1-Score : {scores['test_f1'].mean()*100:.2f}%")
print("=" * 55)

# 4. Train final model & save artifacts
model.fit(X_scaled, y)
dir_path = os.path.dirname(__file__)
joblib.dump(model, os.path.join(dir_path, "landslide_model.joblib"))
joblib.dump(scaler, os.path.join(dir_path, "scaler.joblib"))
joblib.dump({"features": feature_cols, "accuracy": round(scores['test_accuracy'].mean()*100, 2)}, os.path.join(dir_path, "model_metadata.joblib"))
print("[SUCCESS] Saved: landslide_model.joblib, scaler.joblib, model_metadata.joblib")
