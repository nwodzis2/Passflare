import React, { Component } from 'react';
import './styles.css';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AccountEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {userNumber: '', userName: '', userEmail: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    async handleSubmit(event){
        var userId = this.props.match.params.id;

        event.preventDefault();
        let obj = {
            number: this.state.userNumber,
            name: this.state.userName,
            email: this.state.userEmail,
        }

        axios.post("/user/edit", { id: userId, number: obj.number, name: obj.name, email: obj.email })
        .then(function(){
            var tempProps = this.props;
            tempProps.history.push('/userView');
        })
        .catch(function(error){
            console.log(error);
        })
    }

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
                                <FormControl className="defaultText" type="text" name="userName" placeholder="Enter name..."/>
                                <hr/>
                                <FormLabel>Phone Number: </FormLabel>
                                <FormControl className="defaultTel" type="tel" name="userNumber" placeholder="Enter email..."/>
                                <hr/>
                                <FormLabel>Email Address: </FormLabel>
                                <FormControl className="defaultEmail" type="email" name="userEmail" placeholder="Enter email..."/>
                            </FormGroup>
                        </Form>
                        <br/>
                        <Row>
                            <button className="btn btn-dark passBtnDark" type="submit" onClick={this.handleSubmit}> 
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