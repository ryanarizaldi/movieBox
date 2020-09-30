import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default class Navigation extends Component {
  state = {
    showLogin: false,
    showSign: false,
    emailLogin: "",
    passLogin: "",
    token: localStorage.getItem("login"),
  };

  onChange = (name, e) => {
    this.setState({
      [name]: e,
    });
    // console.log(this.state);
  };

  login = async (e) => {
    e.preventDefault();
    try {
      const { emailLogin, passLogin } = this.state;
      console.log(emailLogin, passLogin);
      const submit = await axios.post(
        "http://appdoto.herokuapp.com/api/users/login",
        {
          emailLogin,
          passLogin,
        }
      );

      localStorage.setItem("login", submit.data.data.token);
      this.props.onChange("login", submit.data.data.token);
      this.props.onClose();

      console.log("submit", submit);
    } catch (error) {
      console.log("error", error);
    }
  };

  launchModalLogin = () => {
    this.setState({ showLogin: true });
  };

  launchModalSign = () => {
    this.setState({ showSign: true });
  };

  handleCloseLogin = () => {
    this.setState({ showLogin: false });
  };

  handleCloseSign = () => {
    this.setState({ showSign: false });
  };

  render() {
    const { emailLogin, passLogin } = this.state;
    return (
      <>
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <FontAwesomeIcon icon="video" />
                MOVIEBOX
              </Link>
            </Navbar.Brand>
            <InputGroup className="w-50">
              <FormControl
                placeholder="Search Movie..."
                aria-label="Search Movie..."
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
              </InputGroup.Append>
            </InputGroup>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Button onClick={this.launchModalSign} variant="light">
                  Sign Up
                </Button>
                <Button onClick={this.launchModalLogin} variant="light">
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showSign}
          onHide={this.handleCloseSign}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign Up
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="fullName"
                  placeholder="Enter your Fullname"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseSign}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showLogin}
          onHide={this.handleCloseLogin}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.login}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="emailLogin"
                  value={emailLogin}
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={passLogin}
                  type="password"
                  placeholder="Password"
                  name="passLogin"
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseLogin}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
