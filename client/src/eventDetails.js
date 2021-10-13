import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Card,} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class EventDetails extends React.Component{
    render(){
        return(
        <Container fluid>
        <Row>
          <Col md="12">
            <Card className="darkCardWide">
                <img src='images/eventPlaceholder.jpg' alt="placeholder text"/>
                <Card.Body>
                    <Card.Text>Event: [Event Title]</Card.Text>
                    <Card.Text>Date: [Event Date]</Card.Text>
                    <Card.Text>Name: [Name]</Card.Text>
                    <Card.Text>Ticket ID: [TicketID]</Card.Text>
                </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        );
    }
}

export default EventDetails;