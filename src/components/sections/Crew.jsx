import SectionHeading from '../ui/SectionHeading.jsx';
import useTilt from '../../hooks/useTilt.js';
import { assets, resolveAsset } from '../../config/assets.js';

const crew = [
  {
    name: 'Amina Okafor',
    role: 'Commander',
    responsibility: 'Flight operations, orbital approach, and crew decisions during landing.',
  },
  {
    name: 'Jonas Reed',
    role: 'Systems Lead',
    responsibility: 'Vehicle health, propulsion telemetry, and deep-space redundancy.',
  },
  {
    name: 'Lena Petrov',
    role: 'Mission Specialist',
    responsibility: 'Surface science, landing coordination, and the first Mars field study.',
  },
];

function CrewMember({ name, role, responsibility, image }) {
  const ref = useTilt({ strength: 5 });

  return (
    <article ref={ref} data-cursor className="tilt-card glass-panel group p-4 transition-transform duration-500 hover:-translate-y-2 focus-within:-translate-y-2 sm:p-6">
      <div className="relative mb-7 aspect-[4/5] overflow-hidden border border-white/10 bg-white/[0.025]">
        {image ? (
          <img src={image} alt={`${name}, ${role}`} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_32%,rgba(255,77,0,0.25),transparent_18%),linear-gradient(145deg,#151923,#05060a)]" role="img" aria-label={`${name}, ${role}`}>
            <span className="font-display text-5xl font-semibold text-white/20">N-01</span>
          </div>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nova-black/90 to-transparent p-4 pt-14 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-white">NOVA-01 crew</span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-nova-accent">NOVA-01</p>
      <h3 className="mt-3 font-display text-2xl font-semibold uppercase">{name}</h3>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-nova-accent">{role}</p>
      <p className="mt-4 text-sm leading-7 text-nova-muted">{responsibility}</p>
    </article>
  );
}

function Crew() {
  return (
    <section id="crew" className="section-shell">
      <SectionHeading
        eyebrow="Crew"
        title="Three people. One long horizon."
        description="The NOVA-01 crew carries the mission through the moments no autonomous system can own: judgment, adaptation, and the decision to continue."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {crew.map((member, index) => (
          <CrewMember
            key={member.name}
            {...member}
            image={resolveAsset(assets.images.crew[index])}
          />
        ))}
      </div>
    </section>
  );
}

export default Crew;
