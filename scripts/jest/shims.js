/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// used for testing react fiber
global.requestAnimationFrame = callback => global.setTimeout(callback, 0);

// React 19 removed ReactDOM.render and ReactDOM.findDOMNode. Provide minimal test shims
// so existing test code can continue to run without broad refactors.
try {
  const ReactDOM = require('ReactDOM');
  if (ReactDOM && !ReactDOM.render && ReactDOM.createRoot) {
    const roots = new Map();
    ReactDOM.render = (element, container) => {
      let root = roots.get(container);
      if (!root) {
        root = ReactDOM.createRoot(container);
        roots.set(container, root);
      }
      root.render(element);
      return element && element.ref && typeof element.ref === 'function'
        ? element.ref.current || null
        : null;
    };
  }
  if (ReactDOM && !ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = inst => {
      if (inst && inst._node) return inst._node; // DraftEditorTextNode
      if (inst && inst._blockNode) return inst._blockNode; // DraftEditorBlockNode
      if (inst && inst.editorContainer) return inst.editorContainer; // DraftEditor
      return null;
    };
  }
} catch (e) {
  // ignore if ReactDOM not resolvable
}
