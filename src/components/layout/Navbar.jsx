import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from '../ui/Button.jsx';

const navItems = [
  { label: 'Mission', href: '#mission' },
  { label: 'Spacecraft', href: '#spacecraft' },
  { label: 'Journey', href: '#journey' },
  { label: 'Crew', href: '#crew' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-nova-black/70 backdrop-blur-xl">
      <nav className="nova-container flex h-20 items-center justify-between">
        <a
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-nova-accent"
          href="#top"
          aria-label="NOVA home"
          onClick={closeMenu}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-nova-accent shadow-glow" />
          <span className="font-display text-xl font-semibold tracking-[0.32em] text-nova-white">
            NOVA
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-nova-muted transition hover:text-nova-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#countdown" variant="secondary">
            Launch Window
          </Button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center border border-nova-line text-nova-white transition hover:border-white/30 lg:hidden"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-nova-black/95 lg:hidden">
          <div className="nova-container flex flex-col gap-1 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="py-4 text-sm font-semibold uppercase tracking-[0.2em] text-nova-muted transition hover:text-nova-white"
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="mt-4 w-full"
              href="#countdown"
              variant="primary"
              onClick={closeMenu}
            >
              Launch Window
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
