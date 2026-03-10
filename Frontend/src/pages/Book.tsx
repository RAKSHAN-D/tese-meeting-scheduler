import BookingForm from "../components/BookingForm";
import MeetingShell from "../components/MeetingShell";

interface BookPageProps {
  selectedDateTimeLabel: string;
  timezoneLabel: string;
  meetLabel?: string;
  isSubmitting?: boolean;
  initialValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  onBack: () => void;
  onSubmit: (values: { firstName: string; lastName: string; email: string }) => void;
}

function StepperYourInfo() {
  return (
    <div className="mb-6 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-slate-600">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7a59] text-white">
            {"\u2713"}
          </span>
          <span>Choose Time</span>
        </div>
        <span className="hidden h-[2px] w-28 bg-[#ff7a59] sm:block" />
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#ff7a59] text-[#ff7a59]">
            2
          </span>
          <span>Your Info</span>
        </div>
      </div>
    </div>
  );
}

export default function Book({
  selectedDateTimeLabel,
  timezoneLabel,
  meetLabel = "Google Meet",
  isSubmitting = false,
  initialValues,
  onBack,
  onSubmit,
}: BookPageProps) {
  return (
    <MeetingShell step={3} selectedDateLabel={selectedDateTimeLabel} selectedTimeLabel={timezoneLabel}>
      <StepperYourInfo />

      <div className="mb-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#1f2a5e]">climatiq</h1>
      </div>

      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-200 bg-white">
        <BookingForm
          selectedDateTimeLabel={selectedDateTimeLabel}
          timezoneLabel={timezoneLabel}
          meetLabel={meetLabel}
          initialValues={initialValues}
          isSubmitting={isSubmitting}
          onBack={onBack}
          onSubmit={onSubmit}
        />
      </div>
    </MeetingShell>
  );
}

