const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    sensorType: {
      type: String,
      required: true,
      enum: [
        "INCLINOMETER",
        "PIEZOMETER",
        "RAIN_GAUGE"
      ]
    },

    state: {
      type: String,
      required: true,
      trim: true
    },

    locationName: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },

      coordinates: {
        type: [Number],
        required: true
      }
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
        "OFFLINE",
        "MAINTENANCE"
      ],
      default: "ACTIVE"
    },

    lastReading: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

sensorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Sensor", sensorSchema);