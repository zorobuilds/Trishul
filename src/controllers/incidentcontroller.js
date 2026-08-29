const Incident = require("../models/incident");

const createIncident = async (req, res, next) => {
  try {
    const {
      title,
      category,
      severity,
      state,
      locationName,
      lat,
      lng,
      description,
      reporterName,
      reporterContact,
      clientCreatedAt,
      isOfflineDraft
    } = req.body;

    // Convert frontend lat/lng into GeoJSON
    const incident = await Incident.create({
      title,
      category,
      severity,
      state,
      locationName,
      description,
      reporterName,
      reporterContact,
      clientCreatedAt,
      isOfflineDraft,

      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });

    // Emit live websocket update
    const io = req.app.get("io");
    if (io) {
      io.emit("incidentCreated", {
        id: incident._id,
        title: incident.title,
        category: incident.category,
        severity: incident.severity,
        state: incident.state,
        locationName: incident.locationName,
        lat: incident.location.coordinates[1],
        lng: incident.location.coordinates[0],
        description: incident.description,
        reporterName: incident.reporterName,
        status: incident.status,
        createdAt: incident.createdAt
      });
    }

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      incident
    });
  } catch (error) {
    next(error);
  }
};

const getIncidents = async (req, res, next) => {
  try {
    const dbIncidents = await Incident.find().sort({ createdAt: -1 });

    // Format GeoJSON back to flat lat/lng for React frontend ease
    const formatted = dbIncidents.map((inc) => ({
      id: inc._id,
      title: inc.title,
      category: inc.category,
      severity: inc.severity,
      state: inc.state,
      locationName: inc.locationName,
      lat: inc.location ? inc.location.coordinates[1] : null,
      lng: inc.location ? inc.location.coordinates[0] : null,
      description: inc.description,
      reporterName: inc.reporterName,
      reporterContact: inc.reporterContact,
      imageUrl: inc.imageUrl,
      status: inc.status,
      timestamp: inc.clientCreatedAt || inc.createdAt,
      synced: true
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      incidents: formatted
    });
  } catch (error) {
    next(error);
  }
};

const getIncidentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    const formatted = {
      id: incident._id,
      title: incident.title,
      category: incident.category,
      severity: incident.severity,
      state: incident.state,
      locationName: incident.locationName,
      lat: incident.location ? incident.location.coordinates[1] : null,
      lng: incident.location ? incident.location.coordinates[0] : null,
      description: incident.description,
      reporterName: incident.reporterName,
      reporterContact: incident.reporterContact,
      imageUrl: incident.imageUrl,
      status: incident.status,
      timestamp: incident.clientCreatedAt || incident.createdAt,
      synced: true
    };

    res.status(200).json({
      success: true,
      incident: formatted
    });
  } catch (error) {
    next(error);
  }
};

const updateIncidentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const incident = await Incident.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    // Emit live status update
    const io = req.app.get("io");
    if (io) {
      io.emit("incidentStatusUpdated", {
        id: incident._id,
        status: incident.status
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident status updated successfully",
      incident
    });
  } catch (error) {
    next(error);
  }
};

const getBulletins = async (req, res, next) => {
  try {
    const bulletins = await Incident.find({
      status: "VERIFIED"
    }).sort({ createdAt: -1 });

    const formatted = bulletins.map((inc) => ({
      id: inc._id,
      title: inc.title,
      category: inc.category,
      severity: inc.severity,
      state: inc.state,
      locationName: inc.locationName,
      lat: inc.location ? inc.location.coordinates[1] : null,
      lng: inc.location ? inc.location.coordinates[0] : null,
      description: inc.description,
      reporterName: inc.reporterName,
      status: inc.status,
      timestamp: inc.clientCreatedAt || inc.createdAt
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      bulletins: formatted
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  getBulletins
};