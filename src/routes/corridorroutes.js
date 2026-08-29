const express = require("express");
const {
  createCorridor,
  getCorridors,
  getCorridorById,
  updateCorridorStatus
} = require("../controllers/corridorcontroller");

const router = express.Router();

router.post("/", createCorridor);
router.get("/", getCorridors);
router.get("/:id", getCorridorById);
router.patch("/:id/status", updateCorridorStatus);

module.exports = router;
