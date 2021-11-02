import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AdminNav extends React.Component {

    render(){
      return(
        <Navbar fixed="top" bg="dark" expand="lg" className="userNavbar">
            <Container fluid>
                <Navbar.Brand href="/adminView"><h4 id="adminBrand"><i className="fas fa-ticket-alt passTicket"/> Passflare <i id="brandBreak">|</i> <i id="adminLogo">Admin</i></h4> </Navbar.Brand>
                <Navbar.Toggle aria-controls="resonsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="ms-auto" id="adminChoices">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/stats">Stats</Nav.Link>
                        <Nav.Link href="/addGatekeepers">Gatekeepers</Nav.Link>
                        <Nav.Link href="/eventCreation">Event Creation</Nav.Link>
                        <Nav.Link href="/Financials">Financials</Nav.Link>
                        <Nav.Link href="/returns">Returns</Nav.Link>
                        <Nav.Link href="/editAccount"><i class="fas fa-user-circle"></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      )
    }
}

export default AdminNav;