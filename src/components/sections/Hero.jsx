import { FiActivity, FiDatabase } from 'react-icons/fi';
import Button from '../ui/Button.jsx';

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-nova-radial pt-28"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div className="nova-container grid min-h-[calc(100vh-7rem)] items-center gap-16 py-16 lg:grid-cols-[1fr_0.92fr]">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-nova-accent">
            NOVA-01 / MARS MISSION
          </p>
          <h1 className="font-display text-6xl font-semibold uppercase leading-[0.9] text-nova-white sm:text-7xl md:text-8xl lg:text-[7.4rem]">
            Beyond Earth.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-nova-muted sm:text-lg">
            NOVA-01 is a next-generation mission concept engineered for the
            red planet: precise orbital insertion, autonomous descent systems,
            and a human-centered command experience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#mission" showIcon>
              Explore Mission
            </Button>
            <Button href="#spacecraft" variant="secondary">
              Mission Data
            </Button>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Launch', 'Q4 2028'],
              ['Transit', '214 Days'],
              ['Target', 'Mars'],
            ].map(([label, value]) => (
              <div key={label} className="bg-nova-black/80 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-nova-muted">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-nova-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="glass-panel relative min-h-[26rem] overflow-hidden p-6 sm:min-h-[34rem]"
          aria-label="Reserved 3D spacecraft viewport for Phase 2"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,77,0,0.16),transparent_34%)]" />
          <div className="relative flex h-full min-h-[26rem] flex-col justify-between sm:min-h-[34rem]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-nova-muted">
              <span className="inline-flex items-center gap-2">
                <FiActivity aria-hidden="true" className="text-nova-accent" />
                Phase 2 Bay
              </span>
              <span>3D View</span>
            </div>

            <div className="mx-auto flex aspect-square w-64 max-w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.02] sm:w-80">
              <div className="flex aspect-square w-40 items-center justify-center rounded-full border border-dashed border-nova-accent/45 text-center text-xs font-semibold uppercase tracking-[0.28em] text-nova-muted sm:w-52">
                Spacecraft
                <br />
                Insert
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.22em] text-nova-muted">
              <span className="inline-flex items-center gap-2">
                <FiDatabase aria-hidden="true" className="text-nova-accent" />
                Awaiting model
              </span>
              <span>NOVA-01</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
