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
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
  // confirmPass: Yup.string()
  //   .required("You forgot to type this field")
  //   .oneOf([Yup.ref("password")]),
  fullname: Yup.string()
    .min(8, "Your name should be 8 characters long")
    .required("Name is required"),
  username: Yup.string()
    .min(6, "Your username should be 6 characters long")
    .required("Username is required"),
});

export default class Navigation extends Component {
  state = {
    dataLoggedIn: {},
    showLogin: false,
    showSign: false,
    email: "",
    password: "",
    username: "",
    fullname: "",
    confirmPass: "",
    token: localStorage.getItem("login"),
    loginAlert: null,
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
      const { email, password } = this.state;
      // console.log(emailLogin, passLogin);
      const submit = await axios.post(
        "http://appdoto.herokuapp.com/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("login", submit.data.data.token);
      this.onChange("token", submit.data.data.token);
      this.setState({
        loginAlert: "success",
      });
      this.handleCloseLogin();
      console.log("submit", submit);
    } catch (error) {
      console.log("error", error);
      this.setState({
        loginAlert: "fail",
      });
    }
  };

  showAlert = () => <Alert variant="success">Login Success</Alert>;

  signUp = async (values) => {
    console.log("signupJalan", values);
    try {
      const { email, password, username, fullname } = values; //ini values dari formik
      const submit = await axios.post(
        "http://appdoto.herokuapp.com/api/users/",
        {
          email: email,
          password: password,
          username: username,
          fullname: fullname,
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
      email: "",
      password: "",
      token: null,
    });
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
    const { token, email, password, confirmPass, loginAlert } = this.state;
    const usernameLog = this.state.dataLoggedIn.username;
    let showSuc = false;
    let showFail = false;
    // console.log(usernameLog);
    return (
      <>
        {loginAlert === "success"
          ? (showSuc = true)
          : loginAlert === "fail"
          ? (showFail = true)
          : ""}
        <Alert show={showSuc} variant="success" dismissible>
          Login Success
        </Alert>

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
                    <Button>Hello {usernameLog}</Button>
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

        {/* modal signup */}
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
            <Formik
              validationSchema={schema}
              initialValues={{
                email: "",
                password: "",
                fullname: "",
                username: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  this.signUp(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit,
              }) => (
                <Form
                  onSubmit={handleSubmit} // ini handle submitnya formik
                >
                  <Form.Group controlId="fullname">
                    <Form.Label>Full Name</Form.Label>
                    <Field
                      type="text"
                      placeholder="Enter your Fullname"
                      name="fullname"
                      // value={this.state.fullname}
                      className={`form-control ${
                        touched.fullname && errors.fullname ? "is-invalid" : "" // ini biar si field ada class form control dan invalid apa ga
                      }`}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      component="div"
                      name="fullname"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Field
                      type="text"
                      placeholder="Enter your Username"
                      name="username"
                      onChange={handleChange}
                      // value={fullname}
                      className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Field
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field
                      type="password"
                      placeholder="Type Your 8 Characters Long Password"
                      name="password"
                      onChange={handleChange}
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "please wait..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>

        {/* modal login  */}
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
          <Alert
            show={showFail}
            onClose={() => this.setState({ loginAlert: "" })}
            variant="danger"
            dismissible
          >
            Login Failed, Try Again!
          </Alert>
          <Modal.Body>
            <Form onSubmit={this.login}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => this.onChange(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Password"
                  name="password"
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
