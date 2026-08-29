const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema(
  {
    villageId: { type: String, required: true, unique: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    population: { type: Number, required: true },
    riskOfIsolation: { type: String, required: true },
    primaryRoad: { type: String, required: true },
    lifelineStatus: { type: String, required: true },
    emergencySuppliesDaysLeft: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Village", villageSchema);
