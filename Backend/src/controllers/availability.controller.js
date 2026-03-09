const asyncHandler = require("../utils/asyncHandler");
const availabilityService = require("../services/availabilityService");

exports.getSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const slots = await availabilityService.getAvailableSlots(date);

  res.status(200).json({ ok: true, data: slots });
});
