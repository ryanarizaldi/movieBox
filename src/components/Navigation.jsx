import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
  confirmpass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("You forgot to type this field"),
  fullname: Yup.string()
    .min(8, "Your name should be 8 characters long")
    .required("Name is required"),
  username: Yup.string()
    // .min(6, "Your username should be 6 characters long")
    .required("Username is required"),
});
const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});

class Navigation extends Component {
  state = {
    dataLoggedIn: {},
    showLogin: false,
    showSign: false,
    searchInput: "",
    errSearch: false,
    redirect: false,
    token: localStorage.getItem("login"),
    loginAlert: null,
    loading: false,
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

  login = async (values) => {
    try {
      const { email, password } = values;
      // console.log(emailLogin, passLogin);
      this.setState({ loading: true });
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
        loading: false,
      });
      this.handleCloseLogin();
      console.log("submit", submit);
    } catch (error) {
      console.log("error", error);
      this.setState({
        loginAlert: "fail",
        loading: false,
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
      console.log("error", error.response);
      let { username, email } = error.response.data.errors;
      console.log(username, email);
      username = username ? `username ${username}` : "";
      email = email ? `email ${email}` : "";

      Swal.fire({
        title: "Something went Wrong",

        text: email + username,

        // `${email &&'Email is '+email`
        //   // `${email?} Email is ${email}` +
        //   // `${username &&}username is ${username}`,
        icon: "error",
      });
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

  searchApa = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  search = (e) => {
    const { searchInput } = this.state;
    e.preventDefault();
    const url = `/search/${searchInput}`;
    searchInput !== ""
      ? this.props.history.push(url)
      : this.setState({ errSearch: true });
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
    const { token, loginAlert, loading, errSearch } = this.state;
    const usernameLog = this.state.dataLoggedIn.username;
    let showSuc = false;
    let showFail = false;

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

            {/* <InputGroup className="w-50"> */}
            <Form inline onSubmit={this.search}>
              <FormControl
                placeholder="Search Movie..."
                aria-label="Search Movie..."
                aria-describedby="basic-addon2"
                onChange={this.searchApa}
              />
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </Form>
            {/* <InputGroup.Append> */}
            {/* </InputGroup.Append> */}
            {/* </InputGroup> */}

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

        {errSearch && (
          <Alert variant="danger" dismissible>
            No Empty string please!
          </Alert>
        )}

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
                confirmpass: "",
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
                  <Form.Group controlId="Confirm Password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field
                      type="password"
                      placeholder="Type Your 8 Characters Long Password"
                      name="confirmpass"
                      onChange={handleChange}
                      className={`form-control ${
                        touched.confirmpass && errors.confirmpass
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmpass"
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
            Login Failed, Tapi Gatau Kenapa. Try Again!
          </Alert>
          <Modal.Body>
            <Formik
              validationSchema={schemaLogin}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                // setTimeout(() => {
                this.login(values);
                // setSubmitting(false);
                // }, 1500);
              }}
            >
              {({
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Field
                      type="email"
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

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Field
                      type="password"
                      placeholder="Password"
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

                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "please wait..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(Navigation);
