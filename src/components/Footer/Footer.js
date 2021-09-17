import React from 'react';
import { ReactComponent as Glasses } from '../../images/glasses.svg';
import { SiGithub, SiNotion } from 'react-icons/si';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='mainfooter'>
      <div className='footerlogo'>
        <Glasses width='100' height='100' />
      </div>
      <div className='footerlinks'>
        <div className='clover'>CLOVER</div>
        <div className='github'>
          <SiGithub size={30} />
        </div>
        <div className='notions'>
          <SiNotion size={30} />
        </div>
      </div>
      <div className='copyright'>
        <p>Copyright 2021. CLOVER</p>
      </div>
    </div>
  );
};

export default Footer;
