import React, { Component } from 'react';
import '../App.css';
import ItemIcons from '../ItemIcons.js';
import PropTypes from 'prop-types';

const GameItem = (props) => {

  const onItemClicked = () => {
    // Fill this in for Wave 2!
    console.log(props.type);

    if (props.type === 'litter') {
      console.log('clicked on it')
      props.onItemClickedCallback(props.id)
    }

  }
  const itemStyle = {
    bottom: `${ props.height }px`, // use props.height to offset from the bottom of screen
    zIndex: props.layer, // use props.layer to set z-index, so we display ontop of background
  };

  // Update this to select the correct icon for each item
  const icon = ItemIcons[props.type];

  return (
    <div className="game-item" style={itemStyle}>
      <img src={icon} alt="Item" className="icon-item" onClick={onItemClicked}></img>
    </div>
  );
}

GameItem.propTypes = {
  height: PropTypes.number.isRequired,
  layer: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}


export default GameItem;
