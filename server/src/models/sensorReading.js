const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
  {
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: true
    },
    rainMm: {
      type: Number,
      required: true
    },
    soilSaturation: {
      type: Number,
      required: true
    },
    porePressureKPa: {
      type: Number,
      required: true
    },
    tiltAngleDeg: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Index for fast query of historic data
sensorReadingSchema.index({ sensorId: 1, timestamp: -1 });

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
