import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export const CAMERA_BREAKPOINTS = Object.freeze({
  mobile: 768,
  tablet: 1024,
});

export function getCameraBreakpoint(width) {
  if (width < CAMERA_BREAKPOINTS.mobile) return 'mobile';
  if (width < CAMERA_BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

function ResponsiveCamera({ desktop, tablet, mobile, targetRef, reducedMotion = false, journeyActive = false }) {
  const { camera, size, invalidate } = useThree();
  const breakpoint = getCameraBreakpoint(size.width);
  const internalTargetRef = useRef(camera.userData.novaCameraTarget ?? new Vector3());
  const resolvedTargetRef = targetRef ?? internalTargetRef;
  const previousBreakpointRef = useRef(null);
  camera.userData.novaCameraTarget = resolvedTargetRef.current;

  useEffect(() => {
    const config = breakpoint === 'mobile' ? mobile : breakpoint === 'tablet' ? tablet : desktop;
    const target = config.target ?? [0, 0, 0];
    const isInitialUpdate = previousBreakpointRef.current === null;

    camera.near = config.near ?? 0.1;
    camera.far = config.far ?? 120;
    camera.fov = config.fov;
    camera.updateProjectionMatrix();

    if (isInitialUpdate || !journeyActive) {
      camera.position.set(...config.position);
      resolvedTargetRef.current.set(...target);
    }

    previousBreakpointRef.current = breakpoint;
    invalidate();
  }, [breakpoint, camera, desktop, invalidate, journeyActive, mobile, reducedMotion, tablet, resolvedTargetRef]);

  return null;
}

export default ResponsiveCamera;
