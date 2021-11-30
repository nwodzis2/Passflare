import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AdminNav} from "./adminView.js";
//main vie for subadmin page
class AdminSubadmin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            adminData: this.props.location.state.adminData,
            loading: true,
            subadminList: null
        }

        this.getOrgSubadmins = this.getOrgSubadmins.bind(this);
        this.deleteSubadmin = this.deleteSubadmin.bind(this);
    }

    componentWillMount(){
        this.getOrgSubadmins();
    }

    deleteSubadmin(adminID, adminUserID) {
        var self = this;
        axios.post("/user/delete/id", {id: adminUserID});
        axios.post("/admin/delete/id", {id: adminID}).then(function(res){
            self.getOrgSubadmins();
        });
    }

    getOrgSubadmins = async () => {
        var subadmins = [];
        
        const adminRes = await axios.post("/admin/orgID", {orgID: this.state.adminData.details.OrgID});
        for (let i = 0; i < adminRes.data.length; ++i) {
            if (!adminRes.data[i].Master) {
                subadmins.push(adminRes.data[i]);
            }
        }

        

        var subadminListItems = [];
        
        for (let i = 0; i < subadmins.length; ++i) {
            const subadminUserRes = await axios.post("/user/_id", {userID: subadmins[i].UserID});
            var user = subadminUserRes.data[0];

            subadminListItems.push(
            <Row className="adminEventDataRow">
                <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                    <p>{user.Name}</p>
                </Col>
                <Col>
                    <p>{user.Email}</p>
                </Col>
                <Col>
                    <button onClick={() => this.deleteSubadmin(subadmins[i]._id, subadmins[i].UserID)} className="btn btn-dark passBtnDark-sm"> 
                        Delete
                    </button>
                </Col>
            </Row>
            );
        }

        this.setState({subadminList: subadminListItems, loading: false});
    }

    render(){
        return(
            <Container fluid style={{padding: "0px 20px"}}>
                <AdminNav adminData={this.props.location.state.adminData}/>
                <Row>
                    <Col style={{maxWidth: "25%", padding: "0px"}}>
                        <CreateSubadmin adminData={this.props.location.state.adminData}/>
                    </Col>
                    <Col className="eventDataContainer">
                        <SubadminData adminData={this.props.location.state.adminData.details} parentState={this.state}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class SubadminData extends React.Component{
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
                            <p>Name:</p>
                        </Col>
                        <Col>
                            <p>Email:</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{margin: "0px"}}>
                        {this.props.parentState.subadminList}
                    </Row>
                </Container>
            );
        }
    }
}
//how subadmin is actually created
class CreateSubadmin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {name:'', email:'', phone:'', password:'', orgName: '', orgNickName: '', orgZip: '',
            adminData: this.props.adminData.details,
            masterData: this.props.adminData.master
        }

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
            master: false,
            userID: null
        }

        
        axios.post("/organization/orgID", obj).then(function(orgResponse){
            var resjson = orgResponse.data;
            obj.orgName = resjson.orgName;
            obj.orgNickName = resjson.orgNickName;
            obj.orgZip = resjson.orgZip;

            axios.post("/user/add", obj).then(function (userResponse){
                obj.userID = userResponse.data.userID;
                axios.post("/admin/add", obj).then(function (adminResponse){
                    if(adminResponse.data.successAdmin){
                        alert("Subadmin creation successful.");
                        window.location.reload();
                    }
                })
                .catch(function (error){
                    console.log(error);
                })
            })
            .catch(function(error){
                console.log(error);
            })
        })
        .catch(function(error){
            console.log(error);
        })


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
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title className="d-flex align-items-center">
                            <Col className="d-flex align-items-center">
                                Add subadmin
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

export default withRouter(AdminSubadmin, CreateSubadmin);