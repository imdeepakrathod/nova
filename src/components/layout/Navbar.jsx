import { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from '../ui/Button.jsx';
import useActiveSection from '../../hooks/useActiveSection.js';

const navItems = [
  { label: 'Mission', href: '#mission' },
  { label: 'Spacecraft', href: '#spacecraft' },
  { label: 'Journey', href: '#journey' },
  { label: 'Mars', href: '#mars' },
  { label: 'Crew', href: '#crew' },
  { label: 'Countdown', href: '#countdown' },
];
const sectionIds = [...navItems.map((item) => item.href.slice(1)), 'footer'];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => {
    const shouldRestoreFocus = isOpen;
    setIsOpen(false);
    if (shouldRestoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll('a, button');
    focusable?.[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

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
              className={`nav-link text-xs font-semibold uppercase tracking-[0.2em] transition hover:text-nova-white ${activeSection === item.href.slice(1) ? 'nav-link--active text-nova-white' : 'text-nova-muted'}`}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
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
          ref={triggerRef}
          className="inline-flex h-11 w-11 items-center justify-center border border-nova-line text-nova-white transition hover:border-white/30 lg:hidden"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => {
            if (isOpen) closeMenu();
            else setIsOpen(true);
          }}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" ref={menuRef} className="border-t border-white/10 bg-nova-black/95 lg:hidden">
          <div className="nova-container flex flex-col gap-1 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`nav-link py-4 text-sm font-semibold uppercase tracking-[0.2em] transition hover:text-nova-white ${activeSection === item.href.slice(1) ? 'nav-link--active text-nova-white' : 'text-nova-muted'}`}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
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
