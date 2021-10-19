
const express = require("express");
const userRoutes = express.Router();
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
      OrgID : req.body.orgid,
      Hash : hash,
      Salt : salt,
      Iterations : iterations

    };
    db_connect
        .collection("Users")
        //.createIndex({Email: 1}, { unique: true} )
        .insertOne(myobj, function (err, res) {
      if (err) throw err;
    });
});
//validate user by password
userRoutes.route("/user/validate").get(function (req, res) {
    let db_connect = dbo.getDb("Passflare");
    var query = {Email : req.body.email}
    var myUser = db_connect.collection("Users").findOne(query)
    return myUser.Hash == crypto.pbkdf2Sync(String(req.body.password), String(myUser.Salt), 10000, 32, 'sha512')
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
  module.exports = userRoutes;