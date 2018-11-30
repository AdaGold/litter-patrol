import React, { Component } from 'react';
import '../App.css';
import TrashIcon from '../trash.svg';

class Trash extends Component {
  render() {
    // if true show image if false it won't show
    return (
      <div className="bin">
        {this.props.isTrashVisible && <img src={ TrashIcon } alt="Trash" className="trash"></img>}
      </div>

    );
  }
}

export default Trash;
