import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, Redirect } from "react-router-dom";
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


//Main view for login page
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {userEmail: '', userPassword: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGatekeeperSubmit = this.handleGatekeeperSubmit.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var myObject = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }

    var self = this;

    //Validate user
    axios.post("/user/validate", myObject)
    .then(function(response){
      var resjson = response.data;

      if (resjson.validationReport == "valid") {

        let emailObj = {
          email: myObject.email
        }

        //If valid fetch user data
        axios.post("/user/email", emailObj).then(function(userResponse){
          self.props.setAuth("validUser");
          self.props.history.push("/userView", {userData: userResponse.data.response});
        })
        .catch(function(error){
          console.log(error);
        });
      } else {
        alert("Incorrect email or password. Please try again.");
      }
    }
    )
    .catch(function(error){
      console.log(error); 
    })
  }

  handleGatekeeperSubmit(event){
    var myObject = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }

    var self = this;

    //Validate user
    axios.post("/user/validate", myObject)
    .then(function(response){
      var resjson = response.data;
      if (resjson.validationReport == "valid") {

        let emailObj = {
          email: myObject.email
        }
        //If valid fetch user data
        axios.post("/user/email", emailObj).then(function(userResponse){
          axios.post("/gatekeeper/validate", emailObj)
          .then(function(response){
            resjson = response.data;
            if (resjson.validationReport == "gatekeeperValid") {
              self.props.setAuth("validGatekeeper");
              self.props.history.push("/gatekeeperView", {userData: userResponse.data.response});
            }
            else 
              alert(resjson.validationReport);
          })
          .catch(function (error){
            console.log(error);
          })
        })
        .catch(function(error){
          console.log(error);
        });
      } else {
        alert(resjson.validationReport);
      }
    })
    .catch(function(error){
      console.log(error); 
    })
  }

  render() {
    return (
    <Container fluid >
      <Col md="12" style={{dispax:'flex', justifyContent: 'right', paddingTop: '2vh'}}>
          <button className="btn btn-dark passBtn" onClick={this.handleGatekeeperSubmit}>Switch to Gatekeeper &nbsp; <i class="fas fa-chevron-right" style={{fontSize:'12px'}}></i></button>
        </Col>
      <Row>
        <Col md="12">
          <h1 className="title"><i className="fas fa-ticket-alt passTicket passflareTextGradient"></i> Passflare</h1>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <form onSubmit={this.handleSubmit}>
            <input className="defaultText loginText" type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange} placeholder="Enter email"/>
            <br/>
            <input className="defaultPassword loginText" type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange} placeholder="Enter password"/>
            <br/>
            
            <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or <br/> 
              SMS messages from Passflare and its affiliates.</p>
            <Row>
              <Col md="12">
                <button className="btn btn-dark passBtnNext" type="submit">
                  Sign In &nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
                </button>
              </Col>
            </Row>
            <br/>
            <Row>
            <Link to= "/adminLogin" className="create-account-btn"><u>Admin Login</u></Link>
            </Row>
            <br/>
            <Row>
            <Link to= "/recoveryEmail" className="create-account-btn"><u>Forgot your password?</u></Link>
            </Row>
          </form>
        </Col>
      </Row>
      <Row>
        <br/>
        
      </Row>
    </Container>
    );
  }
}

export default LoginPage;