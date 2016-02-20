import React from 'react';
import Immutable from 'immutable';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import Todo from "./todo";

describe('todo', () => {
  var mock = Immutable.fromJS([{
    "item": "test 1",
    "selected": false
  }, {
    "item": "test 2",
    "selected": false
  }]);

  let _component;

  beforeEach(() => {
    _component = TestUtils.renderIntoDocument( <Todo /> );
    _component.state.data = Immutable.Map({
      todoList: mock
    });
  });

  it('renders without problems', () => {
    expect(_component).toExist();
  });

  it('should contain the following functions', () => {
    expect(_component._completeTodo).toExist();
    expect(_component._deleteTodo).toExist();
    expect(_component._saveTodo).toExist();
  });

  it('_completeTodo should toggle selected todo', () => {
    _component._completeTodo(0);
    expect(_component.state.data.get('todoList').get(0).get('selected')).toBe(true);
  });

  it('_saveTodo should save todo to state', () => {
    _component._saveTodo('test 3', mock);
    expect(_component.state.data.get('todoList').get(2).get('item')).toBe('test 3');
    expect(_component.state.data.get('todoList').get(2).get('selected')).toBe(false);
  });

  it('_deleteTodo should remove todo from state', () => {
    expect(_component.state.data.get('todoList').size).toBe(2);
    _component._deleteTodo(0, mock);
    expect(_component.state.data.get('todoList').size).toBe(1);
    expect(_component.state.data.get('todoList').get(0).get('item')).toBe('test 2');
  });

  it('_traverseHistory(\'backward\') should return to the previous state, after deleting one todo item', () => {
    expect(_component.state.data.get('todoList').size).toBe(2);
    _component._deleteTodo(0, mock);
    _component._traverseHistory('backward');
    expect(_component.state.data.get('todoList').size).toBe(2);
  });

  it('_traverseHistory(\'backward\') should return to the state that was before adding new todo', () => {
    _component._saveTodo('test 3', mock);
    _component._traverseHistory('backward');
    expect(_component.state.data.get('todoList').last().get('item')).toBe('test 2');
  });

  it('_traverseHistory(\'forward\') after _traverseHistory(\'backward\') should have todoList of ' +
      ' the same size as the one before deleting one todo item', () => {
    expect(_component.state.data.get('todoList').size).toBe(2);
    _component._deleteTodo(0, mock);
    expect(_component.state.data.get('todoList').size).toBe(1);
    _component._traverseHistory('backward');
    expect(_component.state.data.get('todoList').size).toBe(2);
    _component._traverseHistory('forward');
    expect(_component.state.data.get('todoList').size).toBe(1);
  });

  it('_traverseHistory(\'forward\') after _traverseHistory(\'backward\') should have the same last todo item '+
      'as the one that was in the todoList before one new item was added', () => {
    _component._saveTodo('test 3', mock);
    _component._traverseHistory('backward');
    expect(_component.state.data.get('todoList').last().get('item')).toBe('test 2');
    _component._traverseHistory('forward');
    expect(_component.state.data.get('todoList').last().get('item')).toBe('test 3');
  });

});
