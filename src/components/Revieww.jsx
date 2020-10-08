// import React, { Component } from 'react';
// import { Row, Col, Label, InputGroup, FormControl, Form } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";
// import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

// export default class Revieww extends Component {
//     state = {
//         rating: [
//             {
//                 text: "",
//                 rate: `{value}`,
//             }
//         ]
//       };

//     handleChange = (value) => {
//         this.setState({ 
//             rating : [
//                 ...this.state.rating,
//             {
//                 text: value,
//                 rate: value
//             }
//         ]
            
//          });
//       };

//     render() {
//         const { rating } = this.state;
//         return (
//             <div className="content-badge">
//                 <div className="review">
//                     <Row>
//                         <Col lg="12">
//                             <InputGroup> 
//                                 <Form.Label for="text" >text</Form.Label> 
//                                 <FormControl type="text" id="text" onChange={(e) => this.handleChange({value: e.target.value})} />
//                                 <Form.Label for="rate" >rate</Form.Label>
//                                 <Form.Control as="select" multiple id="rate" value={this.state.rating.rate} onChange={this.handleChange} } >
//                                 <option value="placeholder" disabled> Choose Rate </option>
//                                 <option value="1">1</option>
//                                 <option value="2">2</option>
//                                 <option value="3">3</option>
//                                 <option value="4">4</option>
//                                 <option value="5">5</option>
//                                 </Form.Control>
//                             </InputGroup>
//                         </Col>

//                         {/* Nampilin Rating */}
//                         {rating ? rating.map(item => {
//                         let rate = []
//                         let tracker = item.rate;
//                         for(let i = 0; i < item.rate; i++){
//                             if(tracker < 1 && tracker > 0){
//                             // Untuk desimal
//                             rate.push(0)
//                             }else{
//                             // Untuk bilangan bulat
//                             rate.push(1)
//                             }
//                             tracker--;
//                         }

//                         return(
//                             <React.Fragment>
//                             <Col lg="12">
//                                 <b>Yudi Kaka</b>
//                                 <p>{item.text}</p>
//                                 {rate.map(item => item === 1 ? <FaStar /> : <FaStarHalfAlt /> )}
//                             </Col>
//                             </React.Fragment>
//                         )
//                         }) : null}

//                     </Row>
                    
//                 </div>
                
//             </div>
//         )
//     }
// }
