import React, { Component } from 'react';
import '../App.css';
import ItemIcons from '../ItemIcons.js';
import PropTypes from 'prop-types';

class GameItem extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  static propTypes = {
    height: PropTypes.number.isRequired,
    layer: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  }

  onItemClicked = (event) => {
    // Fill this in for Wave 2!
    // KK: I don't need to account for when an item has already been clicked. It's not gonna change again or add another class to the class list. 
    const item = event.target;

    if (!this.state.spotted) {
      this.setState({
        spotted: true
      });
      this.props.onItemClickedCallback(this.props);  
    }
    
  }
    
  render() {
    const itemStyle = {
      bottom: `${this.props.height}px`, // use props.height to offset from the bottom of screen
      zIndex: this.props.layer, // use props.layer to set z-index, so we display ontop of background
    };

    // KK: it's getting the correct icon i think?
    const icon = ItemIcons[this.props.type];
    let className = "game-item";
    if (this.state.spotted) {
      className += this.props.type === "litter" ? " spotted-litter" : " spotted-nature";
    }
    return (
      <div className={className} style={itemStyle} onClick={this.onItemClicked}>
        <img src={icon} alt={this.props.type} className="icon-item"></img>
      </div>
    );
  }
}

export default GameItem;
