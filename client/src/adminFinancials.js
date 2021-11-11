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
            <Row>
            <h1>Financial info</h1>
            <h1>Financial info</h1>
            <h1>Financial info</h1>
            </Row>
        </Container>
        )
    }
}
export default AdminFinancials;