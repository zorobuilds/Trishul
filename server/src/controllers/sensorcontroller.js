const Sensor = require("../models/sensors");
const SensorReading = require("../models/sensorReading");

const createSensor = async (req, res, next) => {
  try {
    const sensor = await Sensor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Sensor created successfully",
      sensor
    });
  } catch (error) {
    next(error);
  }
};

const getSensors = async (req, res, next) => {
  try {
    const sensors = await Sensor.find();

    res.status(200).json({
      success: true,
      count: sensors.length,
      sensors
    });
  } catch (error) {
    next(error);
  }
};

const getSensorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sensor = await Sensor.findById(id);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found"
      });
    }

    res.status(200).json({
      success: true,
      sensor
    });
  } catch (error) {
    next(error);
  }
};

const getSensorTelemetry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const readings = await SensorReading.find({ sensorId: id })
      .sort({ timestamp: -1 })
      .limit(8);

    // Reverse to get chronological order (ascending)
    readings.reverse();

    const formattedReadings = readings.map((r) => {
      const date = new Date(r.timestamp);
      const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      return {
        time: timeStr,
        rainMm: r.rainMm,
        soilSaturation: r.soilSaturation,
        porePressureKPa: r.porePressureKPa,
        tiltAngleDeg: r.tiltAngleDeg,
        riskThreshold: 50
      };
    });

    res.status(200).json({
      success: true,
      telemetry: formattedReadings
    });
  } catch (error) {
    next(error);
  }
};

const createSensorTelemetry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rainMm, soilSaturation, porePressureKPa, tiltAngleDeg, timestamp } = req.body;

    const reading = await SensorReading.create({
      sensorId: id,
      rainMm,
      soilSaturation,
      porePressureKPa,
      tiltAngleDeg,
      timestamp: timestamp || new Date()
    });

    // Update lastReading date on main sensor document
    await Sensor.findByIdAndUpdate(id, { lastReading: reading.timestamp });

    // Emit live websocket warning if threshold exceeded
    if (soilSaturation > 90 || porePressureKPa > 140 || Math.abs(tiltAngleDeg) > 4.5) {
      const io = req.app.get("io");
      if (io) {
        io.emit("sensorAlert", {
          sensorId: id,
          soilSaturation,
          porePressureKPa,
          tiltAngleDeg,
          timestamp: reading.timestamp
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Sensor telemetry recorded successfully",
      reading
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSensor,
  getSensors,
  getSensorById,
  getSensorTelemetry,
  createSensorTelemetry
};