import { FiCompass, FiCpu, FiShield } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading.jsx';
import AnimatedCounter from '../ui/AnimatedCounter.jsx';

const missionCards = [
  {
    icon: FiCompass,
    title: 'Precision Trajectory',
    text: 'A 225 million kilometre transfer with a narrow arrival corridor and no room for wasted velocity.',
  },
  {
    icon: FiCpu,
    title: 'Autonomous Systems',
    text: 'Guidance and fault response run continuously while the crew prepares for orbital insertion.',
  },
  {
    icon: FiShield,
    title: 'Crew-Safe Design',
    text: 'Redundant life support and shielding protect the crew from launch burn to landing sequence.',
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

      <div className="mt-14 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
        {missionCards.map(({ icon: Icon, title, text }) => (
          <article key={title} className="border-b border-white/10 py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
            <Icon aria-hidden="true" className="mb-8 text-xl text-nova-accent" />
            <h3 className="max-w-[14rem] font-display text-xl font-semibold uppercase tracking-[0.08em]">
              {title}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-nova-muted">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-3 border-y border-white/10">
        {[
          ['225M', 'KM'],
          ['07', 'MONTHS'],
          ['01', 'MISSION'],
        ].map(([value, label], index) => (
          <div key={label} className={`mission-reveal py-5 sm:py-8 ${index > 0 ? 'border-l border-white/10 pl-5 sm:pl-8' : ''}`}>
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
