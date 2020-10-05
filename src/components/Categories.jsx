import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Categories extends Component {
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

  //INI TETEP DITULIS PREVPROPSNYA MESKIPUN GA DIPAKE
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
      currPage: 1,
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

  // fungsi pagination buat ngubah page result dari fetch
  paginate = async (pageNum) => {
    const { option } = this.state;
    try {
      const data = await axios.get(
        option === 0
          ? `https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac&page=${pageNum}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}&page=${pageNum}`
      );
      this.setState({
        movies: data.data.results,
        currPage: pageNum,
      });
      window.scrollTo(0, 900);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // fungsi dibawah gausah dipake soalnya buat manggil previous page tinggal diubah aja parameter fungsi diatas
  // prevPage = async (pageNum) => {
  //   const { option } = this.state;
  //   try {
  //     const data = await axios.get(
  //       option === 0
  //         ? `https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac&page=${pageNum}`
  //         : `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}&page=${pageNum}`
  //     );
  //     this.setState({
  //       movies: data.data.results,
  //       currPage: pageNum,
  //     });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  //
  firstPagi = async () => {
    this.paginate(1);
  };

  lastPagi = async () => {
    const { totRes } = this.state;
    this.paginate(totRes);
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
              <Pagination.First
                onClick={() => this.paginate(1)}
                className={currPage === 1 && "disabled"} // tambahin class name disable kalo lagi di pagination  pertama biar ga bisa diklik
              />
              <Pagination.Prev
                onClick={() => this.paginate(currPage - 1)}
                className={currPage === 1 && "disabled"}
              />
              {currPage && (
                <Pagination.Item active>
                  Page {currPage} of {totRes}
                </Pagination.Item>
              )}
              {/* <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{14}</Pagination.Item> */}
              <Pagination.Next
                onClick={() => this.paginate(currPage + 1)}
                className={currPage === totRes && "disabled"}
              />
              <Pagination.Last
                onClick={() => this.paginate(totRes)}
                className={currPage === totRes && "disabled"}
              />
            </Pagination>
          </Row>
        )}
      </Container>
    );
  }
}
