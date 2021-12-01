import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card, InputGroup, FormSelect } from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {AdminNav} from "./adminView.js";
//main view for admin events page
class AdminEvents extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            adminData: this.props.location.state.adminData,
            loading: true,
            eventList: null
        }

        this.getOrgEvents = this.getOrgEvents.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentWillMount(){
        this.getOrgEvents();
    }

    deleteEvent(eventID) {
        var self = this;
        axios.post("/events/delete/:id", {id: eventID}).then(function(res){
            self.getOrgEvents();
        });
    }

    getOrgEvents = async () => {
        var events = [];
        
        const eventRes = await axios.post("/events/:orgID", {orgID: this.state.adminData.details.OrgID});
        for (let i = 0; i < eventRes.data.length; ++i) {
            events.push(eventRes.data[i]);
        }

        var adminIDs = [];
        for (let i = 0; i < events.length; ++i) {
            var adminID = events[i].AdminUserID;
            if (!adminIDs.includes(adminID)) {
                adminIDs.push(adminID);
            }

        }

        var admins = [];
        for (let i = 0; i < adminIDs.length; ++i) {
            const userRes = await axios.post("/user/_id", {userID: adminIDs[i]});
            admins.push(userRes.data[0]);
        }

        var eventListItems = [];
        
        for (let i = 0; i < events.length; ++i) {
            var eventCreator = "Redacted";
            for (let j = 0; j < admins.length; ++j) {
                
                if (admins[j] != undefined && admins[j]._id == events[i].AdminUserID) {
                    eventCreator = admins[j].Name;
                }
            }

            eventListItems.push(
            <Row className="adminEventDataRow">
                <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                    <p>{events[i].Name}</p>
                </Col>
                <Col>
                    <p>{eventCreator}</p>
                </Col>
                <Col>
                    <p>{events[i].Date}</p>
                </Col>
                <Col>
                    <p>{events[i].StartTime}</p>
                </Col>
                <Col>
                    <p>{events[i].EndTime}</p>
                </Col>
                <Col>
                    <p>{events[i].Location}</p>
                </Col>
                <Col>
                    <button onClick={() => this.deleteEvent(events[i]._id)} className="btn btn-dark passBtnDark-sm"> 
                        Delete
                    </button>
                </Col>
            </Row>
            );
        }

        this.setState({eventList: eventListItems, loading: false});
    }
    
    render(){
        return(
            <Container fluid style={{padding: "0px 20px"}}>
                <AdminNav adminData={this.state.adminData}/>
                <Row>
                    <Col style={{maxWidth: "25%", padding: "0px"}}>
                        <EventCreation adminData={this.state.adminData.details} getOrgEvents={this.getOrgEvents}/>
                    </Col>
                    <Col className="eventDataContainer">
                        <EventData adminData={this.state.adminData.details} parentState={this.state}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
//load all event data for an admin
class EventData extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if (this.props.parentState.loading) {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <p>Loading...</p>
                </Container>
            );
        } else {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <Row className="adminEventDataRowKey">
                        <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                            <p>Name:</p>
                        </Col>
                        <Col>
                            <p>Creator:</p>
                        </Col>
                        <Col>
                            <p>Date:</p>
                        </Col>
                        <Col>
                            <p>Starts:</p>
                        </Col>
                        <Col>
                            <p>Ends:</p>
                        </Col>
                        <Col>
                            <p>Location:</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{margin: "0px"}}>
                        {this.props.parentState.eventList}
                    </Row>
                </Container>
            );
        }
    }
}
//admin to create an event
class EventCreation extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            formData: null,
            orgID: this.props.adminData.OrgID,
            adminID: this.props.adminData._id
        };

        this.submitEvent= this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formData: new FormData(document.getElementById("eventForm"))});
    }

    submitEvent(event) {
        this.state.formData.set('orgID', this.state.orgID);
        this.state.formData.set("adminID", this.state.adminID);

        var self = this;
        axios.post("/events/create", this.state.formData).then(function(res){
            if (res.data.eventCreated) {
                document.getElementById("eventForm").reset();
                self.setState({formData: new FormData(document.getElementById("eventForm"))});
                self.props.getOrgEvents();
            } else {
                alert("Error creating event, please try again!");
            }
        });
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