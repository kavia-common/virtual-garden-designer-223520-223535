import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * HelpPage - basic help content
 */
export default function HelpPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-6) 0' }}>
      <h1>Help</h1>
      <p className="muted">Learn how to get started with the Virtual Garden Designer.</p>

      <Card style={{ marginTop: 'var(--space-4)' }}>
        <h3>Basics</h3>
        <ul>
          <li>Use the Element Palette to select plants and items.</li>
          <li>Drag and drop items onto the canvas.</li>
          <li>Use the Inspector to adjust properties, style, and manage layers.</li>
          <li>Save, Export, and Import your designs from the header actions.</li>
        </ul>
      </Card>
    </div>
  );
}
