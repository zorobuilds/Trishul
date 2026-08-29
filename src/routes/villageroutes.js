const express = require("express");
const {
  createVillage,
  getVillages,
  updateVillageSupplies
} = require("../controllers/villagecontroller");

const router = express.Router();

router.post("/", createVillage);
router.get("/", getVillages);
router.patch("/:id/supplies", updateVillageSupplies);

module.exports = router;
