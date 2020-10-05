import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, Pagination, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Searched extends Component {
  state = {
    movies: [],
    currPage: 1,
    totRes: 0,
  };

  getMovie = async (num) => {
    try {
      const { keyword } = this.props;
      const movie = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&query=${keyword}&page=${num}`
      );

      // console.log(movie);

      this.setState({
        movies: movie.data.results,
        totRes: movie.data.total_pages,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  componentDidMount = () => {
    this.getMovie(this.state.currPage);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("inijalna");
    const { keyword } = this.props;
    if (keyword !== prevProps.keyword) {
      if (keyword) {
        this.getMovie(1);
        this.setState({ currPage: 1 });
      }
    }
  };

  paginate = (pageNum) => {
    this.setState({ currPage: pageNum });
    this.getMovie(pageNum);
    window.scrollTo(0, 0);
  };
  render() {
    const { keyword } = this.props;
    const { movies, currPage, totRes } = this.state;
    return (
      <div className="search">
        <Container>
          <h1>You Are Searching for "{keyword}" </h1>
          <Row>
            {movies.length ? (
              movies.map((mov) => (
                <Col lg="3">
                  <Link to={`/detail/${mov.id}`}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={
                          mov.poster_path
                            ? "http://image.tmdb.org/t/p/w500" + mov.poster_path
                            : "noImg"
                        }
                      />
                      <Card.Body>
                        <Card.Title>{mov.original_title}</Card.Title>
                        <Card.Text>{mov.release_date?.slice(0, 4)}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Col>
                <h3 className="search-msg">Sorry, No movie found yet :(</h3>
              </Col>
            )}
          </Row>
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
        </Container>
      </div>
    );
  }
}
