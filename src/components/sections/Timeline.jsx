import SectionHeading from '../ui/SectionHeading.jsx';

const timelineItems = [
  ['01', 'Launch', 'Departure from Earth during the Q4 2028 primary launch window.'],
  ['02', 'Earth Orbit', 'Systems check, orbital staging, and final departure burn.'],
  ['03', 'Deep Space', 'Seven months of cruise, navigation updates, and crew operations.'],
  ['04', 'Mars Orbit', 'Aerobraking and orbital insertion establish the landing corridor.'],
  ['05', 'Landing', 'The crew prepares the surface mission and first science operations.'],
];

function Timeline() {
  return (
    <section id="journey" className="section-shell">
      <SectionHeading
        eyebrow="Journey"
        title="Five burns. One direction."
        description="Every phase of NOVA-01 is built around preserving momentum: from Earth departure to the first human-controlled landing sequence on Mars."
        align="center"
      />

      <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {timelineItems.map(([step, title, text]) => (
          <li key={step} className="timeline-stage relative border-l border-white/10 pl-6">
            <span className="absolute -left-[0.32rem] top-0 h-2.5 w-2.5 rounded-full bg-nova-accent" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-nova-accent">
              {step}
            </p>
            <h3 className="mt-5 font-display text-2xl font-semibold uppercase">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-nova-muted">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Timeline;
