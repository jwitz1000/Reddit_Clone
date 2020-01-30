var db = require("../models");

module.exports = function(app) {
  //get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({ include: [db.Post, db.Comment] }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // get specific user by id
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post, db.Comment, db.Sub]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // get specific user by name
  app.get("/api/users/name/:name", function(req, res) {
    db.User.findOne({
      where: {
        user_name: req.params.name
      },
      include: [db.Post, db.Comment, db.Sub]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // BOLDDDDget specific user by user_name and pass
  app.get("/api/users/:user/pass/:pass", function(req, res) {
    db.User.findOne({
      where: {
        password: req.params.pass,
        user_name: req.params.user
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
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
