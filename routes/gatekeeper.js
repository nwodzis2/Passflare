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
          Email : req.body.email,
          Verified : req.body.verified
        },
      };

    db_connect
        .collection("GateKeeper")
        //.createIndex({Email: 1}, { unique: true} )
        .updateOne(myobj, newvalues, { upsert: true });
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
        //.createIndex({Email: 1}, { unique: true} )
        .updateOne(myobj, newvalues, { upsert: true });
});

module.exports = gatekeeperRoutes;