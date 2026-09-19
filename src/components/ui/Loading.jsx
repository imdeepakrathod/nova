function Loading({ label = 'Loading NOVA systems' }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-5 text-center">
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full border border-nova-line" />
        <span className="absolute inset-2 animate-spin rounded-full border border-transparent border-t-nova-accent" />
        <span className="absolute inset-[1.35rem] rounded-full bg-nova-accent" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-nova-muted">
        {label}
      </p>
    </div>
  );
}

export default Loading;
