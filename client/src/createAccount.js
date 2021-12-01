import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//allows user to make account
class AccountCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:'', email:'', phone:'', password:''};
        this.submitUser = this.submitUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async submitUser(event) {
        event.preventDefault();

        let obj = {
            number: this.state.phone,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            orgID: this.props.match.params.orgID //Need to change this when the time comes / add way of obtaining it in the form
        }

        var self = this;
        var userType = this.props.match.params.type;

        if (userType == "user"){
            axios.post("/user/add", obj).then(function(response){
                alert("Account Created. Redirecting to login.");
                self.props.history.push("/");
            });
        }
        else if (userType == "gatekeeper"){
            await axios.post("/user/add", obj).catch(function(error){
                console.log(error);
            })
            await axios.post("/gatekeeper/add", {           
                orgID: obj.orgID,
                email: obj.email
            }).then(function(response){
                alert("Account Created. Redirecting to login.");
                self.props.history.push("/");
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
            <Container fluid>
                <Row className="welcome-to-passflare">
                    <Col md="12"><h2>Welcome to Passflare!</h2></Col>
                </Row> 
              <Row >
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title className="d-flex align-items-center">
                            <Col md="auto" onClick={this.props.history.goBack} style={{marginRight: "10px"}}className="backArrowContainer d-flex align-items-center">
                                <i class="fas fa-arrow-left backArrow"></i>
                            </Col>
                            <Col className="d-flex align-items-center">
                                Create Account
                            </Col>
                        </Card.Title>                          
                        <br/>
                        <Form onSubmit={this.submitUser}>
                            <FormGroup>       
                                <FormLabel>Name: </FormLabel>
                                <FormControl className="defaultText" type="text" name='name' onChange={this.handleChange} placeholder="Enter name..."/>
                                <hr/>
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" name='email' onChange={this.handleChange} placeholder="Enter email..."/>
                                <hr/>
                                <FormLabel>Password: </FormLabel>
                                <FormControl className="defaultText" type="text" name='password' onChange={this.handleChange} placeholder="**********"/>
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