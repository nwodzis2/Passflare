import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class CreateSubadmin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name:'', email:'', phone:'', password:'', orgName: '', orgNickName: '', orgZip: '',
            adminData: this.props.location.state.adminData
        };
        
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
            orgID: this.state.adminData.OrgID,
            orgName: this.state.orgName,
            orgNickName: this.state.orgNickName,
            orgZip: this.state.orgZip,
            master: false
        }

        
        axios.post("/organization/orgID", obj).then(function(orgResponse){
            var resjson = orgResponse.data;
            console.log(resjson);
            obj.orgName = resjson.orgName;
            obj.orgNickName = resjson.orgNickName;
            obj.orgZip = resjson.orgZip;

            axios.post("/user/add", obj).then(function (userResponse){
                if(userResponse.data.sucess){
                    axios.post("/admin/add", obj).then(function (adminResponse){
                        if(adminResponse.data.successAdmin){
                            alert("Subadmin creation successful.");
                        }
                    })
                    .catch(function (error){
                        console.log(error);
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            })
        })
        .catch(function(error){
            console.log(error);
        })

        var tempProps = this.props;
        tempProps.history.push('/adminView');
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
                            </FormGroup>
                            <br/>
                        <Row>
                            <button type="submit" className="btn btn-dark passBtnDark"> 
                            Create Subadmin 
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

export default withRouter(CreateSubadmin);