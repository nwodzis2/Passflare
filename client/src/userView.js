import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
  import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

var eventCard;
var myobject =
{
      number : 3306343529,
      name : "Nathan Wodzisz",
      email : "nwodzis@kent.edu",
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
    axios.post("http://localhost:5000/user/add", myobject).then((response) => {
      console.log(response.data);
    });
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
        <Row>
              <h1 className="eventTitle">Theater</h1>
              <div className="eventDisplay">

                </div>
        </Row>
      </Container>
    );
  }
}

export default UserView;