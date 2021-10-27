import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Header extends React.Component{
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

class LoginPage extends React.Component {
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

    var tempProps = this.props;

    axios.post("http://localhost:5000/user/validate", myObject)
    .then(function(response){
      var resjson = response.data;
      if (resjson.validationReport == "valid") {
        tempProps.history.push('/userView');
      } else {
        alert(resjson.validationReport);
      }
      
      
      }
    )
    .catch(function(error){
      console.log(error);
    })
    event.preventDefault();
  }

  render() {
    return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <form onSubmit={this.handleSubmit}>
            <input className="defaultText" type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange} placeholder="Enter email"/>
            <br/>
            <input className="defaultPassword" type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange} placeholder="Enter password"/>
            <br/>
            <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or <br/> 
              SMS messages from Passflare and its affiliates.</p>
            <Row>
              <Col md="8">
                <Link to= "/UserCreation" style={{textDecoration: 'none'}}><button className="btn btn-dark passBtn">Create Account</button></Link>
              </Col>
              <Col md="4">
                <button className="btn btn-dark passBtnNext" type="submit">
                Next &nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
    );
  }
}

export{
  Header, LoginPage
}