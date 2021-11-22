import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {AdminNav} from "./adminView.js";

class AdminGatekeeper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            adminData: this.props.location.state.adminData
        }
    }

    render(){
        return(
            <Container fluid>
                <AdminNav adminData={this.state.adminData}/>
                <GatekeeperData adminData={this.state.adminData.details}/>
                <EmailGatekeeper adminData={this.state.adminData.details}/>
            </Container>
        );
    }
}

class GatekeeperData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            gateKeepers: []
        }

        this.getOrgGatekeepers = this.getOrgGatekeepers.bind(this);
    }

    componentWillMount(){
        this.getOrgGatekeepers();
    }

    getOrgGatekeepers(){
        axios.post("/gatekeeper/orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
            console.log(response.data);
        });
    }

    render(){
        return(
            <Container fluid>
            </Container>
        );
    }
}

class EmailGatekeeper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async onSubmit(event){
        event.preventDefault();
        const emailRes = await axios.get("/admin/sendGatekeeperMail", {params: {email: this.state.email}});
        console.log(emailRes);
        if(!emailRes.data.validationReport){
            alert("No such email is registered under Passflare.");
        }
        else{
            axios.post("/gatekeeper/add", {           
                orgID: this.props.adminData.OrgID,
                email: this.state.email,
                verified: false
            })
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Add Gatekeeper via email invitation</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.onSubmit}>
                            <FormLabel>Gatekeeper Email: </FormLabel>
                            <FormControl className="defaultEmail" type="email" name='email' autoComplete="off" onChange={this.handleChange} placeholder="Enter email..."/>
                            <br/>
                            <Row>
                                <button type="submit" className="btn btn-dark passBtnDark"> 
                                    Add Gatekeeper
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

export default AdminGatekeeper;