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
            adminData: this.props.location.state.adminData,
            loading: true,
            gatekeeperList: null
        }

        this.getOrgGatekeepers = this.getOrgGatekeepers.bind(this);
        this.deleteGatekeeper = this.deleteGatekeeper.bind(this);
    }

    componentWillMount(){
        this.getOrgGatekeepers();
    }

    deleteGatekeeper(gatekeeperID) {
        var self = this;
        axios.post("/gatekeeper/delete/id", {id: gatekeeperID}).then(function(res){
            self.getOrgGatekeepers();
        });
    }

    getOrgGatekeepers = async () => {
        var gatekeepers = [];
        
        const gatekeeperRes = await axios.post("/gatekeeper/orgID", {orgID: this.state.adminData.details.OrgID});
        for (let i = 0; i < gatekeeperRes.data.length; ++i) {
            gatekeepers.push(gatekeeperRes.data[i]);
        }

        var gatekeeperListItems = [];
        
        for (let i = 0; i < gatekeepers.length; ++i) {
            gatekeeperListItems.push(
            <Row className="adminEventDataRow">
                <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                    <p>{gatekeepers[i].Email}</p>
                </Col>
                <Col>
                    <p>{String(gatekeepers[i].Verified)}</p>
                </Col>
                <Col>
                    <button onClick={() => this.deleteGatekeeper(gatekeepers[i]._id)} className="btn btn-dark passBtnDark-sm"> 
                        Delete
                    </button>
                </Col>
            </Row>
            );
        }

        this.setState({gatekeeperList: gatekeeperListItems, loading: false});
    }

    render(){
        return(
            <Container fluid style={{padding: "0px 20px"}}>
                <AdminNav adminData={this.state.adminData}/>
                <Row>
                    <Col style={{maxWidth: "25%", padding: "0px"}}>
                    <EmailGatekeeper adminData={this.state.adminData.details}/>
                    </Col>
                    <Col className="eventDataContainer">
                        <GatekeeperData adminData={this.state.adminData.details} parentState={this.state}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class GatekeeperData extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if (this.props.parentState.loading) {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <p>Loading...</p>
                </Container>
            );
        } else {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <Row className="adminEventDataRowKey">
                        <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                            <p>Email:</p>
                        </Col>
                        <Col>
                            <p>Verified:</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{margin: "0px"}}>
                        {this.props.parentState.gatekeeperList}
                    </Row>
                </Container>
            );
        }
    }
}

class EmailGatekeeper extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        return(
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Copy and email this link to add gatekeepers to your organization:</Card.Title>                            
                            <br/>
                            <Row>
                                <p>http://passflare.herokuapp.com/userCreation/{this.props.adminData.OrgID}/gatekeeper</p> 
                            </Row> 
                    </Card>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default AdminGatekeeper;