import React, { Component } from 'react';
import '../App.css';
import ItemIcons from '../ItemIcons.js';
import PropTypes from 'prop-types';

class GameItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
    };
  }

  onItemClicked = () => {	    
    this.props.markClickedCallback(this.props.index);
    this.setState({isClicked: true});
  }

  markImage = () => {
    if (this.props.isClicked) {
      if (this.props.type === "litter") {
        return "spotted-litter"
      } else {
        return "spotted-nature"
      }
    } else {
      return ""
    }
  }

  render() {
    const itemStyle = {
      bottom: `${this.props.height}px`, // use props.height to offset from the bottom of screen
      zIndex: this.props.layer, // use props.layer to set z-index, so we display ontop of background
    };

    // Update this to select the correct icon for each item
    const icon = ItemIcons[this.props.type];

    return (
      <div className={"game-item " + this.markImage(icon)} style={itemStyle}>
         <img src={icon} alt="Item" className="icon-item" onClick={ this.onItemClicked }></img>
      </div>
    );
  }
}

GameItem.propTypes = {
  height: PropTypes.number.isRequired,
  layer: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default GameItem;
