import SectionHeading from '../ui/SectionHeading.jsx';

function Mars() {
  return (
    <section id="mars" className="border-y border-white/10">
      <div className="section-shell grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="relative min-h-[22rem] overflow-hidden border border-white/10 bg-[#070403] sm:min-h-[30rem]">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nova-mars/70 shadow-[0_0_100px_rgba(181,74,50,0.28)] sm:w-[34rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_62%_58%,rgba(2,3,8,0.38),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-nova-black/70 p-5 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-nova-muted">
              Mars surface visual placeholder
            </p>
          </div>
        </div>

        <SectionHeading
          eyebrow="Mars"
          title="The destination is the interface."
          description="This section reserves the Mars narrative area for terrain visuals, landing zone data, and atmospheric mission storytelling."
        />
      </div>
    </section>
  );
}

export default Mars;
