import React, { Component } from 'react';
import { Container, Row, Navbar, Dropdown, DropdownButton} from 'react-bootstrap';
import { Link, withRouter, useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import props from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Ticker from 'react-ticker';
//Main user view component (displays cards for events)
class UserView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      ticketsLoading: true,
      eventsLoading: true,
      loading: true,
      ownedTickets: [],
      orgEvents: [],
      ownedCards: [],
      unownedCards: [],
      userData: this.props.location.state.userData
    }

    this.fetchEventData = this.fetchEventData.bind(this);
    this.loadEventCardsData = this.loadEventCardsData.bind(this);
  }

  componentDidMount() {
      this.fetchEventData();
  }

  loadEventCardsData = ()=> {
    if (!this.state.ticketsLoading && !this.state.eventsLoading) {
      var tempOwned = [];
      var tempUnowned = [];

      for (let i = 0; i < this.state.orgEvents.length; ++i) {
        var eventOwned = false;
        var ticket;

        for (let j = 0; j < this.state.ownedTickets.length; ++j) {
          if (this.state.ownedTickets[j].EventID == this.state.orgEvents[i]._id) {
            eventOwned = true;
            ticket = this.state.ownedTickets[j];
          }
        }

        var card = <EventCard ticketDetails={ticket} userDetails={this.state.userData} owned={eventOwned} event={this.state.orgEvents[i]}/>

        if (eventOwned) {
          tempOwned.push(card);
        } else {
          tempUnowned.push(card);
        }
      }

    }

    this.setState({loading: false, ownedCards: tempOwned, unownedCards: tempUnowned});
  }

  fetchEventData() {
    var self = this;

    axios.post("/tickets/:userID", {userID: self.state.userData._id}).then(
      response => {
        self.setState({ticketsLoading: false, ownedTickets: response.data}, this.loadEventCardsData);
        
      }
    );

    axios.post("/events/:orgID", {orgID: self.state.userData.OrgID}).then(
      response => {
        self.setState({eventsLoading: false, orgEvents: response.data}, this.loadEventCardsData);
      }
    );
  }

  render(){
    if (!this.state.loading) {
      return(
        <Container fluid style={{padding: 0}}>
          <UserNav history={this.props.history} userData={this.state.userData}/>
          <Row className="eventRow" style={{}, {marginTop: 15}}>
                <h1 className="eventTitle">Tickets owned:</h1>
                <div className="eventDisplay">
                  {this.state.ownedCards}
                </div>
          </Row>
          <Row className="eventRow">
                <h1 className="eventTitle">Events to check out</h1>
                <div className="eventDisplay">
                  {this.state.unownedCards}
                </div>
          </Row>
        </Container>
      );
    } else {
      return(
        <Container fluid style={{padding: 0}}>
          <p>Loading...</p>
        </Container>
      );
    }
  }
}
//comonent for each event card
class EventCard extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Link to={{pathname: "/eventDetails", state: {ticketDetails: this.props.ticketDetails, userDetails: this.props.userDetails, event: this.props.event, owned: this.props.owned}}}>
        <div className="eventCard">
          <div className="eventCardImage" ><img src={`data:image/jpeg;base64,${this.props.event.Image}`}/></div>
          <Ticker speed={3}>
            {({index}) => (
              <>
                <p className="eventCardName">{this.props.event.Name}</p>
              </>
            )}
            
          </Ticker>
          <div className="eventCardTime">{this.props.event.StartTime} - {this.props.event.EndTime}</div>
          <div className="eventCardDate">{this.props.event.Date}</div>
        </div>
      </Link>
    )
  }
}
//navigation for the user view
class UserNav extends React.Component {
  
  constructor(props){
    super(props);

    this.signOut = this.signOut.bind(this);
  }
  
  signOut = () => {
    localStorage.removeItem("passflareAuth");
    this.props.history.replace("/");
    Redirect('/')
  } 
  render(){
    
    return(
        <Container className="userNav">
          <h1 style={{fontFamily:"Aclonica"}}><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
          <DropdownButton variant='dark' title={this.props.userData.Name} align="end">
            <Dropdown.Item variant='dark'><Link to={{pathname: "/editAccount", state: {user: this.props.userData._id}}}>Edit Account</Link></Dropdown.Item>
            <Dropdown.Item variant='dark'><Link to={{pathname: "/faq"}}>FAQ</Link></Dropdown.Item>
            <Dropdown.Item onClick={this.signOut} variant='dark'><Link onClick={this.signOut} to="/">Sign Out</Link></Dropdown.Item>
          </DropdownButton>
        </Container>
    )
  }
}

export default UserView;