/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import loading from "../../images/dummy/loading.jpeg";

import "./_slide.scss";

const Slide = () => {
  const [gameList, setGameList] = useState({ items: [] });
  const [gameName1, setGameName1] = useState("");
  const [gameName2, setGameName2] = useState("");
  const [gameName3, setGameName3] = useState("");
  const [gameName4, setGameName4] = useState("");
  const [gameName5, setGameName5] = useState("");
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    axios.get(`${ENDPOINT}/category/lists/1`).then((data) => {
      const list = data.data.data;
      console.log(list);
    });
  }, []);
  console.log(loading);
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
                <div className="glitch" data-text={gameName1}>
                  {gameName1}
                </div>
                <h3>Shooting game</h3>
                <h4>4,300 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s2" id="slide2">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[1]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameName2}>
                  {gameName2}
                </div>
                <h3>Fighting game</h3>
                <h4>5,600 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s3" id="slide3">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[2]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameName3}>
                  {gameName3}
                </div>
                <h3>Shooting game</h3>
                <h4>6,100 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s4" id="slide4">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[3]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameName4}>
                  {gameName4}
                </div>
                <h3>Role-playing game</h3>
                <h4>3,500 viewers are watching now.</h4>
              </div>
            </div>
          </div>
        </label>
        <label htmlFor="s5" id="slide5">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <img src={gameList[2]?.image} />
              <div className="card-text">
                <div className="glitch" data-text={gameName5}>
                  {gameName5}
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
