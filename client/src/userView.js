import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import { Link, withRouter, useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EventDetails from './eventDetails';

const ownedTickets = [];
const unownedTickets = [];
const userEmail = localStorage.getItem('userEmail');
const orgID = parseInt(localStorage.getItem('orgID'));
const userName = localStorage.getItem('userName');
const userID = localStorage.getItem('userID');
const validated = localStorage.getItem('validated')

class UserView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    }
    this.fetchEventData = this.fetchEventData.bind(this);
  }

  componentDidMount() {
    
    this.fetchEventData();
  }
  componentWillMount(){
    
  }
  fetchEventData = () => {
    let obj = {
      orgID: orgID
    }
    
    while (ownedTickets.length > 0){
      ownedTickets.pop();
    }
    while (unownedTickets.length > 0) {
      unownedTickets.pop();
    }

    axios.post("/events/:orgID", obj).then(
      response => {
        //Need to change this to sort owned and unowned tickets
        for (let i = 0; i < response.data.length; ++i) {
          ownedTickets.push(<EventCard event={response.data[i]}></EventCard>);
        }
        this.setState({loading: false});
      }
    );
  }

  render(){
    if(validated === null){
      return(
        <Redirect to="/" />
      )
    }
    return(
      <Container fluid style={{padding: 0}}>
        <UserNav/>
        <Row className="eventRow" style={{maxWidth: "100%"}, {marginTop: 15}}>
              <h1 className="eventTitle">Tickets owned:</h1>
              <div id="testEvent" className="eventDisplay">
                {ownedTickets}
              </div>
        </Row>
        <Row className="eventRow">
              <h1 className="eventTitle">Events to check out</h1>
              <div className="eventDisplay">
                {unownedTickets}
              </div>
        </Row>
      </Container>
    );
  }
}

class EventCard extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }


  render() {
    return(
      <Link to="/eventDetails">
        <div class="eventCard">
          <div class="eventCardImage"></div>
          <div class="eventCardName">{this.props.event.Name}</div>
          <div class="eventCardTime">{this.props.event.StartTime} - {this.props.event.EndTime}</div>
          <div class="eventCardDate">{this.props.event.Date}</div>
        </div>
      </Link>
    )
  }
}

class UserNav extends React.Component {
  
  constructor(props){
    super(props);

    this.signOut = this.signOut.bind(this);
  }
  
  signOut = () => {
    localStorage.removeItem('orgID');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('validated');
  }

  render(){
    
    return(
        <Container className="userNav">
          <h1 style={{fontFamily:"Aclonica"}}><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
          <DropdownButton variant='dark' title={userName} align="end">
            <Dropdown.Item variant='dark'><Link to="/editAccount">Edit Account</Link></Dropdown.Item>
            <Dropdown.Item variant='dark'><Link onClick={this.signOut} to="/">Sign Out</Link></Dropdown.Item>
          </DropdownButton>
        </Container>
    )
  }
}

export{ 
  UserView
}