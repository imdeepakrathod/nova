import SectionHeading from '../ui/SectionHeading.jsx';

function Mars() {
  return (
    <section id="mars" aria-labelledby="mars-title" className="border-y border-white/10">
      <div className="section-shell grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="mars-reveal relative min-h-[22rem] overflow-hidden border border-white/10 bg-[#070403]/60 opacity-70 sm:min-h-[30rem]">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nova-mars/70 shadow-[0_0_100px_rgba(181,74,50,0.28)] sm:w-[34rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_62%_58%,rgba(2,3,8,0.38),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-nova-black/70 p-5 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-nova-muted">
              3D scene / atmospheric approach
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Mars / Sol 01"
            title="The destination is the interface."
            description="After seven months in transit, NOVA-01 enters a thin atmosphere, maps the landing corridor, and hands the crew a new horizon. The mission is not a flyby. It is the beginning of a surface presence."
          />
          <dl className="mars-reveal mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-7 opacity-70 sm:grid-cols-4 lg:grid-cols-2">
            {[
              ['Temperature', '-63 C avg'],
              ['Distance', '225M km'],
              ['Atmosphere', '95% CO2'],
              ['Surface', 'Basalt / iron oxide'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-muted">{label}</dt>
                <dd className="mt-2 text-sm font-semibold text-nova-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default Mars;
