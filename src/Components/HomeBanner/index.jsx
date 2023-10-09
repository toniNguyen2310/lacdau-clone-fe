import React, { useRef } from "react";
import { Carousel } from "antd";

import "./homeBanner.scss";
import MenuCategory from "../Menu";
function HomeBanner(props) {
  return (
    <div className="home-banner-group">
      <MenuCategory
        position={"relative"}
        background={"white"}
        display={"block"}
        zindex={4}
      />

      {/* <div className="modal-menu">
        <MenuCategory position={"absolute"} background={"red"} />
      </div> */}

      <div className="home-center">
        <Carousel swipeToSlide draggable autoplay>
          <div>
            <a href="">
              <img
                loading="lazy"
                src="https://lacdau.com/media/banner/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img
                loading="lazy"
                src="	https://lacdau.com/media/banner/09_Jul9860edbd0f637428e39fde95121313ed.png"
                alt=""
              />
            </a>
          </div>
          {/* <div>
            <a href="">
              <img loading="lazy"
                src="https://lacdau.com/media/banner/04_Jula2b2fecb48c5967badfe4d137f8508ec.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img loading="lazy"
                src="https://lacdau.com/media/banner/04_Jul476c025120f6806e9d46a90f17cebbdf.png"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="">
              <img loading="lazy"
                src="https://lacdau.com/media/banner/04_Jul6bacdcd6a63d8b6a4e46c8337fc12342.png"
                alt=""
              />
            </a>
          </div> */}
        </Carousel>
      </div>
      <div className="home-right">
        <a href="" className="animation-small">
          <img
            loading="lazy"
            src="https://lacdau.com/media/banner/04_Jul7f64f21fb6ba6d30b7932b6ad017b870.png"
            alt=""
          />
        </a>
        <a href="" className="animation-small">
          <img
            loading="lazy"
            src="https://lacdau.com/media/banner/04_Julbc98282e1bb9acf041f8c94b05ccdfcb.png"
            alt=""
          />
        </a>
        <a href="" className="animation-small">
          <img
            loading="lazy"
            src="https://lacdau.com/media/banner/04_Jul58a3f59ace6732aceb452a6e387c0c20.png"
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default HomeBanner;
