function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-nova-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold uppercase leading-tight text-nova-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-8 text-nova-muted sm:text-lg ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
