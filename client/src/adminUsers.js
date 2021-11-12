import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AdminNav} from "./adminView.js";

class AdminUsers extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid>
            <AdminNav adminData={this.props.location.state.adminData}/>
            <UsersData adminData={this.props.location.state.adminData}/>
            <EmailUser adminData={this.props.location.state.adminData}/>
        </Container>
        )
    }
}

class UsersData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.getOrgUsers = this.getOrgUsers.bind(this);
    }

    componentWillMount(){
        this.getOrgUsers();
    }

    getOrgUsers(){
        axios.post("/user/orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
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

class EmailUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        var self = this;
        axios.post("/orginization/orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
            axios.get("/admin/sendUserMail", {params: {email: self.state.email, orgName: response.data[0].Name, orgID: response.data[0]._id}});
        });
        
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
                        <Card.Title>Add User via email invitation</Card.Title>                            
                        <br/>
                        <Form onSubmit={this.onSubmit}>
                            <FormLabel>User Email: </FormLabel>
                            <FormControl className="defaultEmail" type="email" name='email' autoComplete="off" onChange={this.handleChange} placeholder="Enter email..."/>
                            <br/>
                            <Row>
                                <button type="submit" className="btn btn-dark passBtnDark"> 
                                    Add User to organization
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
export default AdminUsers;