import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navigation extends Component {
  render() {
    return (
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
              <Link to="/" className="nav-link">
                Sign Up
              </Link>
              <Link to="/about" className="nav-link">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
