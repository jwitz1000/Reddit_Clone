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

//============================== Functionality ========================//

// Calling render functions for comments page.............
let renderCommentPage = id => {
  getPostComments(id).then(res => {
    renderComments(res);
  });
};
// Render single post..............
let renderPost = id => {
  getSinglePost(id).then(res => {
    renderSinglePost(res);
  });
};

// function to render components for a post
let renderComments = res => {
  console.log(res);
  post.empty();
  let comment = $(".comment");
  comment.empty();
  res.forEach(results => {
    let commentList = $("<div>").addClass("commentList");
    let commentRow = $("<div>").addClass("row");
    let btnRow = $("<div>").addClass("row");
    let userName = $("<p>")
      .addClass("font-weight-light")
      .text(results.user_name);
    let userComment = $("<p>")
      .addClass("font-weight-normal")
      .text(results.comments);
    let replybtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Reply");
    let awardbtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Give Award");
    let sharebtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Share");
    let savebtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Save");
    commentRow.append(userName, $("<hr>"), userComment);
    btnRow.append(replybtn, awardbtn, sharebtn, savebtn);
    commentList.append(commentRow, btnRow);
  });
};
// Render Single Post ........................
let renderSinglePost = res => {
  console.log(res);
  post.empty();
  let singlePost = $(".postId");
  singlePost.empty();
  let cardbody = $("<div>").addClass("card-body");
  let title = $("<h5>")
    .addClass("mb-0")
    .text(res.title);
  let body = $("<p>")
    .addClass("card-text")
    .text(res.body);
  let btn = $("<button>")
    .addClass("comment link secondary")
    .data("id", res.id)
    .text("Comment");
  cardbody.append(title, body, $("<hr>"), btn);
  let card = $("<div>")
    .addClass("card mb-3")
    .append(cardbody);
  singlePost.append(card);
};
//=============================== API Calls =============================//

// Get Single Posts............
let getSinglePost = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};
// Get all Comments for a single post............
let getPostComments = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};

//========================== Event LIsteners ===========================//
// onclick for creating a comment on post card.....
$(document).on("click", ".comment", event => {
  event.preventDefault();
  var id = $(event.target).data("id");
  // window.localStorage.setItem("post", id);
  renderCommentPage(id);
});
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
$(".postComment").on("click", event => {
  event.preventDefault();
  window.localStorage.setItem("comment", res.post_id);
});
