/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+draft_js
 * @flow
 * @format
 */

'use strict';

const getContentEditableContainer = require('getContentEditableContainer');

test('fails if no Node is found for the editorContainer', () => {
  // $FlowExpectedError - missing editorContainer
  expect(() => getContentEditableContainer({})).toThrow('Missing editorNode');
});

test('fails if the firstChild of editorContainer is not an HTMLElement', () => {
  const editorContainer = {firstChild: document.createTextNode('text')};
  // $FlowExpectedError firstChild not HTMLElement
  expect(() => getContentEditableContainer({editorContainer})).toThrow(
    'editorNode.firstChild is not an HTMLElement',
  );
});

test("returns the firstChild of editor.editorContainer's DOM node", () => {
  const editableContainer = document.createElement('div');
  const editorContainer = {firstChild: editableContainer};
  // $FlowExpectedError - editor shape simplified for test
  expect(getContentEditableContainer({editorContainer})).toBe(
    editableContainer,
  );
});
