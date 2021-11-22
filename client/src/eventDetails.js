import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Card} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link, withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const QRcode = require('qrcode');

class EventDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      eventImage: null,
      ticketDetails: this.props.location.state.ticketDetails,
      userDetails: this.props.location.state.userDetails,
      eventDetails: this.props.location.state.event,
      owned: this.props.location.state.owned
    }

    this.setImageSize = this.setImageSize.bind(this);
  }

  setImageSize() {
    var tempImg = document.getElementsByClassName("eventDetailsImage")[0];
    var parent = document.getElementsByClassName("eventImageContainer")[0];
    var imgRatio = tempImg.width / tempImg.height;
    var parentRatio = parent.offsetWidth / parent.offsetHeight;
    console.log("here: " + parent.offsetWidth + " : " + parent.offsetHeight);
    console.log("here: " + tempImg.offsetWidth + " : " + tempImg.offsetHeight);
    console.log("here: " + imgRatio + " : " + parentRatio);
    
    if (imgRatio <= parentRatio) {
      this.setState({loading: false, eventImage: <img style={{padding: "0px"}} className="imgGreaterHeight" src={`data:image/png;base64,${this.state.eventDetails.Image}`}/>});
    } else {
      this.setState({loading: false, eventImage: <img style={{padding: "0px"}} className="imgGreaterWidth" src={`data:image/png;base64,${this.state.eventDetails.Image}`}/>});
    }

    
  }

  render(){
    if (this.state.loading) {
      return (
        <Container className="eventContainer" fluid>
          <Row className="eventImageContainer d-flex align-items-center justify-content-center">
            <img style={{padding: "0px"}} className="eventDetailsImage" onLoad={this.setImageSize} src={`data:image/png;base64,${this.state.eventDetails.Image}`}/>
          </Row>
        </Container>
      );
    } else {
    return(
        <Container className="eventContainer" fluid>
          <Row className="eventImageContainer d-flex align-items-center justify-content-center">
            {this.state.eventImage}
          </Row>
          <Row >
            <Col className="eventTitleContainer d-flex align-items-center">
              <Col md="auto" onClick={this.props.history.goBack}className="backArrowContainer d-flex align-items-center">
                  <i class="fas fa-arrow-left backArrow"></i>
              </Col>
              <Col style={{paddingLeft: "10px"}} className="d-flex align-items-center">
                <h1 className="eventTitle">{this.state.eventDetails.Name}</h1>
              </Col>
            </Col>
            <Col className="eventTimeContainer d-flex align-items-center">
              <Col>
                <Row> 
                  <p className="eventDate">{this.state.eventDetails.Date}</p>
                </Row>
                <Row>
                  <p className="eventTime">{this.state.eventDetails.StartTime} - {this.state.eventDetails.EndTime}</p>
                </Row>
              </Col>
            </Col>
            <Row className="ticketOpContainer d-flex justify-content-center">
              <TicketOperation ticketDetails={this.state.ticketDetails} userDetails={this.state.userDetails} owned={this.state.owned} eventDetails={this.state.eventDetails}/>
            </Row>
            <Row id="eventPageBreak" style={{padding: "0px 20px", margin: "0px"}}>
              <hr/>
            </Row>
          </Row>
          <Row className="eventLocation">
            <h1>{this.state.eventDetails.Location}</h1>
          </Row>
          <Row className="eventDesc">
            <p>{this.state.eventDetails.Description}</p>
          </Row>
        </Container>
      );
    }
  }
}

class TicketOperation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qrcode: null
    }
    
    this.generateQRCode = this.generateQRCode.bind(this);
    this.toggleQRCode = this.toggleQRCode.bind(this);
  }

  generateQRCode = () => {
    var self = this;

    var qrcode = QRcode.toDataURL(this.props.ticketDetails._id).then(url => {
      self.setState({qrcode: url});
    }).catch(err => {
      self.setState({qrcode: "failed"});
    });
  }

  toggleQRCode = () => {
    if (this.state.qrcode == null) {
      this.generateQRCode();
    } else {
      this.setState({qrcode: null});
    }
  }

  render() {
    if (this.state.loading) {
      return(
        <p>loading...</p>
      );
    } else {
      if (!this.props.owned) {
        return(
          <Link className="btnBuyTicketContainer d-flex justify-content-center" to={{pathname: "/payment", state: {userDetails: this.props.userDetails, eventDetails: this.props.eventDetails}}}>
            <button className="btn btn-dark btnBuyTicket">
              Purchase Ticket ${this.props.eventDetails.Price}&nbsp;&nbsp;
            </button>
          </Link>
        );
      }
      else {
        if (this.state.qrcode == null) {
          //document.getElementById("eventPageBreak").style.marginTop = "0";
          return(
              <button onClick={this.toggleQRCode} className="btn btn-dark btnShowTicket">
                  Show QR code
              </button>
          );
        } else {
          return(
            <Container className="eventqrcodeContainer" fluid>
              <Row>
                <img className="eventqrcode" src={this.state.qrcode}/>
              </Row>
              <Row className="d-flex justify-content-center">
                <button onClick={this.toggleQRCode} className="btn btn-dark btnHideTicket">
                  Hide QR code
                </button>
              </Row>
            </Container>
          );
        }
      }
    }
  }
}

export default EventDetails;