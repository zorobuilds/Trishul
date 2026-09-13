const express = require("express");
const router = express.Router();
const {
  predictSensorRisk,
  predictAllSensorsRisk,
  predictCustom,
  getModelInfo
} = require("../controllers/aicontroller");

router.get("/model-info", getModelInfo);
router.get("/predict/sensor/:sensorId", predictSensorRisk);
router.get("/predict/all", predictAllSensorsRisk);
router.post("/predict", predictCustom);

module.exports = router;
