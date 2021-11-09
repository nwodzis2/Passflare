const express = require("express");
const eventRoutes = express.Router();
const dbo = require("../db/conn");

//get all events
eventRoutes.route("/events").get(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    db_connect
      .collection("Events")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
//create event
eventRoutes.route("/events/create").post(function (req, res){
    console.log(req.body);
    console.log(JSON.stringify(req.body.image));
    let db_connect = dbo.getDb("Passflare");
    let myObj = {
          Name : req.body.name,
          Description: req.body.description,
          Price: req.body.price,
          OrgID : req.body.orgID,
          Image : req.body.image,
          Date : req.body.date,
          StartTime: req.body.startTime,
          EndTime: req.body.endTime,
          Location : req.body.location
      };
    var event = db_connect
        .collection("Events")
        .insertOne(myObj, function(err, res){
            if(err) throw err;
            console.log("event created");
        });
});
//delete event by id
eventRoutes.route("/events/delete/:id").post(function(req, res){
    let db_connect = dbo.getDb("Passflare");
    var event = { id: req.body.id };
    db_connect
        .collection("Events")
        .deleteOne(event, function (err, obj) {
            if (err) throw err;
            console.log("event deleted");
    });
});
//update event by id
eventRoutes.route("/events/update/:id").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    var id = { id: req.body.id };
    let newvalues = {
        $set: {
          Name : req.body.name,
          Header : req.body.header,
          Descriptin: req.body.description,
          OrgID : req.body.orgid,
          Image : req.body.image,
          DateTime : req.body.datetime,
          Location : req.body.location,
          Tickets: req.body.tickets
        },
      };
    var event = db_connect
        .collection("Events")
        .updateOne(id, newvalues, function(err, res){
            if(err) throw err;
            console.log("event updated");
        });
});
//get event by id
eventRoutes.route("/events/:id").get(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    var id = { id: req.body.id };
    var event = db_connect
        .collection("Events")
        .findOne(id);
    res.json(event);
});


//get event by org id
eventRoutes.route("/events/:orgID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var orgid = req.body.orgID;
  db_connect
    .collection("Events")
    .find({OrgID: orgid})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
module.exports = eventRoutes;