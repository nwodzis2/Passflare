import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class EmailGatekeeper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async onSubmit(event){
        const requestOne = axios.get("http://localhost:5000/admin/sendMail", {
            params:{
                email: this.state.email
            }
        })
        const requestTwo = axios.post("http://localhost:5000/gatekeeper/add", {
                email: this.state.email,
                verified: false
            }
        )

        //use axios.all to make two concurrent requests
        axios.all([requestOne, requestTwo])
        .then(axios.spread((response1, response2) => {
            console.log('response1', response1, 'response2', response2)
        }))
        .catch(function(error){
            console.log(error);
        });
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
        console.log(this.state);
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
                <Col><h2>Send Gatekeeper Email</h2></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter email information below.</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.onSubmit}>
                            <FormLabel>Email: </FormLabel>
                            <FormControl className="defaultEmail" type="email" name='email' autoComplete="off" onChange={this.handleChange} placeholder="Enter email..."/>
                            <br/>
                            <Row>
                                <button type="submit" className="btn btn-dark passBtnDark"> 
                                    Email Gatekeeper
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

export default EmailGatekeeper;