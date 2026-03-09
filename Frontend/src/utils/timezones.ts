import type { TimeSlot, TimezoneOption } from "../types";

const BASE_OFFSETS = [5, 5.5, 6, 6.5, 7];

const toOffsetMinutes = (offsetHours: number): number =>
  Math.round(offsetHours * 60);

const toOffsetLabel = (offsetMinutes: number): string => {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = Math.floor(absolute / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (absolute % 60).toString().padStart(2, "0");

  return `UTC${sign}${hours}:${minutes}`;
};

export const TIMEZONE_OPTIONS: TimezoneOption[] = BASE_OFFSETS.map(
  (offsetHours) => {
    const offsetMinutes = toOffsetMinutes(offsetHours);
    const label = toOffsetLabel(offsetMinutes);

    return {
      label,
      value: label,
      offsetMinutes,
    };
  }
);

export const getTimezoneByValue = (
  value: string
): TimezoneOption | undefined => TIMEZONE_OPTIONS.find((tz) => tz.value === value);

export const getDefaultTimezone = (): TimezoneOption => TIMEZONE_OPTIONS[0];

const shiftDateByMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60 * 1000);

export const formatTimeForTimezone = (
  isoDateTime: string,
  offsetMinutes: number,
  locale = "en-US"
): string => {
  const utcDate = new Date(isoDateTime);
  const shifted = shiftDateByMinutes(utcDate, offsetMinutes);

  return shifted.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDateForTimezone = (
  isoDateTime: string,
  offsetMinutes: number,
  locale = "en-US"
): string => {
  const utcDate = new Date(isoDateTime);
  const shifted = shiftDateByMinutes(utcDate, offsetMinutes);

  return shifted.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const mapSlotsWithTimezone = (
  slots: TimeSlot[],
  timezoneValue: string
): Array<
  TimeSlot & {
    displayStart: string;
    displayEnd: string;
    displayDate: string;
  }
> => {
  const timezone = getTimezoneByValue(timezoneValue) || getDefaultTimezone();

  return slots.map((slot) => ({
    ...slot,
    displayStart: formatTimeForTimezone(slot.startAt, timezone.offsetMinutes),
    displayEnd: formatTimeForTimezone(slot.endAt, timezone.offsetMinutes),
    displayDate: formatDateForTimezone(slot.startAt, timezone.offsetMinutes),
  }));
};
