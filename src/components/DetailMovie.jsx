import React, { Component } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Image, Button, Badge, Row, Col } from "react-bootstrap";
import Overview from "./Overview";
import Character from "./Character";
import Review from "./Review";

class DetailMovie extends Component {
  state = {
    movies: []
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=0f4cb6189e20110c05e4b524ae7821ac`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          movies: json
        });
      });

      console.log(this.props);
  }

  // overview = (id) => {
  //   this.props.history.push({
  //     pathname: '/overview',
  //     state: { id }
  //   })
  // }

  render() {
    const { id, original_title, backdrop_path, vote_count, overview  } = this.state.movies;
    // const id = this.state;
    // console.log(id)

    return (
      <div className="main-content">
        <Container>
          <div className="content">
            <Image src={"https://image.tmdb.org/t/p/w500" + backdrop_path} fluid />
            <div className="content-detail">
              <h1>{original_title}</h1>
              <h4>Score: {vote_count}</h4>
              <p>{overview}</p>
              <Button>Watch trailer</Button>
              <Button>Add to Watchlist</Button>
            </div>
          </div>

          <Router>
            <div className="movie-badge">
              {/* <Button> */}
              <Badge pill variant="info">
                <Link to= {`/detail/${id}/overview`}> Overview </Link>
              </Badge>
              {/* </Button> */}
              <Badge pill variant="info">
                <Link to={`/detail/${id}/character`}> Character </Link> 
              </Badge>
              <Badge pill variant="info">
                <Link to={`/detail/${id}/review`}> Review </Link>
              </Badge>

              <Switch>
                <Route path={`/detail/${id}/overview`} component={() => <Overview movie={this.state.movies} />} />
                <Route path={`/detail/${id}/character`} component={() => <Character movie={this.state.movies} />} />
                <Route path={`/detail/${id}/review`} component={() => <Review movie={this.state.movies} />} />
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default withRouter(DetailMovie);
