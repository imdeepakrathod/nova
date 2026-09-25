import { configureGsap, gsap } from './gsapConfig.js';

export function createTimelineAnimation({ reducedMotion = false } = {}) {
  configureGsap();
  if (reducedMotion) return () => {};

  const context = gsap.context(() => {
    gsap.fromTo(
      '.timeline-stage',
      { opacity: 0.2, y: 28 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.16,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#journey',
          start: 'top 72%',
          end: 'bottom 34%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  return () => {
    context.revert();
  };
}
