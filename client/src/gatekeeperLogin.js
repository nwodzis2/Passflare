import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import { axios } from "axios"

class GatekeeperLoginPage extends React.Component{
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

    axios.get("user/validate", myObject)
    .then(function(response){
      console.log(response);
      this.props.history.push('/gatekeeperView');
      }
    )
    .catch(function(error){
      console.log(error);
    })
    event.preventDefault();
  }
  
    render(){
        return(
          <Container fluid>
            <Row>
              <Col md="12">
                <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h2 id="subtitle">GateKeeper</h2>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <form method="post" action="enterCodeLogin.html">
                  <input className="defaultText" type="text" placeholder="Enter your Event ID"/>
                  <br/>
                  <button class="btn btn-dark passBtn" type="submit"> 
                      Next &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
                  </button>
              </form>
            </Col>
          </Row>
        </Container>
      );
    }
}

export default GatekeeperLoginPage;