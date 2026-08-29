const express = require("express");

const {
  createSensor,
  getSensors,
  getSensorById,
  getSensorTelemetry,
  createSensorTelemetry
} = require("../controllers/sensorcontroller");

const router = express.Router();

router.post("/", createSensor);
router.get("/", getSensors);
router.get("/:id", getSensorById);
router.get("/:id/telemetry", getSensorTelemetry);
router.post("/:id/telemetry", createSensorTelemetry);

module.exports = router;