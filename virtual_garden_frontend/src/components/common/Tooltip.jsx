import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Tooltip - simple hover/focus tooltip
 */
export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);

  const wrapperStyle = { position: 'relative', display: 'inline-block' };
  const tipStyle = {
    position: 'absolute',
    bottom: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--color-elevated)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--text-xs)',
    whiteSpace: 'nowrap',
    boxShadow: 'var(--shadow-sm)',
    zIndex: 'var(--z-tooltip)',
    pointerEvents: 'none',
  };

  return (
    <span
      style={wrapperStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && <span role="tooltip" style={tipStyle}>{content}</span>}
    </span>
  );
}
