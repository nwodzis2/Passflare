import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import axios from 'axios';


class GatekeeperVerification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orgID: this.props.match.params.orgID,
            userEmail: "",
            password: ""
        }
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    async onSubmit(event){
        event.preventDefault();
        let obj = {
            orgID: this.state.orgID,
            email: this.state.userEmail,
            password: this.state.password
        }

        var self = this;

        const response = await axios.post("/user/validate", obj);
        var resjson = response.data;
      
        if (resjson.validationReport == "valid") {
            axios.post("/gatekeeper/add", obj);
            alert("User has been added as gatekeeper. Redirecting to login.");
            self.props.history.push("/");

        }
        else{
            alert("Invalid username or password.");
        }
    }

    render(){
        return(
        <Container fluid>
        <Row>
            <Col md="12">
                <br/>
                <Card className="darkCard">
                        <Card.Title className="d-flex align-items-center">
                            <Col className="d-flex align-items-center">
                                Please sign in to continue.
                            </Col>
                        </Card.Title>                          
                        <br/>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>       
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" name='userEmail' onChange={this.handleChange} placeholder="Enter email..."/>
                                <hr/>
                                <FormLabel>Password: </FormLabel>
                                <FormControl className="defaultText" type="password" name='password' onChange={this.handleChange} placeholder="**********"/>
                            </FormGroup>
                            <br/>
                        <Row>
                            <button type="submit" className="btn btn-dark passBtnDark"> 
                            Continue
                            </button>
                        </Row> 
                        </Form>
                    </Card>
            </Col>
        </Row>
        </Container>
        )
    }
}

export default withRouter(GatekeeperVerification);