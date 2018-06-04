// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  // Add sequelize code to get all books and return them as JSON
  app.get("/api/hikers", function(req, res) {
    db.Hiker.findAll({})
        .then(function(results) {
            // results are available to us inside the .then
            res.json(results);  
        });
    });

  // POST route for saving a new burger
  app.post("/api/hikers", function(req, res) {
    db.Hiker.create(req.body).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

}