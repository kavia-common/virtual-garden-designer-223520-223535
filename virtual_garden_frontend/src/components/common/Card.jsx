import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card - elevated surface container with padding and border.
 */
export default function Card({ children, className = '', ...rest }) {
  const style = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    padding: 'var(--space-4)',
  };
  return (
    <div className={`card ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}
