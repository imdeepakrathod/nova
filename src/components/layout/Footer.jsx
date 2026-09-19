import { FiRadio, FiSend } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#010207]">
      <div className="nova-container flex flex-col gap-10 py-12 md:flex-row md:items-center md:justify-between">
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

        <div className="grid gap-3 text-sm text-nova-muted sm:grid-cols-2 md:text-right">
          <span className="inline-flex items-center gap-2 md:justify-end">
            <FiRadio aria-hidden="true" className="text-nova-accent" />
            Deep Space Relay
          </span>
          <span className="inline-flex items-center gap-2 md:justify-end">
            <FiSend aria-hidden="true" className="text-nova-accent" />
            NOVA-01 Mission
          </span>
          <span className="sm:col-span-2">
            © 2026 NOVA Space Systems. Fictional concept.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
