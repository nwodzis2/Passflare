const express = require("express");
const { userInfo } = require("os");
const orgRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require('mongodb').ObjectId;
//create an organization
orgRoutes.route("/organization/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    
    let myobj = {
        Name : req.body.orgName,
        NickName: req.body.orgNickName,
        ZipCode: req.body.orgZip,
    }

    db_connect
        .collection("Organization")
        .insertOne(myobj, function (err, result) {
            if (err) {throw err};
            res.json({orgID: result.insertedId});
        })

});
//get an organization
orgRoutes.route("/organization/orgID").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    db_connect
      .collection("Organization")
      .find({_id: ObjectId(req.body.orgID)})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

module.exports = orgRoutes;