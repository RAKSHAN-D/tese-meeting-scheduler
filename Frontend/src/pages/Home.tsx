import Calendar from "../components/Calendar";
import MeetingShell from "../components/MeetingShell";
import TimeSlotPicker from "../components/TimeSlotPicker";
import type { TimeSlot } from "../types";
import { formatTimeForTimezone, getTimezoneByValue } from "../utils/timezones";

interface HomePageProps {
  selectedDate: string | null;
  availableDates: string[];
  slots: TimeSlot[];
  timezone: string;
  selectedSlotId: number | null;
  isSlotsLoading?: boolean;
  onDateSelect: (date: string) => void;
  onTimezoneChange: (timezone: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
  onConfirmTime: () => void;
}

function StepperChooseTime() {
  return (
    <div className="mb-6 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-slate-600">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#ff7a59] text-[#ff7a59]">
            1
          </span>
          <span>Choose Time</span>
        </div>
        <span className="h-[2px] w-28 bg-slate-300" />
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300 text-slate-400">
            2
          </span>
          <span>Your Info</span>
        </div>
      </div>
    </div>
  );
}

const formatDateOnly = (dateValue: string | null): string | undefined => {
  if (!dateValue) return undefined;
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
};

export default function Home({
  selectedDate,
  availableDates,
  slots,
  timezone,
  selectedSlotId,
  isSlotsLoading = false,
  onDateSelect,
  onTimezoneChange,
  onSlotSelect,
  onConfirmTime,
}: HomePageProps) {
  const tz = getTimezoneByValue(timezone);
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) || null;
  const selectedDateLabel = formatDateOnly(selectedDate);
  const selectedTimeLabel =
    selectedSlot && tz ? formatTimeForTimezone(selectedSlot.startAt, tz.offsetMinutes) : undefined;

  return (
    <MeetingShell step={1} selectedDateLabel={selectedDateLabel} selectedTimeLabel={selectedTimeLabel}>
      <StepperChooseTime />

      <div className="mb-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#1f2a5e]">climatiq</h1>
      </div>

      <section className="grid w-full grid-cols-1 gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-2">
        <div className="bg-[#466481] p-4 md:p-6">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            availableDates={availableDates}
            initialMonth={2}
            initialYear={2026}
          />
        </div>
        <div className="p-4 md:p-6">
          <TimeSlotPicker
            selectedDate={selectedDate}
            slots={slots}
            timezone={timezone}
            selectedSlotId={selectedSlotId}
            onTimezoneChange={onTimezoneChange}
            onSlotSelect={onSlotSelect}
            onConfirmTime={onConfirmTime}
            isLoading={isSlotsLoading}
          />
        </div>
      </section>
    </MeetingShell>
  );
}
