var db = require("../models");

module.exports = function(app) {
  // find all comments on a post
  app.get("/api/comments/:post_id", function(req, res) {
    db.Comment.findAll({
      where: { PostId: req.params.post_id }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // make a comment
  app.post("/api/comment", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });
  //delete comment
  app.delete("/api/comment/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
  //update comment
  app.put("/api/comment", function(req, res) {
    db.Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
};
