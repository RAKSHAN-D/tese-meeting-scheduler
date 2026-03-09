const prisma = require("../lib/prisma");
const {
  SLOT_INTERVAL_MINUTES,
  WORK_DAY_START_HOUR,
  WORK_DAY_END_HOUR,
  BUSINESS_DAYS,
} = require("../config/availability");

const isWithinBusinessWindow = (slot) => {
  const start = new Date(slot.startAt);
  const end = new Date(slot.endAt);

  const day = start.getUTCDay();
  const startHour = start.getUTCHours();
  const endHour = end.getUTCHours();
  const durationMinutes = Math.round((end.getTime() - start.getTime()) / 60000);

  return (
    BUSINESS_DAYS.includes(day) &&
    startHour >= WORK_DAY_START_HOUR &&
    endHour <= WORK_DAY_END_HOUR &&
    durationMinutes === SLOT_INTERVAL_MINUTES
  );
};

exports.getAvailableSlots = async (date) => {
  const where = {
    booking: null,
  };

  if (date) {
    const parsedDate = new Date(date);

    if (!Number.isNaN(parsedDate.getTime())) {
      where.slotDate = parsedDate;
    }
  }

  const slots = await prisma.timeSlot.findMany({
    where,
    orderBy: [{ slotDate: "asc" }, { startAt: "asc" }],
  });

  return slots.filter(isWithinBusinessWindow);
};
