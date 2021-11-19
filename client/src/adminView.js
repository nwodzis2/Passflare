import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
const DATA = [
  [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
  [{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
];

//Shows Subadmins option only if admin is Master admin
function GetMaster(props){
  const masterData = props.masterData;
  console.log(masterData);
  if(masterData){
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
  _onNearestX = (value) => {
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
        date = date.toLocaleDateString("en-US")
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
        <select onChange={this.handleChange} class="form-select" aria-label="Default select example">
          <option selected>Select Event</option>
          {this.state.adminEventOpts}
        </select>
        <div className="event-graph-container">
          <XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries onNearestX={this._onNearestX} data={this.state.eventData} />
          <LineSeries data={this.state.eventData} />
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
    this.state = {adminData: this.props.location.state.adminData,
      masterData: this.props.location.state.masterData
    }
  }

  render(){
    return(
      <Container fluid>
        <AdminNav adminData={this.state.adminData} masterData={this.state.masterData}/>
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
    this.state = {
      adminData: this.props.adminData,
      masterData: this.props.masterData
    }
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
                <GetMaster adminData={this.state.adminData} masterData={this.state.masterData}/>
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