import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import TodoForm from "./todo-form";

describe('todo-form', () => {

  let _component;
  let _onSave;

  beforeEach(() => {
    _onSave = () => 'saveClick';
    _component = TestUtils.renderIntoDocument( <TodoForm onSave={_onSave} /> );
  });

  it('renders without problems', () => {
    expect(_component).toExist();
  });

  it('should contain _saveTodo', () => {
    expect(_component._saveTodo).toExist();
  });

});
