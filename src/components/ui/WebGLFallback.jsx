function WebGLFallback() {
  return (
    <div className="flex h-full min-h-64 items-center justify-center bg-[#05060a] px-6 text-center" role="status" aria-live="polite">
      <div className="max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-nova-accent">NOVA-01 / 3D system offline</p>
        <p className="mt-4 text-sm leading-7 text-nova-muted">
          Your browser does not support WebGL. The mission interface remains available in reduced visual mode.
        </p>
      </div>
    </div>
  );
}

export default WebGLFallback;
