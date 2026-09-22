import { FiCompass, FiCpu, FiShield } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';
import AnimatedCounter from '../ui/AnimatedCounter.jsx';

const missionCards = [
  {
    icon: FiCompass,
    title: 'Precision Trajectory',
    text: 'A 225 million kilometre transfer designed around precise orbital insertion and a controlled Mars approach.',
  },
  {
    icon: FiCpu,
    title: 'Autonomous Systems',
    text: 'Autonomous guidance, navigation, and fault response keep the crew focused across seven months of transit.',
  },
  {
    icon: FiShield,
    title: 'Crew-Safe Design',
    text: 'Redundant life-support, shielding, and mission systems protect the crew from launch through landing.',
  },
];

function Mission() {
  return (
    <section id="mission" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <SectionHeading
          eyebrow="NOVA-01"
          title="Humanity's next step begins beyond Earth."
          description="NOVA-01 is a crewed Mars transfer mission built to prove a complete human journey: departure, deep-space transit, orbital insertion, and surface preparation."
        />
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-l border-nova-accent pl-6 sm:grid-cols-4 lg:pl-8">
          {[
            ['Objective', 'Crewed Mars transfer'],
            ['Duration', '07 months'],
            ['Distance', '225M km'],
            ['Launch', 'Q4 2028'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-muted">{label}</dt>
              <dd className="mt-2 text-sm font-semibold text-nova-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

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

      <div className="mt-16 grid grid-cols-3 gap-px border border-white/10 bg-white/10">
        {[
          ['225M', 'KM'],
          ['07', 'MONTHS'],
          ['01', 'MISSION'],
        ].map(([value, label]) => (
          <div key={label} className="mission-reveal bg-nova-black/80 p-5 sm:p-8">
            <p className="mission-value font-display text-2xl font-semibold text-nova-white sm:text-4xl">
              <AnimatedCounter
                value={value === '225M' ? 225 : value === '07' ? 7 : 1}
                suffix={value === '225M' ? 'M' : ''}
                padLength={value === '225M' ? 3 : 2}
              />
            </p>
            <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-nova-muted sm:text-xs">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Mission;
