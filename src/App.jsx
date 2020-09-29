import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
