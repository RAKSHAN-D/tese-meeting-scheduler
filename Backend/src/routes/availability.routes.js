const express = require("express");

const availabilityController = require("../controllers/availability.controller");

const router = express.Router();

router.get("/slots", availabilityController.getSlots);

module.exports = router;
