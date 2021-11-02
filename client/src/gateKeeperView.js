import React, { Component, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect, withRouter } from "react-router-dom";
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class GatekeeperView extends React.Component{
    render() {
        return (
        <Container fluid>
          <Row>
          </Row>
        </Container>
        );
    }
}

export default GatekeeperView;