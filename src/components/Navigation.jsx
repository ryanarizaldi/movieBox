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
    dataLoggedIn: {},
    showLogin: false,
    showSign: false,
    emailLogin: "",
    passLogin: "",
    emaiSign: "",
    passSign: "",
    fullName: "",
    token: localStorage.getItem("login"),
  };

  componentDidMount = () => {
    const { token } = this.state;

    if (token) {
      this.getCurrentUser();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { token } = this.state;

    if (token !== prevState.token) {
      if (token) {
        this.getCurrentUser();
      }
    }
  };
  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      // console.log("token", token);

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
      // console.log(emailLogin, passLogin);
      const submit = await axios.post(
        "http://appdoto.herokuapp.com/api/users/login",
        {
          email: emailLogin,
          password: passLogin,
        }
      );
      localStorage.setItem("login", submit.data.data.token);
      this.onChange("token", submit.data.data.token);
      this.handleCloseLogin();
      console.log("submit", submit);
    } catch (error) {
      console.log("error", error);
    }
  };

  signUp = async (e) => {
    console.log("masukgan");
    e.preventDefault();
    try {
      const { fullName, emailSign, passSign } = this.state;
      const submit = await axios.post(
        "http://appdoto.herokuapp.com/api/users/",
        {
          email: emailSign,
          password: passSign,
          username: fullName,
          fullname: fullName,
          bio: "itulah bionya",
        }
      );
      localStorage.setItem("login", submit.data.data.token);
      this.onChange("token", submit.data.data.token);
      console.log(submit);

      this.handleCloseSign();
    } catch (error) {
      console.log("error", error);
    }
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      emailLogin: "",
      passLogin: "",
      token: null,
    });
  };

  // login = (e) => {
  //   e.preventDefault();

  //   const { emailLogin, passLogin } = this.state;
  //   // console.log(JSON.stringify(emailLogin, passLogin));
  //   fetch("http://appdoto.herokuapp.com/api/users/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: emailLogin,
  //       password: passLogin,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log("Success:", result);
  //       localStorage.setItem("token", result.data.token);
  //       localStorage.setItem("isLogin", true);
  //     });
  //   this.props.onClose();
  // };

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
    const {
      emailLogin,
      passLogin,
      token,
      passSign,
      emailSign,
      fullName,
    } = this.state;
    const { username } = this.state.dataLoggedIn;
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
                {token ? (
                  <>
                    <Button>Hello {username}</Button>
                    <Button onClick={this.logout} variant="light">
                      logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={this.launchModalSign} variant="light">
                      Sign Up
                    </Button>
                    <Button onClick={this.launchModalLogin} variant="light">
                      Login
                    </Button>
                  </>
                )}
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
            <Form onSubmit={this.signUp}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="fullName"
                  placeholder="Enter your Fullname"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="emailSign"
                  value={emailSign}
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="passSign"
                  value={passSign}
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
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
        </Modal>
      </>
    );
  }
}
