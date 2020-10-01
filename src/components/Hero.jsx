import React, { Component } from "react";
import {
  Carousel,
  Container,
  Image,
  Button,
  Row,
  Col,
  Card,
  Pagination,
} from "react-bootstrap";
import dp from "../assets/img/hero1.jpg";
import dp1 from "../assets/img/hero.jpg";
import dp2 from "../assets/img/hero1.jpg";
export default class Hero extends Component {
  state = {
    movies: [],
  };

  componentDidMount = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          movies: json.results,
        });
      });
  };

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
        <Container>
          <div className="show-by">
            <h1>Show by Genre</h1>
            <Button active>Sci-fi</Button>
            <Button>Drama</Button>
            <Button>Comedy</Button>
            <Button>Horor</Button>
            <Button>Romance</Button>
            <Button>Action</Button>
            <Button>Anime</Button>
          </div>
          <div className="movie-by-genre">
            <Row>
              {this.state.movies ? (
                this.state.movies.slice(0, 20).map((mov) => (
                  <Col md="3">
                    <Card>
                      <Card.Img
                        variant="top" 
                        src={"http://image.tmdb.org/t/p/w500" + mov.poster_path}
                      />
                      <Card.Body>
                        <Card.Title>{mov.original_title}</Card.Title>
                        <Card.Text>{mov.release_date.slice(0, 4)}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Card>
                    <Card.Img variant="top" src="../assets/img/404.jpg" />
                    <Card.Body>
                      <Card.Title>No Movie Found</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </div>
          <Row id="page">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{14}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Row>
        </Container>
      </>
    );
  }
}
