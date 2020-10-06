import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default class MainCategory extends Component {
  state = {
    movies: [],
    option: 0,
    active: 0,
    genre: [],
    currPage: 1,
    totRes: 0,
  };

  componentDidMount = () => {
    this.getMovie();
    this.getGenre();
  };

  getMovie = () => {
    const { option } = this.state;
    if (option === 0) {
      console.log("masuk option");
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac"
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            movies: json.results,
            totRes: json.total_pages,
          });
        });
    } else {
      console.log("masuk option custom");
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}`
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            movies: json.results,
            totRes: json.total_pages,
          });
        });
    }
  };

  //INI TETEP DITULIS PREVSTATENYA MESKIPUN GA DIPAKE
  componentDidUpdate = (prevProps, prevState) => {
    const { option } = this.state;
    if (option !== prevState.option) {
      this.getMovie();
    }
  };

  genre = (num) => {
    this.setState({
      option: num,
      active: num,
    });
  };

  getGenre = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=0f4cb6189e20110c05e4b524ae7821ac`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          genre: json.genres,
        });
      });
  };

  nextPage = async (pageNum) => {
    try {
      const { option } = this.state;
      const data = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}&page=${pageNum}`
      );
      this.setState({
        movies: data.data.data,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  render() {
    const { active, totRes, currPage } = this.state;
    return (
      <Container>
        <div className="show-by">
          <h1>Show by Genre</h1>
          <Button
            className={active === 0 ? `active` : ""}
            onClick={() => this.genre(0)}
          >
            Popular
          </Button>
          {this.state.genre.slice(0, 10).map((gen) => (
            <Button
              className={active === gen.id ? `active` : ""}
              onClick={() => this.genre(gen.id)}
            >
              {gen.name}
            </Button>
          ))}
        </div>
        <div className="movie-by-genre">
          <Row>
            {this.state.movies ? (
              this.state.movies.slice(0, 20).map((mov) => (
                <Col md="3">
                  <Link to={`/detail/${mov.id}/overview`}>
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
                  </Link>
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
        {totRes && (
          <Row id="page">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              {currPage && <Pagination.Item active>{currPage}</Pagination.Item>}
              {/* <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{14}</Pagination.Item> */}
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Row>
        )}
      </Container>
    );
  }
}
