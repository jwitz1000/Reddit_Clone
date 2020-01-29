module.exports = function() {
  var db = require("./models");

  let users = [
    {
      user_name: "Arman_user",
      password: "password",
      first_name: "Arman",
      last_name: "Riahi"
    },
    {
      user_name: "Chris_user",
      password: "password",
      first_name: "Chris",
      last_name: "Melby"
    },
    {
      user_name: "JDawg",
      password: "password",
      first_name: "Jerome",
      last_name: "Chenette"
    }
  ];

  function userGenerate(users) {
    for (var i = 0; i < users.length; i++) {
      db.User.create(users[i]);
    }
  }

  userGenerate(users);

  let subs = [
    { title: "animals" },
    { title: "funnyPics" },
    { title: "planes" }
  ];

  function subGenerate(subs) {
    for (var i = 0; i < subs.length; i++) {
      db.Sub.create(subs[i]);
    }
  }

  subGenerate(subs);

  let posts = [
    { title: "Cow Post", body: "this is the body", UserId: "1", SubId: "3" },
    { title: "plane post", body: "this is the body", UserId: "1", SubId: "2" },
    { title: "dog post", body: "this is the body", UserId: "3", SubId: "3" }
  ];

  function postGenerate(posts) {
    for (var i = 0; i < posts.length; i++) {
      db.Post.create(posts[i]);
    }
  }

  postGenerate(posts);

  let comments = [
    { PostId: "3", body: "comment body1", UserId: "3" },
    { PostId: "2", body: "comment body2", UserId: "2" },
    { PostId: "1", body: "comment body3", UserId: "3" }
  ];

  function commentGenerate(comments) {
    for (var i = 0; i < comments.length; i++) {
      db.Comment.create(comments[i]);
    }
  }

  commentGenerate(comments);

  let votes = [
    { PostId: "3", up_vote: true, UserId: "3" },
    { PostId: "2", up_vote: true, UserId: "2" },
    { PostId: "1", down_vote: true, UserId: "3" }
  ];

  function voteGenerate(votes) {
    for (var i = 0; i < votes.length; i++) {
      db.Vote.create(votes[i]);
    }
  }

  voteGenerate(votes);
};
