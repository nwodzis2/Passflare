import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card, InputGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AdminNav} from "./adminView.js";

class AdminEvents extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid>
            <AdminNav adminData={this.props.location.state.adminData}/>
            <EventData adminData={this.props.location.state.adminData}/>
            <EventCreation adminData={this.props.location.state.adminData}/>
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

        

        this.state = {
            name: '',
            description: '',
            price: '',
            orgID: this.props.adminData.OrgID,
            image: '',
            date: '',
            startTime: '',
            endTime: '',
            location: ''
        };

        this.submitEvent= this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitEvent(event) {
        
        let obj = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            orgID: this.state.orgID,
            image: this.state.image,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            location: this.state.location
        }
        axios.post("/events/create", obj);
        event.preventDefault();
    }

    handleChange(event) {
        if (event.target.name == "image"){
            this.setState({
                image : event.target.files[0]
            });
        } else {
            this.setState({
                [event.target.name] : event.target.value
            });
        }
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
                                <FormControl className="eventInput" type="text" name='name' autoComplete="off" onChange={this.handleChange} placeholder="Enter event name..."/>
                                <hr/>
                                <FormLabel>Description: </FormLabel>
                                <FormControl className="eventInput" type="text" as="textarea" name='description' autoComplete="off" onChange={this.handleChange} placeholder="Enter event description..."/>
                                <hr/>
                                <FormLabel>Price: </FormLabel>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl className="eventInput" type="text" name='price' autoComplete="off" onChange={this.handleChange} placeholder="X.XX"/>
                                </InputGroup>
                                <hr/>
                                <FormLabel>Date </FormLabel>
                                <FormControl className="eventInput" type="date" name='date' autoComplete="off" onChange={this.handleChange} placeholder="Enter event date..."/>
                                <hr/>
                                <FormLabel>Starting Time </FormLabel>
                                <FormControl className="eventInput" type="text" name='startTime' autoComplete="off" onChange={this.handleChange} placeholder="XX:XXxm"/>
                                <hr/>
                                <FormLabel>Ending Time </FormLabel>
                                <FormControl className="eventInput" type="text" name='endTime' autoComplete="off" onChange={this.handleChange} placeholder="XX:XXxm"/>
                                <hr/>
                                <FormLabel>Location: </FormLabel>
                                <FormControl className="eventInput" type="text" name='location' onChange={this.handleChange} placeholder="Enter event location..."/>
                                <hr/>
                                <FormLabel>Thumbnail: </FormLabel>
                                <br/>
                                <FormControl className="eventInput" type="file" name='image' onChange={this.handleChange} placeholder="Choose event thumbnail image..."/>
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

export default AdminEvents;