interface ConfirmationCardProps {
  attendeeName: string;
  email: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  meetLink?: string | null;
}

export default function ConfirmationCard({
  attendeeName,
  email,
  dateLabel,
  timeLabel,
  timezoneLabel,
  meetLink,
}: ConfirmationCardProps) {
  return (
    <section className="mx-auto w-full rounded-md border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle,#ccfbf1_0%,#f0fdfa_70%)] text-5xl">
        ??
      </div>

      <h2 className="text-[44px] font-semibold tracking-tight text-[#34495e]">Booking confirmed</h2>
      <p className="mt-3 text-[18px] leading-relaxed text-[#637381]">
        You're booked with {attendeeName}.
        <br />
        An invitation has been emailed to you.
      </p>

      <div className="mt-8 text-[44px] font-semibold text-[#2c3e50]">{dateLabel}</div>
      <div className="text-[44px] font-semibold text-[#2c3e50]">{timeLabel}</div>
      <div className="mt-2 text-base text-[#0d9488]">{timezoneLabel}</div>

      <div className="mx-auto mt-8 max-w-sm border-t border-slate-100 pt-5 text-left text-sm text-[#64748b]">
        <div className="mb-2 font-medium text-[#2c3e50]">Email</div>
        <div className="mb-3">{email}</div>
        <div className="mb-2 font-medium text-[#2c3e50]">Meeting link</div>
        {meetLink ? (
          <a
            href={meetLink}
            target="_blank"
            rel="noreferrer"
            className="break-all text-[#0d9488] underline underline-offset-2"
          >
            {meetLink}
          </a>
        ) : (
          <div>Google Meet link will be shared in the email.</div>
        )}
      </div>
    </section>
  );
}
