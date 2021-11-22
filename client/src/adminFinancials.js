import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {AdminNav} from "./adminView.js";

class AdminFinancials extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid>
            <AdminNav adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
            <FinancialData adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
        </Container>
        )
    }
}

class FinancialData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            payments: [],
            orgIDevents : [],
            payments : [],
            paymentLayout : [],
            loading : true
        }

        this.getOrgPayments = this.getOrgPayments.bind(this);
        this.loadPaymentBlocks = this.loadPaymentBlocks.bind(this);
    }

    componentWillMount(){
        this.getOrgPayments();
    }
    componentDidMount(){
        
    }
    getOrgPayments(){
        axios.post("/events/:orgID", {orgID: this.props.adminData.OrgID}).then((response) => {
            console.log(response.data);
            var tempEvents = []
            for(var e of response.data){
                tempEvents.push(e)
            }
            this.setState({orgIDevents : tempEvents})
            return true
        }).then((response) => {
            if(!response){
                console.log('get events did not succeed')
            }
            else{
                var tempArray = [];
                for(var e of this.state.orgIDevents){
                    axios.post("/payment/eventID", {eventID : e._id}).then((response) =>{
                        for(var p of response.data){
                            tempArray.push(p)
                        }
                        this.setState({payments :  tempArray})
                        console.log(tempArray)
                        this.loadPaymentBlocks();
                    })
                }
            }
        })
    }
    loadPaymentBlocks(){
        var tempArray = []
        for(var p of this.state.payments){
            for(var e of this.state.orgIDevents){
                if(p.eventID == e._id){
                    var timestamp = p._id.toString().substring(0,8)
                    var date = new Date( parseInt( timestamp, 16 ) * 1000 )
                    date = date.toLocaleString("en-US", {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', second: '2-digit'})
                    tempArray.push(
                        <div className="transaction-blocks">
                            <p>Event Name: {e.Name}</p>
                            <p>User: {p.userID}</p>
                            <br/>
                            <p>Amount: {e.Price}</p>
                            <p>Time of transaction: {date}</p>
                        </div>
                    )
                }
            }
            
        }
        console.log(tempArray)
        this.setState({paymentLayout : tempArray})
        this.setState({loading : false})
    }
    render(){
        if(this.state.loading){
            return(
                <Container className="scroll-box-100">
                    Loading payment data...
                </Container>
            )
        }
        else{
            return(
                <Container className="scroll-box-100">
                    {this.state.paymentLayout}
                </Container>
            );
        }
        
    }
}

export default AdminFinancials;