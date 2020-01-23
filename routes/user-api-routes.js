var db = require("../models");

module.exports = function(app) {
  //get all users
  app.get("/api/users", function(req, res) {
    db.Author.findAll({ include: [db.Post, db.Comment] }).then(function(
      dbUser
    ) {
      res.json(dbUser);
    });
  });
  // get specific user
  app.get("/api/users/:id", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post, db.Comment]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  //create new user
  app.post("/api/users", function(req, res) {
    //need body to be object with correct params for
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // delete user
  app.delete("/api/users/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
