import { configureGsap, gsap } from './gsapConfig.js';

export function createPagePolish({ reducedMotion = false } = {}) {
  configureGsap();

  const context = gsap.context(() => {
    const words = gsap.utils.toArray('.reveal-word');
    const headings = gsap.utils.toArray('[data-reveal-heading]');
    const copies = gsap.utils.toArray('[data-reveal-copy]');
    const ctas = gsap.utils.toArray('[data-reveal-cta]');

    if (reducedMotion) {
      gsap.set([...words, ...headings, ...copies, ...ctas], { clearProps: 'all' });
      return;
    }

    gsap.set(words, { opacity: 0, y: 18 });
    gsap.set([...copies, ...ctas], { opacity: 0, y: 14 });

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.55 })
      .to(words, { opacity: 1, y: 0, duration: 0.65, stagger: 0.055 }, '-=0.2')
      .to(copies, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
      .to(ctas, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, '-=0.3');

    headings.forEach((heading) => {
      if (heading.closest('#top')) return;
      gsap.fromTo(
        heading.querySelectorAll('.reveal-word'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
            once: true,
          },
        },
      );
    });

    copies.forEach((copy) => {
      if (copy.closest('#top')) return;
      gsap.fromTo(
        copy,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: copy, start: 'top 86%', once: true },
        },
      );
    });
  });

  return () => context.revert();
}
