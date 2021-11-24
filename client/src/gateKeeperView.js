
import React, { Component, useState} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import QrReader from 'react-qr-reader'
import { ContinuousColorLegend } from 'react-vis';

class GatekeeperView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      infoObj: null,
      scanning: true
    }

    this.resetScanning = this.resetScanning.bind(this);
  }

  handleScan = async (ticketID) => {
    if (!this.state.scanning || ticketID == null) {
      return;
    }

    this.setState({scanning: false});

    const ticketRes = await axios.post("/tickets/id", {ticketID: ticketID});
    var ticket = ticketRes.data[0];

    const userRes = await axios.post("/user/_id", {userID: ticket.UserID});
    var user = userRes.data[0];

    const eventRes = await axios.post("/events/byID", {eventID: ticket.EventID});
    var event = eventRes.data[0];

    this.setState({infoObj: {
        ticketID: ticketID,
        active: ticket.Active,
        userName: user.Name,
        eventName: event.Name
      }
    });
  }

  resetScanning() {
    this.setState({infoObj: null, scanning: true});
  }
  
  render(){
    return(
      <Container style={{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%", padding: "0px"}}>
            <QrReader
              delay={10}
              onError={() => {console.log("error")}}
              onScan={this.handleScan}
              className="d-flex justify-content-center"
              style={{border: "2px solid rgb(255, 124, 37)"}}
            />
            {}
            <TicketInfo parentState={this.state} resetScanning={this.resetScanning}/>
      </Container>
    );
  }
}

class TicketInfo extends Component {
  constructor(props){
    super(props);
    
    this.admit = this.admit.bind(this);
    this.reactivate = this.reactivate.bind(this);
  }

  admit(){
    var self = this;
    axios.post("/tickets/deactivate/:ticketID", {ticketID: this.props.parentState.infoObj.ticketID}).then(function(response){
      if(response.data.ticketReport == "success"){
        self.props.resetScanning();
      }
      else{
        console.log("ticket deactivation failure %s", response.data.ticketReport)
      }
    }
    );
  }

  reactivate(){
    var self = this;
    axios.post("/tickets/activate/:ticketID", {ticketID: this.props.parentState.infoObj.ticketID}).then(function(response){
      if(response.data.ticketReport == "success"){
        self.props.resetScanning();
      }
      else{
        console.log("ticket activation failure %s", response.data.ticketReport )
      }
    }
    );
  }

  render() {
    if (this.props.parentState.infoObj == null) {
      return(<></>);
    }
    else {
      if (this.props.parentState.infoObj.active) {
        return(
          <Col className="ticketInfoContainer">
            <Row>
              <h3>User: </h3>
              <p>{this.props.parentState.infoObj.userName}</p>
            </Row>
            <hr/>
            <Row>
              <h3>Event: </h3>
              <p>{this.props.parentState.infoObj.eventName}</p>
            </Row>
            <hr/>
            <Row>
              <h3>Ticket ID: </h3>
              <p>{this.props.parentState.infoObj.ticketID}</p>
            </Row>
            <hr/>
            <Row> 
              <button onClick={this.admit} class="btn btn-dark passBtnDark-bg">Admit</button>
            </Row>
          </Col>
        );
      } else {
        return(
          <Col className="ticketInfoContainer">
            <Row>
              <h3>User: </h3>
              <p>{this.props.parentState.infoObj.userName}</p>
            </Row>
            <hr/>
            <Row>
              <h3>Event: </h3>
              <p>{this.props.parentState.infoObj.eventName}</p>
            </Row>
            <hr/>
            <Row>
              <h3>Ticket ID: </h3>
              <p>{this.props.parentState.infoObj.ticketID}</p>
            </Row>
            <hr/>
            <Row> 
              <button onClick={this.reactivate} class="btn btn-dark passBtnDark-bg">Reactivate</button>
            </Row>
          </Col>
        );
      }
    }
  }
}


export default GatekeeperView;