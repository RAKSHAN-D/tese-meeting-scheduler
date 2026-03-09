import { useMemo, useState } from "react";
import { getDefaultTimezone, getTimezoneByValue, TIMEZONE_OPTIONS } from "../utils/timezones";

export function useTimezone(initialTimezone?: string) {
  const fallback = getDefaultTimezone().value;
  const [timezone, setTimezone] = useState<string>(initialTimezone || fallback);

  const activeTimezone = useMemo(
    () => getTimezoneByValue(timezone) || getDefaultTimezone(),
    [timezone]
  );

  return {
    timezone,
    setTimezone,
    activeTimezone,
    timezoneOptions: TIMEZONE_OPTIONS,
  };
}

