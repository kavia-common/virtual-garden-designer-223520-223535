//
// PUBLIC_INTERFACE
// gardenTypes.js
// Typedefs, enums, and utility creators for the Garden data model.
// This file defines the core shape used throughout the designer state.
//

/**
 * Generate a lightweight unique id without external deps.
 * Combines timestamp and random sequence. Not cryptographically secure.
 * @returns {string}
 */
export function uid() {
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * PUBLIC_INTERFACE
 * ElementType - category of a garden element
 */
export const ElementType = Object.freeze({
  PLANT: 'plant',
  TREE: 'tree',
  FLOWER: 'flower',
  PATH: 'path',
  WATER: 'water',
  DECOR: 'decor',
  SHAPE: 'shape',
});

/**
 * PUBLIC_INTERFACE
 * AlignType - alignment commands for selection alignment operations
 */
export const AlignType = Object.freeze({
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  CENTER_X: 'center-x',
  CENTER_Y: 'center-y',
  DISTRIBUTE_X: 'distribute-x',
  DISTRIBUTE_Y: 'distribute-y',
});

/**
 * PUBLIC_INTERFACE
 * LayerOrder - layer reordering commands
 */
export const LayerOrder = Object.freeze({
  FORWARD: 'forward',
  BACKWARD: 'backward',
  FRONT: 'front',
  BACK: 'back',
});

/**
 * PUBLIC_INTERFACE
 * Element
 * @typedef {Object} Element
 * @property {string} id - unique identifier
 * @property {string} type - ElementType
 * @property {{x:number,y:number}} position - top-left position
 * @property {{width:number,height:number}} size - size in pixels (canvas space)
 * @property {number} rotation - degrees
 * @property {Object<string, any>} [props] - extra props like color, label
 * @property {number} zIndex - for layering
 */

/**
 * PUBLIC_INTERFACE
 * Garden
 * @typedef {Object} Garden
 * @property {string} id
 * @property {string} name
 * @property {Element[]} elements
 * @property {string[]} selection - selected element ids
 * @property {{gridSize:number,snapToGrid:boolean,zoom:number,background:string}} settings
 */

/**
 * PUBLIC_INTERFACE
 * LibraryItem
 * @typedef {Object} LibraryItem
 * @property {string} id
 * @property {string} name
 * @property {string} type - ElementType
 * @property {Object<string, any>} defaultProps
 */

/**
 * PUBLIC_INTERFACE
 * createElement - helper to create a new Element with sensible defaults
 * @param {Partial<Element>} [overrides]
 * @returns {Element}
 */
export function createElement(overrides = {}) {
  const id = overrides.id || uid();
  const zIndex = typeof overrides.zIndex === 'number' ? overrides.zIndex : 1;
  return {
    id,
    type: overrides.type || ElementType.DECOR,
    position: overrides.position || { x: 0, y: 0 },
    size: overrides.size || { width: 48, height: 48 },
    rotation: overrides.rotation || 0,
    props: overrides.props || {},
    zIndex,
  };
}

/**
 * PUBLIC_INTERFACE
 * createGarden - helper to create an empty Garden
 * @param {Partial<Garden>} [overrides]
 * @returns {Garden}
 */
export function createGarden(overrides = {}) {
  return {
    id: overrides.id || uid(),
    name: overrides.name || 'Untitled Garden',
    elements: Array.isArray(overrides.elements) ? overrides.elements : [],
    selection: Array.isArray(overrides.selection) ? overrides.selection : [],
    settings: {
      gridSize: overrides.settings?.gridSize ?? 24,
      snapToGrid: overrides.settings?.snapToGrid ?? true,
      zoom: overrides.settings?.zoom ?? 1,
      background: overrides.settings?.background ?? 'grid',
    },
  };
}
