import React, { useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal - simple centered modal with overlay
 */
export default function Modal({ open, onClose, title = 'Modal', children }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 'var(--z-overlay)',
      }}
      onClick={onClose}
    >
      <div
        className="surface"
        style={{ width: 'min(560px, 92vw)', padding: 'var(--space-5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✖</button>
        </div>
        {children}
      </div>
    </div>
  );
}
