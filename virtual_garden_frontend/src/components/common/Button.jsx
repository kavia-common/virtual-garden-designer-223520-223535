import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button - A minimal accessible button styled via tokens.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'} [props.variant]
 * @param {boolean} [props.block]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 */
export default function Button({
  variant = 'primary',
  block = false,
  className = '',
  children,
  onClick,
  ...rest
}) {
  const base = {
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal), transform var(--transition-fast)',
    display: block ? 'block' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    width: block ? '100%' : 'auto',
    boxShadow: 'var(--shadow-xs)',
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      border: '1px solid var(--color-primary-600)',
      color: '#fff',
    },
    secondary: {
      background: 'var(--color-secondary)',
      border: '1px solid #c77d05',
      color: '#111827',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text)',
    },
  };

  const hover = {
    transform: 'translateY(-1px)',
  };

  return (
    <button
      className={className}
      style={{ ...base, ...(variants[variant] || variants.primary) }}
      onClick={onClick}
      onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      onMouseEnter={(e) => e.currentTarget.style.transform = hover.transform}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      {...rest}
    >
      {children}
    </button>
  );
}
