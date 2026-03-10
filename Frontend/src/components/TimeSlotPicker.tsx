import type { TimeSlot } from "../types";
import { TIMEZONE_OPTIONS, mapSlotsWithTimezone } from "../utils/timezones";
import { Button, Select, Spinner } from "./ui";

interface TimeSlotPickerProps {
  selectedDate: string | null;
  slots: TimeSlot[];
  timezone: string;
  selectedSlotId: number | null;
  onTimezoneChange: (timezone: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
  onConfirmTime?: () => void;
  isLoading?: boolean;
}

const formatSelectedDateLabel = (dateValue: string | null): string => {
  if (!dateValue) return "Select a date to view slots";
  const date = new Date(`${dateValue}T00:00:00`);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function TimeSlotPicker({
  selectedDate,
  slots,
  timezone,
  selectedSlotId,
  onTimezoneChange,
  onSlotSelect,
  onConfirmTime,
  isLoading = false,
}: TimeSlotPickerProps) {
  const timezoneOptions = TIMEZONE_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  const displaySlots = mapSlotsWithTimezone(slots, timezone);
  const showConfirmButton = selectedSlotId !== null;

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-800">
          {formatSelectedDateLabel(selectedDate)}
        </h3>
        <div className="w-full sm:min-w-[180px] sm:w-auto">
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={timezone}
            onChange={(event) => onTimezoneChange(event.target.value)}
          />
        </div>
      </div>

      <div
        className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-2"
        style={{ maxHeight: 340, overflowY: "auto" }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner label="Loading slots..." />
          </div>
        ) : displaySlots.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">No slots available.</p>
        ) : (
          displaySlots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSlotSelect(slot)}
                onMouseEnter={(event) => {
                  if (!isSelected) {
                    event.currentTarget.style.borderColor = "#14b8a6";
                  }
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = isSelected
                    ? "#14b8a6"
                    : "#e2e8f0";
                }}
                className={`w-full rounded-xl border text-sm font-medium transition ${
                  isSelected
                    ? "bg-[#f0fdfa] text-teal-800"
                    : "bg-white text-slate-700"
                }`}
                style={{
                  textAlign: "center",
                  borderColor: isSelected ? "#14b8a6" : "#e2e8f0",
                  padding: "11px 16px",
                }}
              >
                <div>{slot.displayStart}</div>
              </button>
            );
          })
        )}
      </div>

      {showConfirmButton ? (
        <div className="mt-4">
          <Button
            type="button"
            onClick={onConfirmTime}
            className="w-full text-white"
            style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)" }}
          >
            Confirm time
          </Button>
        </div>
      ) : null}
    </section>
  );
}

