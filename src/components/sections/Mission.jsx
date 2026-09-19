import { FiCompass, FiCpu, FiShield } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';

const missionCards = [
  {
    icon: FiCompass,
    title: 'Precision Trajectory',
    text: 'A cinematic placeholder for mission navigation, orbital insertion, and approach planning.',
  },
  {
    icon: FiCpu,
    title: 'Autonomous Systems',
    text: 'Reserved space for NOVA-01 guidance, telemetry, and onboard decision architecture.',
  },
  {
    icon: FiShield,
    title: 'Crew-Safe Design',
    text: 'Future content area for redundant systems, mission assurance, and capsule operations.',
  },
];

function Mission() {
  return (
    <section id="mission" className="section-shell">
      <SectionHeading
        eyebrow="Mission"
        title="Designed for the first light over Mars."
        description="Phase 1 establishes the narrative surface of NOVA-01: lean, technical, cinematic, and ready for richer mission content in later phases."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {missionCards.map(({ icon: Icon, title, text }) => (
          <article key={title} className="glass-panel p-6 sm:p-8">
            <Icon aria-hidden="true" className="mb-8 text-2xl text-nova-accent" />
            <h3 className="font-display text-xl font-semibold uppercase tracking-[0.08em]">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-nova-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Mission;
