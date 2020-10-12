import React, { Component } from "react";
import axios from "axios";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

export default class Review extends Component {
  state = {
    review: "",
    ratings: 0,
    reviewee: [],
    reviews: [
      {
        comments: "",
        ratings: ""
      }
    ],
    token: localStorage.getItem("login"),
    username: localStorage.getItem("username")
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.reviewee !== prevState.reviewee) {
  //     this.render();
  //   }
  // };

  componentDidMount = () => {
    this.getReview()
  }

  getReview = async () => {
    try {
      const id = this.props.movie.id;
      console.log(id, this.state.token, "tes");
      const gimmeReview = await axios({
        method: "get",
        url: `https://nameless-temple-74030.herokuapp.com/review/movie/${id}`,
        headers: {
          "access_token": this.state.token,
        },
      })
      console.log("fetch",gimmeReview.data);
      this.setState({
        reviews: gimmeReview.data,
      })
    } catch (error) {
      console.log("error", error);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.movie.id;
    const { review, ratings } = this.state;
    axios
      .post(`https://nameless-temple-74030.herokuapp.com/review/add/${id}`, {
        method: "post",
        data: {
          "comment": review,
          "rating": ratings
        },
        headers: {
          "access_token": this.state.token,
          "content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(response => {
        console.log("response", response)
      })
      .catch(error => {
        console.log("error", error)
      })
      
    // if (review === "") {
    //   Swal.fire({
    //     title: "Error!",
    //     text: `you cant input empty string1`,
    //     icon: "error",
    //   });
    // } else {
    //   Swal.fire({
    //     title: "Review Posted",
    //     text: `you just input ${review} ${ratings} star!`,
    //     icon: "success",
    //   });
    //   this.setState({
    //     reviewee: [...reviewee, { id: 1, text: review, rate: ratings }],
    //     review: "",
    //     ratings: "",
    //   });
    //   console.log(reviewee)
    // }
  };

  handleStar = (rating) => {
    this.setState({ ratings: rating });
  };

  handleChange = (e) => {
    this.setState({ review: e.target.value });
  };


  render() {
    const { review, ratings, reviewee } = this.state;
    const { reviews, token, username } = this.state;

    return (
      <div className="content-badge">
        <div className="review">
        {token ? (
          <Row>
            <Col lg="12">
              <b>{username}</b>
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
                  value={review}
                  onChange={this.handleChange}
                />
              </InputGroup>
              <Button
                className="send"
                type="button"
                size="sm"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>

              {reviews.length ? (
                <Col>
                  {reviews.reverse().map((review) => (
                    <Col lg="12">
                      <b>{review.user ? review.user.fullname : "No user review"}</b>
                      {/* <ReactStars size={20} value={review.rating ? review.rating : null} edit={false} /> */}
                      <p>{review.comment ? review.comment : "No review yet"}</p>
                      <p>Rating: {review.rating ? review.rating : "N/A"} </p>
                    </Col>
                  ))}
                </Col>
              ) : "Review not found in this movie" }
            </Row>
          ) : "Login to add review of this movie"}

          {/* {reviewee.map((rev) => (
              <Col lg="12">
                <b>Yudi Kaka</b>
                <ReactStars size={20} value={rev.rate} edit={false} />
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
            </Col> */}
          <div className="load-more">
            <Button size="sm">
              Load More
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
