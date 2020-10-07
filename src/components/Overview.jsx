import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Row, Col } from "react-bootstrap";

class Overview extends Component {
    render() {
      const { overview, release_date } = this.props.movie

        return (
          <div className="trailer">
            <div className="synopsis">
              <h1>Synopsis</h1>
              <p>{ overview }</p>
            </div>

            <div className="movie-info">
              <h1>Movie Info</h1>
              <Row>
                <Col lg="2">
                  <b>Release Date</b>
                </Col>
                <Col lg="10">: {release_date} </Col>
                <Col lg="2">
                  <b>Director</b>
                </Col>
                <Col lg="10">: Michael Bay</Col>
                <Col lg="2">
                  <b>Featured Song</b>
                </Col>
                <Col lg="10">
                  : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tempora, optio.
                </Col>
                <Col lg="2">
                  <b>Budget</b>
                </Col>
                <Col lg="10">
                  : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tempora, optio.
                </Col>
              </Row>
            </div>
          </div>
        )
    }
}

export default withRouter(Overview);
