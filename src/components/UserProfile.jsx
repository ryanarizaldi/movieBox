import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Image } from "react-bootstrap";
import imag from "../assets/img/noimg.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default class UserProfile extends Component {
  state = {
    token: localStorage.getItem("login"),
    dataLoggedIn: {},
  };

  componentDidMount = () => {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      const fetch = await axios.get("http://appdoto.herokuapp.com/api/user", {
        headers: {
          Authorization: token,
        },
      });

      console.log("fetch", fetch);
      this.setState({
        dataLoggedIn: fetch.data.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    const { username, bio, fullname, email } = this.state.dataLoggedIn;
    return (
      <div>
        <Container className="mb-5">
          <h1 className="mt-5 mb-5">User Profile</h1>
          <Row>
            <Col md={4}>
              <Image src={imag} alt="" fluid />
            </Col>
            <Col>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Fullname</b>
                </Col>
                <Col>: {fullname}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Username</b>
                </Col>
                <Col>: {username}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Email</b>
                </Col>
                <Col>: {email}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Bio</b>
                </Col>
                <Col>: {bio}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
