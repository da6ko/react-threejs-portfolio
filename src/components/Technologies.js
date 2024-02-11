// Technologies.js

import React from 'react';
import SpinningCube from './cubes';

import textureImg1 from '../images/js.png';
import textureImg2 from '../images/react.png';

const Technologies = () => {
  const textureImages = [textureImg1, textureImg2];

  return (
    <div>
      <SpinningCube textureImages={textureImages} />
    </div>
  );
};

export default Technologies;
