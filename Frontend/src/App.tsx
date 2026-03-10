import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Confirmation from "./pages/Confirmation";
import { useBooking } from "./hooks/useBooking";
import { formatDateForTimezone, formatTimeForTimezone, getTimezoneByValue } from "./utils/timezones";

function AppRoutes() {
  const navigate = useNavigate();
  const {
    selectedDate,
    timezone,
    slots,
    selectedSlot,
    booking,
    availableDates,
    isSlotsLoading,
    isBookingSubmitting,
    chooseDate,
    chooseSlot,
    submitBooking,
    setTimezone,
  } = useBooking();

  const timezoneMeta = getTimezoneByValue(timezone);
  const offsetMinutes = timezoneMeta?.offsetMinutes ?? 330;
  const timezoneLabel = timezoneMeta?.label ?? "UTC+05:30";

  const selectedDateTimeLabel = selectedSlot
    ? `${formatDateForTimezone(selectedSlot.startAt, offsetMinutes)} ${formatTimeForTimezone(
        selectedSlot.startAt,
        offsetMinutes
      )}`
    : "No slot selected";

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            selectedDate={selectedDate}
            availableDates={availableDates}
            slots={slots}
            timezone={timezone}
            selectedSlotId={selectedSlot?.id ?? null}
            isSlotsLoading={isSlotsLoading}
            onDateSelect={chooseDate}
            onTimezoneChange={setTimezone}
            onSlotSelect={chooseSlot}
            onConfirmTime={() => navigate("/book")}
          />
        }
      />
      <Route
        path="/book"
        element={
          selectedSlot ? (
            <Book
              selectedDateTimeLabel={selectedDateTimeLabel}
              timezoneLabel={timezoneLabel}
              isSubmitting={isBookingSubmitting}
              onBack={() => navigate("/")}
              onSubmit={async (values) => {
                await submitBooking(values);
                navigate("/confirmation");
              }}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/confirmation"
        element={
          booking ? (
            <Confirmation
              attendeeName={
                booking.attendee
                  ? `${booking.attendee.firstName} ${booking.attendee.lastName}`
                  : "Attendee"
              }
              email={booking.attendee?.email || "No email"}
              dateLabel={booking.timeSlot ? formatDateForTimezone(booking.timeSlot.startAt, offsetMinutes) : ""}
              timeLabel={booking.timeSlot ? formatTimeForTimezone(booking.timeSlot.startAt, offsetMinutes) : ""}
              timezoneLabel={timezoneLabel}
              meetLink={booking.meetLink}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
