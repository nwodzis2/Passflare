const express = require("express");
const adminRoutes = express.Router();
const crypto = require("crypto");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//create user
adminRoutes.route("/admin/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
      Email : req.body.email,
      UserID: req.body.userID,
      OrgID : req.body.orgID,
      Master : req.body.master
    };
    db_connect
        .collection("Admin")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, admin) {
      if (err) throw err;
      res.json({successAdmin: true})
    });
    return;
});

adminRoutes.route("/admin/orgID").post(function (req, res){
  let db_connect = dbo.getDb("Passflare");
  var orgid = req.body.orgID;
  db_connect
    .collection("Admin")
    .find({OrgID: orgid})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//validate user by password
adminRoutes.route("/admin/validate").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var query = {Email : req.body.email};
    db_connect.collection("Admin").findOne(query, function(err, admin){
      if (err) {
         res.json({validationReport: err});
      } else {
          if (admin == null){
            res.json({validationReport: "Not a verified admin."});
          }
          else{
            var validation = (admin.Email === req.body.email);
            if (validation) {
              res.json({validationReport: "adminValid", master: admin.Master});
            } else {
              res.json({validationReport: "Please validate your account."});
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
adminRoutes.route("admin/update/:id").post(function (req, res) {
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
      .collection("Admin")
      .updateOne(myUser, newvalues, function (err, res) {
        if (err) throw err;
        console.log("user updated");
      });
  });
  //delete user
  adminRoutes.route("/admin/delete/id").post(function(req, res){
    let db_connect = dbo.getDb("Passflare");
    var id = req.body.id;
    db_connect
      .collection("Admin")
      .deleteOne({_id : ObjectId(id)}, function (err, obj) {
          if (err) throw err;
          console.log("Admin deleted");
          res.json({deleted: true});
        });
    });

  //send gatekeeper email
  adminRoutes.route("/admin/sendGatekeeperMail").get(function (req, res){
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      service: "Gmail",
        auth: {
            user: "passflare@gmail.com",
            pass: "CapSquadAdmin2021?"
        },
    });
    console.log(req.query.email);
    let db_connect = dbo.getDb("Passflare");
    db_connect.collection("Users").findOne({Email : req.query.email}, function(err, user){
      if (err) {
        res.json({response: err});
      } else {
        if (user == null){
          res.json({validationReport: false});
        }
        else{
          transporter.sendMail({
            from: '"Passflare" <passflare@gmail.com>',
            to: user.Email,
            subject: "Become a Passflare Gatekeeeper",
            text: "Congratulations on being chosen as a Passflare gatekeeper!",
            html: '<p>' + user.Name + ',</p><p>Congratulations on being chosen as a Passflare gatekeeper!</p><p>Click <a href="http://passflare.herokuapp.com/gatekeeperVerification/' + user.Email + 
              '"> this link </a> to finish your confirmation and become a gatekeeper.</p>'
          });
          res.json({validationReport: true});
        }
      }
    });
  });

  //send user email
  adminRoutes.route("/admin/sendUserMail").get(function (req, res){
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      service: "Gmail",
        auth: {
            user: "passflare@gmail.com",
            pass: "CapSquadAdmin2021?"
        },
    });

    let db_connect = dbo.getDb("Passflare");
    var orgName = req.query.orgName;
    var orgID = req.query.orgID;
    var email = req.query.email;
    db_connect.collection("Users").findOne({Email : email}, function(err, user){
      if (err) {
        res.json({response: err});
      } else {
        if (user == null){
          res.json({validationReport: false});
        } else{
          if (!user.Verified) {
            transporter.sendMail({
              from: '"Passflare" <passflare@gmail.com>',
              to: user.Email,
              subject: "Verify passflare user",
              text: "Welcome to Passflare!",
              html: '<p>' + user.Name + ',</p><p>Welcome to passflare!</p><p>Click <a href="http://passflare.herokuapp.com/userVerification/' + user.Email + 
                '/' + orgID + '"> this link </a> to join ' + orgName + '</p>'
            });
            res.json({validationReport: true});
          }
        }
      }
    });
  });

  module.exports = adminRoutes;