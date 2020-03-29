import React from 'react';


const LevelBackground = () => {
  const layers = [
    'clouds-1',
    'clouds-2',
    'clouds-3',
    'clouds-4',
    'hills-1',
    'hills-2',
    'bushes',
    'trees-1',
    'trees-2',
    'ground'
  ];

  return (
    <div className="level-bg">
      {layers.map(layer => (<div className={`level-bg-${ layer }`} key={layer} />))}
    </div>
  );
}

export default LevelBackground