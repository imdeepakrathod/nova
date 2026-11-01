import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { gsap } from '../../animations/gsapConfig.js';

export const CAMERA_BREAKPOINTS = Object.freeze({
  mobile: 768,
  tablet: 1024,
});

export function getCameraBreakpoint(width) {
  if (width < CAMERA_BREAKPOINTS.mobile) return 'mobile';
  if (width < CAMERA_BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

function ResponsiveCamera({ desktop, tablet, mobile, targetRef, reducedMotion = false }) {
  const { camera, size } = useThree();
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

    if (isInitialUpdate || reducedMotion) {
      camera.position.set(...config.position);
      resolvedTargetRef.current.set(...target);
    } else {
      gsap.to(camera.position, {
        ...['x', 'y', 'z'].reduce((values, axis, index) => {
          values[axis] = config.position[index];
          return values;
        }, {}),
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(resolvedTargetRef.current, {
        x: target[0],
        y: target[1],
        z: target[2],
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    previousBreakpointRef.current = breakpoint;
  }, [breakpoint, camera, desktop, mobile, reducedMotion, tablet, resolvedTargetRef]);

  useEffect(() => () => {
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(resolvedTargetRef.current);
  }, [camera, resolvedTargetRef]);

  return null;
}

export default ResponsiveCamera;
