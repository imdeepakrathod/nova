import { FiBox, FiCrosshair, FiZap } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const specs = [
  { label: 'Vehicle', value: 'NOVA-01' },
  { label: 'Mode', value: 'Crewed Transit' },
  { label: 'Status', value: 'Concept Phase' },
  { label: 'Payload', value: 'Mars Lander' },
];

function Spacecraft() {
  return (
    <section id="spacecraft" className="border-y border-white/10 bg-white/[0.018]">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="deep-space-ui translate-y-4 opacity-60">
          <SectionHeading
            eyebrow="Spacecraft"
            title="A vessel interface waiting for depth."
            description="This non-3D placeholder defines the spacecraft content system before the Three.js experience arrives in Phase 2."
          />
        </div>

        <div className="glass-panel p-5 sm:p-8">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-nova-black/85 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-nova-muted">
                  {spec.label}
                </p>
                <p className="mt-3 text-xl font-semibold text-nova-white">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [FiBox, 'Modular Hull'],
              [FiZap, 'Solar Electric'],
              [FiCrosshair, 'Mars Targeting'],
            ].map(([Icon, label]) => (
              <div
                key={label}
                className="flex min-h-28 flex-col justify-between border border-white/10 bg-white/[0.025] p-5"
              >
                <Icon aria-hidden="true" className="text-xl text-nova-accent" />
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-nova-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Spacecraft;
