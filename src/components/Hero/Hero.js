import React from "react";
import HeroSecond from "./HeroSecond";
import HeroThird from "./HeroThird";
import { ReactComponent as Main } from "../../images/SVG/streamline-icon-gifting-online-gifting@250x250.svg";
import "./Hero.scss";

const Hero = () => {
  return (
    <>
      <div className="container">
        <div className="noanswer">
          <div className="perspective-text">
            <div className="perspective-line">
              <p className="perspective-line-p" />
              <p className="perspective-line-p">welcome</p>
            </div>
            <div className="perspective-line">
              <p className="perspective-line-p">welcome</p>
              <p className="perspective-line-p">NERD GAMER</p>
            </div>
            <div className="perspective-line">
              <p className="perspective-line-p">NERD GAMER</p>
              <p className="perspective-line-p">We're</p>
            </div>
            <div className="perspective-line">
              <p className="perspective-line-p">We're</p>
              <p className="perspective-line-p">nerdchat</p>
            </div>
            <div className="perspective-line">
              <p className="perspective-line-p">nerdchat</p>
              <p />
            </div>
          </div>
          <div className="subtitle">
            <h1 className="subtitle-header">
              Forget the time you played games alone. Whether your game is
              popular or not, you can easily find your game mate.
            </h1>
          </div>
        </div>
        <div className="logoimage">
          <Main className="main_img" />
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
