const mongoose = require("mongoose");

const alternativeRouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["BLOCKED", "RESTRICTED", "OPEN_CAUTION", "OPEN_CLEAR"], required: true },
  delayMin: { type: String },
  roadCondition: { type: String }
});

const corridorSchema = new mongoose.Schema(
  {
    corridorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    status: {
      type: String,
      enum: ["BLOCKED", "RESTRICTED", "OPEN_CAUTION", "OPEN_CLEAR"],
      default: "OPEN_CLEAR"
    },
    riskScore: { type: String, required: true },
    lengthKm: { type: Number, required: true },
    vulnerableSections: [{ type: String }],
    estimatedClearance: { type: String },
    alternativeRoutes: [alternativeRouteSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Corridor", corridorSchema);
