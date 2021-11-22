import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card, InputGroup, FormSelect } from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {AdminNav} from "./adminView.js";

class AdminEvents extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid style={{padding: "0px 20px"}}>
            <AdminNav adminData={this.props.location.state.adminData}/>
            <Row>
                <EventCreation adminData={this.props.location.state.adminData}/>
                <EventData adminData={this.props.location.state.adminData}/>
            </Row>
        </Container>
        )
    }
}

class EventData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }

        this.getOrgEvents = this.getOrgEvents.bind(this);
    }

    componentWillMount(){
        this.getOrgEvents();
    }

    getOrgEvents(){
        axios.post("/events/:orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
            console.log(response.data);
        });
    }

    render(){
        return(
            <Container fluid>
            </Container>
        );
    }
}

class EventCreation extends React.Component{
    constructor(props) {
        super(props);
        
        this.submitEvent= this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.state = {
            formData: new FormData(document.getElementById("eventForm")),
            orgID: this.props.adminData.OrgID
        };

    }

    submitEvent(event) {
        this.state.formData.set('orgID', this.state.orgID);
        console.log(this.props.adminData);
        let obj = {
            formData: this.state.formData,
            userID : this.props.adminData._id
        }

        axios.post("/events/create", this.state.formData);
        event.preventDefault();
    }

    handleChange(event) {
        if (event.target.name == "image") {
            this.state.formData.set(event.target.name, event.target.files[0]);
        } else {
            this.state.formData.set(event.target.name, event.target.value);
        }
    }

    render(){
        return(
            <Container fluid className="eventCreationContainer bg-dark">
                <Row>
                    <h2 style={{textAlign: "left", color: "rgb(255, 124, 37)", margin: "0px", padding: "0px"}}>Create Event</h2>
                </Row> 
                <hr/>
                <Row>
                    <Col className="createEventFormContainer">    
                        <Form id="eventForm" onSubmit={this.submitEvent}>
                            <FormGroup>
                                <Row>
                                    <FormLabel>Event Name: </FormLabel>
                                    <FormControl type="text" name='name' autoComplete="off" onChange={this.handleChange} placeholder="Enter event name..."/>
                                </Row>
                                <hr/>
                                <Row>
                                    <FormLabel>Description: </FormLabel>
                                    <FormControl className="eventCreationDescBox" type="text" as="textarea" name='description' autoComplete="off" onChange={this.handleChange} placeholder="Enter event description..."/>
                                </Row>
                                <hr/>
                                <Row>
                                    <FormLabel>Price: </FormLabel>
                                    <InputGroup className="eventCreationPriceInput" style={{padding: "0px"}}>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl type="text" name='price' autoComplete="off" onChange={this.handleChange} placeholder="X.XX"/>
                                    </InputGroup>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col className="eventCreationDateInput">
                                        <FormLabel>Date:</FormLabel>
                                        <FormControl type="date" name="date" autoComplete="off" onChange={this.handleChange} placeholder="Enter event date..."/>
                                    </Col>
                                    <Col className="eventCreationStartInput">
                                        <FormLabel>Starts: </FormLabel>
                                        <FormControl type="text" name='startTime' autoComplete="off" onChange={this.handleChange} placeholder="XX:XXxm"/>
                                    </Col>
                                    <Col className="eventCreationEndInput">
                                        <FormLabel>Ends: </FormLabel>
                                        <FormControl type="text" name='endTime' autoComplete="off" onChange={this.handleChange} placeholder="XX:XXxm"/>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <FormLabel>Location: </FormLabel>
                                    <FormControl type="text" name='location' onChange={this.handleChange} placeholder="Enter event location..."/>
                                </Row>
                                <hr/>
                                <Row>
                                    <FormLabel>Event Image: </FormLabel>
                                    <br/>
                                    <FormControl className="eventCreationImageInput" type="file" name='image' onChange={this.handleChange} placeholder="Choose event thumbnail image..."/>
                                </Row>
                                <hr/>
                            </FormGroup>
                        <Row className="justify-content-center">
                            <button type="submit" className="btn btn-dark btneventCreation"> 
                                Create Event
                            </button>
                        </Row> 
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AdminEvents;