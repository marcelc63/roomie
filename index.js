const express = require("express");
const app = express();
const http = require("http").Server(app);
const port = 3000;
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var mongoose = require("mongoose");
var credentials = require("./config.js");
mongoose.Promise = require("bluebird");
mongoose
  .connect(
    credentials.mongoConnection,
    {
      promiseLibrary: require("bluebird"),
      useNewUrlParser: true
    }
  )
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

require("./app/api.js")(app);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/worker", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/worker.html"));
});

app.get("/admin", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/admin.html"));
});

http.listen(port, function() {
  console.log("listening on *:3001");
});
