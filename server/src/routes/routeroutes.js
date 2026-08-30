const express = require("express");
const { calculateSafeRoute } = require("../services/dijkstra");

const router = express.Router();

router.post("/calculate", async (req, res, next) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: "Origin and Destination are required."
      });
    }

    const routeData = await calculateSafeRoute(origin, destination);
    res.status(200).json(routeData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
