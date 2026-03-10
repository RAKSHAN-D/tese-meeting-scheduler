import ConfirmationCard from "../components/ConfirmationCard";
import MeetingShell from "../components/MeetingShell";

interface ConfirmationPageProps {
  attendeeName: string;
  email: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  meetLink?: string | null;
}

function StepperCompleted() {
  return (
    <div className="mb-8 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-slate-600">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7a59] text-white">
            {"\u2713"}
          </span>
          <span>Choose Time</span>
        </div>
        <span className="hidden h-[2px] w-28 bg-[#ff7a59] sm:block" />
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff7a59] text-white">
            {"\u2713"}
          </span>
          <span>Your Info</span>
        </div>
      </div>
    </div>
  );
}

export default function Confirmation({
  attendeeName,
  email,
  dateLabel,
  timeLabel,
  timezoneLabel,
  meetLink,
}: ConfirmationPageProps) {
  return (
    <MeetingShell step={4} selectedDateLabel={dateLabel} selectedTimeLabel={`${timeLabel} · ${timezoneLabel}`}>
      <StepperCompleted />

      <div className="mx-auto w-full max-w-md">
        <ConfirmationCard
          attendeeName={attendeeName}
          email={email}
          dateLabel={dateLabel}
          timeLabel={timeLabel}
          timezoneLabel={timezoneLabel}
          meetLink={meetLink}
        />
      </div>
    </MeetingShell>
  );
}
