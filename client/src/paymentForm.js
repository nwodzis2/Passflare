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
export default function PaymentForm(){
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
                const response = await axios.post("http://localhost:5000/payment", {
                    amount: 1000, //Change this to change price
                    id
                })

                if(response.data.success){
                    console.log("Successful payment")
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
        <>
            <div>
                <h2 className="Paymenth2">Please Enter Card Information</h2>
            </div>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS}/>
                        </div>
                    </fieldset>
                    <button className="PayButton">Pay</button>
                </form>
                :
                <div>
                    <h2>Purchase successful!</h2>
                </div>
            }
        </>
    )
}