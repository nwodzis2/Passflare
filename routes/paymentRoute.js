const express = require("express")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const paymentRoutes = express.Router();
//we're probably going to want to put the log into the db
const dbo = require("../db/conn");



paymentRoutes.route("/payment").post(async(req, res) => {
    let db_connect = dbo.getDb("Passflare");

    let amount = req.body.amount;
    let paymentID = req.body.id;

    var paymentObj = {
        userID: req.body.userID,
        eventID: req.body.eventID,
        paymentIntents: "Payment Failed"
    };

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Event ticket",
            payment_method: paymentID,
            confirm: true
        })

        paymentObj.paymentIntents = payment;
        
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

    db_connect
        .collection("Payments")
        .insertOne(paymentObj);
})

paymentRoutes.route("/payment/orgID").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    db_connect
      .collection("Payments")
      .find({OrgID: req.body.orgID})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

module.exports = paymentRoutes;