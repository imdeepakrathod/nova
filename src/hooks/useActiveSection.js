import { useEffect, useRef, useState } from 'react';

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('top');
  const activeSectionRef = useRef('top');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let frameId;
    const updateActiveSection = () => {
      frameId = undefined;
      const marker = window.innerHeight * 0.38;
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      const nextSection = current?.id ?? (window.scrollY < window.innerHeight * 0.5 ? 'top' : activeSectionRef.current);
      if (nextSection === activeSectionRef.current) return;
      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
    };
    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
