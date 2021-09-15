/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { CgArrowLongRight } from "react-icons/cg";

import "./_slide.scss";

const Slide = () => {
  return (
    <div className="slider-container">
      <section id="slider">
        <input type="radio" name="slider" id="s1" />
        <input type="radio" name="slider" id="s2" />
        <input type="radio" name="slider" id="s3" />
        <input type="radio" name="slider" id="s4" />
        <input type="radio" name="slider" id="s5" />
        <label for="s1" id="slide1">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={require("../../images/dummy5.jpeg").default} />
              <div className="card-text">
                <h1 data-text="Overwatch">Overwatch</h1>
                <h3>Shooting game</h3>
                <h4>4,300 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for="s2" id="slide2">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={require("../../images/dummy2.jpeg").default} />
              <div className="card-text">
                <h1 data-text="League of Legends">League of Legends</h1>
                <h3>Fighting game</h3>
                <h4>1,400 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for="s3" id="slide3">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={require("../../images/dummy3.jpeg").default} />
              <div className="card-text">
                <h1 data-text="Battle ground">Battle ground</h1>
                <h3>Shooting game</h3>
                <h4>1,400 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for="s4" id="slide4">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={require("../../images/dummy4.jpeg").default} />
              <div className="card-text">
                <h1 data-text="Diablo">Diablo</h1>
                <h3>Role-playing game</h3>
                <h4>1,400 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label for="s5" id="slide5">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={require("../../images/dummy.jpeg").default} />
              <div className="card-text">
                <h1 data-text="DEAD BY DAYLIGHT">DEAD BY DAYLIGHT</h1>
                <h3>Survival game</h3>
                <h4>1,400 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
      </section>
    </div>
  );
};

export default Slide;
