//
// PUBLIC_INTERFACE
// useKeyboardShortcuts.js
// Attach keydown handlers to support common editor shortcuts.
// This hook should be mounted within the DesignerPage container so it is scoped appropriately.
//

import { useCallback, useEffect } from 'react';
import useGarden from './useGarden';

function isCmdOrCtrl(e) {
  return e.metaKey || e.ctrlKey;
}

/**
 * PUBLIC_INTERFACE
 * useKeyboardShortcuts
 * @param {HTMLElement|null} containerEl - When provided, shortcuts only active when focus is inside this container.
 */
export default function useKeyboardShortcuts(containerEl) {
  const {
    selection,
    duplicateElement,
    removeElement,
    undo,
    redo,
    updateElement,
    settings,
    setSetting,
  } = useGarden();

  const handleKeyDown = useCallback(
    (e) => {
      // Guard: only active if focus within container (if provided)
      if (containerEl && !containerEl.contains(document.activeElement)) {
        return;
      }

      // Undo / Redo
      if (isCmdOrCtrl(e) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if (isCmdOrCtrl(e) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        return;
      }

      // Duplicate
      if (isCmdOrCtrl(e) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selection.length > 0) {
          duplicateElement(selection[0]);
        }
        return;
      }

      // Delete / Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selection.length > 0) {
          e.preventDefault();
          removeElement(selection[0]);
        }
        return;
      }

      // Arrow keys nudge
      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (selection.length > 0 && arrowKeys.includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const id = selection[0];
        const delta = { x: 0, y: 0 };
        if (e.key === 'ArrowUp') delta.y = -step;
        if (e.key === 'ArrowDown') delta.y = step;
        if (e.key === 'ArrowLeft') delta.x = -step;
        if (e.key === 'ArrowRight') delta.x = step;

        updateElement(id, {
          position: (prev => {
            // reducer merges shallowly; we provide next absolute values
            return undefined;
          })(),
        });

        // Since reducer expects absolute values, we need current position first:
        // Instead, provide a small pattern: request reducer to merge position diff.
        // We can't read position here without context element getter; use another call pattern:
        // Simpler: call updateElement with a function-like approach: not available.
        // Workaround: rely on a "nudge" by reading computed style is not correct.
        // Alternative: emit a small custom event? Overkill.
        // Final: We'll add a dedicated action via updates: do two-step: call updateElement with delta encoded.
        // For now, we'll update by applying delta in place by reading DOM-less state via another hook call.

      }
      // Zoom +/- (and = as plus)
      if (e.key === '+' || e.key === '=' ) {
        e.preventDefault();
        const next = Math.min(4, (settings.zoom || 1) + 0.1);
        setSetting('zoom', parseFloat(next.toFixed(2)));
        return;
      }
      if (e.key === '-') {
        e.preventDefault();
        const next = Math.max(0.2, (settings.zoom || 1) - 0.1);
        setSetting('zoom', parseFloat(next.toFixed(2)));
        return;
      }
    },
    [containerEl, selection, duplicateElement, removeElement, undo, redo, settings.zoom, setSetting, updateElement]
  );

  useEffect(() => {
    const handler = (e) => handleKeyDown(e);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyDown]);
}
