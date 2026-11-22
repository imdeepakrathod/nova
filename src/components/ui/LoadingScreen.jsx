import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';

function LoadingScreen({ onComplete, ready = false }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const timeoutRef = useRef(null);
  const { active, errors, progress, loaded, total } = useProgress();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ready) {
      timeoutRef.current = window.setTimeout(() => setRecovery(true), 12000);
      return () => window.clearTimeout(timeoutRef.current);
    }

    window.clearTimeout(timeoutRef.current);
    if (active) return undefined;

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 120 : 300);
    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 220 : 520);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [active, onComplete, ready, reducedMotion]);

  useEffect(() => {
    if (!recovery) return undefined;
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 120 : 300);
    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 220 : 520);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, recovery, reducedMotion]);

  useEffect(() => {
    if (!active || recovery) {
      if (ready && !active) window.clearTimeout(timeoutRef.current);
      return undefined;
    }

    timeoutRef.current = window.setTimeout(() => setRecovery(true), 12000);
    return () => window.clearTimeout(timeoutRef.current);
  }, [active, ready, recovery]);

  const displayProgress = recovery ? 100 : ready && !active ? 100 : Math.round(progress);
  const assetStatus = total > 0 ? `${loaded}/${total} assets` : 'scene initialization';
  const label = recovery
    ? 'Fallback systems ready'
    : active
      ? `Loading mission assets (${assetStatus})`
      : ready
        ? 'Mission systems ready'
        : 'Initializing mission';

  return (
    <div className={`loading-screen ${isLeaving ? 'loading-screen--leaving' : ''}`} role="status" aria-live="polite">
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__content">
        <p className="loading-screen__eyebrow">NOVA-01</p>
        <div className="loading-screen__mark" aria-hidden="true"><span /></div>
        <p className="loading-screen__label">{label}</p>
        <div className="loading-screen__progress" aria-hidden="true"><span style={{ width: `${displayProgress}%` }} /></div>
        <p className="loading-screen__percent">{displayProgress}%</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
