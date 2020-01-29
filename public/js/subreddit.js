//check if log in
if (window.localStorage.getItem("user")) {
  $("#loggedIn").css("display", "block");
  $("#notLoggedIn").css("display", "none");
} else {
  $("#notLoggedIn").css("display", "block");
  $("#loggedIn").css("display", "none");
}

//pull info from url
const splitUrl = window.location.pathname.split("/");
const subRedditName = splitUrl[2];

// Dependencies................
let userId = localStorage.getItem("user");

// Global varibles.............
let post = $(".post");
//============================== Functionality ========================//
let renderPostFeed = subRedditName => {
  getPosts(subRedditName).then(results => {
    renderPostsForSub(results.Posts);
  });
};

// Render Existing Posts For Feed........................
let renderPostsForSub = results => {
  post.empty().append($("<hr>"));
  results.forEach(result => {
    console.log(result.id);
    findPost(result.id).then(result => {
      console.log(result);
      let cardbody = $("<div>").addClass("card-body p-0");

      let row1 = $("<div>").addClass("row");
      let col1 = $("<div>").addClass("col-sm-1");
      let col2 = $("<div>").addClass("col-sm-11");

      let leftRow1 = $("<div>").addClass("row justify-content-center");
      let leftRow2 = $("<div>").addClass("row justify-content-center");
      let leftRow3 = $("<div>").addClass("row justify-content-center");

      let upVote = $("<button>")
        .addClass("voteBtn btn btn-link text-dark fas fa-long-arrow-alt-up")
        .data("postId", result.id)
        .attr("value", "up");
      let votes = $("<div>").text(result.Votes.length);
      let downVote = $("<button>")
        .addClass("voteBtn btn btn-link text-dark fas fa-long-arrow-alt-down")
        .data("postId", result.id)
        .attr("value", "down");

      leftRow1.append(upVote);
      leftRow2.append(votes);
      leftRow3.append(downVote);

      let rightRow1 = $("<div>").addClass("row");
      let rightRow2 = $("<div>").addClass("row");
      let rightRow3 = $("<div>").addClass("row");

      let posterInfo = $("<div>").html(
        `Posted in <a class = subLink id =${result.Sub.id} href='/subs/${result.Sub.title}'> ${result.Sub.title} 
          </a> by 
          ${result.User.user_name}
          at ${result.createdAt}`
      );
      rightRow1.append(posterInfo);

      let title = $("<h5>")
        .addClass("mb-0")
        .text(result.title);

      let body = $("<p>")
        .addClass("card-text text-muted")
        .text(result.body);

      rightRow2.append(title, body);

      let commentDiv = $("<div>").addClass("font-weight-bold text-secondary");
      let commentIcon = $("<i>").addClass("fas fa-comment");
      let btn = $(`<a href='/posts/${result.id}'>`)
        .addClass("comment secondary font-weight-bolder text-secondary")
        .data("id", result.id)
        .text(result.Comments.length + " Comments");
      commentDiv.append(commentIcon, btn);
      rightRow3.append(commentDiv);

      cardbody.append(rightRow1, rightRow2, rightRow3);
      col2.append(cardbody);
      col1.append(leftRow1, leftRow2, leftRow3);
      row1.append(col1, col2);

      let card = $("<div>")
        .addClass("card mb-3")
        .append(row1);
      post.append(card);
    });
  });
};

//=============================== API Calls =============================//

// Get all Posts............
let getPosts = subRedditName => {
  return $.ajax({
    url: "/api/subs/name/" + subRedditName,
    type: "GET"
  });
};
//Create Post ...............
let findPost = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};
// votes.....

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

let deleteVote = id => {
  return $.ajax({
    url: "/api/votes/" + id,
    type: "DELETE"
  });
};
//========================== Event LIsteners ===========================//

//onclick for main post feed on reguser.html......
$(document).on("ready", renderPostFeed(subRedditName));

// onclick for user to LogOut of their account.......
$(".logout").on("click", event => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
});

//========================= VOTES =================================//
//  vote functions...................
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
      changeUserVote(val, userId, postId, data);
    } else {
      createUserVote(val, userId, postId);
    }
  });
}
function changeUserVote(val, userId, postId, data) {
  // console.log(val);
  let voteData = {
    UserId: userId,
    PostId: postId
  };
  if (val === "up") {
    if (data[0].up_vote == true) {
      // voteData.up_vote = false;
      deleteVote(data[0].id);
    } else if (data[0].up_vote == null || data[0].up_vote == false) {
      voteData.up_vote = true;
      voteData.down_vote = false;

      updateVote(voteData, data[0].id);
    }
  } else if (val === "down") {
    if (data[0].down_vote == true) {
      deleteVote(data[0].id);
    } else if (data[0].down_vote == null || data[0].up_vote == false) {
      voteData.down_vote = true;
      voteData.up_vote = false;

      updateVote(voteData, data[0].id);
    }
  }
  console.log(voteData);
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
      down_vote: true,
      PostId: postId,
      UserId: userId
    };
    makeVote(voteData).then(function(data) {
      console.log(data);
    });
  }
}
