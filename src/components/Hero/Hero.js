import React from 'react';
import HeroSecond from './HeroSecond';
import HeroThird from './HeroThird';
import { ReactComponent as Main } from '../../images/SVG/streamline-icon-gifting-online-gifting@250x250.svg';
import './Hero.scss';

const Hero = () => {
  return (
    <>
      <div className='container'>
        <div className='perspective-text'>
          <div className='perspective-line'>
            <p />
            <p>welcome</p>
          </div>
          <div className='perspective-line'>
            <p>welcome</p>
            <p>NERD GAMER</p>
          </div>
          <div className='perspective-line'>
            <p>NERD GAMER</p>
            <p>We're</p>
          </div>
          <div className='perspective-line'>
            <p>We're</p>
            <p>nerdchat</p>
          </div>
          <div className='perspective-line'>
            <p>nerdchat</p>
            <p />
          </div>
        </div>
        <div className='subtitle'>
          <h1 className='subtitle-header'>
            Forget the time you played games alone. Whether your game is popular
            or not, you can easily find your game mate.
          </h1>
        </div>
        <div className='logoimage'>
          <Main width='680' height='680' />
        </div>
      </div>
      <div>
        <HeroSecond />
      </div>
      <div>
        <HeroThird />
      </div>
    </>
  );
};
export default Hero;
