const express = require("express");

const {createIncident,getIncidents,getIncidentById,updateIncidentStatus,getBulletins} = require("../controllers/incidentcontroller");

const router = express.Router();

router.post("/", createIncident);
router.get("/",getIncidents);
router.get("/bulletins",getBulletins)
router.get("/:id",getIncidentById);
router.patch("/:id/status", updateIncidentStatus);




module.exports = router;