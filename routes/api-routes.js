var db = require("../models");

module.exports = function(app) {
  app.get("/api/locations/preserves", function(req, res) {
    let preserves = require("../data/data.json")
    res.json(preserves);
  });

  app.get("/api/hikers", function(req, res) {
    db.Hiker.findAll({})
        .then(function(results) {
            res.json(results);  
        });
    });

  app.post("/api/hikers", function(req, res) {
    db.Hiker.create(req.body).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });
}