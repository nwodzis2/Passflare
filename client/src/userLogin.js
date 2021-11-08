import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userEmail: '', userPassword: '', redirect: false};

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

    var tempProps = this.props;

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
          localStorage.setItem("userEmail", userResponse.data.response.Email);
          localStorage.setItem("userName", userResponse.data.response.Name);
          localStorage.setItem("orgID", userResponse.data.response.OrgID);
          localStorage.setItem("validated", true);
        })
        .catch(function(error){
          console.log(error);
        });


        tempProps.history.push('/userView');
      } else {
        alert(resjson.validationReport);
      }
      
      
      }
    )
    .catch(function(error){
      console.log(error); 
    })
    

    this.loginSuccess(this.props);
  }

  handleGatekeeperSubmit(event){
    var myObject = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }

    var tempProps = this.props;

    //Validate user
    axios.post("http://localhost:5000/user/validate", myObject)
    .then(function(response){
      var resjson = response.data;
      if (resjson.validationReport == "valid") {

        let emailObj = {
          email: myObject.email
        }
        //If valid fetch user data
        axios.post("http://localhost:5000/user/email", emailObj).then(function(userResponse){
          localStorage.setItem("userEmail", userResponse.data.response.Email);
          localStorage.setItem("userName", userResponse.data.response.Name);
          localStorage.setItem("orgID", userResponse.data.response.OrgID);
        })
        .catch(function(error){
          console.log(error);
        });

        axios.post("http://localhost:5000/gatekeeper/validate", emailObj)
          .then(function(response){
            resjson = response.data;
            if (resjson.validationReport == "gatekeeperValid")
              tempProps.history.push('/gatekeeperView');
            else 
              alert(resjson.validationReport);
          })
          .catch(function (error){
            console.log(error);
          })
      } else {
        alert(resjson.validationReport);
      }
    })
    .catch(function(error){
      console.log(error); 
    })
    event.preventDefault();

    this.loginSuccess(this.props);
  }

  loginSuccess(props){
    if (props.success){
      this.props.history.push("/userView");
    }
    else{
      return(<p>Incorrect email or password. Please try again.</p>);
    }
  }

  render() {
    return (
    <Container fluid >
      <Col md="12" style={{dispax:'flex', justifyContent: 'right', paddingTop: '2vh'}}>
          <Link to= "/gatekeeperView" style={{textDecoration: 'none'}}><button className="btn btn-dark passBtn">Switch to Gatekeeper &nbsp; <i class="fas fa-chevron-right" style={{fontSize:'12px'}}></i></button></Link>
        </Col>
      <Row>
        <Col md="12">
          <h1 className="title"><i className="fas fa-ticket-alt passTicket passflareTextGradient"></i> Passflare</h1>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <form>
            <input className="defaultText" type="text" name="userEmail" value={this.state.userEmail} onChange={this.handleChange} placeholder="Enter email"/>
            <br/>
            <input className="defaultPassword" type="password" name="userPassword" value={this.state.userPassword} onChange={this.handleChange} placeholder="Enter password"/>
            <br/>
            
            <p id="disclaimer">By proceeding, you are consenting to recieve emails, calls, or <br/> 
              SMS messages from Passflare and its affiliates.</p>
            
            <Row>
              <Col md="12">
                <button className="btn btn-dark passBtnNext" type="submit">
                Next &nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
                </button>
              </Col>
            </Row>
            <br/>
            <Row>
            <Link to= "/UserCreation" className="create-account-btn"><u>Create Account</u></Link>
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

export default withRouter(LoginPage);