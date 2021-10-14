import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css';

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
      </Container>
    );
}

function UserLogin(){
    return (
    <Container fluid>
      <Row>
        <Col md="12">
          <form method="post" action="enterCodeLogin.html">
                <input type="email" placeholder="Enter email"/>
                <p className="or">or...</p>
                <input type="tel" placeholder="Enter Phone Number"/>
                <br/>
                <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or 
                <br/>SMS messages from Passflare and its affiliates.</p>
                <Row>
                <Col md="8">
                    <button className="btn btn-dark passBtn"> 
                    Create Account 
                    </button>
                </Col>
                <Col md="4">
                    <button className="btn btn-dark passBtnNext"> 
                    Next &nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                </Col>
                </Row>
          </form>
        </Col>
      </Row>
    </Container>
    );
}

export class LoginPage extends React.Component{
  render(){
    return(
    <div>
    <PassFlareTitleUser/>
    <UserLogin/>
    </div>
    );
  }
}