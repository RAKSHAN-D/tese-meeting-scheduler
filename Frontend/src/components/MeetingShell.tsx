import type { ReactNode } from "react";

interface MeetingShellProps {
  step: 1 | 3 | 4;
  selectedDateLabel?: string;
  selectedTimeLabel?: string;
  children: ReactNode;
}

function MetaRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base">{icon}</span>
      <div>
        <div className="text-[11px] tracking-wide text-[#7ecfc4]">{label}</div>
        <div className="text-[13px] font-medium text-[#e2f4f0]">{value}</div>
      </div>
    </div>
  );
}

export default function MeetingShell({
  step,
  selectedDateLabel,
  selectedTimeLabel,
  children,
}: MeetingShellProps) {
  return (
    <main className="min-h-screen bg-[#f1f5f9] px-4 py-6 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,32,39,0.18),0_4px_20px_rgba(15,32,39,0.08)]">
        <aside className="relative hidden min-h-[720px] w-[290px] shrink-0 flex-col gap-7 overflow-hidden bg-[linear-gradient(160deg,#0f2027_0%,#1a3a4a_60%,#0d3b40_100%)] px-8 py-12 md:flex">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.18)_0%,transparent_70%)]" />

          <div>
            <div className="mb-1.5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#14b8a6,#0e7490)] text-lg font-extrabold text-white">
                C
              </div>
              <span className="text-[17px] font-bold tracking-[0.3px] text-white">Climatiq</span>
            </div>
            <div className="text-xs tracking-wide text-[#7ecfc4]">Carbon Intelligence Platform</div>
          </div>

          <div className="border-t border-white/10" />

          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[1px] text-[#7ecfc4]">Meeting type</div>
              <div className="text-2xl font-bold leading-tight text-white">Product Demo</div>
              <div className="mt-1 text-sm text-[#a5d8d2]">with Climatiq Team</div>
            </div>
            <MetaRow icon="⏱" label="Duration" value="30 minutes" />
            <MetaRow icon="📹" label="Location" value="Google Meet" />
            <MetaRow icon="🌍" label="Format" value="Online meeting" />

            {selectedDateLabel ? (
              <div className="mt-1 rounded-[10px] border border-[#14b8a640] bg-[#14b8a61f] p-3.5">
                <div className="mb-1.5 text-[11px] tracking-[0.8px] text-[#7ecfc4]">Selected time</div>
                <div className="text-sm font-semibold text-[#e2f4f0]">{selectedDateLabel}</div>
                {selectedTimeLabel ? (
                  <div className="mt-1 text-base font-bold text-[#14b8a6]">{selectedTimeLabel}</div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-auto">
            <div className="mb-2 flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="h-1 rounded-sm transition-all duration-300"
                  style={{
                    background: step >= s ? "#14b8a6" : "rgba(255,255,255,0.15)",
                    flex: step >= s ? 2 : 1,
                  }}
                />
              ))}
            </div>
            <div className="text-[11px] text-[#7ecfc4]">Step {step} of 4</div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-5 md:p-10">{children}</section>
      </div>
    </main>
  );
}

