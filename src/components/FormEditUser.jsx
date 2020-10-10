import React, { Component } from "react";
import {
  
  Container,
  Form,
  FormControl,
  Row,
  Button,
  Col,
  Image,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
  fullname: Yup.string()
    .required("Name is required"),
  // username: Yup.string()
  //   .required("Username is required"),
});

export default class FormEditUser extends Component {
  state = {
    token: localStorage.getItem("login"),
    userId: localStorage.getItem("idUser"),
    dataUser: {},
    loading :false,
  };

  componentDidMount = () => {
    this.getCurrentUser();
  };

  tesSumbit = (values) => {
    const { email, username, password, fullname } = values;
    console.log("email", email);
    console.log("username", username);
    console.log("password", password);
    console.log("fullname", fullname);
  }

  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      const fetch = await axios.get("https://nameless-temple-74030.herokuapp.com/user/id", {
        headers: {
          access_token: token,
        },
      });

      console.log("fetch", fetch);
      this.setState({
        dataUser: fetch.data.User_Data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    const { username, image, fullname, email } = this.state.dataUser;
    const {loading } = this.state
    return (
      <div>
        <Container className="mb-5">
          <h1 className="mt-5 mb-5">Edit User Profile</h1>
            <Row>

            <Col md="3">
              <Image src={`https://nameless-temple-74030.herokuapp.com/${image}`} fluid/>
            </Col>
            <Col>
            <Formik 
              validationSchema={schema}
              initialValues={{
                image: "",
                password: "",
                fullname: fullname,
                username: username,
                
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  this.tesSumbit(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ touched, errors, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="4">
                        Email
                      </Form.Label>
                      <Col>
                        <Form.Control plaintext readOnly defaultValue={email} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextUsername">
                      <Form.Label column sm="4">
                        Username
                      </Form.Label>
                      <Col>
                        <Field name="username" type="text" placeholder={username} 
                       />
                      <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFullName">
                      <Form.Label column sm="4">
                        Fullname
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Password" value={fullname}  />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Password for Confirmation
                      </Form.Label>
                      <Col >
                        <Form.Control type="password" placeholder="Password"  />
                      </Col>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading... " : "Submit"}
                      </Button>
                </Form>
              )}

            </Formik>
            </Col>
            </Row>
        </Container>
      </div>
    );
  }
}
