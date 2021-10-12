/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./_slide.scss";

const Slide = () => {
  const [gameList, setGameList] = useState({ items: [] });
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    axios.get(`${ENDPOINT}/category/lists/1`).then((data) => {
      setGameList(data.data.data);
    });
  }, []);

  return (
    <div className="slider-container">
      <section id="slider">
        <input type="radio" name="slider" id="s1" />
        <input type="radio" name="slider" id="s2" />
        <input type="radio" name="slider" id="s3" />
        <input type="radio" name="slider" id="s4" />
        <input type="radio" name="slider" id="s5" />
        <label htmlFor="s1" id="slide1">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[0]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameList[0]?.category}>
                  {gameList[0]?.category}
                </div>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s2" id="slide2">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[1]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameList[1]?.category}>
                  {gameList[1]?.category}
                </div>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s3" id="slide3">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[2]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameList[2]?.category}>
                  {gameList[2]?.category}
                </div>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s4" id="slide4">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[3]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameList[3]?.category}>
                  {gameList[3]?.category}
                </div>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s5" id="slide5">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[4]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameList[4]?.category}>
                  {gameList[4]?.category}
                </div>
              </div>
            </div>
          </div>
        </label>
      </section>
    </div>
  );
};

export default Slide;
