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
        <label for='s1' id='slide1' />
        <label for='s2' id='slide2' />
        <label for='s3' id='slide3' />
        <label for='s4' id='slide4' />
        <label for='s5' id='slide5' />
      </section>
    </div>
  );
};

export default Slide;
