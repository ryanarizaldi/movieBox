import React, { Component } from "react";
import Hero from "../components/Hero";
import Categories from "../components/categories/MainCategory";

export default class Home extends Component {
  render() {
    return (
      <>
        <Hero />
        <Categories />
      </>
    );
  }
}
