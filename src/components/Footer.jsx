import React, { Component } from "react";
import { Image } from "react-bootstrap";
import gp from "../assets/img/google_play.png";
import as from "../assets/img/apple_store.png";
import p from "../assets/img/pinterest.png";
import f from "../assets/img/facebook.png";
import i from "../assets/img/instagram.png";
import logo from "../assets/img/txtsplash.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="top">
          <div className="name">
            <h1>MovieBox</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo impedit totam dolorem accusantium nobis, harum laboriosam magni fuga. Soluta, repellendus? Earum, corporis nam? Quam incidunt adipisci id facere labore quis.</p>
          </div>
          <div className="about">
            <span a href="#">Tentang Kami</span>
            <span a href="#">Blog</span>
            <span a href="#">Layanan</span>
            <span a href="#">Karir</span>
            <span a href="#">Pusat Media</span>
          </div>
          <div className="images">
            <div className="download">
              <h5>Download</h5>
              {/* <Image src={gp} />
            <Image src={as} /> */}
            </div>
            <div className="sosmed">
              <h5>Sosial Media</h5>
              {/* <Image src={p} />
            <Image src={f} />
            <Image src={i} /> */}
            </div>
          </div>
        </div>
        <hr className="my-4"></hr>
        <div className="copy">
          <h6>Copyright 2020 by Team D</h6>
        </div>
      </div>

    );
  }
}
