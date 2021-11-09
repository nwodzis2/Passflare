const express = require("express");
const ticketRoutes = express.Router();
const dbo = require("../db/conn");

//generate ticket by UserID
ticketRoutes.route("/ticket/create").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
      EventID : req.body.eventID,
      UserID: req.body.userID,
      Active: true,
    };
    db_connect
        .collection("Tickets")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});

//Get tickets by orgID
ticketRoutes.route("/tickets/:orgID").get(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var orgid = req.body.orgID;
  db_connect
    .collection("Tickets")
    .find({OrgID: orgid})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Get tickets by userID
ticketRoutes.route("/tickets/:userID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var userID = req.body.userID;
  db_connect
    .collection("Tickets")
    .find({UserID: userID})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Activate ticket

//Deactivate ticket



module.exports = ticketRoutes;