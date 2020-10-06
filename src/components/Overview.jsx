import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

class Overview extends Component {
  // state = {
  //   movies: []
  // }

  // componentDidMount = () => {
  //   const id = this.props.match.params.id; 
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=0f4cb6189e20110c05e4b524ae7821ac`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({
  //         movies: json
  //       });
  //     });

  //     console.log(this.props);
  // };


    render() {
      const { overview, release_date } = this.props.movie
      // console.log(this.state)

        return (
         // overview = {this.props.overview};

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

            {/* <Switch>
                <Route path={`/detail/${id}/overview`} />
            </Switch> */}
          </div>
        )
    }
}

export default withRouter(Overview);
