import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import axios from 'axios';

//Create and verify a gatekeeper
class GatekeeperVerification extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var email = this.props.match.params.email;
        console.log(email);
        axios.post("/gatekeeper/verify", {
            email: email,
        });
    }

    render(){
        return(
        <Container fluid>
        <Row>
            <Col md="12">
                <h2>You're now registered as a gatekeeper!</h2>
                <br/>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <h4>Click <Link to="/" style={{textDecoration: 'none'}}>here</Link> to return to the login page.</h4>
            </Col>
        </Row>
        </Container>
        )
    }
}

export default withRouter(GatekeeperVerification);