import React from 'react';

export default class TodoForm extends React.Component {

  static propTypes = {
    onSave: React.PropTypes.func.isRequired
  };

  render() {
    var props = {
      ref: 'newTodo',
      type: 'text',
      placeholder: 'New todo'
    };

    return (
      <div>
        <input {...props}
               onKeyDown={(event) => {
                 if (event.keyCode === 13) {
                   this._saveTodo();
                 }
               }}/>
        <button onClick={this._saveTodo}>Add</button>
      </div>
    );
  }

  _saveTodo = () => {
    var { newTodo } = this.refs;
    var { onSave } = this.props;
    var value = React.findDOMNode(newTodo).value;

    if (!value) {
      return;
    }

    React.findDOMNode(newTodo).value = null;
    onSave(value);
  }
}

