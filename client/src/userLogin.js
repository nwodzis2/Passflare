import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class Header extends React.Component{
  render(){
    return(
      <Helmet>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Passflare Login</title>
        <meta name="description" content=""/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>        
        <link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet'/>
        <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet" />
        <link rel="stylesheet" href="styles.css"></link>
        
      </Helmet>
    );
  }
}



function PassFlareTitleUser(){
    return(
      <Container fluid>
        <Row>
          <Col md="12">
              <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
          </Col>
        </Row>
        <UserLogin/>
      </Container>
    );
}

function UserLogin(){
    return (
      <Row>
        <Col md="12">
          <NameForm/>
        </Col>
      </Row>
    );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userEmail: '', userPassword: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    var myObject = {
      email: this.state.userEmail,
      password: this.state.userPassword
    } 

    axios.post("http://localhost:5000/user/validate", myObject)
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange} placeholder="Enter email"/>
        <br/>
        <input type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange} placeholder="Enter password"/>
        <br/>
        <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or <br/> 
          SMS messages from Passflare and its affiliates.</p>
        <Row>
          <Col md="8">
            <button className="btn btn-dark passBtn">Create Account</button>
          </Col>
          <Col md="4">
            <button className="btn btn-dark passBtn" type="submit">
             Next &nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
            </button>
          </Col>
        </Row>
      </form>
    );
  }
}

export class LoginPage extends React.Component{
  render(){
    return(
    <div>
    <PassFlareTitleUser/>
    </div>
    );
  }
}