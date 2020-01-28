
// Dependencies................
let userId = localStorage.getItem("user");

// Global varibles.............
let post = $('.post')
//============================== Functionality ========================//
let renderPostFeed = () => {
    getPosts().then(results => {
    renderPosts(results);
    })
}
// Calling render functions for comments page.............
let renderCommentPage = () => {
    getPostComments().then(res => {
    renderComments(res)
  })
}
let renderPost = (id) => {
  getSinglePost(id).then(res => {
  renderSinglePost(res)
  })
}
// Render Existing Posts For Feed........................
let renderPosts = results => {
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
  // Render Single Post ........................
let renderSinglePost = res => { 
  console.log(res);
      post.empty();
      let singlePost = $('.postId')
      singlePost.empty()
      let cardbody = $("<div>").addClass("card-body")
      let title = $("<h5>").addClass("mb-0").text(res.title)
      let body = $("<p>").addClass("card-text").text(res.body)
      let btn = $("<a href='/comments'>").addClass("comment link secondary").data("id", res.id).text("Comment")
      cardbody.append(title, body, $("<hr>"), btn)
      let card = $("<div>").addClass("card mb-3").append(cardbody)
      singlePost.append(card)
  }
  // function to render components for a post
  let renderComments = res => {
  console.log(res);
      post.empty();
      let comment = $(".comment")
      comment.empty()
      res.forEach(results => {
      let commentList = $("<div>").addClass("commentList")
      let commentRow = $("<div>").addClass("row")
      let btnRow = $('<div>').addClass('row')
      let userName = $("<p>").addClass("font-weight-light").text(results.user_name)
      let userComment = $("<p>").addClass("font-weight-normal").text(results.comments)
      let replybtn = $("<a href='#'>").addClass("link secondary font-weight-bold").text("Reply")
      let awardbtn = $("<a href='#'>").addClass("link secondary font-weight-bold").text("Give Award")
      let sharebtn = $("<a href='#'>").addClass("link secondary font-weight-bold").text("Share")
      let savebtn = $("<a href='#'>").addClass("link secondary font-weight-bold").text("Save")
      commentRow.append(userName, $("<hr>"), userComment)
      btnRow.append(replybtn, awardbtn, sharebtn, savebtn)
      commentList.append(commentRow, btnRow)
      })

  }
  //=============================== API Calls =============================//

  // Get all Posts............
  let getPosts = () => {
    return $.ajax({
      url: "/api/posts",
      type: "GET"
    })
  }
//Create Post ...............
  let createPost = data => {
    return $.ajax({
      url: "/api/posts",
      type: "POST",
      data: data
    })
  }
 // Get Single Posts............
 let getSinglePost = (id) => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  })
}
// Get all Comments for a single post............
let getPostComments = (id) => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  })
}
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
//========================== Event LIsteners ===========================//

  //onclick for main post feed on reguser.html......
  $(document).on("ready", renderPostFeed())
  
  // onclick for creating a comment on post card.....
  $(document).on("click", ".comments", event => {
    event.preventDefault();
    window.localStorage.setItem("post", id);
    renderComments(a)
  });
  // onclick for each post to view that post........
  $(document).on("click", ".singlePost", event => {
    event.preventDefault();
    renderPost()
  });
 
  // onclick for user to LogOut of their account.......
  $(".logout").on("click",  event => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    window.location.reload();
  })

// Post Comment...................
  // $(".postComment").on("click", event => {
  //   event.preventDefault();
  //   window.localStorage.setItem("comment", res.post_id)
    
  // })
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
// create post............
$(document).on("click", ".create", event => {
    event.preventDefault();
    renderContent("create")
  })

// create post..........
$(document).on("click", ".createPost", event => {
    event.preventDefault()
    let postT = $("#post-title").val().trim();
    let postD = $("#post-description").val().trim();
    if (postT.length < 1) {
      $("#post-title").focus();
    } else if (postD.length < 1) {
      $("#post-description").focus();
    } else {
      let data = {
        title: postT,
        body: postD,
      }
      createPost(data).then(() => {
        renderContent("myposts")
      })
    }
  })