import React from 'react';
import Card from '../common/Card';

/**
 * PUBLIC_INTERFACE
 * LeftSidebar - Element palette/categories placeholder
 */
export default function LeftSidebar() {
  const categories = ['Plants', 'Trees', 'Flowers', 'Paths', 'Water', 'Decor'];

  return (
    <aside
      aria-label="Element palette"
      style={{
        width: 'var(--sidebar-w)',
        minWidth: '240px',
        maxWidth: 'var(--sidebar-w-wide)',
        borderRight: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <Card>
        <strong>Element Palette</strong>
        <ul style={{ listStyle: 'none', margin: 'var(--space-2) 0 0', padding: 0 }}>
          {categories.map((c) => (
            <li key={c} style={{ padding: 'var(--space-2) var(--space-2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              {c}
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <strong>Quick Add</strong>
        <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>Drag items onto the canvas.</p>
      </Card>
    </aside>
  );
}
