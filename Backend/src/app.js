const express = require("express");
const cors = require("cors");

const availabilityRoutes = require("./routes/availability.routes");
const bookingRoutes = require("./routes/booking.routes");
const asyncHandler = require("./utils/asyncHandler");
const errorHandler = require("./middleware/errorHandler");
const prisma = require("./lib/prisma");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meeting Scheduler Backend Running");
});

app.get(
  "/health/db",
  asyncHandler(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ ok: true, message: "Database connection is healthy" });
  })
);

app.use("/api/v1/availability", availabilityRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
