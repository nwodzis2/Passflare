const express = require("express");
const gatekeeperRoutes = express.Router();
const crypto = require("crypto");
const dbo = require("../db/conn");

gatekeeperRoutes.route("/gatekeeper/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    
    let myobj = {
        Email : req.body.email
    }

    let newvalues = {
        $set: {
          OrgID: req.body.orgID,
          Email : req.body.email,
          Verified : req.body.verified
        },
      };

    db_connect
        .collection("GateKeeper")
        .updateOne(myobj, newvalues, { upsert: true }, function(err, obj){
          if (err) throw err;
          res.json({message: "Added " + req.body.email + " as Gatekeeper"});
        });
});

gatekeeperRoutes.route("/gatekeeper/verify").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
        Email : req.body.email
    }

    let newvalues = {
        $set: {
          Verified : true
        },
      };

    db_connect
        .collection("GateKeeper")
        .updateOne(myobj, newvalues, { upsert: true });
});

gatekeeperRoutes.route("/gatekeeper/validate").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var query = {Email : req.body.email, Verified : true};
  
  db_connect.collection("GateKeeper").findOne(query, function(err, gatekeeper){
    if (err) {
       res.json({validationReport: err});
    } else {
      if (gatekeeper == null){
        res.json({validationReport: "Not a verified gatekeeper."});
      }
      else{
        var validation = (gatekeeper.Verified === true);
        if (validation) {
          res.json({validationReport: "gatekeeperValid"});
        } else {
          res.json({validationReport: "Please validate your account."});
        }
      }
    }
  });
});

//Get gatekeepers by orgID
gatekeeperRoutes.route("/gatekeeper/orgID").post(function (req, res) {
  let db_connect = dbo.getDb("Passflare");
  db_connect
    .collection("GateKeeper")
    .find({OrgID : req.body.orgID})
    .toArray(function(err, result){
      if (err) throw err;
      res.json(result);
    });
});

module.exports = gatekeeperRoutes;