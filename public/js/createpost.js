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
// let post = $(".post");

//load subs
$(document).on("ready", renderSubs());

//render subs
function renderSubs() {
  let optionList = $("#subId");
  $.ajax({
    url: "/api/subs",
    type: "GET"
  }).then(res => {
    console.log(res);
    res.forEach(result => {
      let option = $("<option>")
        .text(result.title)
        .data("id", result.id);
      optionList.append(option);
    });
  });
}

// create post..........
$(document).on("click", ".createPost", event => {
  event.preventDefault();

  let subTitle = $("#subId").val();

  $.ajax({
    url: "/api/subs/name/" + subTitle,
    type: "GET"
  }).then(res => {
    let subId = res.id;
    let postT = $("#post-title")
      .val()
      .trim();
    let postD = $("#post-description")
      .val()
      .trim();

    let data = {
      UserId: userId,
      SubId: subId,
      title: postT,
      body: postD
    };
    console.log(data);

    $.ajax({
      url: "/api/posts",
      type: "POST",
      data: data
    }).then(res => {
      console.log(res);
      // add redirect to post
      window.location.href = "/posts/" + res.id;
    });
  });
});
