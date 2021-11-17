
import React, { Component, useState} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import QrReader from 'react-qr-reader'

const qrReaderStyle ={
  width: "100vw",
  height: "100vh",
  display: 'flex',
  "justify-content": "center",
}

const QRinitialState = {
  queryingQR: false, 
  activationStatus: "", 
  result : "no result", 
  ticket : {ticketID : null, userID : "", eventID : "", active : ""}
}

class QrScanner extends Component {
  constructor(props){
    super(props);

    this.state = QRinitialState;

    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data,
      })

      var ticketObj = {
        ticketID : data
      }
      
      if (!this.state.queryingQR) {
        var self = this;
        axios.post("/tickets/byID", ticketObj)
        .then(function(response){
          var ticketState = {
            ticket : {ticketID : data, userID : response.data[0].UserID, eventID : response.data[0].EventID} 
          }
          self.setState(ticketState);
        }).catch(function(err){
          console.log(err)
        })
      }
    }
  }

  handleError(err) {
    console.error(err)
  }

  deactivate(){
    var self = this;
    axios.post("/tickets/deactivate/:ticketID", {ticketID: this.state.result}).then(function(response){
      if(response.data.ticketReport == "success"){
        self.setState(QRinitialState);
        self.setState({activationStatus: "deactive"});
      }
      else{
        console.log("ticket deactivation failure %s", response.data.ticketReport)
      }
    }
    );
  }
  activate(){
    var self = this;
    axios.post("/tickets/activate/:ticketID", {ticketID: this.state.result}).then(function(response){
      if(response.data.ticketReport == "success"){
        self.setState(QRinitialState);
        self.setState({activationStatus: "active"});
      }
      else{
        console.log("ticket activation failure %s", response.data.ticketReport )
      }
    }
    );
  }
  render() {
    if(this.state.ticket.ticketID == null){
      return (
        <div>
          <QrReader
            delay={100}
            onError={this.handleError}
            onScan={this.handleScan}
            style={qrReaderStyle}
          />
          
          <p>{this.state.result}</p>
        </div>
      )
    }else{
      return(
        <div>
          <h3>Ticket ID: </h3>
          <p>{this.state.ticket.ticketID}</p>
          <h3>User ID: </h3>
          <p>{this.state.ticket.userID}</p>
          <h3>Event ID: </h3>
          <p>{this.state.ticket.eventID}</p>
          <button onClick={this.deactivate} class="btn btn-dark">Admit</button>
          <button onClick={this.activate} class="btn btn-dark">Reactivate</button>
        </div>
      )
    }
  }
}
class GatekeeperNav extends React.Component{
  render(){
    return(
      <Container fluid id="gate-keeper-container">
        <Row>
          <Col md="12">
          <Form id="ticket-num-form" action="">
            <label>Submit Ticket</label>
            <input type="text" placeholder="TicketID" className="defaultEmail"/>
            <button id="ticket-num-submit" className="btn" type="submit"><i class="fas fa-chevron-right"></i>
                </button>
              
          </Form>
          </Col>
          <Col md="12">
            <Form id="ticket-num-form-redo" action="">
              <input type="text" placeholder="TicketID" className="defaultEmail"/>
              <button id="ticket-num-redo" className="btn" type="submit"><i class="fas fa-redo"></i>
                  </button>
                <p>Reactive Ticket</p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
class GatekeeperView extends React.Component{
  
    render(){
      return(
          <Container fluid>
            {/*<GatekeeperNav/>*/}
            <Row>
              <Col md="12">
                <QrScanner/>
              </Col>
            </Row>
            
        </Container>
      );
    }
}

export default GatekeeperView;