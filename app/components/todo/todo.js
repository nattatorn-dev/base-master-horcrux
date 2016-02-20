import React from 'react';
import { List, Map } from 'immutable';
import TodoList from './todo-list/todo-list';
import TodoForm from './todo-form/todo-form';
import TodoHistory from './todo-history/todo-history';

export default class Todo extends React.Component {

  static propTypes = {
    children: React.PropTypes.string,
  };

  static defaultProps = {
    children : 'My Todo App'
  };

  state = {
    data: Map({
      todoList: List()
    })
  };

  history = Map({
    backward: List(),
    forward: List()
  });

  render() {
    var todoList = this.state.data.get('todoList');
    var { children } = this.props;

    return (
      <div className='app'>

        <h2 className='header'>{children}</h2>
        <TodoHistory traverseHistory={this._traverseHistory} />
        <TodoList todos={todoList}
                  onDelete={this._deleteTodo}
                  onComplete={this._completeTodo} />
        <TodoForm onSave={this._saveTodo} />
      </div>
    );
  }

  _recordHistory = () => {
    this.history = this.history.update('backward', (historyList) =>
      historyList.push(this.state.data));
  }

  _traverseHistory = (direction) => {
    var { data } = this.state;
    var { history } = this;

    if (!history.get(direction).size > 0) {
      return;
    }
    var oppDirection = (direction === 'forward' ? 'backward' : 'forward');

    var nextData = history.get(direction).last();

    this.history = Map({})
      .set(direction, history.get(direction).pop())
      .set(oppDirection, history.get(oppDirection).push(data));

    this.setState({
      data: nextData
    });
  }

  _saveTodo = (todo) => {
    this._recordHistory();

    this.setState(({data}) => ({
      data: data.update('todoList', (todoList) =>
        (todoList.push(Map({
          item: todo,
          selected: false
        }))
      ))
    }));
  }

  _completeTodo = (index) => {
    this._recordHistory();

    this.setState(({data}) => ({
      data: data.update('todoList', (todoList) => {
        let selectedItem = todoList.get(index);
        let selectedState = selectedItem.get('selected');
        let toggledItem = selectedItem.set('selected', !selectedState);
        return todoList.set(index, toggledItem);
      })
    }));
  }

  _deleteTodo = (todoIndex) => {
    this._recordHistory();

    this.setState(({data}) => ({
      data: data.update('todoList', (todoList) =>
        todoList.delete(todoIndex))
    }));
  }
}

