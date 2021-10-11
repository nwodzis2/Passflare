import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class UserView extends React.Component{
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
              <div className="eventDisplay">

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