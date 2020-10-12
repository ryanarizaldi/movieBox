import React, { Component } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { Container, Image, Button, Badge } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import Overview from "./Overview";
import Character from "./Character";
import Review from "./Review";

class DetailMovie extends Component {
  state = {
    movies: []
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    fetch(
      `https://nameless-temple-74030.herokuapp.com/movie/search/${id}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          movies: json.Movie
        });
      });

    console.log(this.props);
  };

  // overview = (id) => {
  //   this.props.history.push({
  //     pathname: '/overview',
  //     state: { id }
  //   })
  // }

  render() {
    const {
      id,
      title,
      synopsis,
      trailer,
      poster,
      backdrop,
      rating
    } = this.state.movies;
    // const id = this.state;
    // console.log(id)

    return (
      <div className="main-content">
        <Container>
          <div className="content">
            <div className="detail-img">
              <Image
                src={backdrop}
                fluid
              />
            </div>
            <div className="content-detail">
              <h1>{title}</h1>
              <h4>Rating: {rating ? rating : "N/A"}</h4>
              <p>{synopsis}</p>
              <div className="button">
                <Button onClick={() => window.open(trailer)} >Watch trailer</Button>
                <Button>Add to Watchlist</Button>
              </div>
            </div>
          </div>

          <div className="movie-badge">
            <div className="button-badge">
              <NavLink
                to={`/detail/${id}/overview`}
                className="link"
                activeClassName="active"
              >
                <span>Overview</span>
              </NavLink>

              <NavLink
                to={`/detail/${id}/character`}
                className="link"
                activeClassName="active"
              >
                <span>Character</span>
              </NavLink>

              <NavLink
                to={`/detail/${id}/review`}
                className="link"
                activeClassName="active"
              >
                <span>Review</span>
              </NavLink>
            </div>

            <Switch>
              <Route
                path={`/detail/${id}/overview`}
                exact
                component={() => <Overview movie={this.state.movies} />}
              />
              <Route
                path={`/detail/${id}/character`}
                exact
                component={() => <Character movie={this.state.movies} />}
              />
              <Route
                path={`/detail/${id}/review`}
                exact
                component={() => <Review movie={this.state.movies} />}
              />
            </Switch>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(DetailMovie);
