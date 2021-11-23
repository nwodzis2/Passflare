
const express = require("express");
const userRoutes = express.Router();
const crypto = require("crypto");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const { ContinuousColorLegend } = require("react-vis");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
    auth: {
        user: "passflare@gmail.com",
        pass: "CapSquadAdmin2021?"
    },
});

/*
            let info = await transporter.sendMail({
                from: '"Passflare" <passflare@gmail.com>',
                to: "moster@kent.edu",
                subject: "Become a Passflare Gatekeeeper",
                text: "Congratulations on being chosen as a Passflare gatekeeper!",
                html: "<p>Click <a href='#'>this link</a> to finish your confirmation and become a gatekeeper.</p>"
            });

            console.log("Message sent: %s", info.messageId);
*/

//create user
userRoutes.route("/user/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    const hash = crypto.pbkdf2Sync(String(req.body.password), salt, iterations, 64,
        'sha512', function (err, derivedKey) {
          
          if (err) throw err;
         
          // Prints derivedKey
          console.log(derivedKey.toString('hex'));
      }).toString('hex');
    let myobj = {
      Number : req.body.number,
      Name : req.body.name,
      Email : req.body.email,
      OrgID : req.body.orgID,
      Hash : hash,
      Salt : salt,
      Iterations : iterations
    };
    db_connect
        .collection("Users")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, user) {
      if (err) throw err;
      console.log("success");
      res.json({sucess: true});
    });
    return;
});

//Fetch user information by email
userRoutes.route("/user/email").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var query = {Email : req.body.email};
    var myUser = db_connect.collection("Users").findOne(query,
      function(err, user){
        if (err) {
          res.json({response: err});
        } else {
          res.json({response: user});
        }
      });
  });
  
  //validate user by password
  userRoutes.route("/user/validate").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var query = {Email : req.body.email};
    var myUser = db_connect.collection("Users").findOne(query,
      function(err, user){
        if (err) {
           res.json({validationReport: err});
        } else {
          if (user == null){
            res.json({validationReport: "No such user."});
          } else {
            var referenceHash = crypto.pbkdf2Sync(String(req.body.password), user.Salt, parseInt(user.Iterations), 64, 'sha512').toString('hex');
            var validation = (user.Hash == referenceHash);
            if (validation) {
              res.json({validationReport: "valid"});
            } else {
              res.json({validationReport: "password incorrect"});
            }
          }
        }
      });
  });

  //change user password
  userRoutes.route("/user/changePassword").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    const hash = crypto.pbkdf2Sync(String(req.body.password), salt, iterations, 64,
        'sha512', function (err, derivedKey) {
          
          if (err) throw err;
         
          // Prints derivedKey
          console.log(derivedKey.toString('hex'));
      }).toString('hex');
    
    let myUser = { Email: req.body.email };
    let newvalues = {
      $set: {
        Hash : hash,
        Salt : salt,
      },
    };
    db_connect
        .collection("Users")
        //.createIndex({Email: 1}, { unique: true} )
        .updateOne(myUser, newvalues, function (err, user) {
      if (err) throw err;
      res.json({passwordChangeSuccess: true});
    });
    return;
});

//recover account
userRoutes.route("/user/recover").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var generated_code = [];
  for(var i = 0; i < 4; i++){
    generated_code[i] = Math.floor(Math.random() * 10);
  }
  
  db_connect.collection("Users").findOne({Email : req.body.email}, function(err, user){
    if (err) {
      res.json({valid: false});
    } else {
      if (user == null){
        res.json({valid: false});
      }
      else{
        transporter.sendMail({
          from: '"Passflare" <passflare@gmail.com>',
          to: user.Email,
          subject: "Passflare Account Recovery",
          text: "You're recieving this email because we recieved a request to reset the password for your account.",
          html: '<p>You&apos;re recieving this email because the we recieved a request to reset the password for your account.</p><p>Your four-digit code is as follows: ' + generated_code[0] + 
            + generated_code[1] + generated_code[2] + generated_code[3] + '</p><p>Please enter this code on the account recovery page.</p>'
        });
        res.json({recoveryCode: generated_code, valid: true});
      }
    }
  });
});

//update a user
userRoutes.route("/user/edit").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let newvalues = {
      $set: {
        Number : req.body.number,
        Name : req.body.name,
        Email : req.body.email,
      },
    };
    db_connect
      .collection("Users")
      .updateOne({_id: ObjectId(req.body.id)}, newvalues, function (err, user) {
        if (err) throw err;
        console.log("user updated");
        res.json({sucess: true});
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

  //get user by orgID
  userRoutes.route("/user/orgID").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    db_connect
      .collection("Users")
      .find({OrgID: req.body.orgID})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  //get user by _id
  userRoutes.route("/user/_id").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");
    var userObjID = req.body.userID;
    db_connect
      .collection("Users")
      .find({_id: ObjectId(userObjID)})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  //verify user
  userRoutes.route("/user/verify").post(function (req, res){
    let db_connect = dbo.getDb("Passflare");

    let myobj = {
        Email : req.body.email
    }

    let newvalues = {
        $set: {
          OrgID: req.body.orgID,
        },
      };

    db_connect
        .collection("Users")
        .updateOne(myobj, newvalues, { upsert: true }, function(err, obj){
          if (err) throw err;
          res.json({message: "Added " + req.body.email + " as user"});
        });
});
  
  
  module.exports = userRoutes;
