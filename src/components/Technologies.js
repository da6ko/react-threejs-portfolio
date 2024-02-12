import React from 'react';
import SpinningCube from './cubes';

import textureImg1 from '../images/js.png';
import textureImg2 from '../images/react.png';
import textureImg3 from '../images/docker.png';
import textureImg4 from '../images/mongodb.png';

const Technologies = () => {
  const textureImages = [textureImg1, textureImg2, textureImg3, textureImg4];

  return (
    <div>
      <SpinningCube textureImages={textureImages} />
    </div>
  );
};

export default Technologies;