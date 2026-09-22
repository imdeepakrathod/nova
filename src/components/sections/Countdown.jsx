import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export const launchDate = new Date('2028-10-14T16:30:00Z');

function getTimeRemaining() {
  const difference = Math.max(0, launchDate.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function useCountdown() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const intervalId = window.setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return time;
}

function Countdown() {
  const time = useCountdown();
  const countdownBlocks = [
    [time.days, 'Days'],
    [time.hours, 'Hours'],
    [time.minutes, 'Minutes'],
    [time.seconds, 'Seconds'],
  ];

  return (
    <section id="countdown" className="border-t border-white/10 bg-white/[0.018]">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Countdown"
            title="Launch window initialized."
            description="Launch window: 14 October 2028, 16:30 UTC. Mission control is counting toward the first departure burn."
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
