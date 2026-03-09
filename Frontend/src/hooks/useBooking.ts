import { useCallback, useMemo, useState } from "react";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  Booking,
  CreateBookingPayload,
  TimeSlot,
} from "../types";
import { getDefaultTimezone } from "../utils/timezones";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const toDateKey = (value: string): string => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function useBooking() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string>(getDefaultTimezone().value);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSlotsLoading, setIsSlotsLoading] = useState<boolean>(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const fetchSlots = useCallback(async (date: string) => {
    setIsSlotsLoading(true);
    setSlotsError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/availability/slots?date=${encodeURIComponent(date)}`
      );
      const json =
        (await response.json()) as ApiSuccessResponse<TimeSlot[]> | ApiErrorResponse;

      if (!response.ok || !json.ok) {
        throw new Error((json as ApiErrorResponse).message || "Failed to load slots");
      }

      const normalized = json.data.filter((slot) => toDateKey(slot.slotDate) === date);
      setSlots(normalized);
      setSelectedSlot(null);
    } catch (error) {
      setSlots([]);
      setSelectedSlot(null);
      setSlotsError(error instanceof Error ? error.message : "Failed to load slots");
    } finally {
      setIsSlotsLoading(false);
    }
  }, []);

  const chooseDate = useCallback(
    async (date: string) => {
      setSelectedDate(date);
      await fetchSlots(date);
    },
    [fetchSlots]
  );

  const chooseSlot = useCallback((slot: TimeSlot) => {
    setSelectedSlot(slot);
  }, []);

  const submitBooking = useCallback(
    async (payload: Omit<CreateBookingPayload, "timeSlotId" | "timezone">) => {
      if (!selectedSlot) {
        throw new Error("No slot selected");
      }

      setIsBookingSubmitting(true);
      setBookingError(null);

      try {
        const requestBody: CreateBookingPayload = {
          ...payload,
          timeSlotId: selectedSlot.id,
          timezone,
        };

        const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const json = (await response.json()) as ApiSuccessResponse<Booking> | ApiErrorResponse;

        if (!response.ok || !json.ok) {
          throw new Error((json as ApiErrorResponse).message || "Booking failed");
        }

        setBooking(json.data);
        return json.data;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Booking failed";
        setBookingError(message);
        throw error;
      } finally {
        setIsBookingSubmitting(false);
      }
    },
    [selectedSlot, timezone]
  );

  const availableDates = useMemo(() => {
    const dateKeys = slots.map((slot) => toDateKey(slot.slotDate));
    return Array.from(new Set(dateKeys));
  }, [slots]);

  return {
    selectedDate,
    timezone,
    slots,
    selectedSlot,
    booking,
    availableDates,
    isSlotsLoading,
    isBookingSubmitting,
    slotsError,
    bookingError,
    setTimezone,
    chooseDate,
    chooseSlot,
    fetchSlots,
    submitBooking,
    resetBooking: () => {
      setBooking(null);
      setBookingError(null);
      setSelectedSlot(null);
    },
  };
}

