var Task = require("../models/Task.js");

module.exports = function(app) {
  app.post("/task", (req, res) => {
    let data = req.body;
    console.log(data);
    Task.findOne({ _id: data._id }, (err, docs) => {
      if (docs !== null) {
      } else {
        record();
      }
    });

    function record() {
      new Task({
        ...data,
        timestamp: Date.now()
      }).save();
    }

    res.json({ code: 200 });
  });
  app.post("/task/complete", (req, res) => {
    let data = req.body;
    console.log(data);
    Task.findOne({ _id: data._id }, (err, docs) => {
      if (docs !== null) {
        docs.status = "completed";
        docs.save();
      }
    });
    res.json({ code: 200 });
  });

  app.get("/task/all", (req, res) => {
    Task.find({}, function(error, data) {
      res.json(data);
    });
  });
};
