const { Resend } = require("resend");
const prisma = require("../lib/prisma");

const MAX_ATTEMPTS = Number(process.env.EMAIL_MAX_RETRIES || 3);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const RESEND_FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const formatDateTime = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);

const buildEmailHtml = ({ attendeeName, dateTimeLabel, timezone, meetLink, bookingId }) => {
  const encodedBookingId = encodeURIComponent(String(bookingId));
  const rescheduleUrl = `${FRONTEND_URL}/book?bookingId=${encodedBookingId}&action=reschedule`;
  const cancelUrl = `${FRONTEND_URL}/book?bookingId=${encodedBookingId}&action=cancel`;

  return `
  <div style="font-family: Inter, Arial, sans-serif; background:#f8fafc; padding:24px;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; padding:24px;">
      <h2 style="margin:0 0 14px; color:#1e293b;">New meeting booked with Climatiq</h2>
      <p style="margin:0 0 16px; color:#475569;">Hi ${attendeeName}, your meeting is confirmed.</p>

      <div style="border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:12px 0; margin:12px 0;">
        <p style="margin:6px 0; color:#334155;"><strong>Date / time:</strong> ${dateTimeLabel} (${timezone})</p>
        <p style="margin:6px 0; color:#334155;"><strong>Location:</strong> <a href="${meetLink}" style="color:#0d9488;">${meetLink}</a></p>
      </div>

      <p style="margin:8px 0 12px; color:#64748b;">If you need to make changes to your meeting:</p>
      <div style="display:flex; gap:10px;">
        <a href="${rescheduleUrl}" style="background:#f97316; color:#fff; text-decoration:none; font-weight:600; padding:10px 14px; border-radius:8px;">Reschedule</a>
        <a href="${cancelUrl}" style="border:1px solid #f97316; color:#f97316; text-decoration:none; font-weight:600; padding:10px 14px; border-radius:8px;">Cancel</a>
      </div>
    </div>
  </div>
  `;
};

exports.sendConfirmationEmail = async (booking) => {
  const emailRecord = await prisma.email.findUnique({
    where: { bookingId: booking.id },
  });

  if (!emailRecord) {
    return { ok: false, bookingId: booking.id, message: "Email record not found for booking" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    await prisma.email.update({
      where: { bookingId: booking.id },
      data: {
        status: "FAILED",
        attemptCount: emailRecord.attemptCount + 1,
        lastAttemptAt: new Date(),
        lastError: "Missing RESEND_API_KEY",
      },
    });

    return {
      ok: false,
      bookingId: booking.id,
      message: "Missing RESEND_API_KEY",
    };
  }

  const resend = new Resend(apiKey);
  const attendeeName = `${booking.attendee.firstName} ${booking.attendee.lastName}`.trim();
  const dateTimeLabel = formatDateTime(new Date(booking.timeSlot.startAt));
  const html = buildEmailHtml({
    attendeeName,
    dateTimeLabel,
    timezone: booking.timezone,
    meetLink: booking.meetLink || "https://meet.google.com/abc-defg-hij",
    bookingId: booking.id,
  });

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const { data, error } = await resend.emails.send({
        from: RESEND_FROM,
        to: emailRecord.toEmail,
        subject: emailRecord.subject || "Meeting Confirmation",
        html,
      });

      if (error) {
        throw new Error(error.message || "Resend API error");
      }

      await prisma.email.update({
        where: { bookingId: booking.id },
        data: {
          status: "SENT",
          attemptCount: attempt,
          sentAt: new Date(),
          lastAttemptAt: new Date(),
          providerMessageId: data?.id || null,
          lastError: null,
        },
      });

      return { ok: true, bookingId: booking.id, messageId: data?.id || null };
    } catch (error) {
      const isFinalAttempt = attempt === MAX_ATTEMPTS;

      await prisma.email.update({
        where: { bookingId: booking.id },
        data: {
          status: isFinalAttempt ? "FAILED" : "PENDING",
          attemptCount: attempt,
          lastAttemptAt: new Date(),
          lastError: error.message,
        },
      });

      if (!isFinalAttempt) {
        await sleep(300 * attempt);
      }
    }
  }

  return {
    ok: false,
    bookingId: booking.id,
    message: "Email delivery failed after max retries",
  };
};

