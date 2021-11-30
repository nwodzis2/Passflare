import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router'
//initiate our cards with how we want them to look
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "rgba(252,163,18,1)",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fff" },
			"::placeholder": { color: "#fff" }
		},
		invalid: {
			iconColor: "#542e00",
			color: "#542e00"
		}
	}
}
//this is our form for payment
export default function PaymentForm(props){
    const [ success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    
        if (!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("/payment", {
                    amount: parseFloat(props.eventDetails.Price) * 100, //Gotta multiply by 100, it accepts price in cents
                    id,
                    userID: props.userDetails._id,
                    eventID: props.eventDetails._id
                })

                if(response.data.success){
                    let ticketObj = {
                        eventID: props.eventDetails._id,
                        userID: props.userDetails._id
                    }

                    axios.post("ticket/create", ticketObj);
                    setSuccess(true)
                }
            } catch (error){
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    if (!success) {
        return(
            <Container className="paymentPageContainer" fluid>
                <Row className="paymentEventTitleContainer d-flex align-items-center">
                    <Col md="auto" onClick={props.parentProps.history.goBack}className="backArrowContainer d-flex align-items-center">
                        <i class="fas fa-arrow-left backArrow"></i>
                    </Col>
                    <Col className="paymentEventTitleTextContainer d-flex align-items-center">
                        <p className="paymentEventTitleText">{props.eventDetails.Name}</p>
                    </Col>
                    <Row style={{margin: "0px", marginTop: "10px", padding: "0px"}}>
                        <hr style={{padding: "0px", width: "calc(100% - 40px)"}}/>
                    </Row>
                </Row>
                <Row className="cardInfoContainer">
                    <p className="cardInfoTitle">Enter Card Information</p>
                    <form className="cardInfoForm" onSubmit={handleSubmit}>
                        <fieldset className="cardInfo">
                            <div className="cardInfoText">
                                <CardElement options={CARD_OPTIONS}/>
                            </div>
                        </fieldset>
                        <button className="PayButton btn-dark">Submit: ${props.eventDetails.Price}</button>
                    </form>
                </Row>
            </Container>
        );
    } else {
        return(
            <Container fluid>
                {alert("Purchase Successful!")}
                {props.parentProps.history.go(-2)}
            </Container>
        )
    }
}