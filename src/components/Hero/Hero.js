import React from 'react';
import { ReactComponent as Glasses } from '../../images/glasses.svg';

import './Hero.scss';

const Hero = () => {
  return (
    <div className='hero_container'>
      <h1>Welcome to NERDchat</h1>
      <Glasses width='250' height='250' />
      <h2 className='hero_title'>What is NERDchat?</h2>
      <p>
        Whether your game is popular or not, you can easily find your game mate.
      </p>
    </div>
  );
};

export default Hero;
