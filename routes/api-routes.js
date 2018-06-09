// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route to get data from data file
  app.get("/api/locations/preserves", function(req, res) {
    let preserves = require("../data/data.json")
    res.json(preserves);
  });

  // GET route for getting all of the posts
  app.get("/api/hikers", function(req, res) {
    db.Hiker.findAll({})
        .then(function(results) {
            // results are available to us inside the .then
            res.json(results);  
        });
    });

  // POST route for saving a new hiker
  app.post("/api/hikers", function(req, res) {
    db.Hiker.create(req.body).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

}