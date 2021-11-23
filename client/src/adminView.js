import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
//Shows Subadmins option only if admin is Master admin
function CheckMaster(props){
  if(props.adminData.master){
    return <NavLink to={{pathname: "/adminSubadmin", state: {adminData: props.adminData}}} style={{ margin: 10 }}>Subadmins</NavLink>
  }
  else return null;
}
class EventStats extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      adminEventDet : [],
      adminEventOpts : [],
      orgID : this.props.adminData.OrgID,
      eventSelect : "",
      eventData : [],
      crosshairValues: []
    }
    this.handleChange = this.handleChange.bind(this);
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
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };
  _onNearestX = (value, index) => {
    this.setState({crosshairValues: this.state.eventData});
  };
  handleChange(event){
    this.setState({eventSelect : event.target.value})
    axios.post("/tickets/eventID", {eventID : event.target.value}).then((response) => {
      var coords = {}
      var coordsArray = []
      for(const t of response.data){
        var timestamp = t._id.toString().substring(0,8)
        var date = new Date( parseInt( timestamp, 16 ) * 1000 )
        date = date.toLocaleString("en-US", {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit'})
        coords[date] = (coords[date] + 1) || 1
      }
      for (var d in coords){
        coordsArray.push({x : d, y : coords[d]})
      }
      this.setState({eventData : coordsArray})
    })
  }
  render(){
    return(
      <Container fluid>
        <h2>Events</h2>
        <select onChange={this.handleChange} class="form-select bg-dark" aria-label="Default select example">
          <option selected>Select Event</option>
          {this.state.adminEventOpts}
        </select>
        <div className="event-graph-container bg-dark">
          <XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries onNearestX={this._onNearestX} data={this.state.eventData} />
          <Crosshair
            values={this.state.crosshairValues}
            className={'test-class-name'}
          />
        </XYPlot>
      </div>
      </Container>
      
    )
  }
}
class FinanceStats extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      adminEventDet : [],
      adminEventOpts : [],
      orgID : this.props.adminData.OrgID,
      eventSelect : "",
      eventData : [],
      crosshairValues: []
    }
    this.handleChange = this.handleChange.bind(this);
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
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };
  _onNearestX = (value, index) => {
    this.setState({crosshairValues: this.state.eventData});
  };
  handleChange(event){
    this.setState({eventSelect : event.target.value})
    axios.post("/tickets/eventID", {eventID : event.target.value}).then((response) => {
      var coords = {}
      var coordsArray = []
      for(const t of response.data){
        var timestamp = t._id.toString().substring(0,8)
        var date = new Date( parseInt( timestamp, 16 ) * 1000 )
        date = date.toLocaleString("en-US", {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit'})
        coords[date] = (coords[date] + 1) || 1
      }
      var payment = 1;
      for(var e of this.state.adminEventDet){
        if(e._id == event.target.value){
          payment = e.Price;
        }
      }
      for (var d in coords){
        coordsArray.push({x : d, y : parseInt(coords[d])*parseFloat(payment)})
      }
      console.log(coordsArray)
      this.setState({eventData : coordsArray})
    })
  }
  render(){
    return(
      <Container fluid>
        <select onChange={this.handleChange} class="form-select bg-dark" aria-label="Default select example">
          <option selected>Select Event</option>
          {this.state.adminEventOpts}
        </select>
        <div className="event-graph-container bg-dark">
          <XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries onNearestX={this._onNearestX} data={this.state.eventData} />
          <Crosshair
            values={this.state.crosshairValues}
            className={'test-class-name'}
          />
        </XYPlot>
      </div>
      </Container>
      
    )
  }
}
class AdminDashboard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      adminData: this.props.location.state.adminData,
    }
  }

  render(){
    return(
      <Container fluid>
        <AdminNav adminData={this.state.adminData}/>
        <Row>
          <Col md="6">
            <EventStats adminData={this.props.location.state.adminData.details}/>
          </Col>
          <Col md="6">
            <h2>Financials</h2>
            <FinanceStats adminData={this.props.location.state.adminData.details}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

class AdminNav extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      adminData: this.props.adminData,
    }
  }


  render(){
    return(
      <Container className="adminNavContainer" fluid>
        <Navbar fixed="top" bg="dark" expand="lg" className="adminNavbar" margin>
            <Row className="adminBrandContainer">
              <Navbar.Brand className="adminBrand">
                <Row className="adminBrandTextContainer">
                  <Col className="adminBrandLogoContainer d-flex align-items-center">
                    <i className="fas fa-ticket-alt adminNavPassTicket passTicket"/>
                  </Col>
                  <Col className="adminBrandPassflareTextContainer d-flex align-items-end">
                    <p className="adminBrandPassflareText">Passflare</p>
                  </Col>
                  <Col className="adminBrandAdminTextContainer d-flex align-items-end">
                    <p className="adminBrandPassAdminText">&nbsp;|&nbsp;Admin</p>
                  </Col>
                </Row>
              </Navbar.Brand>
            </Row>
            <Row className="adminChoicesContainer">
              <Navbar.Toggle aria-controls="resonsive-navbar-nav"/>
              <Navbar.Collapse style={{padding: "0px"}} id="responsive-navbar-nav">
              <Nav className="adminChoices ms-auto">
                <NavLink to={{ pathname: "/adminView", state: { adminData: this.props.adminData }}} style={{margin:10}} >Dashboard</NavLink>
                <CheckMaster adminData={this.state.adminData}/>
                <NavLink to={{ pathname: "/adminGatekeeper", state: { adminData: this.props.adminData}}} style={{ margin: 10 }}>Gatekeepers</NavLink>
                <NavLink to={{ pathname: "/adminUsers", state: { adminData: this.props.adminData}}} style={{ margin: 10 }}>Users</NavLink>
                <NavLink to={{ pathname: "/adminEvents", state: { adminData: this.props.adminData}}} style={{ margin: 10 }}>Events</NavLink>
                <NavLink to={{ pathname: "/adminFinancials", state: { adminData: this.props.adminData}}} style={{ margin: 10 }}>Financials</NavLink>
                <NavLink to={{ pathname: "/faq", state: { adminData: this.props.adminData } }} style={{ margin: 10 }}>FAQ</NavLink>
                <NavLink to={{ pathname: "/editAccount", state: { user: this.props.adminData._id}}} style={{ margin: 10 }}>Edit Account</NavLink>
                <NavLink to={{ pathname: "/signOut", state: {}}} style={{ margin: 10 }}>Sign Out</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Row>
        </Navbar>
      </Container>
    )
  }
}

export { AdminNav, AdminDashboard };