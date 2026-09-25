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
  const safeTime = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const countdownBlocks = [
    [safeTime.days, 'Days'],
    [safeTime.hours, 'Hours'],
    [safeTime.minutes, 'Minutes'],
    [safeTime.seconds, 'Seconds'],
  ];

  return (
    <section id="countdown" className="border-t border-white/10 bg-white/[0.018]">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Countdown"
            title="Launch window initialized."
            description={Number.isFinite(targetDate?.getTime?.()) ? 'Launch window: 14 October 2028, 16:30 UTC. Mission control is counting toward the first departure burn.' : 'Launch window unavailable. Mission control is standing by for a valid target date.'}
          />
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4" aria-live="polite" aria-label="Time remaining until NOVA-01 launch">
            {countdownBlocks.map(([value, label]) => (
              <div key={label} className="bg-nova-black/85 p-6 text-center sm:p-8">
                <p className="font-display text-4xl font-semibold tabular-nums text-nova-white sm:text-5xl">
                  {String(value).padStart(2, '0')}
                </p>
                <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-nova-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-2xl text-sm leading-7 text-nova-muted">
            Mission control is preparing the vehicle, crew, and landing systems for a shared departure window.
          </p>
          <Button href="#top" variant="secondary">
            Return to Top
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Countdown;
