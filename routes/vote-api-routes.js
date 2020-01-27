var db = require("../models");

module.exports = function(app) {
  // find all votes
  app.get("/api/votes", function(req, res) {
    db.Vote.findAll({}).then(function(dbVote) {
      res.json(dbVote);
    });
  });

  // find all votes on a post
  app.get("/api/votes/post/:post_id", function(req, res) {
    db.Vote.findAll({
      where: { PostId: req.params.post_id }
    }).then(function(dbVote) {
      res.json(dbVote);
    });
  });

  // make a vote
  app.post("/api/votes", function(req, res) {
    db.Vote.create(req.body).then(function(dbVote) {
      res.json(dbVote);
    });
  });
  //delete vote
  app.delete("/api/votes/:id", function(req, res) {
    db.Vote.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbVote) {
      res.json(dbVote);
    });
  });
  //update vote
  app.put("/api/votes/:id", function(req, res) {
    db.Vote.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbVote) {
      res.json(dbVote);
    });
  });
};
