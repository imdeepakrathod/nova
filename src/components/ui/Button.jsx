import { FiArrowRight } from 'react-icons/fi';

const variants = {
  primary:
    'border-nova-accent bg-nova-accent text-nova-white shadow-glow hover:bg-[#E84600]',
  secondary:
    'border-nova-line bg-white/[0.03] text-nova-white hover:border-white/30 hover:bg-white/[0.07]',
  ghost:
    'border-transparent bg-transparent text-nova-muted hover:text-nova-white',
};

function Button({
  children,
  href,
  variant = 'primary',
  showIcon = false,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex h-12 items-center justify-center gap-2 rounded-sm border px-5 text-xs font-semibold uppercase tracking-[0.18em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-nova-accent focus:ring-offset-2 focus:ring-offset-nova-black',
    variants[variant],
    className,
  ].join(' ');

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        <span>{children}</span>
        {showIcon && <FiArrowRight aria-hidden="true" className="text-base" />}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      <span>{children}</span>
      {showIcon && <FiArrowRight aria-hidden="true" className="text-base" />}
    </button>
  );
}

export default Button;
