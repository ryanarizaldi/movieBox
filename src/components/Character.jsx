import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import noimg from "../assets/img/noimg.png";

export default class Character extends Component {
  state = {
    casts: [],
    token: localStorage.getItem("login"),
  };

  componentDidMount = async () => {
    try {
      const id = this.props.movie.id;
      const fetch = await axios.get(
        `https://nameless-temple-74030.herokuapp.com/moviechar/find/${id}`
      );

      console.log("fetch", fetch);
      this.setState({
        casts: fetch.data.characters,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  getChar = async () => {
    try {
      const id = this.props.movie.id;
      await axios({
        method: "post",
        url: `https://nameless-temple-74030.herokuapp.com/moviechar/find/${id}`,
        headers: {
          "access_token": this.state.token,
        },
      })
    } catch (error) {
      console.log("error", error);
    }
  };


  render() {
    const { image, name } = this.state.casts;
    // console.log(this.props.movie);
    // const { casts } = this.state;
    return (
      <div className="main-char">
        <div className="character">
          <Row>
              <Col md="2">
                <Card>
                  <Card.Img
                    variant="top"
                    src={image ? image : `htpps://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
                  />
                  <Card.Body>
                    <Card.Title>{name ? name : "Not Found"}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </div>
      </div>
    );
  }
}
