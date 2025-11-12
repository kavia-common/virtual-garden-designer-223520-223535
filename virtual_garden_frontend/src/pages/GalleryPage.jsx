import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * GalleryPage - placeholder list of gardens
 */
export default function GalleryPage() {
  const items = Array.from({ length: 6 }, (_, i) => `Garden #${i + 1}`);

  return (
    <div className="container" style={{ padding: 'var(--space-6) 0', width: '100%' }}>
      <h1>Gallery</h1>
      <p className="muted">Browse your saved garden designs.</p>

      <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', marginTop: 'var(--space-4)' }}>
        {items.map((name) => (
          <Card key={name}>
            <div style={{ height: 120, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(245,158,11,0.12))', border: '1px dashed var(--color-border)' }} />
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{name}</strong>
              <button style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2px 8px', cursor: 'pointer' }}>
                Open
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
