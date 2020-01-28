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

// Global varibles.............
let post = $(".post");

let hello = $("<div>").text("hello");
post.append(hello);
