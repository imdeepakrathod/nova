import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

function LoadingScreen({ onComplete, ready = false }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const { active, errors, progress } = useProgress();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canEnter = ready && (!active || errors.length > 0);
    const leaveTimer = canEnter
      ? window.setTimeout(() => setIsLeaving(true), reducedMotion ? 120 : 300)
      : undefined;
    const completeTimer = canEnter
      ? window.setTimeout(onComplete, reducedMotion ? 220 : 520)
      : window.setTimeout(onComplete, 6000);

    return () => {
      if (leaveTimer) window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [active, errors.length, onComplete, ready]);

  const displayProgress = ready && !active ? 100 : Math.round(progress);

  return (
    <div className={`loading-screen ${isLeaving ? 'loading-screen--leaving' : ''}`} role="status" aria-live="polite">
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__content">
        <p className="loading-screen__eyebrow">NOVA-01</p>
        <div className="loading-screen__mark" aria-hidden="true"><span /></div>
        <p className="loading-screen__label">{errors.length ? 'Fallback systems online...' : 'Initializing mission...'}</p>
        <div className="loading-screen__progress" aria-hidden="true"><span style={{ width: `${displayProgress}%` }} /></div>
        <p className="loading-screen__percent">{displayProgress}%</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
