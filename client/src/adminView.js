import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class EventStats extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      adminEventDet : [],
      adminEventOpts : [],
      orgID : this.props.adminData.OrgID
    }
    
  }
  componentWillMount(){
    axios.post("/events/:orgID", {orgID: this.state.orgID}).then((response) => {
      this.setState({adminEventDet: response.data});
      var tempArray = []
      var tempArray2 = []
      tempArray2 = response.data
      for(const e of tempArray2){
        tempArray.push(<option value={e._id}>{e.Name}</option>)
      }
      this.setState({adminEventOpts : tempArray})
    });
  }
  render(){
    return(
      <Container fluid>
        <h2>Events</h2>
        <button></button>
        <select class="form-select" aria-label="Default select example">
          <option selected>Select Event</option>
          {this.state.adminEventOpts}
        </select>

      </Container>
      
    )
  }
}
class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {adminData: this.props.location.state.adminData}
  }

  render(){
    return(
      <Container fluid>
        <AdminNav adminData={this.state.adminData}/>
        <h1>Admin Dashboard</h1>

        <Row>
          <Col md="6">
            <EventStats adminData={this.props.location.state.adminData}/>
          </Col>
          <Col md="6">
            <h2>Financials</h2>
          </Col>
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
        <Navbar fixed="top" bg="dark" expand="lg" className="userNavbar" margin>
          <Container fluid>
            <Navbar.Brand href="/adminView"><h4 id="adminBrand"><i className="fas fa-ticket-alt passTicket"/> Passflare <i id="brandBreak">|</i> <i id="adminLogo">Admin</i></h4> </Navbar.Brand>
            <Navbar.Toggle aria-controls="resonsive-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
              <Nav className="ms-auto" id="adminChoices">
                <NavLink to={{ pathname: "/adminView", state: { adminData: this.props.adminData }}} style={{margin:10}} >Dashboard</NavLink>
                <NavLink to={{ pathname: "/adminGatekeeper", state: { adminData: this.props.adminData }}} style={{ margin: 10 }}>Gatekeepers</NavLink>
                <NavLink to={{ pathname: "/adminUsers", state: { adminData: this.props.adminData }}} style={{ margin: 10 }}>Users</NavLink>
                <NavLink to={{ pathname: "/adminEvents", state: { adminData: this.props.adminData }}} style={{ margin: 10 }}>Events</NavLink>
                <NavLink to={{ pathname: "/adminFinancials", state: { adminData: this.props.adminData }}} style={{ margin: 10 }}>Financials</NavLink>
                <NavLink to={{ pathname: "/editAccount", state: { user: this.props.adminData._id }}} style={{ margin: 10 }}><i class="fas fa-user-circle"></i></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    )
  }
}

export { AdminNav, AdminDashboard };