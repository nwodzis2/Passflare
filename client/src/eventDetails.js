import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Card,} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const QRcode = require('qrcode');

class EventDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ticketDetails: this.props.location.state.ticketDetails,
      userDetails: this.props.location.state.userDetails,
      eventDetails: this.props.location.state.event,
      owned: this.props.location.state.owned
    }
  }

  render(){
    return(
      <Container fluid>
        <Row>
          <Col md="12">
            <h1>{this.state.eventDetails.Name}</h1>
          </Col>
          <Col md="12">
            <h1>{this.state.eventDetails.Description}</h1>
          </Col>
          <Col md="12">
            <h1>{this.state.eventDetails.Location}</h1>
          </Col>
          <Col md="12">
            <h3>{this.state.eventDetails.Date} @ {this.state.eventDetails.StartTime} - {this.state.eventDetails.EndTime}</h3>
          </Col>
        </Row>
        <TicketOperation ticketDetails={this.state.ticketDetails} userDetails={this.state.userDetails} owned={this.state.owned} eventDetails={this.state.eventDetails}/>
      </Container>
    );
  }
}

class TicketOperation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      qrcode: null
    }
    
    this.generateQRCode = this.generateQRCode.bind(this);
  }

  componentWillMount() {
    if (this.props.owned) {
      this.generateQRCode();
    } else {
      this.setState({loading: false});
    }
  }

  generateQRCode = () => {
    var self = this;

    var qrcode = QRcode.toDataURL(this.props.ticketDetails._id).then(url => {
      self.setState({loading: false, qrcode: <img src={url}/>});
    }).catch(err => {
      self.setState({loading: false, qrcode: <p>Failed to load QR code</p>});
    });
  }

  render() {
    if (this.state.loading) {
      return(
        <p>loading...</p>
      );
    } else {
      if (!this.props.owned) {
        return(
          <Link to={{pathname: "/payment", state: {userDetails: this.props.userDetails, eventDetails: this.props.eventDetails}}}>
            <button className="btn btn-dark passBtnNext">
              Purchase Ticket ${this.props.eventDetails.Price}&nbsp;&nbsp;
            </button>
          </Link>
        );
      } else {
        return(
          <div>{this.state.qrcode}</div>
        );
      }
    }
  }
}

export default EventDetails;