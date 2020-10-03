import React, { Component } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Image, Button, Badge, Row, Col } from "react-bootstrap";
import Overview from "./Overview";
import Character from "./Character";
import Review from "./Review";

class DetailMovie extends Component {
  state = {
    movies: [],
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=0f4cb6189e20110c05e4b524ae7821ac`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          movies: json,
        });
      });

    console.log(this.props);
  };

  render() {
    const { original_title, overview } = this.state.movies;

    return (
      <div>
        <Image src="" fluid />
        <Container>
          <h1>{original_title}</h1>
          <h4>Score</h4>
          <p>{overview}</p>
          <Button>Watch trailer</Button>
          <Button>Add to Watchlist</Button>

          <Router>
            <div className="movie-badge">
              <Badge pill variant="info">
                <Link to="/detail/:id?/overview"> Overview </Link>
              </Badge>
              <Badge pill variant="info">
                <Link to="/detail/character"> Character </Link>
              </Badge>
              <Badge pill variant="info">
                <Link to="/detail/review"> Review </Link>
              </Badge>

              <Switch>
                <Route path="/detail/:id?/overview" component={Overview} />
                <Route path="/detail/character" component={Character} />
                <Route path="/detail/review" component={Review} />
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default withRouter(DetailMovie);
