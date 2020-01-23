var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.Author.findAll({ include: [db.Post, db.Comment] }).then(function(
      dbUser
    ) {
      res.json(dbUser);
    });
  });

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

  app.post("/api/users", function(req, res) {
    //need body to be object with correct params for user
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

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
