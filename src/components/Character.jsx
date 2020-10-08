import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

export default class Character extends Component {
  state = {
    casts: [],
  };

  componentDidMount = async () => {
    try {
      const { casts } = this.state;
      const id = this.props.movie.id;
      const fetch = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0f4cb6189e20110c05e4b524ae7821ac`
      );

      console.log("fetch", fetch);
      this.setState({
        casts: fetch.data.cast,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    // const { image, name } = this.props.movie
    // console.log(this.props.movie);
    const { casts } = this.state;
    return (
      <div className="main-char">
        <div className="character">
          <Row>
            {casts.slice(0, 10).map((cast) => (
              <Col md="2">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://image.tmdb.org/t/p/original${cast.profile_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{cast.name}</Card.Title>
                    <p>as</p>
                    <Card.Title>{cast.character}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
