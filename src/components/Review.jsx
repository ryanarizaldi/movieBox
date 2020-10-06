import React, { Component } from 'react';
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

export default class Review extends Component {
    state = {
        review: "",
        ratings: "",
        // comment: [
        //     {
        //         text: ""
        //     }
        // ]
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        const { review, ratings } = this.state;
        Swal.fire({
          title: "Success Post a Review",
          text: `${review}, ${ratings} Star!`,
          icon: "success"
        });
      };

        // handleSubmit = (e) => {
        //     e.preventDefault();
        //     const { review, ratings } = this.state;
        //     this.setState({
        //     comment: [
        //         ...this.state.comment,
        //         {
        //             text: `${review}, ${ratings} Star!`
        //         }
        //     ]
            
        //     })
        // }
    
      handleStar = (rating) => {
        this.setState({ ratings: rating });
      };
    
      handleChange = (e) => {
        this.setState({ review: e.target.value });
      };

    render() {
        const { review, ratings } = this.state;
        return (
            <div className="main-content">
                <div className="review">
                    <h1>review</h1>
                    <Row>
                        <Col lg="12">
                            <b>Yudi Kaka</b>
                            <ReactStars count={5} size={20} onChange={this.handleStar} />
                            <InputGroup>
                                <FormControl
                                    placeholder="Leave a review" 
                                    value={this.state.review}
                                    onChange={this.handleChange}
                                />
                            </InputGroup>
                            <Button 
                                type="button" 
                                variant="primary" 
                                size="sm"
                                onClick={this.handleSubmit}>Submit
                            </Button>
                        </Col>
                        <Col lg="12">
                            <b>Yudi Kaka</b>
                            <p>{review} {ratings} </p>
                        </Col>
                        <Col lg="12">
                            <b>Yudi Kaka</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga voluptas repellat delectus! 
                            Vero harum facilis dolore optio sunt cupiditate tempora itaque, 
                            recusandae culpa, iure animi rerum consequuntur ullam porro obcaecati.</p>
                        </Col>
                    </Row>
                    <Button 
                        variant="primary" 
                        size="sm" >Load More
                    </Button>
                </div>
            </div>
        )
    }
}
