const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json)
app.use(cors())


app.post("/payment", cors(), async(req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Event ticket",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment Successful",
            success: true
        })
    } catch (error){
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})