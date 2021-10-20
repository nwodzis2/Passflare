import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from '@/config/axios.js'

class Passes extends React.Component{
    render(){
        return(
            <Container fluid>  
                <Row>
                    <Col md="6">
                      <h2><i class="fas fa-arrow-left"></i></h2>
                    </Col>
                    <Col md="auto">
                        <h2>Passes</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
  
    // getPasses() {
    //     return axios.get('passes');
    // }

    // getPass(id) {
    //     return axios.get('passes/' + id);
    // }

    // addPass(data) {
    //     return axios.post('passes', data);
    // }

    // editPass(id, data) {
    //     return axios.put('passes/' + id, data);
    // }

    // deletePass(id) {
    //     return axios.delete('passes/' + id);
    // }
} 

export default Passes;
