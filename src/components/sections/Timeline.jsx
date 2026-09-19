import SectionHeading from '../ui/SectionHeading.jsx';

const timelineItems = [
  ['01', 'Assembly', 'Orbital vehicle integration and final inspection.'],
  ['02', 'Launch', 'Departure from Earth during the primary launch window.'],
  ['03', 'Transit', 'Deep space cruise, course correction, and systems checks.'],
  ['04', 'Arrival', 'Mars orbital insertion and landing sequence preparation.'],
];

function Timeline() {
  return (
    <section id="journey" className="section-shell">
      <SectionHeading
        eyebrow="Journey"
        title="Mission timeline placeholder."
        description="A clear foundation for the NOVA-01 path from assembly to Mars arrival, ready for richer phase-specific detail."
        align="center"
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-4">
        {timelineItems.map(([step, title, text]) => (
          <article key={step} className="relative border-l border-white/10 pl-6">
            <span className="absolute -left-[0.32rem] top-0 h-2.5 w-2.5 rounded-full bg-nova-accent" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-nova-accent">
              {step}
            </p>
            <h3 className="mt-5 font-display text-2xl font-semibold uppercase">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-nova-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
