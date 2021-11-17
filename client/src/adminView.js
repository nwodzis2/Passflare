import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {adminData: this.props.location.state.adminData}
  }

  render(){
    return(
      <Container fluid>
        <AdminNav adminData={this.state.adminData}/>
        <Row>
          <h1>Dashboard info</h1>
          <h1>Dashboard info</h1>
          <h1>Dashboard info</h1>
        </Row>
      </Container>
    )
  }
}

class AdminNav extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return(
      <Container fluid>
        <Navbar fixed="top" bg="dark" expand="lg" className="userNavbar">
          <Container fluid>
            <Navbar.Brand href="/adminView"><h4 id="adminBrand"><i className="fas fa-ticket-alt passTicket"/> Passflare <i id="brandBreak">|</i> <i id="adminLogo">Admin</i></h4> </Navbar.Brand>
            <Navbar.Toggle aria-controls="resonsive-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
              <Nav className="ms-auto" id="adminChoices">
                <NavLink to={{pathname: "/adminView", state: {adminData: this.props.adminData}}}>Dashboard</NavLink>
                <NavLink to={{pathname: "/adminGatekeeper", state: {adminData: this.props.adminData}}}>Gatekeepers</NavLink>
                <NavLink to={{pathname: "/adminUsers", state: {adminData: this.props.adminData}}}>Users</NavLink>
                <NavLink to={{pathname: "/adminEvents", state: {adminData: this.props.adminData}}}>Events</NavLink>
                <NavLink to={{pathname: "/adminFinancials", state: {adminData: this.props.adminData}}}>Financials</NavLink>
                <NavLink to={{pathname: "/editAccount", state: {user: this.props.adminData._id}}}><i class="fas fa-user-circle"></i></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    )
  }
}

export { AdminNav, AdminDashboard };