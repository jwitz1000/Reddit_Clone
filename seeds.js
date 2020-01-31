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
    { title: "randomfacts" },
    { title: "jokes" },
    { title: "planes" }
  ];

  function subGenerate(subs) {
    for (var i = 0; i < subs.length; i++) {
      db.Sub.create(subs[i]);
    }
  }

  subGenerate(subs);

  let posts = [
    {
      title: "Sun",
      body: "The sun is not technically on fire",
      UserId: "1",
      SubId: "1"
    },
    {
      title: "Knock Knock",
      body: "....is anyone gonna get that?",
      UserId: "1",
      SubId: "3"
    },
    {
      title: "Flying solo",
      body: "I find it very frightening",
      UserId: "3",
      SubId: "2"
    }
  ];

  function postGenerate(posts) {
    for (var i = 0; i < posts.length; i++) {
      db.Post.create(posts[i]);
    }
  }

  postGenerate(posts);

  let comments = [
    { PostId: "3", body: "Me too buddy", UserId: "3" },
    { PostId: "2", body: "Who's there?", UserId: "2" },
    { PostId: "1", body: "Then how does it warm us?", UserId: "3" }
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
