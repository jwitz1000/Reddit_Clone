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

// create post............
$(document).on("click", ".create", event => {
  event.preventDefault();
  renderContent("create");
});

// create post..........
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
