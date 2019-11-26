import React, { Component } from 'react';
import '../App.css';
import ItemIcons from '../ItemIcons.js';
import PropTypes from 'prop-types';

class GameItem extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    layer: PropTypes.number.isRequired,
  }

  onItemClicked = (event) => {
    // Fill this in for Wave 2!
    // KK: I don't need to account for when an item has already been clicked. It's not gonna change again or add another class to the class list. 
    const item = event.target;
    
    if (this.props.type === 'litter') {
      item.classList.add('spotted-litter');
      // add 1 to score
    } else {
      item.classList.add('spotted-nature');
      // remove 1 from score
    }
  }
    
  render() {
    const itemStyle = {
      bottom: `${this.props.height}px`, // use props.height to offset from the bottom of screen
      zIndex: this.props.layer, // use props.layer to set z-index, so we display ontop of background
    };

    // KK: it's getting the correct icon i think?
    const icon = ItemIcons[this.props.type];
    
    return (
      <div className="game-item" style={itemStyle} onClick={this.onItemClicked}>
        <img src={icon} alt={this.props.type} className="icon-item"></img>
      </div>
    );
  }
}

export default GameItem;
