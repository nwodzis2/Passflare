import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";

class Passes extends React.Component{
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md="auto">
                      <h2><i class="fas fa-arrow-left"></i></h2>
                    </Col>
                    <Col md="auto">
                        <h2>Passes</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
} 

export default Passes;