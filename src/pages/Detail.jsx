import React, { Component } from "react";
import DetailMovie from "../components/DetailMovie";
//import Overview from "../components/Overview";

export default class Detail extends Component {
  render() {
    return (
      <div>
        <DetailMovie />
        {/* <Overview /> */}
      </div>
    );
  }
}
