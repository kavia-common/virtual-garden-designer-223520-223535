//
// PUBLIC_INTERFACE
// gardenReducer.js
// Contains initialState, action type constants, and a reducer with history (undo/redo).
//

import { createGarden } from './gardenTypes';

// Action type constants
export const ActionTypes = Object.freeze({
  INIT_GARDEN: 'INIT_GARDEN',
  ADD_ELEMENT: 'ADD_ELEMENT',
  UPDATE_ELEMENT: 'UPDATE_ELEMENT',
  REMOVE_ELEMENT: 'REMOVE_ELEMENT',
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  SELECT_ELEMENTS: 'SELECT_ELEMENTS',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  SET_SETTING: 'SET_SETTING',
  UNDO: 'UNDO',
  REDO: 'REDO',
  REORDER_LAYER: 'REORDER_LAYER',
  DUPLICATE_ELEMENT: 'DUPLICATE_ELEMENT',
  ALIGN_SELECTION: 'ALIGN_SELECTION',
});

// History settings
const MAX_HISTORY = 50;

/**
 * Capture present into past and set new present, clear future.
 */
function pushHistory(state, newPresent) {
  const past = [...state.past, state.present];
  const prunedPast = past.length > MAX_HISTORY ? past.slice(past.length - MAX_HISTORY) : past;
  return { past: prunedPast, present: newPresent, future: [] };
}

// Initial state with history scaffolding
export const initialState = {
  past: [],
  present: createGarden(),
  future: [],
};

/**
 * Align selected elements based on type.
 * Note: Uses axis-aligned bounding calculations. This is a placeholder
 * that performs basic alignment for demo purposes.
 */
function applyAlignment(present, alignType) {
  const sel = present.selection;
  if (sel.length < 2) return present;
  const map = new Map(present.elements.map((e) => [e.id, e]));
  const selected = sel.map((id) => map.get(id)).filter(Boolean);
  if (selected.length < 2) return present;

  const bounds = selected.map((e) => ({
    left: e.position.x,
    right: e.position.x + e.size.width,
    top: e.position.y,
    bottom: e.position.y + e.size.height,
    centerX: e.position.x + e.size.width / 2,
    centerY: e.position.y + e.size.height / 2,
  }));
  const minLeft = Math.min(...bounds.map((b) => b.left));
  const maxRight = Math.max(...bounds.map((b) => b.right));
  const minTop = Math.min(...bounds.map((b) => b.top));
  const maxBottom = Math.max(...bounds.map((b) => b.bottom));
  const centerX = (minLeft + maxRight) / 2;
  const centerY = (minTop + maxBottom) / 2;

  const updated = present.elements.map((e) => {
    if (!sel.includes(e.id)) return e;
    const next = { ...e, position: { ...e.position } };
    switch (alignType) {
      case 'left':
        next.position.x = minLeft;
        break;
      case 'right':
        next.position.x = maxRight - e.size.width;
        break;
      case 'top':
        next.position.y = minTop;
        break;
      case 'bottom':
        next.position.y = maxBottom - e.size.height;
        break;
      case 'center-x':
        next.position.x = Math.round(centerX - e.size.width / 2);
        break;
      case 'center-y':
        next.position.y = Math.round(centerY - e.size.height / 2);
        break;
      case 'distribute-x': {
        // basic: distribute by x between minLeft and maxRight
        const sorted = [...selected].sort((a, b) => a.position.x - b.position.x);
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        const step = (last.position.x - first.position.x) / (sorted.length - 1 || 1);
        const index = sorted.findIndex((s) => s.id === e.id);
        next.position.x = Math.round(first.position.x + step * index);
        break;
      }
      case 'distribute-y': {
        const sorted = [...selected].sort((a, b) => a.position.y - b.position.y);
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        const step = (last.position.y - first.position.y) / (sorted.length - 1 || 1);
        const index = sorted.findIndex((s) => s.id === e.id);
        next.position.y = Math.round(first.position.y + step * index);
        break;
      }
      default:
        break;
    }
    return next;
  });

  return { ...present, elements: updated };
}

/**
 * Adjust layer order for selected element(s).
 * Supports moving only the first selected element for simplicity in demo.
 */
