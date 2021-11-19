const express = require("express");
const ticketRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


//generate ticket by UserID
ticketRoutes.route("/ticket/create").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
      EventID : req.body.eventID,
      UserID: req.body.userID,
      Active: true,
    }
    db_connect
        .collection("Tickets")
        //.createIndex({Email: 1}, { unique: true} )
        .insert(myobj, function(err, res){
          if (err) throw err;
    });
});



//get ticket by ticket id
ticketRoutes.route("/tickets/byID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var ticketObjID = req.body.ticketID;
  db_connect
    .collection("Tickets")
    .find({_id: ObjectId(ticketObjID)})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
//Get tickets by eventID
ticketRoutes.route("/tickets/eventID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var eventID = req.body.eventID;
  db_connect
    .collection("Tickets")
    .find({EventID: eventID})
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





/*
//Get tickets by orgID
ticketRoutes.route("/tickets/orgID").get(function (req, res){
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
*/
//Activate ticket
ticketRoutes.route("/tickets/activate/:ticketID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var ticketID = req.body.ticketID;
  var query = {_id : ObjectId(ticketID)};
  var result;
  var myTicket = db_connect.collection("Tickets").findOne(query, 
    function(err, ticket){
      if(err){
        result = {ticketReport : err};
      } else{
        if(ticket.Active == true){
          result = {ticketReport : "already active"};
        }
        else{
          result = {ticketReport : "success"};
          db_connect.collection("Tickets").updateOne(query, {$set : {Active : true}}, function(err, res){
            if(err){
              throw err
            }
            else{
              result = {ticketReport : "success"};
            }
          });
          
        }
      }
      res.json(result);
    }
    );
});


//Deactivate ticket
ticketRoutes.route("/tickets/deactivate/:ticketID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  
  var result;
  var ticketID = req.body.ticketID;
  var query = {_id : ObjectId(ticketID)};
  var myTicket = db_connect.collection("Tickets").findOne(query, 
    function(err, ticket){
      if(err){
        result = {ticketReport : err};
      } else{
        if(ticket.Active == false){
          result = {ticketReport : "already deactivated"};
        }
        else{
          result = {ticketReport : "success"};
          db_connect.collection("Tickets").updateOne(query, {$set : {Active : false}}, function(err, res){
            if(err){
              throw err
              
            }
            else{
              result = {ticketReport : "success"};
            }
          });
          
        }
      }
      res.json(result);
    }
    );
});


module.exports = ticketRoutes;