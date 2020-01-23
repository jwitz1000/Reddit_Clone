var db = require("../models");

let users = [
  { user_name: "A", password: "AA", first_name: "AAA", last_name: "AAAA" },
  { user_name: "B", password: "BB", first_name: "BBB", last_name: "BBB" },
  { user_name: "C", password: "CC", first_name: "CCC", last_name: "CCCC" }
];

function userGenerate(users) {
  for (var i = 0; i < users.length; i++) {
    db.User.create(users[i]);
  }
}

userGenerate(users);

let posts = [
  { title: "Aaaa", body: "AAaaaa", UserId: "2" },
  { title: "Bbbb", body: "BBbbb", UserId: "2" },
  { title: "Cccc", body: "CCcccc", UserId: "3" }
];

function postGenerate(posts) {
  for (var i = 0; i < posts.length; i++) {
    db.Post.create(posts[i]);
  }
}

postGenerate(posts);

let comments = [
  { PostId: "1", body: "AAaaaa", UserId: "2" },
  { PostId: "3", body: "BBbbb", UserId: "2" },
  { PostId: "3", body: "CCcccc", UserId: "3" }
];

function commentGenerate(comments) {
  for (var i = 0; i < comments.length; i++) {
    db.Comment.create(comments[i]);
  }
}

commentGenerate(comments);
