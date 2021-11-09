const express = require("express");
const { userInfo } = require("os");
const orgRoutes = express.Router();
const dbo = require("../db/conn");

orgRoutes.route("/organization/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    
    let myobj = {
        Name : req.body.orgName,
        NickName: req.body.orgNickName,
        ZipCode: req.body.orgZip,
    }
    let newOrgID;
    db_connect
        .collection("Organization")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, result) {
            if (err) {throw err};
            newOrgID = result.insertedId;
            res.json({orgID: newOrgID});
            console.log(newOrgID);
        })

});

module.exports = orgRoutes;