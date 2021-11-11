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

    db_connect
        .collection("Organization")
        .insertOne(myobj, function (err, result) {
            if (err) {throw err};
            res.json({orgID: result.insertedId});
        })

});

module.exports = orgRoutes;