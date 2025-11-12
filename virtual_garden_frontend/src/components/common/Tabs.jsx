import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Tabs - Accessible tabs and panels
 *
 * @param {object} props
 * @param {Array<{key:string,label:string}>} props.tabs
 * @param {string} props.active
 * @param {(key: string)=>void} props.onChange
 */
export default function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="tabs">
      <div role="tablist" aria-label="Inspector Tabs" style={{ display: 'flex', gap: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t.key}`}
              id={`tab-${t.key}`}
              onClick={() => onChange(t.key)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--color-border)',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
