import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AdminLogin extends React.Component {
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

    handleSubmit(event){
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
              axios.post("/admin/validate", emailObj)
              .then(function(adminResponse){
                resjson = adminResponse.data;
                if (resjson.validationReport == "adminValid") {
                  self.props.setAuth("validAdmin");
                  self.props.history.push("/adminView", {adminData: userResponse.data.response, masterData: resjson.master});
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
      event.preventDefault();
    }

    render(){
        return (
            <Container fluid>
              <Row>
                <Col md="12">
                  <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i>Passflare<span id="admin-login-admin" style={{fontFamily: "Roboto", fontStyle: "normal !important"}}>&nbsp;|&nbsp;Admin</span></h1>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <form>
                    <input className="defaultText loginText" type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange} placeholder="Enter email"/>
                    <br/>
                    <input className="defaultPassword loginText" type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange} placeholder="Enter password"/>
                    <br/>
                    <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or <br/> 
                      SMS messages from Passflare and its affiliates.</p>
                    <Row>
                      <Col md="12">
                        <button className="btn btn-dark passBtnNext" type="submit" onClick={this.handleSubmit}>
                          Sign In &nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
                        </button>
                      </Col>
                    </Row>
                    <br/>
                    <Row md="8">
                        <Link to= "/adminCreation" className="create-account-btn"><u>Create Admin Account</u></Link>
                    </Row>
                    <br/>
                    <Row>
                      <Link to= "/recoveryEmail" className="create-account-btn"><u>Forgot your password?</u></Link>
                    </Row>
                  </form>
                </Col>
              </Row>
            </Container>
            );
    }
}

export default AdminLogin;