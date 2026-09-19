import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const countdownBlocks = [
  ['728', 'Days'],
  ['16', 'Hours'],
  ['42', 'Minutes'],
  ['09', 'Seconds'],
];

function Countdown() {
  return (
    <section id="countdown" className="border-t border-white/10 bg-white/[0.018]">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Countdown"
            title="Launch window initialized."
            description="Static countdown placeholders define the launch interface. Live mission data can be introduced in a later phase."
          />
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {countdownBlocks.map(([value, label]) => (
              <div key={label} className="bg-nova-black/85 p-6 text-center sm:p-8">
                <p className="font-display text-4xl font-semibold text-nova-white sm:text-5xl">
                  {value}
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
            NOVA-01 mission systems are represented with static UI in Phase 1.
            Telemetry, live countdown logic, and 3D vehicle rendering remain
            intentionally out of scope.
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
