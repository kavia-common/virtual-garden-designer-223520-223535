import React from 'react';

/**
 * PUBLIC_INTERFACE
 * CanvasContainer - central area placeholder for future interactive canvas
 */
export default function CanvasContainer() {
  const canvasStyle = {
    flex: 1,
    minHeight: '420px',
    backgroundImage: 'var(--grid-bg)',
    backgroundSize: 'var(--grid-size) var(--grid-size), calc(var(--grid-size) * 5) calc(var(--grid-size) * 5)',
    backgroundPosition: '0 0, 0 0',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
  };

  return (
    <section aria-label="Garden canvas" style={{ padding: 'var(--space-3)', flex: 1 }}>
      <div style={canvasStyle} role="region" aria-roledescription="design surface" tabIndex={0}>
        <div style={{ padding: 'var(--space-4)' }}>
          <h2 style={{ marginTop: 0 }}>Garden Canvas</h2>
          <p className="muted" style={{ maxWidth: 640 }}>
            This is a placeholder for the interactive garden designer canvas. Here you will add, arrange, and customize plants and decorations.
          </p>
        </div>
      </div>
    </section>
  );
}
