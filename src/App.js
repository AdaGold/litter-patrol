import React, { Component, useState, useEffect } from 'react';
import uuid from 'uuid';
import './App.css';
import GameItem from './components/GameItem.js';
import LevelBackground from './components/LevelBackground';
import logo from './images/logo.png';


// Configuration Information
const config = {
  itemTypes: {
    // type: spawn rate (weighting)
    litter: 20,
    rock: 5,
    bush: 5,
    flower: 5,
    mushroom: 5,
  },
  spawnRate: 1.2, // Hz
  spawnRateRnd: 1.79, // randomization factor
  spawnHeight: 150, // height of item spawn area in pixels
  spawnFloor: 0, // offset from bottom of game "level" in pixels
  itemLifetime: 8 * 1000, // 8 seconds (should be longer than CSS animation time)
};

// The time an item was last spawned
let lastSpawn = null;

// Function to generate a random type of GameItem
const randomType = () => {
  // Figure out the total of all the weighted types
  const weights = Object.values(config.itemTypes)
  const totalWeight = weights.reduce((sum, weight) => sum + weight);

  // Get a random value between zero and the total
  let choice = Math.random() * totalWeight;
  let selectedType = null;

  // Loop through all item types and figure out which one we chose
  Object.entries(config.itemTypes).forEach(([type, weight]) => {
    if (selectedType !== null) return; // We've already found our choice

    // If the random value was less than this type's weight
    if (choice <= weight) {
      selectedType = type; // then we've selected it
    } else {
      choice -= weight; // otherwise move past this entry
    }
  });

  return selectedType;
}


const App = (props) => {
  let updateTimer = null;

  const spawnItem = (time) => {
    lastSpawn = time;

    // Figure out what kind of item to create
    const id = uuid();
    const type = randomType();

    const expiration = time + config.itemLifetime;
    const height = Math.random() * config.spawnHeight + config.spawnFloor;

    return { id, type, expiration, height };
  }

  // State for the list of items
  const [items, setItems] = useState([]);
  // State for the points in the game
  const [points, setPoints] = useState(0);

  // Uncomment this to spawn a single test item
  // const testItem = spawnItem(Date.now());
  // if (items.length === 0) {
  //   setItems([testItem]);
  // }

  // Make this true to automatically spawn new items
  const spawnItems = true;

  const onItemClicked = (id) => {
    // Fill this in for Wave 3!

    const newItemList = items.filter((item) => id !== item.id)
    if (newItemList.length < items.length) {
      setItems(newItemList);
      setPoints((oldPoints) => oldPoints + 1);
    }
  }

  const itemComponents = items.map((item, i) => {
    return <GameItem
      height={item.height}     // Height - used for a CSS style to position on the screen
      layer={100 + i}          // Layer - used for a CSS style to show items on-top of bg
      key={item.id}            // Key - to help React with performance
      type={item.type}
      onItemClickedCallback={onItemClicked}
      id={item.id}

    // Additional props (event callbacks, etc.) can be passed here
    />;
  });

  const jsx = (
    <div className="game">
      <section className="hud">
        <h2 className="score">Litter Spotted: {points}</h2>
        <img className="logo" src={logo} alt="Litter Patrol logo" />
      </section>

      <section className="level">
        <LevelBackground />
        {itemComponents}
      </section>

    </div>
  );

  // Implementation Details
  //////////////\\\\\\\\\\\\\\
  // Implementation details \\

  const tick = (time) => {

    // Cull any items that are expired
    let newItemList = items.filter((item) => {
      return item.expiration !== null && item.expiration > time;
    });

    // Should we spawn a new item?
    const { spawnRate, spawnRateRnd } = config;
    if (spawnItems && spawnRate > 0) {
      let spawnDelta = time - (lastSpawn || 0);

      // Randomize spawn rate
      if (spawnRateRnd > 0) {
        const factor = 1 + Math.random() * spawnRateRnd;
        spawnDelta *= factor;
      }

      if (spawnDelta >= (1 / spawnRate) * 1000 && newItemList.length <= 30) {

        newItemList = [
          ...(newItemList || items),
          spawnItem(time),
        ];
      }
    }

    return newItemList;
  }

  useEffect(() => {
    const update = () => {
      const callback = () => {
        updateTimer = setTimeout(update, 1000 / 8);
      };

      const newItemList = tick(Date.now());

      if (items.length !== newItemList.length) {
        setItems(newItemList);
      } else {
        callback();
      }
    }

    update();

    return () => {
      if (updateTimer !== null) {
        clearInterval(updateTimer);
      }
    }
  });

  return jsx;
}


export default App;
