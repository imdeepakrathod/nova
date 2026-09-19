import { FiUser } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const crew = [
  ['Commander', 'Flight operations and orbital approach.'],
  ['Systems Lead', 'Vehicle health, telemetry, and redundancy.'],
  ['Mission Specialist', 'Surface science and landing coordination.'],
];

function Crew() {
  return (
    <section id="crew" className="section-shell">
      <SectionHeading
        eyebrow="Crew"
        title="Human presence, held in reserve."
        description="Phase 1 keeps crew content minimal while establishing reusable surfaces for profiles, roles, and mission responsibilities."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {crew.map(([role, text]) => (
          <article key={role} className="glass-panel p-6">
            <div className="mb-7 flex aspect-square w-full items-center justify-center border border-white/10 bg-white/[0.025]">
              <FiUser aria-hidden="true" className="text-5xl text-nova-muted" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-nova-accent">
              NOVA-01
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold uppercase">
              {role}
            </h3>
            <p className="mt-4 text-sm leading-7 text-nova-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Crew;
