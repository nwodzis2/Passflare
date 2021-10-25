import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class EventCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            header: '', 
            description: '', 
            orgID: '', 
            image: '',
            dateTime: '',
            location: '',
            tickets: ''
        };
        this.submitEvent= this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitEvent() {
        const {name, header, description, orgID, image, dateTime, location, tickets} = this.state
        let obj = {
            name: this.state[name],
            header: this.state[header],
            description: this.state[description],
            orgID: this.state[orgID],
            image: this.state[image],
            dateTime: this.state[dateTime],
            location: this.state[location],
            tickets: this.state[tickets],
        }

        axios.post("http://localhpst:5000/events/create", obj);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                    <Link to= "/adminView" style={{textDecoration: 'none'}}>
                      <h2 className="backArrow"><i class="fas fa-arrow-left"></i></h2>
                    </Link>
                    </Col>
                    <Col><h2>Create Event</h2></Col>
                    <Col></Col>
                </Row> 
              <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter event information below.</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.submitEvent}>
                            <FormGroup>       
                                <FormLabel>Event Name: </FormLabel>
                                <FormControl type="text" name='name' onChange={this.handleChange} placeholder="Enter event name..."/>
                                <hr/>
                                <FormLabel>Description: </FormLabel>
                                <FormControl type="text" name='description' onChange={this.handleChange} placeholder="Enter event description..."/>
                                <hr/>
                                <FormLabel>Orginization ID: </FormLabel>
                                <FormControl type="text" name='orgID' onChange={this.handleChange} placeholder="Enter organization ID..."/>
                                <hr/>
                                <FormLabel>Date and Time </FormLabel>
                                <FormControl type="text" name='dateTime' onChange={this.handleChange} placeholder="Change to date and time selectors..."/>
                                <hr/>
                                <FormLabel>Location: </FormLabel>
                                <FormControl type="text" name='location' onChange={this.handleChange} placeholder="Enter event location..."/>
                            </FormGroup>
                            <br/>
                        <Row>
                            <button type="submit" className="btn btn-dark passBtnDark"> 
                            Create Event
                            </button>
                        </Row> 
                        </Form>
                    </Card>
                </Col>
              </Row>
            </Container>
          );
    }
}

export default EventCreation;