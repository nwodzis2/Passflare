import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";

function PassflareTitleGatekeeper(){
    return(
        <Container fluid>
        <Row>
          <Col md="12">
              <h1 className="title"><i className="fas fa-ticket-alt passTicket"></i> Passflare</h1>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <h2 id="subtitle">GateKeeper</h2>
          </Col>
        </Row>
      </Container>
    );
}

function GatekeeperLogin(){
    return(
        <Container fluid>
        <Row>
          <Col md="12">
             <form method="post" action="enterCodeLogin.html">
                <input type="text" placeholder="Enter your Event ID"/>
                <br/>
                <button class="btn btn-dark passBtn" type="submit"> 
                    Next &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
                </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
}

class GatekeeperLoginPage extends React.Component{
    render(){
        return(
            <div>
            <PassflareTitleGatekeeper/>
            <GatekeeperLogin/>
            </div>
        );
    }
}

export default GatekeeperLoginPage;