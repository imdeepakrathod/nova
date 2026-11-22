import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export const launchDate = new Date('2028-10-14T16:30:00Z');

function getTimeRemaining(targetDate) {
  const targetTime = targetDate instanceof Date ? targetDate.getTime() : NaN;
  if (!Number.isFinite(targetTime)) return null;

  const difference = Math.max(0, targetTime - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function useCountdown(targetDate) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    setTime(getTimeRemaining(targetDate));
    if (!Number.isFinite(targetDate?.getTime?.())) return undefined;

    const intervalId = window.setInterval(() => setTime(getTimeRemaining(targetDate)), 1000);
    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  return time;
}

function Countdown({ targetDate = launchDate }) {
  const time = useCountdown(targetDate);
  const isValidTarget = Number.isFinite(targetDate?.getTime?.());
  const safeTime = time;
  const countdownBlocks = safeTime ? [
    [safeTime.days, 'Days'],
    [safeTime.hours, 'Hours'],
    [safeTime.minutes, 'Minutes'],
    [safeTime.seconds, 'Seconds'],
  ] : [];

  return (
    <section id="countdown" className="relative overflow-hidden border-t border-white/10 bg-nova-black/72">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,8,0.88)_0%,rgba(2,3,8,0.72)_44%,rgba(2,3,8,0.12)_100%),radial-gradient(circle_at_78%_55%,rgba(255,77,0,0.12),transparent_28%)]" />
      <div className="section-shell">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeading
            eyebrow="Countdown"
            title="Launch window initialized."
            description={Number.isFinite(targetDate?.getTime?.()) ? 'Launch window: 14 October 2028, 16:30 UTC. Mission control is counting toward the first departure burn.' : 'Launch window unavailable. Mission control is standing by for a valid target date.'}
          />
          {safeTime ? (
            <div
              className="grid grid-cols-2 overflow-hidden border-y border-white/15 bg-nova-black/45 backdrop-blur-[2px] md:grid-cols-4"
              aria-describedby="countdown-status"
              aria-label="Time remaining until NOVA-01 launch"
              aria-live="off"
            >
              {countdownBlocks.map(([value, label]) => (
                <div key={label} className="border-b border-white/10 px-4 py-6 text-center last:border-b-0 sm:px-6 sm:py-8 md:border-b-0 md:border-l md:first:border-l-0">
                  <p className="font-display text-3xl font-semibold tabular-nums text-nova-white sm:text-4xl lg:text-5xl">
                    {String(value).padStart(2, '0')}
                  </p>
                  <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-nova-muted sm:text-[0.65rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="border border-white/10 bg-nova-black/85 p-8 text-center text-sm text-nova-muted" role="status">
              Countdown unavailable.
            </p>
          )}
          <p id="countdown-status" className="sr-only" aria-live="polite">
            {isValidTarget
              ? 'Launch countdown active. Values update visually every second.'
              : 'Launch countdown unavailable because the target date is invalid.'}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-nova-accent shadow-[0_0_16px_rgba(255,77,0,0.8)]" aria-hidden="true" />
            <p className="max-w-2xl text-sm leading-7 text-nova-muted">
              Vehicle, crew, and landing systems are tracking a shared departure window.
            </p>
          </div>
          <Button href="#top" variant="secondary" showIcon={false}>
            Return to Top
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Countdown;
