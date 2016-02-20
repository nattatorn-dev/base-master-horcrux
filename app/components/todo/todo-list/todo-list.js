import React from 'react';
import {List} from 'immutable';

export default class TodoList extends React.Component {

  static propTypes = {
    todos: React.PropTypes.instanceOf(List),
    onDelete: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    todos : []
  };

  render() {
    var { todos, onDelete, onComplete } = this.props;

    var rows = todos.map((value, index) => {
      return (
        <li key={index}>
          <button onClick={onDelete.bind(null, index)}>X</button>
          <label className={value.get('selected') ? 'todo-item--is-completed' : 'todo-item'}
                 onClick={onComplete.bind(null, index)}>{value.get('item')}
          </label>

        </li>
      );
    });

    if (todos.size <= 0) {
      return (<h3>Nothing Here!</h3>);
    }

    return (
      <div>
        <ul className='todo-list'>{rows}</ul>
      </div>
    );
  }
}


