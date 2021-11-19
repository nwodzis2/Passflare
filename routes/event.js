const express = require("express");
const formidible = require("formidable");
const fs = require("fs");
const path = require("path");
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
    let db_connect = dbo.getDb("Passflare");
    const form = new formidible.IncomingForm();
    
    

    form.parse(req, function(error, fields, files){
      let encodedData = fs.readFileSync(files.image.filepath);

      console.log(files.image);

      let eventObj = {
        Name : fields.name,
        Description: fields.description,
        Price: fields.price,
        OrgID : fields.orgID,
        Image : encodedData,
        Date : fields.date,
        StartTime: fields.startTime,
        EndTime: fields.endTime,
        Location : fields.location
      };

      var event = db_connect
      .collection("Events")
      .insertOne(eventObj, function(err, res){
          if(err) throw err;
          console.log("event created");
      });
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


//search event by date
eventRoutes.route("/events/:date").get(function (req, res) {
  let db_connect = dbo.getDb("Passflare");
  var query = {date: req.body.date}
  db_connect
    .collection("Events")
    .find({Date: query})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//search event by location
eventRoutes.route("/events/:location").get(function (req, res) {
  let db_connect = dbo.getDb("Passflare");
  var query = {date: req.body.location}
  db_connect
    .collection("Events")
    .find({Location: query})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//search event by name
eventRoutes.route("/events/:name").get(function (req, res) {
  let db_connect = dbo.getDb("Passflare");
  var query = {date: req.body.name}
  db_connect
    .collection("Events")
    .find({Name: query})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = eventRoutes;