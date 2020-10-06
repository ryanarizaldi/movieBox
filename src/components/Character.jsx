import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default class Character extends Component {
    render() {
       // const { image, name } = this.props.movie

        return (
            <div className="main-content">
                <div className="character">
                    <h1>character</h1>
                    <Row>
                        {/* { this.props.movie === null ? */}
                            <Col md="3">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={"http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"}
                                    />
                                    <Card.Body>
                                        <Card.Title>No Title</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        {/* :  */}
                            {/* <Col>
                                <Card>
                                    <Card.Img src= {image} />
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        } */}
                    </Row>
                </div>
            </div>
            
        )
    }
}
