/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import './_slide.scss';

const Slide = () => {
  return (
    <div className='slider-container'>
      <section id='slider'>
        <input type='radio' name='slider' id='s1' />
        <input type='radio' name='slider' id='s2' />
        <input type='radio' name='slider' id='s3' />
        <input type='radio' name='slider' id='s4' />
        <input type='radio' name='slider' id='s5' />
        <label for='s1' id='slide1'>
          <div className='col-md-4 col-sm-6'>
            <div className='card'>
              <img src={require('../../images/slide/ow.jpeg').default} />
              <div className='card-text'>
                <div className='glitch' data-text='Overwatch'>
                  Overwatch
                </div>
                <h3>Shooting game</h3>
                <h4>4,300 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for='s2' id='slide2'>
          <div className='col-md-4 col-sm-6'>
            <div className='card'>
              <img src={require('../../images/slide/lol.jpeg').default} />
              <div className='card-text'>
                <div className='glitch' data-text='League of Legends'>
                  League of Legends
                </div>
                <h3>Fighting game</h3>
                <h4>5,600 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for='s3' id='slide3'>
          <div className='col-md-4 col-sm-6'>
            <div className='card'>
              <img src={require('../../images/slide/pubg.jpeg').default} />
              <div className='card-text'>
                <div className='glitch' data-text='Battle ground'>
                  Battle ground
                </div>
                <h3>Shooting game</h3>
                <h4>6,100 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for='s4' id='slide4'>
          <div className='col-md-4 col-sm-6'>
            <div className='card'>
              <img src={require('../../images/slide/diablo.jpeg').default} />
              <div className='card-text'>
                <div className='glitch' data-text='Diablo'>
                  Diablo
                </div>
                <h3>Role-playing game</h3>
                <h4>3,500 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for='s5' id='slide5'>
          <div className='col-md-4 col-sm-6'>
            <div className='card'>
              <img src={require('../../images/slide/DBD.jpg').default} />
              <div className='card-text'>
                <div className='glitch' data-text='DEAD BY DAYLIGHT'>
                  DEAD BY DAYLIGHT
                </div>
                <h3>Survival game</h3>
                <h4>2,100 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
      </section>
    </div>
  );
};

export default Slide;
