import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";

export default class Overview extends Component {
    render() {
        return (
            <div className="overview">
            <h1>Synopsis</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              alias in qui eos earum fugit maiores esse ullam nemo rerum eius
              sint architecto, reiciendis quae explicabo consequatur, et
              distinctio sed dignissimos corrupti saepe aut id molestiae ipsum.
              Quibusdam, quo rem libero asperiores non eum, quasi ipsa aperiam
              hic ut sit? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Molestias expedita voluptatum quis odit laudantium.
              Similique ut quas porro nam commodi eum sit, inventore cumque
              architecto neque voluptate incidunt odit dolorem, tenetur veniam
              enim nulla quibusdam asperiores voluptatum atque. Possimus dolores
              rerum saepe officia earum iure vel esse expedita aspernatur
              laudantium.
            </p>
            <Row>
              <Col lg="2">
                <b>Release Date</b>
              </Col>
              <Col lg="10">: January 25, 1342</Col>
              <Col lg="2">
                <b>Director</b>
              </Col>
              <Col lg="10">: Michael Bay</Col>
              <Col lg="2">
                <b>Other detail</b>
              </Col>
              <Col lg="10">
                : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </Col>
              <Col lg="2">
                <b>Other detail</b>
              </Col>
              <Col lg="10">
                : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </Col>
              <Col lg="2">
                <b>Other detail</b>
              </Col>
              <Col lg="10">
                : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora, optio.
              </Col>
            </Row>
          </div>
        )
    }
}
