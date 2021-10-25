import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

var eventCard;
var myobject =
{
      number : 3303091898,
      name : "Robin Oster",
      email : "moster@kent.edu",
      orgid : 21
};

class UserView extends React.Component{
  
  componentWillMount() {
     console.log(axios.get("http://localhost:5000/events"));
     
      eventCard = (
        <div class="eventCard">
          <div class="eventCardImage"></div>
          <div class="eventCardName">Test Name</div>
          <div class="eventCardTime">10:00pm - 12:00pm</div>
          <div class="eventCardDate">10/13/2021</div>
        </div>
      );
  }

  componentDidMount() {
    ReactDOM.render(eventCard, document.getElementsByClassName('eventDisplay')[0]);
  }

  render(){
    return(
      <Container fluid>
        <Row>
          <Col md="12">
              <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
          </Col>
        </Row>
        <Row>
              <h1 className="eventTitle">By School</h1>
              <div id="testEvent" className="eventDisplay">
                  
                </div>
        </Row>
        <Row>
              <h1 className="eventTitle">Popular Near You</h1>
              <div className="eventDisplay">

                </div>
        </Row>
        <Row>
              <h1 className="eventTitle">By Category</h1>
              <div className="eventDisplay">

                </div>
        </Row>
        <Row>
              <h1 className="eventTitle">Sports</h1>
              <div className="eventDisplay">

              </div>
        </Row>
        <Row id="userViewBottom">
              <h1 className="eventTitle">Theater</h1>
              <div className="eventDisplay">

                </div>
        </Row>
      </Container>
    );
  }
}

class UserNav extends React.Component {

  render(){
    return(
      <Navbar fixed="bottom" bg="dark" className="userNavbar">
          <Col align="center">
          <Link to= "/Passes" style={{textDecoration: 'none'}}>
            <i class="fas fa-compass"></i>
            <p>Browse</p>
          </Link>
          </Col>
          <Col align="center">
          <Link to= "/Passes" style={{textDecoration: 'none'}}>
            <i class="fas fa-search"></i>
            <p>Search</p>
          </Link>
          </Col>
          <Col align="center">
             <Link to= "/Passes" style={{textDecoration: 'none'}}>
              <i class="fas fa-ticket-alt"></i>
              <p>Passes</p>
            </Link>
          </Col>
          <Col align="center">
          <Link to= "/Passes" style={{textDecoration: 'none'}}>
            <i class="fas fa-heart"></i>
            <p>Favorites</p>
          </Link>
          </Col>
      </Navbar>
    )
  }
}

export{ 
  UserView, UserNav
}