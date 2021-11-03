
import React, { Component, useState} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import QrReader from 'react-qr-reader'
const qrReaderStyle ={
  width: "100vw",
  height: "100vw",
  display: 'flex',
  "justify-content": "center"
}
class QrScanner extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  
  render() {
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
  }
}

class GatekeeperView extends React.Component{
  
    render(){
        return(
          <Container fluid>
            <Row>
              <Col md="12">
                <QrScanner/>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row>
          </Row>
        </Container>
      );
    }
}

export default GatekeeperView;