import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Form, Card} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class EventSearch extends React.Component{

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md="2">
                    <Link to= "/userView" style={{textDecoration: 'none'}}>
                      <h2 className="backArrow"><i class="fas fa-arrow-left"></i></h2>
                    </Link>
                    </Col>
                    <Col md="8">
                        <Card className="darkCard">
                            <Form>
                                <Form.Control type="text" placeholder="Search events" id="eventSearch"/>
                                <Form.Check
                                    type='checkbox'
                                    id='default-checkbox'
                                    label='Sort by Event Type'    
                                />
                                <Form.Select type="select" name="eventType">
                                    <option disabled>Choose event type...</option>
                                    <option value="1">Sports</option>
                                    <option value="2">Theater</option>
                                </Form.Select>
                            </Form>
                        </Card>
                    </Col>
                    <Col md="2"></Col>
                </Row>
                <br/>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <Card className="darkCard">
                        </Card>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
            
        );
    }
}

export default EventSearch;
