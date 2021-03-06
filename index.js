const express = require("express");
const app = express();
const http = require("http").Server(app);
const port = 3001;
var bodyParser = require("body-parser");

var path = require("path");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var mongoose = require("mongoose");
var credentials = require("./config.js");
mongoose.Promise = require("bluebird");
mongoose
  .connect(credentials.mongoConnection, {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
    auth: { authdb: "admin" }
  })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));
mongoose.set("useCreateIndex", true);

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
  console.log("listening on *:"+port);
});
