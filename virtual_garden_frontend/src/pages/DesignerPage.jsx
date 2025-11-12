import React, { useEffect, useRef } from 'react';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CanvasContainer from '../components/layout/CanvasContainer';
import useGarden from '../hooks/useGarden';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * DesignerPage - main editor layout with left/right sidebars and central canvas
 */
export default function DesignerPage() {
  const { settings, addElement, present } = useGarden();
  const containerRef = useRef(null);

  // Attach keyboard shortcuts scoped to this page container
  useKeyboardShortcuts(containerRef.current);

  useEffect(() => {
    // Example: reflect grid size to CSS var for CanvasContainer grid
    document.documentElement.style.setProperty('--grid-size', `${settings.gridSize}px`);
  }, [settings.gridSize]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Temporary demo bar (TODO: remove later) */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) 0' }}>
        <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
          Zoom: {(settings.zoom * 100).toFixed(0)}% • Grid: {settings.gridSize}px • Snap: {settings.snapToGrid ? 'On' : 'Off'} • Elements: {present.elements.length}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="secondary" onClick={() => {
            addElement({
              type: 'decor',
              position: { x: 40 + Math.floor(Math.random()*60), y: 40 + Math.floor(Math.random()*60) },
              size: { width: 48, height: 48 },
            });
          }}>
            + Add Sample Element
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, var(--sidebar-w)) 1fr minmax(220px, var(--sidebar-w))',
          gap: '0',
          flex: 1,
          minHeight: `calc(100vh - var(--header-h) - var(--footer-h))`,
        }}
      >
        <LeftSidebar />
        <CanvasContainer />
        <RightSidebar />
      </div>
    </div>
  );
}
