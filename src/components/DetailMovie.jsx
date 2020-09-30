import React, { Component } from "react";
import { Container, Image, Button, Badge, Row, Col } from "react-bootstrap";

export default class DetailMovie extends Component {
  render() {
    return (
      <div>
        <Image src="" fluid />
        <Container>
          <h1>Judul</h1>
          <h4>Score</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sint
            accusamus soluta quaerat ut doloribus itaque vitae, odio beatae, sit
            aliquid porro aspernatur magni ratione amet nesciunt. Repellat,
            earum libero! Fugit voluptates repellat omnis eveniet, repellendus
            sed deserunt dicta, praesentium culpa qui accusantium voluptatum?
            Quisquam vel vero minus delectus distinctio necessitatibus
            perspiciatis
          </p>
          <Button>Watch trailer</Button>
          <Button>Add to Watchlist</Button>

          <div className="movie-badge">
            {/* <Button> */}
            <Badge pill variant="info">
              Overview
            </Badge>
            {/* </Button> */}
            <Badge pill variant="info">
              Character
            </Badge>
            <Badge pill variant="info">
              Review
            </Badge>
          </div>

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
        </Container>
      </div>
    );
  }
}
