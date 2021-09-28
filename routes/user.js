const { pbkdf2 } = require("crypto");
const express = require("express");

const userRoutes = express.Router();
const dbo = require("../db/conn");
//create user
userRoutes.route("/user/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(req.body.password, salt, iterations);
    let myobj = {
      
      Number : req.body.number,
      Name : req.body.name,
      Email : req.body.email,
      OrgID : req.body.orgid,
      Hash : hash,
      Salt : salt,
      Iterations : iterations

    };
    db_connect
        .collection("Users")
        .createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});
//validate user by password
userRoutes.route("/user/validate").get(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var query = {email : req.body.email}
    var myUser = db_connect.collection("Users").findOne(query)
    return myUser.Hash == pbkdf2(req.body.password, myUser.Salt, myUser.Iterations)
  });
//update a user
userRoutes.route("user/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myUser = { id: req.body.id };
    let newvalues = {
      $set: {
        Number : req.body.number,
        Name : req.body.name,
        Email : req.body.email,
        OrgID : req.body.orgid
      },
    };
    db_connect
      .collection("Users")
      .updateOne(myUser, newvalues, function (err, res) {
        if (err) throw err;
        console.log("user updated");
      });
  });
  //delete user
  userRoutes.route("user/:id").delete((req, res) => {
    let db_connect = dbo.getDb("Passflare");
    var myUser = { id: req.body.id };
    db_connect
        .collection("Users")
        .deleteOne(myUser, function (err, obj) {
      if (err) throw err;
      console.log("user deleted");
    });
  });