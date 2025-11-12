//
// PUBLIC_INTERFACE
// gardenContext.js
// Provides GardenProvider with useReducer and convenience action creators.
//

import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ActionTypes, gardenReducer, initialState } from './gardenReducer';
import { createElement, createGarden } from './gardenTypes';

const GardenContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * GardenProvider
 * Wraps children with garden state and actions.
 */
export function GardenProvider({ children, initial }) {
  const [state, dispatch] = useReducer(gardenReducer, initial || initialState);

  // Convenience action creators
  const actions = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      dispatch,
      // PUBLIC_INTERFACE
      initGarden(garden) {
        dispatch({ type: ActionTypes.INIT_GARDEN, payload: { garden } });
      },
      // PUBLIC_INTERFACE
      addElement(overrides) {
        dispatch({ type: ActionTypes.ADD_ELEMENT, payload: { element: createElement(overrides) } });
      },
      // PUBLIC_INTERFACE
      updateElement(id, changes) {
        dispatch({ type: ActionTypes.UPDATE_ELEMENT, payload: { id, changes } });
      },
      // PUBLIC_INTERFACE
      removeElement(id) {
        dispatch({ type: ActionTypes.REMOVE_ELEMENT, payload: { id } });
      },
      // PUBLIC_INTERFACE
      duplicateElement(elementId) {
        dispatch({ type: ActionTypes.DUPLICATE_ELEMENT, payload: { elementId } });
      },
      // PUBLIC_INTERFACE
      selectElement(id, additive = false) {
        dispatch({ type: ActionTypes.SELECT_ELEMENT, payload: { id, additive } });
      },
      // PUBLIC_INTERFACE
      selectElements(ids) {
        dispatch({ type: ActionTypes.SELECT_ELEMENTS, payload: { ids } });
      },
      // PUBLIC_INTERFACE
      clearSelection() {
        dispatch({ type: ActionTypes.CLEAR_SELECTION });
      },
      // PUBLIC_INTERFACE
      setSetting(key, value) {
        dispatch({ type: ActionTypes.SET_SETTING, payload: { key, value } });
      },
      // PUBLIC_INTERFACE
      undo() {
        dispatch({ type: ActionTypes.UNDO });
      },
      // PUBLIC_INTERFACE
      redo() {
        dispatch({ type: ActionTypes.REDO });
      },
      // PUBLIC_INTERFACE
      alignSelection(align) {
        dispatch({ type: ActionTypes.ALIGN_SELECTION, payload: { align } });
      },
      // PUBLIC_INTERFACE
      reorderLayer(elementId, direction) {
        dispatch({ type: ActionTypes.REORDER_LAYER, payload: { elementId, direction } });
      },
      // PUBLIC_INTERFACE
      createEmptyGarden(name = 'Untitled Garden') {
        const g = createGarden({ name });
        dispatch({ type: ActionTypes.INIT_GARDEN, payload: { garden: g } });
        return g;
      },
    };
  }, [dispatch]);

  const value = useMemo(() => {
    return {
      state,
      present: state.present,
      settings: state.present.settings,
      selection: state.present.selection,
      ...actions,
    };
  }, [state, actions]);

  return <GardenContext.Provider value={value}>{children}</GardenContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useGardenContext - low-level access to context object
 */
export function useGardenContext() {
  const ctx = useContext(GardenContext);
  if (!ctx) {
    throw new Error('useGardenContext must be used within a GardenProvider');
  }
  return ctx;
}
