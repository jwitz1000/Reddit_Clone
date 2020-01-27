var db = require("../models");

module.exports = function(app) {
  // all posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({ include: [db.User, db.Comment, db.Vote] }).then(function(
      dbPost
    ) {
      res.json(dbPost);
    });
  });
  // all posts for a user
  app.get("/api/posts/user/:user_ID", function(req, res) {
    db.Post.findAll({
      where: { UserId: req.params.user_ID },
      include: [db.User, db.Comment, db.Vote]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // specific post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Comment, db.Vote]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  //make a post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  //delete post
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  //update post
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
