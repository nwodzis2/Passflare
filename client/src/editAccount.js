import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AccountEdit extends React.Component{
    render(){
        return(
            <Container fluid>
                <br/>
              <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Please enter your information below.</Card.Title>                            <br/>
                        <Form>
                            <FormGroup>       
                                <FormLabel>Name: </FormLabel>
                                <FormControl className="defaultText" type="text" placeholder="Enter name..."/>
                                <hr/>
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" placeholder="Enter email..."/>
                            </FormGroup>
                        </Form>
                        <br/>
                        <Row>
                            <button className="btn btn-dark passBtnDark"> 
                            Edit Account 
                            </button>
                        </Row> 
                    </Card>
                </Col>
              </Row>
            </Container>
          );
    }
}

export default AccountEdit;