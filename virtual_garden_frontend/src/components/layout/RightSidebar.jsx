import React, { useState } from 'react';
import Card from '../common/Card';
import Tabs from '../common/Tabs';

/**
 * PUBLIC_INTERFACE
 * RightSidebar - Inspector with tabs placeholder
 */
export default function RightSidebar() {
  const [active, setActive] = useState('properties');

  return (
    <aside
      aria-label="Inspector"
      style={{
        width: 'var(--sidebar-w)',
        minWidth: '240px',
        maxWidth: 'var(--sidebar-w-wide)',
        borderLeft: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <Card>
        <strong>Inspector</strong>
        <div style={{ marginTop: 'var(--space-2)' }}>
          <Tabs
            tabs={[
              { key: 'properties', label: 'Properties' },
              { key: 'style', label: 'Style' },
              { key: 'layers', label: 'Layers' },
            ]}
            active={active}
            onChange={setActive}
          />
          <div
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            style={{ paddingTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}
          >
            {active === 'properties' && <div>No selection. Select an element to edit properties.</div>}
            {active === 'style' && <div>Adjust colors, strokes, and textures.</div>}
            {active === 'layers' && <div>Manage layer order for your garden elements.</div>}
          </div>
        </div>
      </Card>
    </aside>
  );
}
