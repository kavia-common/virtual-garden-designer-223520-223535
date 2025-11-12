import React from 'react';

/**
 * PUBLIC_INTERFACE
 * IconButton - circular button for icons with accessible labeling.
 *
 * @param {object} props
 * @param {string} props.ariaLabel - Accessible label for the button
 * @param {React.ReactNode} props.children - Icon element
 */
export default function IconButton({ ariaLabel, children, ...rest }) {
  const style = {
    width: '34px',
    height: '34px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-full)',
    background: 'transparent',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-xs)',
    cursor: 'pointer',
    transition: 'background var(--transition-normal), transform var(--transition-fast)',
  };

  return (
    <button
      aria-label={ariaLabel}
      style={style}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37,99,235,0.08)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      {...rest}
    >
      {children}
    </button>
  );
}
