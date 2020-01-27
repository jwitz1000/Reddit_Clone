module.exports = function() {
  var db = require("./models");

  let users = [
    {
      user_name: "A",
      password: "AA",
      first_name: "AAA",
      last_name: "AAAA"
    },
    { user_name: "B", password: "BB", first_name: "BBB", last_name: "BBB" },
    { user_name: "C", password: "CC", first_name: "CCC", last_name: "CCCC" }
  ];

  function userGenerate(users) {
    for (var i = 0; i < users.length; i++) {
      db.User.create(users[i]);
    }
  }

  userGenerate(users);

  let subs = [{ title: "ffff" }, { title: "BBbbb" }, { title: "CCcccc" }];

  function subGenerate(subs) {
    for (var i = 0; i < subs.length; i++) {
      db.Sub.create(subs[i]);
    }
  }

  subGenerate(subs);

  let posts = [
    { title: "Aaaa", body: "AAaaaa", UserId: "1", SubId: "3" },
    { title: "Bbbb", body: "BBbbb", UserId: "1", SubId: "2" },
    { title: "Cccc", body: "CCcccc", UserId: "3", SubId: "3" }
  ];

  function postGenerate(posts) {
    for (var i = 0; i < posts.length; i++) {
      db.Post.create(posts[i]);
    }
  }

  postGenerate(posts);

  let comments = [
    { PostId: "3", body: "AAaaaa", UserId: "3" },
    { PostId: "2", body: "BBbbb", UserId: "2" },
    { PostId: "1", body: "CCcccc", UserId: "3" }
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
