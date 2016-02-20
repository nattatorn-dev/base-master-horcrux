import React from 'react';

export default class TodoHistory extends React.Component {
 
  static propTypes = {
    traverseHistory: React.PropTypes.func.isRequired,
  }; 

  render() {
    return (
      <div className='historyControls'>
        <button onClick={this._goBackward} type="button">&#x27f8;</button>
        <span> Todo History </span>
        <button onClick={this._goForward} type="button">&#x27f9;</button>
      </div>
    );
  }

  _goBackward = () => {
    var { traverseHistory } = this.props;
    traverseHistory('backward');
  }

  _goForward = () => {
    var { traverseHistory } = this.props;
    traverseHistory('forward');
  }
}

