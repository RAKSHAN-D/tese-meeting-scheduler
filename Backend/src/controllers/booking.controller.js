const asyncHandler = require("../utils/asyncHandler");
const bookingService = require("../services/bookingService");
const emailService = require("../services/emailService");

exports.createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(req.body);

  // Fire-and-forget style can be added later with a queue.
  await emailService.sendConfirmationEmail(booking);

  res.status(201).json({ ok: true, data: booking });
});
