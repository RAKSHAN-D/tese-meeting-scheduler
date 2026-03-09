const express = require("express");

const bookingController = require("../controllers/booking.controller");
const validate = require("../middleware/validation");

const router = express.Router();

const bookingBodySchema = (body) => {
  const required = ["firstName", "lastName", "email", "timeSlotId", "timezone"];
  const missing = required.filter((field) => !body[field]);

  if (missing.length > 0) {
    return { success: false, message: `Missing required fields: ${missing.join(", ")}` };
  }

  if (typeof body.timeSlotId !== "number") {
    return { success: false, message: "timeSlotId must be a number" };
  }

  return { success: true };
};

router.post("/", validate(bookingBodySchema), bookingController.createBooking);

module.exports = router;
