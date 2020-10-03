import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import dp from "../assets/img/hero1.jpg";
import dp1 from "../assets/img/hero.jpg";
import dp2 from "../assets/img/hero1.jpg";
export default class Hero extends Component {
  render() {
    return (
      <>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={dp} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={dp1} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={dp2} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
}
