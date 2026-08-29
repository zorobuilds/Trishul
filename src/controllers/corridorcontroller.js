const Corridor = require("../models/corridor");

const createCorridor = async (req, res, next) => {
  try {
    const corridor = await Corridor.create(req.body);
    res.status(201).json({
      success: true,
      message: "Highway corridor created successfully",
      corridor
    });
  } catch (error) {
    next(error);
  }
};

const getCorridors = async (req, res, next) => {
  try {
    const corridors = await Corridor.find();
    res.status(200).json({
      success: true,
      count: corridors.length,
      corridors
    });
  } catch (error) {
    next(error);
  }
};

const getCorridorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const corridor = await Corridor.findOne({ corridorId: id });
    if (!corridor) {
      return res.status(404).json({
        success: false,
        message: "Corridor not found"
      });
    }
    res.status(200).json({
      success: true,
      corridor
    });
  } catch (error) {
    next(error);
  }
};

const updateCorridorStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, riskScore, estimatedClearance } = req.body;

    const corridor = await Corridor.findOneAndUpdate(
      { corridorId: id },
      { status, riskScore, estimatedClearance },
      { new: true, runValidators: true }
    );

    if (!corridor) {
      return res.status(404).json({
        success: false,
        message: "Corridor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Corridor status updated successfully",
      corridor
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCorridor,
  getCorridors,
  getCorridorById,
  updateCorridorStatus
};
