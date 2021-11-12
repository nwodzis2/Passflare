
const express = require("express");
const userRoutes = express.Router();
const crypto = require("crypto");
const dbo = require("../db/conn");
const { ContinuousColorLegend } = require("react-vis");
//var nodemailer = require('nodemailer');
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
            res.json({validationReport: "Incorrect email or password. Please try again."});
          } else {
            var referenceHash = crypto.pbkdf2Sync(String(req.body.password), user.Salt, user.Iterations, 64, 'sha512').toString('hex');
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
//recover account
/*userRoutes.route("/user/recover").get(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var generated_code = [];
  for(var i = 0; i < 4; i++){
    generated_code[i] = Math.floor(Math.random() * 10);
  }
  var mailOptions = {
    from: 'wodzisz22@gmail.com',
    to: req.body.email,
    subject: 'Passflare Password Recovery' + req.body.email.split('@')[0],
    text: `
    <body>
      <h1><i class=""></i>Passflare</h1>

    </body>
    `

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});*/
//update a user
userRoutes.route("/user/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myUser = { id: req.body.id };
    let newvalues = {
      $set: {
        Number : req.body.number,
        Name : req.body.name,
        Email : req.body.email,
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
