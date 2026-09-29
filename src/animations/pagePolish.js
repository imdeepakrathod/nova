import { configureGsap, gsap } from './gsapConfig.js';

export function createPagePolish({ reducedMotion = false } = {}) {
  configureGsap();

  const context = gsap.context(() => {
    const sections = gsap.utils.toArray('main > section');
    const hero = document.getElementById('top');

    if (reducedMotion) {
      sections.forEach((section) => {
        gsap.set(section.querySelectorAll('[data-reveal-heading] .reveal-word'), { clearProps: 'all' });
        gsap.set(section.querySelectorAll('[data-reveal-copy]'), { clearProps: 'all' });
      });
      if (hero) gsap.set(hero.querySelectorAll('[data-reveal-hero], .hero-eyebrow'), { clearProps: 'all' });
      return;
    }

    if (hero) {
      const eyebrow = hero.querySelector('.hero-eyebrow');
      const words = hero.querySelectorAll('[data-reveal-hero] .reveal-word');
      const copy = hero.querySelector('[data-reveal-hero-copy]');
      const cta = hero.querySelector('[data-reveal-hero-cta]');

      gsap.set([eyebrow, ...words, copy, cta].filter(Boolean), { opacity: 0, y: 18 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.55 })
        .to(words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.055 }, '-=0.2')
        .to(copy, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
        .to(cta, { opacity: 1, y: 0, duration: 0.55 }, '-=0.3');
    }

    sections.filter((section) => section !== hero).forEach((section) => {
      const headingWords = section.querySelectorAll('[data-reveal-heading] .reveal-word');
      const copy = section.querySelector('[data-reveal-copy]');
      const targets = [...headingWords, copy].filter(Boolean);

      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 20 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });
    });
  });

  return () => context.revert();
}