function reorderLayer(present, { elementId, direction }) {
  const elements = [...present.elements];
  const index = elements.findIndex((e) => e.id === elementId);
  if (index < 0) return present;

  const move = (from, to) => {
    const arr = [...elements];
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);
    // update zIndex based on order (0..N)
    return arr.map((el, idx) => ({ ...el, zIndex: idx + 1 }));
  };

  switch (direction) {
    case 'forward':
      if (index < elements.length - 1) return { ...present, elements: move(index, index + 1) };
      return present;
    case 'backward':
      if (index > 0) return { ...present, elements: move(index, index - 1) };
      return present;
    case 'front':
      if (index < elements.length - 1) return { ...present, elements: move(index, elements.length - 1) };
      return present;
    case 'back':
      if (index > 0) return { ...present, elements: move(index, 0) };
      return present;
    default:
      return present;
  }
}

/**
 * PUBLIC_INTERFACE
 * gardenReducer - pure reducer with history support
 */
export function gardenReducer(state, action) {
  const { type, payload } = action || {};
  console.debug('[GardenReducer]', type, payload);

  switch (type) {
    case ActionTypes.INIT_GARDEN: {
      const next = createGarden(payload?.garden);
      return pushHistory(state, next);
    }

    case ActionTypes.ADD_ELEMENT: {
      const el = payload?.element;
      if (!el) return state;
      const present = state.present;
      const next = { ...present, elements: [...present.elements, el] };
      return pushHistory(state, next);
    }

    case ActionTypes.UPDATE_ELEMENT: {
      const { id, changes } = payload || {};
      if (!id || !changes) return state;
      const next = {
        ...state.present,
        elements: state.present.elements.map((e) => (e.id === id ? { ...e, ...changes, position: changes.position ? { ...e.position, ...changes.position } : e.position, size: changes.size ? { ...e.size, ...changes.size } : e.size } : e)),
      };
      return pushHistory(state, next);
    }

    case ActionTypes.REMOVE_ELEMENT: {
      const { id } = payload || {};
      if (!id) return state;
      const next = {
        ...state.present,
        elements: state.present.elements.filter((e) => e.id !== id),
        selection: state.present.selection.filter((s) => s !== id),
      };
      return pushHistory(state, next);
    }

    case ActionTypes.DUPLICATE_ELEMENT: {
      const { elementId, cloneFactory } = payload || {};
      const present = state.present;
      const base = present.elements.find((e) => e.id === elementId);
      if (!base) return state;
      const clone = cloneFactory ? cloneFactory(base) : { ...base, id: `${base.id}_copy_${Date.now()}`, position: { x: base.position.x + 10, y: base.position.y + 10 } };
      const next = {
        ...present,
        elements: [...present.elements, clone],
        selection: [clone.id],
      };
      return pushHistory(state, next);
    }

    case ActionTypes.SELECT_ELEMENT: {
      const { id, additive } = payload || {};
      if (!id) return state;
      const selection = additive ? Array.from(new Set([...state.present.selection, id])) : [id];
      return { ...state, present: { ...state.present, selection } };
    }

    case ActionTypes.SELECT_ELEMENTS: {
      const { ids } = payload || {};
      const selection = Array.isArray(ids) ? [...new Set(ids)] : [];
      return { ...state, present: { ...state.present, selection } };
    }

    case ActionTypes.CLEAR_SELECTION: {
      return { ...state, present: { ...state.present, selection: [] } };
    }

    case ActionTypes.SET_SETTING: {
      const { key, value } = payload || {};
      if (!key) return state;
      const next = {
        ...state.present,
        settings: { ...state.present.settings, [key]: value },
      };
      return { ...state, present: next }; // settings changes are not history-tracked to avoid noisy undo
    }

    case ActionTypes.ALIGN_SELECTION: {
      const { align } = payload || {};
      if (!align) return state;
      const next = applyAlignment(state.present, align);
      if (next === state.present) return state;
      return pushHistory(state, next);
    }

    case ActionTypes.REORDER_LAYER: {
      const { elementId, direction } = payload || {};
      if (!elementId || !direction) return state;
      const next = reorderLayer(state.present, { elementId, direction });
      if (next === state.present) return state;
      return pushHistory(state, next);
    }

    case ActionTypes.UNDO: {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      const newFuture = [state.present, ...state.future];
      return { past: newPast, present: previous, future: newFuture };
    }

    case ActionTypes.REDO: {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      const newPast = [...state.past, state.present];
      return { past: newPast, present: next, future: newFuture };
    }

    default:
      return state;
  }
}
