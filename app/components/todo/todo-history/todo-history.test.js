import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import TodoHistory from "./todo-history";

describe('todo-history', () => {

  let _component;
  let _traverseHistory;

  beforeEach(function() {
    _traverseHistory = () => 'traverseHistory()';
    _component = TestUtils.renderIntoDocument( <TodoHistory traverseHistory={_traverseHistory} /> );
  });

  it('renders without problems', () => {
    expect(_component).toExist();
  });

  it('should contain _goBackward', () => {
    expect(_component._goBackward).toExist();
  });

  it('should contain _goForward', () => {
    expect(_component._goForward).toExist();
  });
});
