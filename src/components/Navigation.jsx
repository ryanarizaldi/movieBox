import React, { Component } from "react";
import {
  Navbar,
  Row,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Modal,
  Col,
  Image,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/img/moviebox.png";
import { css } from "@emotion/core";
import { RotateLoader } from "react-spinners/ClipLoader";
import qs from "qs";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
    // .min(8, "Your name should be 8 characters long")
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
    redirect: false,
    token: localStorage.getItem("login"),
    loading: false,
    // image: {
    //   file: {},
    //   url: "",
    // },
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
  };

  login = async (values) => {
    try {
      const { email, password } = values;
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
        loading: false,
      });
      this.handleCloseLogin();
      const username = submit.data.data.username;
      Swal.fire({
        title: "Login Success",
        text: `Welcome ${username}`,
        icon: "success",
      });
    } catch (error) {
      console.log("error ini", error);
      this.setState({
        loading: false,
      });
      const msg = error.response.data.messages.errors;
      console.log(msg);
      Swal.fire({
        title: "Login Failed",
        text: "Email or password invalid!",
        icon: "error",
      });
    }
  };

  openLogin = () => {
    this.handleCloseSign();
    this.launchModalLogin();
  };

  openSign = () => {
    this.handleCloseLogin();
    this.launchModalSign();
  };

  signUp = async (values, images) => {
    const { email, password, username, fullname } = values; //ini values dari formik
    // console.log(formData);
    console.log("value input", email, password, username, fullname);
    const stringQs = qs.stringify({
      email: email,
      username: username,
      password: password,
      fullname: fullname,
    });

    console.log(stringQs);
    try {
      this.setState({ loading: true });

      // const formData = new FormData(); //buat formdata di body api
      // formData.append("email", email);
      // formData.append("fullname", fullname);
      // formData.append("username", username);
      // formData.append("password", password);
      // formData.append("images", images);

      const submit = await axios({
        method: "post",
        url: "https://nameless-temple-74030.herokuapp.com/register",
        data: "string",
        headers: {
          "Content-Type": "application/x-www-form-urlencode;charset=utf-8",
        },
      });

      // const submit = await axios.post(
      //   "http://appdoto.herokuapp.com/api/users/",
      //   {
      //     email: email,
      //     password: password,
      //     username: username,
      //     fullname: fullname,
      //     bio: "itulah bionya",
      //   }
      // );
      console.log(submit);
      // localStorage.setItem("login", submit.data.data.access_token);
      // this.onChange("token", submit.data.data.access_token);
      this.setState({
        loading: false,
      });

      this.handleCloseSign();
      Swal.fire({
        title: "Sign up Success",
        text: "No need to Login. Enjoy our app",
        icon: "success",
      });
    } catch (error) {
      console.log("error", `ERROR: ${JSON.stringify(error.response.data)}`);

      // const { msg } = error.response.data;
      this.setState({
        loading: false,
      });

      // Swal.fire({
      //   title: "Something Went Wrong",
      //   text: msg,
      //   icon: "error",
      // });
      Swal.fire({
        title: "Something Went Wrong",
        text: "try again maybe?",
        icon: "error",
      });
      // let { username, email } = error.response.data.errors;
      // console.log(username, email);
      // username = username ? `username ${username}` : "";
      // email = email ? `email ${email}` : "";

      // Swal.fire({
      //   title: "Something went Wrong",

      //   text: email + username,
      //   icon: "error",
      // });
    }
  };

  logout = () => {
    Swal.fire({
      title: "Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.setState({
          email: "",
          password: "",
          token: null,
        });
      }
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
      : Swal.fire({
          title: "Nope",
          text: "we are can't search empty string",
          icon: "error",
        });
    this.setState({ searchInput: "" });
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

  handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    this.setState({
      image: {
        file: event.currentTarget.files[0],
        url: URL.createObjectURL(file),
      },
    });
  };

  render() {
    const { token, loading, searchInput } = this.state;
    const usernameLog = this.state.dataLoggedIn.username;

    return (
      <>
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </Navbar.Brand>

            <Form inline onSubmit={this.search}>
              <FormControl
                placeholder="Search Movie..."
                aria-label="Search Movie..."
                aria-describedby="basic-addon2"
                onChange={this.searchApa}
                value={searchInput}
              />
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </Form>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {token ? (
                  <>
                    <Link to="/user">Hello {usernameLog}</Link>
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
                image: "",
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
              {({ touched, errors, handleChange, handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit} // ini handle submitnya formik
                >
                  {/* <Form.Group controlId="Image">
                    <Form.File>
                      <div className="preview-pp">
                        {this.state.image.url && (
                          <Image
                            roundedCircle
                            fluid
                            // width="350"
                            // fill
                            src={this.state.image.url}
                            alt={this.state.image.file.name}
                          />
                        )}
                      </div>
                      <div className="preview-name">
                        {this.state.image.file.name && (
                          <span>{this.state.image.file.name}</span>
                        )}
                      </div>
                      <Field
                        type="file"
                        placeholder="Enter your Fullname"
                        name="image"
                        // value={this.state.fullname}
                        className={`form-control ${
                          touched.image && errors.image ? "is-invalid" : "" // ini biar si field ada class form control dan invalid apa ga
                        }`}
                        onChange={(e) => this.handleFileUpload(e)}
                        // onChange={handleChange}
                      />
                      <ErrorMessage
                        component="div"
                        name="image"
                        className="invalid-feedback"
                      />
                    </Form.File>
                  </Form.Group> */}
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
                  <Row>
                    <Col md={10}>
                      <p>
                        Already have an Account?{" "}
                        <a href="#" onClick={this.openLogin}>
                          Login
                        </a>
                      </p>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading... " : "Submit"}
                      </Button>
                    </Col>
                  </Row>
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

                  <p>
                    Dont have an account yet?{" "}
                    <a href="#" onClick={this.openSign}>
                      Sign up
                    </a>
                  </p>
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
