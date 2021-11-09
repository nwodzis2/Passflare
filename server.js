const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const cors = require("cors");
require("dotenv").config({ path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
//app.use(require("./routes/record"));


const dbo = require("./db/conn");
// Accessing the path module
const path = require("path");

// This is the static that is going to be served, have to resolve
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(require("./routes/user"));
app.use(require("./routes/event"));
app.use(require("./routes/paymentRoute"));
app.use(require("./routes/admin"));
app.use(require("./routes/gatekeeper"));
app.use(require("./routes/ticket"));

app.use(require("./routes/organization"));
// We send whichever file
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(port, () => {
    dbo.connectToServer(function(err){
        if(err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
}); 