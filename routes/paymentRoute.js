const express = require("express")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const paymentRoutes = express.Router();
//we're probably going to want to put the log into the db
const dbo = require("../db/conn");



paymentRoutes.route("/payment").post(async(req, res) => {
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

module.exports = paymentRoutes;