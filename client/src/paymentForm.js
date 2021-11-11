import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#f00",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#261359" },
			"::placeholder": { color: "#261359" }
		},
		invalid: {
			iconColor: "#542e00",
			color: "#542e00"
		}
	}
}

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

    return(
        <div>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2 className="Paymenth2">Please Enter Card Information</h2>
                    </div>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS}/>
                        </div>
                    </fieldset>
                    <button className="PayButton">Submit: ${props.eventDetails.Price}</button>
                </form>
                :
                <div>
                    <h2>Purchase successful!</h2>
                </div>
            }
        </div>
    )
}