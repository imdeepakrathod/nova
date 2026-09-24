import { useEffect, useRef } from 'react';

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frameId;
    let x = -100;
    let y = -100;
    let targetX = x;
    let targetY = y;

    const render = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      dotRef.current?.style.setProperty('transform', `translate3d(${targetX}px, ${targetY}px, 0)`);
      ringRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`);
      frameId = requestAnimationFrame(render);
    };

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const enterInteractive = () => ringRef.current?.classList.add('cursor-ring--active');
    const leaveInteractive = () => ringRef.current?.classList.remove('cursor-ring--active');
    const interactive = document.querySelectorAll('a, button, [data-cursor]');

    window.addEventListener('pointermove', move, { passive: true });
    interactive.forEach((element) => {
      element.addEventListener('pointerenter', enterInteractive);
      element.addEventListener('pointerleave', leaveInteractive);
    });
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', move);
      interactive.forEach((element) => {
        element.removeEventListener('pointerenter', enterInteractive);
        element.removeEventListener('pointerleave', leaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
