import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

export default class Review extends Component {
  state = {
    review: "",
    ratings: "",
    reviewee: [],
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.reviewee !== prevState.reviewee) {
      this.render();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { review, ratings, reviewee } = this.state;
    // Swal.fire({
    //   title: "Success Post a Review",
    //   text: `${review}, ${ratings} Star!`,
    //   icon: "success",
    // });
    if (review === "") {
      Swal.fire({
        title: "Error!",
        text: `you cant input empty string1`,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Review Posted",
        text: `you just input ${review} ${ratings} star!`,
        icon: "success",
      });
      this.setState({
        reviewee: [...reviewee, { id: 1, text: review, rate: ratings }],
        review: "",
        ratings: ""
      });
      console.log(reviewee)
    }
  };

  handleStar = (rating) => {
    this.setState({ ratings: rating });
  };

  handleChange = (e) => {
    this.setState({ review: e.target.value });
  };

  render() {
    const { review, ratings, reviewee } = this.state;

    return (
      <div className="content-badge">
        <div className="review">
          <Row>
            <Col lg="12">
              <b>Yudi Kaka</b>
              <ReactStars
                count={5}
                size={20}
                color2={"#ffd700"}
                onChange={this.handleStar}
                value={ratings}
              />
              <InputGroup>
                <FormControl
                  placeholder="Leave a review"
                  value={this.state.review}
                  onChange={this.handleChange}
                />
              </InputGroup>
              <Button
                className="send"
                type="button"
                variant="primary"
                size="sm"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>
            
            {reviewee.map((rev) => (
              <Col lg="12">
                <b>Yudi Kaka</b>
                <ReactStars size={20} value={rev.rate}  />
                <p>{rev.text}</p>
              </Col>
            ))}

            <Col lg="12">
              <b>Yudi Kaka</b>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                voluptas repellat delectus! Vero harum facilis dolore optio sunt
                cupiditate tempora itaque, recusandae culpa, iure animi rerum
                consequuntur ullam porro obcaecati.
              </p>
            </Col>
          </Row>
          <div className="load-more">
            <Button variant="primary" size="sm">
              Load More
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
