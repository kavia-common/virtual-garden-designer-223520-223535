import React from 'react';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CanvasContainer from '../components/layout/CanvasContainer';

/**
 * PUBLIC_INTERFACE
 * DesignerPage - main editor layout with left/right sidebars and central canvas
 */
export default function DesignerPage() {
  return (
    <div
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
  );
}
