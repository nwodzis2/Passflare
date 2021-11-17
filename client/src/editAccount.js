import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class AccountEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {userID: this.props.location.state.user, userNumber: '', userName: '', userEmail: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        let obj = {
            id: this.state.userID,
            number: this.state.userNumber,
            name: this.state.userName,
            email: this.state.userEmail,
        }

        axios.post("/user/edit", obj)
        .then(function(){
            var tempProps = this.props;
            tempProps.history.pop();
        })
        .catch(function(error){
            console.log(error);
        })
    }

    render(){
        return(
            <Container fluid>
                <br/>
              <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter your information below.</Card.Title>                            <br/>
                        <Form>
                            <FormGroup>       
                                <FormLabel>Name: </FormLabel>
                                <FormControl className="defaultText" type="text" name="userName" onChange={this.handleChange} placeholder="Enter name..."/>
                                <hr/>
                                <FormLabel>Phone Number: </FormLabel>
                                <FormControl className="defaultTel" type="tel" name="userNumber" onChange={this.handleChange} placeholder="Enter email..."/>
                                <hr/>
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" name="userEmail" onChange={this.handleChange} placeholder="Enter email..."/>
                            </FormGroup>
                        </Form>
                        <br/>
                        <Row>
                            <button className="btn btn-dark passBtnDark" type="submit" onClick={this.handleSubmit}> 
                            Edit Account 
                            </button>
                        </Row> 
                    </Card>
                </Col>
              </Row>
            </Container>
          );
    }
}

export default withRouter(AccountEdit);