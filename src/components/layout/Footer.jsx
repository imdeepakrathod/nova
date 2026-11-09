import { FiArrowUpRight, FiRadio, FiSend } from 'react-icons/fi';

const missionLinks = [
  ['Mission', '#mission'],
  ['Spacecraft', '#spacecraft'],
  ['Timeline', '#journey'],
  ['Crew', '#crew'],
];

function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#010207]">
      <div className="nova-container grid gap-12 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-nova-accent" />
            <span className="font-display text-lg font-semibold tracking-[0.32em]">
              NOVA
            </span>
          </div>
          <p className="max-w-md text-sm leading-7 text-nova-muted">
            Fictional mission interface for NOVA-01, a cinematic Mars mission
            concept built as a modern frontend foundation.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-accent">Mission links</p>
            <nav aria-label="Footer mission links" className="grid gap-3 text-sm text-nova-muted">
              {missionLinks.map(([label, href]) => <a key={href} className="transition hover:text-nova-white focus:outline-none focus:ring-2 focus:ring-nova-accent" href={href}>{label}</a>)}
            </nav>
          </div>
          <div className="grid content-start gap-3 text-sm text-nova-muted">
            <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nova-accent">Signal</p>
          <span className="inline-flex items-center gap-2">
            <FiRadio aria-hidden="true" className="text-nova-accent" />
            Deep Space Relay
          </span>
          <span className="inline-flex items-center gap-2">
            <FiSend aria-hidden="true" className="text-nova-accent" />
            NOVA-01 Mission
          </span>
          <div className="mt-2 flex items-center gap-2 text-nova-muted">
            <FiArrowUpRight aria-hidden="true" />
            <a href="#top" className="transition hover:text-nova-white focus:outline-none focus:ring-2 focus:ring-nova-accent">Return to top</a>
          </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-nova-muted sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <span>© 2026 NOVA Space Systems. Fictional concept.</span>
          <div className="flex gap-5"><span>Privacy</span><span>Terms</span></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
