import { useEffect, useState } from 'react';

function LoadingScreen({ onComplete }) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 280 : 760);
    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 420 : 1100);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${isLeaving ? 'loading-screen--leaving' : ''}`} role="status" aria-live="polite">
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__content">
        <p className="loading-screen__eyebrow">NOVA-01</p>
        <div className="loading-screen__mark" aria-hidden="true"><span /></div>
        <p className="loading-screen__label">Initializing mission...</p>
        <div className="loading-screen__progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
