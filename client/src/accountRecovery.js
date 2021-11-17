import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Card, Form, FormLabel, FormControl, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

class RecoveryEmail extends React.Component{
    constructor(props){
        super(props);
        this.state = {userEmail: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        var obj = {
          email: this.state.userEmail
        }

        var self = this;

        axios.post("/user/recover", obj).then(function(recoveryResponse){
            var resjson = recoveryResponse.data;

            if (resjson.valid) {
                self.props.history.push("/accountRecovery", {recoveryData: resjson.recoveryCode, userEmail: obj.email});
            }
            else{
                alert("No account attached to this email.");
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    render(){
        return(
            <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Enter your email</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.onSubmit}>
                            <FormLabel>User Email: </FormLabel>
                            <FormControl className="defaultEmail" type="email" name='userEmail' autoComplete="off" onChange={this.handleChange} placeholder="Enter email..."/>
                            <br/>
                            <Row>
                                <button type="submit" className="btn btn-dark passBtnDark" onClick={this.handleSubmit}> 
                                    Send Recovery Email
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

class AccountRecovery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail: this.props.location.state.userEmail,
            recoveryCode: this.props.location.state.recoveryData,
            num0: 0,
            num1: 0,
            num2: 0,
            num3: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        var obj = {
          email: this.state.userEmail
        }

        var self = this;

        if(this.state.num0 == this.state.recoveryCode[0] && this.state.num1 == this.state.recoveryCode[1] && this.state.num2 == this.state.recoveryCode[2]
                && this.state.num3 == this.state.recoveryCode[3]){
            self.props.history.push("/changePassword", {userEmail: obj.email});
        }
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <br/><br/>
                        <p>Enter the four digit code sent to you at: </p>
                    </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <p id="emailPhone">{this.state.userEmail}</p>
                    <br/><br/>
                   </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <form method="post" action="userView.html">
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0" name="num0" onChange={this.handleChange}/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0" name="num1" onChange={this.handleChange}/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0" name="num2" onChange={this.handleChange}/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0" name="num3" onChange={this.handleChange}/>
                        <br/><br/>
                        <button className="btn btn-dark passBtn" type="submit" onClick={this.handleSubmit}> 
                            <p>Next &nbsp;&nbsp;<i class="fas fa-arrow-right"></i></p>
                        </button>
                    </form>
                   </Col>
                </Row>
            </Container>
        );
    }
}

class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail: this.props.location.state.userEmail,
            userPassword: "",
            confirmUserPassword: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var obj = {
          email: this.state.userEmail,
          password: this.state.userPassword,
          confirmPassword: this.state.confirmUserPassword
        }

        var self = this;

        axios.post("/user/changePassword", obj).then(function(passwordResponse){
            var resjson = passwordResponse.data;
            if(resjson.passwordChangeSuccess && obj.password == obj.confirmPassword){
                self.props.history.push("/passwordChangeSuccess");
            }
            else{
                alert("Password change failed.")
            }
        })
        .catch(function(error){
            console.log(error);
        })

    }

    render(){
        return(
            <Container fluid>
          <Row >
            <Col md="12">
                <Card className="darkCard">
                    <Card.Title>Please enter your new password below.</Card.Title>                            
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>       
                            <FormLabel>New Password: </FormLabel>
                            <FormControl className="defaultText" type="password" name='userPassword' onChange={this.handleChange} placeholder="Enter new password..."/>
                            <br/>
                            <FormLabel>Confirm New Password: </FormLabel>
                            <FormControl className="defaultText" type="password" name='confirmUserPassword' onChange={this.handleChange} placeholder="Enter new password..."/>
                        </FormGroup>
                        <br/>
                    <Row>
                        <button type="submit" className="btn btn-dark passBtnDark"> 
                        Change Password 
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

class PasswordChangeSuccess extends React.Component{
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <h2>Password change successful!</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Link to="/"> Return to Login Page </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export { RecoveryEmail, AccountRecovery, ChangePassword, PasswordChangeSuccess };