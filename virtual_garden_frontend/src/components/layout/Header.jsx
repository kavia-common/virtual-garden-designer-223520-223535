import React from 'react';
import Button from '../common/Button';
import IconButton from '../common/IconButton';
import Tooltip from '../common/Tooltip';

/**
 * PUBLIC_INTERFACE
 * Header - top app bar with branding, navigation, and quick actions.
 *
 * @param {object} props
 * @param {'designer'|'gallery'|'help'} props.activePage
 * @param {(key:string)=>void} props.onNavigate
 * @param {() => void} props.onToggleTheme
 * @param {'light'|'dark'} props.theme
 * @param {boolean} [props.experimental]
 */
export default function Header({ activePage, onNavigate, onToggleTheme, theme, experimental = false }) {
  const navItem = (key, label) => {
    const active = activePage === key;
    return (
      <button
        key={key}
        onClick={() => onNavigate(key)}
        aria-current={active ? 'page' : undefined}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
          color: active ? 'var(--color-primary)' : 'var(--color-text)',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-header)',
        background: 'linear-gradient(180deg, rgba(37,99,235,0.06), transparent), var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
      role="banner"
    >
      <div className="container" style={{ height: 'var(--header-h)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            aria-hidden="true"
            style={{
              width: 36, height: 36, borderRadius: 'var(--radius-full)',
              background: 'conic-gradient(from 180deg at 50% 50%, rgba(37,99,235,0.8), rgba(245,158,11,0.8))',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <strong style={{ fontSize: 'var(--text-lg)' }}>Virtual Garden Designer</strong>
              {experimental && (
                <span style={{
                  fontSize: 'var(--text-xs)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  color: 'var(--color-text)',
                }}>
                  Experimental
                </span>
              )}
            </div>
            <div className="muted" style={{ fontSize: 'var(--text-xs)' }}>Design your perfect garden.</div>
          </div>
        </div>

        <nav aria-label="Primary" style={{ display: 'flex', gap: 'var(--space-1)', marginLeft: 'auto', marginRight: 'auto' }}>
          {navItem('designer', 'Designer')}
          {navItem('gallery', 'Gallery')}
          {navItem('help', 'Help')}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Button variant="ghost" aria-label="New design">New</Button>
          <Button variant="ghost" aria-label="Save design">Save</Button>
          <Tooltip content="Export garden design">
            <Button variant="ghost" aria-label="Export design">Export</Button>
          </Tooltip>
          <Button variant="ghost" aria-label="Import design">Import</Button>
          <Tooltip content={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
            <IconButton ariaLabel="Toggle theme" onClick={onToggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
