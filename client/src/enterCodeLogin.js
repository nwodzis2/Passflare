import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";

class UserCode extends React.Component{
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <br/><br/>
                        <p>Enter the four digit code sent to you at </p>
                    </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <p id="emailPhone">email/phonenum</p>
                    <br/><br/>
                   </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <form method="post" action="userView.html">
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0"/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0"/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0"/>
                        <input type="number" min="0" max="9" step="1" maxlength="1" placeholder="0"/>
                        <br/><br/>
                        <button className="btn btn-dark passBtn" type="submit"> 
                            <p>Next &nbsp;&nbsp;<i class="fas fa-arrow-right"></i></p>
                        </button>
                    </form>
                   </Col>
                </Row>
            </Container>
        );
    }
}

export default UserCode;