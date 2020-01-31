//check if log in
if (window.localStorage.getItem("user")) {
  $("#loggedIn").css("display", "block");
  $("#notLoggedIn").css("display", "none");
} else {
  $("#notLoggedIn").css("display", "block");
  $("#loggedIn").css("display", "none");
}
// Dependencies................
let userId = localStorage.getItem("user");
// Store post id in local....................
const splitUrl = window.location.pathname.split("/");
const singlePostId = splitUrl[2];

//============================== Functions ========================//
// Calling render functions for comments page.............
let renderCommentPage = singlePostId => {
  getPostComments(singlePostId).then(res => {
    // console.log(res)
    renderComments(res.Comments);
    renderSinglePost(res);
  });
};
// Render Single Post ........................
let renderSinglePost = res => {
  console.log(res);
  let singlePost = $(".postId");
  singlePost.empty();
  let postRow = $("<div>").addClass("row justify-content-center");
  let postCol = $("<div>").addClass("col-md-8");
  let postCard = $("<div>").addClass("card");
  let cardbody = $("<div>").addClass("card-body");
  let title = $("<div>")
    .addClass("card-title")
    .text(res.title)
    .css("font-weight", "bold");
  let body = $("<p>")
    .addClass("card-text")
    .text(res.body);
  let theUser = $("<div>");

  $.ajax({
    url: "/api/users/" + res.User.id,
    type: "GET"
  }).then(res => {
    theUser.text("Posted by " + res.user_name);
  });

  cardbody.append(title, body, $("<hr>"), theUser);
  postCard.append(cardbody);
  postCol.append(postCard);
  postRow.append(postCol);
  singlePost.append(postRow);
};
// function to render all comments for a post........
let renderComments = res => {
  // console.log(res);
  let comment = $(".comment");
  comment.empty();
  res.forEach(results => {
    console.log(results);
    let mainRow = $("<div>").addClass("row justify-content-center mt-2 mb-2");
    let commentRow = $("<div>").addClass("col-8");
    let commentList = $("<div>").addClass("commentList card");
    let userName = $("<p>").addClass("font-weight-light");

    getUser(results.UserId).then(res => {
      console.log(res);
      userName.text("Posted by: " + res.user_name);
    });
    let dateCreated = $("<p>")
      .addClass("font-weight-light")
      .text(results.createdAt);
    let userComment = $("<p>")
      .addClass("font-weight-normal float-left")
      .text(results.body);
    commentRow.append(userName, dateCreated, $("<hr>"), userComment);
    commentList.append(commentRow);
    let card = $("<div>")
      .addClass("col-8")
      .append(commentList);
    mainRow.append(card);
    comment.append(mainRow);
  });
};
//=============================== API Calls =============================//
// Get all Comments for a single post............
let getPostComments = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};
let getUser = id => {
  return $.ajax({
    url: "/api/users/" + id,
    type: "GET"
  });
};
//========================== Event LIsteners ===========================//
$(document).on("ready", renderCommentPage(singlePostId));
// onclick for each post to view that post........
$(document).on("click", ".singlePost", event => {
  event.preventDefault();
  renderPost();
});
// onclick for user to LogOut of their account.......
$(".logout").on("click", event => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
});
// Post Comment...................
// $(".postComment").on("click", event => {
//   event.preventDefault();
//   window.localStorage.setItem("comment", res.post_id);
// });

let createCommentDiv = $("#createComment");
// create post..........
$(document).on("click", ".createCommentBtn", event => {
  event.preventDefault();

  let commentD = $("#comment-description").val();

  let data = {
    UserId: userId,
    PostId: singlePostId,
    body: commentD
  };
  console.log(data);

  $.ajax({
    url: "/api/comments",
    type: "POST",
    data: data
  }).then(res => {
    console.log(res);
    document.location.reload();
  });
});
