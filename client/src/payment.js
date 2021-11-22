import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm.js'


const PUBLIC_KEY = "pk_test_51JmLLaENugnkcXu4kbAjknKf05LdaeJ8K9a0rafUAMh3B4LXnFJoPERMF4p4qz0hhjiCjyYjbgdyiLTxLDDAl5B300ep8DaVO3"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Payment(props) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm parentProps={props} userDetails={props.location.state.userDetails} eventDetails={props.location.state.eventDetails}/>
        </Elements>
    )
}