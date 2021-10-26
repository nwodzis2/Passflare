import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AccountCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:'', email:'', phone:''};
        this.submitUser = this.submitUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitUser() {
        const {email, name, phone} = this.state;
        let obj = {
            number: this.state[phone],
            name: this.state[name],
            email: this.state[email],
            orgID: 0 //Need to change this when the time comes / add way of obtaining it in the form
        }
        axios.post("http://localhost:5000/user/add", obj);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
        console.log(this.state);
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col><h2>Welcome to Passflare!</h2></Col>
                    <Col></Col>
                </Row> 
              <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter your information below.</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.submitUser}>
                            <FormGroup>       
                                <FormLabel>Name: </FormLabel>
                                <FormControl className="defaultText" type="text" name='name' onChange={this.handleChange} placeholder="Enter name..."/>
                                <hr/>
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" name='email' onChange={this.handleChange} placeholder="Enter email..."/>
                                <hr/>
                                <FormLabel>Phone Number: </FormLabel>
                                <FormControl className="defaultText" type="text" name='phone' onChange={this.handleChange} placeholder="(xxx)xxx-xxxx"/>
                            </FormGroup>
                            <br/>
                        <Row>
                            <button type="submit" className="btn btn-dark passBtnDark"> 
                            Create Account 
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

export default AccountCreation;