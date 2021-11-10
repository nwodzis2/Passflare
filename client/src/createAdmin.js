import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AdminCreation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:'', email:'', phone:'', password:'', orgName: '', orgNickName: '', orgZip: ''};
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
            orgID: 0, //Need to change this when the time comes / add way of obtaining it in the form
            orgName: this.state.orgName,
            orgNickName: this.state.orgNickName,
            orgZip: this.state.orgZip
        }

        const requestOne = await axios.post("/organization/add", obj);
        var resjson = requestOne.data;
        if (resjson.orgID != "orgID failed"){
            obj.orgID = resjson.orgID;
        }
        else {
            console.log(resjson.orgID);
            alert("Organization creation failed.");
        }    

        await axios.post("/user/add", obj);
        await axios.post("/admin/add", obj);

        var tempProps = this.props;
        tempProps.history.push('/adminLogin');

        /*
        await axios.post("http:///organization/add", obj)
        .then(function(response){
            console.log(response.data.orgID);
            var resjson = response.data;
            if (resjson.orgID != "orgID failed") {
                obj.orgID = resjson.orgID;
            }
            else {
                alert("Organization creation failed.");
            }
        })
        .catch(function(error){
            console.log(error);
        })*/
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col><h2>Welcome to Passflare!</h2></Col>
                    <Col></Col>
                </Row> 
              <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter your information below.</Card.Title>                            
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
                                <FormControl className="defaultText" type="tel" name='phone' onChange={this.handleChange} placeholder="(xxx)xxx-xxxx"/>
                                <hr/>
                                <FormLabel>Organization Name: </FormLabel>
                                <FormControl className="defaultText" type="text" name='orgName' onChange={this.handleChange} placeholder="Enter organization name..."/>
                                <hr/>
                                <FormLabel>Organization Nickname: </FormLabel>
                                <FormControl className="defaultText" type="text" name='orgNickName' onChange={this.handleChange} placeholder="Enter a nickname for your organization..."/>
                                <hr/>
                                <FormLabel>Organization Zip Code: </FormLabel>
                                <FormControl className="defaultText" type="text" name='orgZip' onChange={this.handleChange} placeholder="Enter organization zipcode..."/>
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

export default withRouter(AdminCreation);