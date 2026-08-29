const Village = require("../models/village");

const createVillage = async (req, res, next) => {
  try {
    const village = await Village.create(req.body);
    res.status(201).json({
      success: true,
      message: "Isolated village record created successfully",
      village
    });
  } catch (error) {
    next(error);
  }
};

const getVillages = async (req, res, next) => {
  try {
    const villages = await Village.find();
    res.status(200).json({
      success: true,
      count: villages.length,
      villages
    });
  } catch (error) {
    next(error);
  }
};

const updateVillageSupplies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { emergencySuppliesDaysLeft, riskOfIsolation, lifelineStatus } = req.body;

    const village = await Village.findOneAndUpdate(
      { villageId: id },
      { emergencySuppliesDaysLeft, riskOfIsolation, lifelineStatus },
      { new: true, runValidators: true }
    );

    if (!village) {
      return res.status(404).json({
        success: false,
        message: "Village record not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Village supplies and risk updated",
      village
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVillage,
  getVillages,
  updateVillageSupplies
};
