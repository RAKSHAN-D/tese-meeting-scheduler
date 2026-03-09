import { useMemo, useState } from "react";

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  availableDates?: string[];
  initialMonth?: number; // 0-based
  initialYear?: number;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Calendar({
  selectedDate,
  onDateSelect,
  availableDates = [],
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(new Date(initialYear, initialMonth, 1));
  const availableSet = useMemo(() => new Set(availableDates), [availableDates]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayIndex + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return new Date(year, month, dayNumber);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          aria-label="Previous month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-base text-slate-700 transition hover:opacity-90"
          style={{ backgroundColor: "#f1f5f9" }}
        >
          ‹
        </button>
        <h2 className="text-base font-semibold text-slate-900">
          {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button
          type="button"
          onClick={goNextMonth}
          aria-label="Next month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-base text-slate-700 transition hover:opacity-90"
          style={{ backgroundColor: "#f1f5f9" }}
        >
          ›
        </button>
      </header>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className="h-12" />;

          const key = toDateKey(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isPast = date < today;
          const isDisabled = isWeekend || isPast;
          const isSelected = selectedDate === key;
          const isToday = key === toDateKey(today);
          const isAvailable = availableSet.has(key);

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => onDateSelect(key)}
              className={`relative h-12 rounded-lg text-sm transition ${
                isSelected
                  ? "text-white"
                  : isDisabled
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-white text-slate-800 hover:bg-teal-50"
              }`}
              style={{
                backgroundColor: isSelected ? "#14b8a6" : undefined,
                border: isToday ? "2px solid #14b8a6" : undefined,
              }}
            >
              {date.getDate()}
              {isAvailable && !isDisabled ? (
                <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-500" />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
