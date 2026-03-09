export type BookingStatus = "CONFIRMED" | "CANCELLED" | "RESCHEDULED";
export type EmailStatus = "PENDING" | "SENT" | "FAILED";

export interface TimeSlot {
  id: number;
  slotDate: string;
  startAt: string;
  endAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Attendee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface BookingEmail {
  id?: number;
  bookingId?: number;
  status: EmailStatus;
  attemptCount?: number;
  toEmail: string;
  subject: string;
  providerMessageId?: string | null;
  lastError?: string | null;
  lastAttemptAt?: string | null;
  sentAt?: string | null;
}

export interface Booking {
  id: number;
  attendeeId: number;
  timeSlotId: number;
  status: BookingStatus;
  timezone: string;
  meetLink?: string | null;
  createdAt: string;
  updatedAt: string;
  attendee?: Attendee;
  timeSlot?: TimeSlot;
  email?: BookingEmail;
}

export interface CreateBookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  timeSlotId: number;
  timezone: string;
}

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  message: string;
}

export interface TimezoneOption {
  label: string;
  value: string;
  offsetMinutes: number;
}

export interface BookingFlowState {
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  timezone: string;
  attendee: Attendee | null;
  booking: Booking | null;
}
