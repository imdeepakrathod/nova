import { FiBox, FiCrosshair, FiMaximize, FiZap } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const specs = [
  { label: 'Payload', value: 'Mars lander + science bay' },
  { label: 'Propulsion', value: 'Solar electric / chemical' },
  { label: 'Length', value: '38.6 m' },
  { label: 'Mass', value: '128,400 kg' },
  { label: 'Capability', value: 'Crewed Mars transfer' },
];

function SpecificationCard({ label, value }) {
  return (
    <div className="border border-white/10 bg-nova-black/75 p-5 transition-colors hover:border-white/25">
      <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-muted">{label}</dt>
      <dd className="mt-3 text-sm font-semibold leading-6 text-nova-white">{value}</dd>
    </div>
  );
}

function Spacecraft() {
  return (
    <section id="spacecraft" className="border-y border-white/10 bg-white/[0.018]">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="deep-space-ui translate-y-4 opacity-60">
          <SectionHeading
            eyebrow="Spacecraft"
            title="A vessel interface waiting for depth."
            description="NOVA-01 combines a reusable crew module, high-efficiency solar electric propulsion, and a shielded payload bay built for the long route to Mars."
          />
        </div>

        <div className="space-y-8">
          <div className="relative flex min-h-[20rem] items-end overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_60%_45%,rgba(255,77,0,0.18),transparent_24%),rgba(255,255,255,0.025)] p-5 sm:min-h-[25rem] sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.06)_40.2%,transparent_40.5%)]" />
            <div className="relative flex w-full items-end justify-between border-t border-white/15 pt-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-accent">Live scene</p>
                <p className="mt-2 text-sm text-nova-muted">NOVA-01 orbital configuration</p>
              </div>
              <FiMaximize aria-hidden="true" className="text-xl text-nova-muted" />
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => <SpecificationCard key={spec.label} {...spec} />)}
          </dl>

          <div className="grid gap-4 sm:grid-cols-3">
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
