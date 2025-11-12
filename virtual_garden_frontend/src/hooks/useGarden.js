//
// PUBLIC_INTERFACE
// useGarden.js
// Helper hook to access garden context and provide utility selectors.
//
import { useMemo } from 'react';
import { useGardenContext } from '../features/garden/gardenContext';

/**
 * PUBLIC_INTERFACE
 * useGarden
 * Provides garden state, selection, settings, and common helpers.
 */
export default function useGarden() {
  const ctx = useGardenContext();
  const { present, settings, selection } = ctx;

  const helpers = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      selectedElements() {
        const set = new Set(selection);
        return present.elements.filter((e) => set.has(e.id));
      },
      // PUBLIC_INTERFACE
      getElementById(id) {
        return present.elements.find((e) => e.id === id);
      },
      // PUBLIC_INTERFACE
      getElements() {
        return present.elements;
      },
      // pass-through actions
      addElement: ctx.addElement,
      updateElement: ctx.updateElement,
      removeElement: ctx.removeElement,
      duplicateElement: ctx.duplicateElement,
      selectElement: ctx.selectElement,
      selectElements: ctx.selectElements,
      clearSelection: ctx.clearSelection,
      setSetting: ctx.setSetting,
      undo: ctx.undo,
      redo: ctx.redo,
      alignSelection: ctx.alignSelection,
      reorderLayer: ctx.reorderLayer,
    };
  }, [ctx, present.elements, selection]);

  return {
    state: ctx.state,
    present,
    settings,
    selection,
    ...helpers,
  };
}
