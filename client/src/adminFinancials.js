import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AdminNav} from "./adminView.js";

class AdminFinancials extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid>
            <AdminNav adminData={this.props.location.state.adminData}/>
            <FinancialData adminData={this.props.location.state.adminData}/>
        </Container>
        )
    }
}

class FinancialData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            payments: []
        }

        this.getOrgPayments = this.getOrgPayments.bind(this);
    }

    componentWillMount(){
        this.getOrgPayments();
    }

    getOrgPayments(){
        axios.post("/events/:orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
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

export default AdminFinancials;