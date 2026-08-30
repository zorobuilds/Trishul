const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    category: {
      type: String,
      required: true,
      enum: [
        "LANDSLIDE",
        "ROAD_BLOCKAGE",
        "SLOPE_MOVEMENT",
        "FLASH_FLOOD",
        "BRIDGE_DAMAGE",
        "TREE_FALL"
      ]
    },

    severity: {
      type: String,
      required: true,
      enum: ["CRITICAL", "HIGH", "MODERATE", "LOW"]
    },

    status: {
      type: String,
      enum: ["PENDING_REVIEW", "VERIFIED", "RESOLVED","REJECTED"],
      default: "PENDING_REVIEW"
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

    description: {
      type: String,
      trim: true,
      maxlength: 2000
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

    reporterName: {
      type: String,
      trim: true
    },

    reporterContact: {
      type: String,
      trim: true
    },

    imageUrl: {
      type: String,
      default: null
    },

    clientCreatedAt: {
      type: Date
    },

    isOfflineDraft: {
      type: Boolean,
      default: false
    },

    clientReportId: {
      type: String,
      unique: true,
      sparse: true
    }
  },

  {
    timestamps: true
  }
);

incidentSchema.index({
  location: "2dsphere"
});

module.exports = mongoose.model("Incident", incidentSchema);
