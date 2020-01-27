let userId = localStorage.getItem("user");

//============================== Functionality ========================//
let renderPostFeed = () => {
  getPosts().then(results => {
    renderPosts(results);
  });
};

// BOLD Render Existing Posts ........................
let renderPosts = results => {
  //come back and do a .then() for the comments
  console.log(results);
  let post = $(".post");
  post.empty().append($("<hr>"));
  results.forEach(result => {
    let cardbody = $("<div>").addClass("card-body");

    let row1 = $("<div>").addClass("row");
    let col1 = $("<div>").addClass("col-sm-4");
    let col2 = $("<div>").addClass("col-sm-8");

    let leftRow1 = $("<div>").addClass("row");
    let leftRow2 = $("<div>").addClass("row");
    let leftRow3 = $("<div>").addClass("row");

    let upVote = $("<button>")
      .addClass("voteBtn btn btn-primary ")
      .data("postId", result.id)
      .attr("value", "up")
      .text("upvote");
    let votes = $("<div>").text(result.Votes.length + "votes");
    let downVote = $("<button>").addClass("voteBtn btn btn-primary ");

    // voteOnPost(results.id).then(function(data) {
    //   console.log(data);
    //   votes.text(data.length + " votes");
    // });

    leftRow1.append(upVote);
    leftRow2.append(votes);
    leftRow3.append(downVote);

    let title = $("<h5>")
      .addClass("mb-0")
      .text(result.title);

    let body = $("<p>")
      .addClass("card-text")
      .text(result.body);

    let btn = $("<a href='/comments'>")
      .addClass("comment link secondary")
      .data("id", result.id)
      .text(result.Comments.length + " Comments");

    cardbody.append(title, body, $("<hr>"), btn);
    col2.append(cardbody);
    col1.append(leftRow1, leftRow2, leftRow3);
    row1.append(col1, col2);

    let card = $("<div>")
      .addClass("card mb-3")
      .append(row1);
    post.append(card);
  });
};
// function to render components for the side nav display
let renderComments = () => {
  let userComment = $(".comment");
  let userN = $("<p>")
    .addClass("text-left")
    .text("Comment as" + result.user_name);
  let input = $("<input>")
    .addClass("nav-link btn events")
    .text("What are your thoughts?");
  let btn = $("<button>")
    .addClass("nav-link btn myevents")
    .text("Post");
  let commentCol = $("<div>")
    .addClass("col-6")
    .append(userN, input, btn);
  let commentRow = $("<div>")
    .addClass("row")
    .append(commentCol);
  userComment.empty().append(commentRow);
};

//=============================== API Calls =============================//

// Posts............
let getPosts = () => {
  return $.ajax({
    url: "/api/posts",
    type: "GET"
  });
};

let createPost = data => {
  return $.ajax({
    url: "/api/posts",
    type: "POST",
    data: data
  });
};
// Comments............
let commentOnPost = data => {
  return $.ajax({
    url: "/api/comments/",
    type: "POST",
    data: data
  });
};

// BOLD votes.....
let voteOnPost = id => {
  return $.ajax({
    url: "/api/votes/post/" + id,
    type: "GET"
  });
};

let checkIfUserVoted = (postId, userId) => {
  return $.ajax({
    url: "/api/votes/post/" + postId + "/user/" + userId,
    type: "GET"
  });
};

let makeVote = data => {
  return $.ajax({
    url: "/api/votes",
    type: "POST",
    data: data
  });
};

let updateVote = (data, id) => {
  return $.ajax({
    url: "/api/votes/" + id,
    type: "PUT",
    data: data
  });
};

//========================== Event LIsteners ===========================//
$(document).on("ready", renderPostFeed());

// LogOut...................
$(".logout").on("click", event => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
});
// Comment...................
$(".comment").on("click", event => {
  event.preventDefault();
  renderComments();
});
// Post Comment...................
$(".postComment").on("click", event => {
  event.preventDefault();
  window.localStorage.setItem("comment", res.post_id);
});

// create post............
$(document).on("click", ".create", event => {
  event.preventDefault();
  renderContent("create");
});

// create post
$(document).on("click", ".createPost", event => {
  event.preventDefault();
  let postT = $("#post-title")
    .val()
    .trim();
  let postD = $("#post-description")
    .val()
    .trim();
  if (postT.length < 1) {
    $("#post-title").focus();
  } else if (postD.length < 1) {
    $("#post-description").focus();
  } else {
    let data = {
      title: postT,
      body: postD
    };
    createPost(data).then(() => {
      renderContent("myposts");
    });
  }
});

// BOLD vote...................
$(document).on("click", ".voteBtn", event => {
  event.preventDefault();

  let val = event.target.value;
  let postId = $(event.target).data("postId");
  let theUserId = userId;
  console.log(val, postId, theUserId);

  checkUserVoter(val, theUserId, postId);
});

function checkUserVoter(val, userId, postId) {
  checkIfUserVoted(postId, userId).then(function(data) {
    console.log(data);
    if (data.length != 0) {
      changeUserVote(val, userId, postId);
    } else {
      createUserVote(val, userId, postId);
    }
  });
}
function changeUserVote(val, userId, postId) {
  console.log("yolo");
}

function createUserVote(val, userId, postId) {
  if (val === "up") {
    let voteData = {
      up_vote: true,
      UserId: userId,
      PostId: postId
    };
    makeVote(voteData).then(function(data) {
      console.log(data);
    });
  } else if (val === "down") {
    let voteData = {
      up_down: true,
      PostId: postId,
      UserId: userId
    };
    makeVote(voteData).then(function(data) {
      console.log(data);
    });
  }
}
