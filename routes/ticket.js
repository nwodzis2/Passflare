const express = require("express");
const ticketRoutes = express.Router();
const dbo = require("../db/conn");
//generate ticket by UserID
userRoutes.route("/ticket/create").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
      Name : req.body.name,
      Email : req.body.email,
      EventID : req.body.orgid,
      UserID: req.body.userid,
      Active: true,

    };
    db_connect
        .collection("Tickets")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});

//Get ticket by ID

//Activate ticket

//Deactivate ticket