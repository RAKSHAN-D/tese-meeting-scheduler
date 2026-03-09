const prisma = require("../lib/prisma");

const randomLetters = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

const generateDummyMeetLink = () =>
  `https://meet.google.com/${randomLetters(3)}-${randomLetters(4)}-${randomLetters(3)}`;

exports.createBooking = async ({ firstName, lastName, email, timeSlotId, timezone }) => {
  return prisma.$transaction(async (tx) => {
    const attendee = await tx.attendee.upsert({
      where: { email },
      update: { firstName, lastName },
      create: { firstName, lastName, email },
    });

    const booking = await tx.booking.create({
      data: {
        attendeeId: attendee.id,
        timeSlotId,
        timezone,
        meetLink: generateDummyMeetLink(),
      },
      include: {
        attendee: true,
        timeSlot: true,
      },
    });

    await tx.email.create({
      data: {
        bookingId: booking.id,
        toEmail: attendee.email,
        subject: "Meeting Confirmation",
      },
    });

    return booking;
  });
};
