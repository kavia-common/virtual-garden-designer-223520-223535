import React from 'react';
import IconButton from '../common/IconButton';

/**
 * PUBLIC_INTERFACE
 * Footer - bottom status and quick controls
 */
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        height: 'var(--footer-h)',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <IconButton ariaLabel="Zoom out">➖</IconButton>
          <span style={{ minWidth: 52, textAlign: 'center' }}>100%</span>
          <IconButton ariaLabel="Zoom in">➕</IconButton>
        </div>
        <div className="muted" style={{ fontSize: 'var(--text-sm)' }}>x: 0, y: 0</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked /> Snap
          </label>
        </div>
      </div>
    </footer>
  );
}
