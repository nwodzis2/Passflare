const express = require("express");
const adminRoutes = express.Router();
const crypto = require("crypto");
const dbo = require("../db/conn");
//var nodemailer = require('nodemailer');

/*var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});*/


//create user
adminRoutes.route("/admin/add").post(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    let myobj = {
      Email : req.body.email,
      OrgID : req.body.orgID
    };
    db_connect
        .collection("Admin")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
    return;
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
              res.json({validationReport: "adminValid"});
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
  adminRoutes.route("admin/:id").delete((req, res) => {
    let db_connect = dbo.getDb("Passflare");
    var myUser = { id: req.body.id };
    db_connect
        .collection("Admin")
        .deleteOne(myUser, function (err, obj) {
      if (err) throw err;
      console.log("user deleted");
    });
  });
  //send gatekeeper email
  adminRoutes.route("/admin/sendMail").get(function (req, res){
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      service: "Gmail",
        auth: {
            user: "passflare@gmail.com",
            pass: "CapSquadAdmin2021?"
        },
    });

    var email = req.query.email;
    let db_connect = dbo.getDb("Passflare");
    var query = {Email : email};
    var myUser = db_connect.collection("Users").findOne(query);
    var name = myUser.Name;

    const newTo = {
      pathname: "/createGatekeeper",
      email: email,
      name: name
    }
    
    let info = transporter.sendMail({
        from: '"Passflare" <passflare@gmail.com>',
        to: String(email),
        subject: "Become a Passflare Gatekeeeper",
        text: "Congratulations on being chosen as a Passflare gatekeeper!",
        html: '<p>Congratulations on being chosen as a Passflare gatekeeper!</p><p>Click <a href="passflare.herokuapp.com/gatekeeperVerification/' + email + 
          '"> this link </a> to finish your confirmation and become a gatekeeper.</p>'
    });
  });

  module.exports = adminRoutes;