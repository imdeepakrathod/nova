function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center';
  const titleWords = title.split(' ');

  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-nova-accent">
        {eyebrow}
      </p>
      <h2 data-reveal-heading className="font-display text-3xl font-semibold uppercase leading-tight text-nova-white sm:text-4xl lg:text-5xl">
        {titleWords.map((word, index) => (
          <span className="reveal-word inline-block" key={`${word}-${index}`}>
            {word}{index < titleWords.length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </h2>
      {description && (
        <p
          data-reveal-copy
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
