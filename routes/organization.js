const express = require("express");
const { userInfo } = require("os");
const orgRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require('mongodb').ObjectId;

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

orgRoutes.route("/organization/orgID").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    console.log(req.body.orgID);
    db_connect
      .collection("Organization")
      .findOne({_id: ObjectId(req.body.orgID)}, function(err, org){
        if (err) throw err;
        if (org == null){
          res.json({organization: null})
        }
        else
        res.json({orgName: org.Name, orgNickName: org.NickName, orgZip: org.ZipCode});
      });
  });

module.exports = orgRoutes;