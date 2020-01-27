
let userId = localStorage.getItem("user");


//============================== Functionality ========================//
let renderPostFeed = () => {
    getPosts().then(results => {
    renderPosts(results);
    })
}


  // Render Existing Posts ........................
  let renderPosts = results => { //come back and do a .then() for the comments
   console.log(results);
    let post = $('.post')
    post.empty().append($("<h4>").text("Recent Posts"), $("<hr>"))
    results.forEach(result => {
      let cardbody = $("<div>").addClass("card-body")
      let title = $("<h5>").addClass("mb-0").text(result.title)
      let body = $("<p>").addClass("card-text").text(result.body)
      let btn = $("<a href='/comments'>").addClass("comment link secondary").data("id", result.id).text("Comment")
      cardbody.append(title, body, $("<hr>"), btn)
      let card = $("<div>").addClass("card mb-3").append(cardbody)
      post.append(card)
    });
  }
// function to render components for the side nav display
let renderComments = () => {
    let userComment = $(".comment");
    let userN = $("<p>").addClass("text-left").text("Comment as" + result.user_name);
    let input = $("<input>").addClass("nav-link btn events").text("What are your thoughts?");
    let btn = $("<button>").addClass("nav-link btn myevents").text("Post")
    let commentCol = $("<div>").addClass("col-6").append(userN, input, btn)
    let commentRow = $("<div>").addClass("row").append(commentCol)
    userComment.empty().append(commentRow);
  }
  //=============================== API Calls =============================//

  // Posts............
  let getPosts = () => {
    return $.ajax({
      url: "/api/posts",
      type: "GET"
    })
  }

  let createPost = data => {
    return $.ajax({
      url: "/api/posts",
      type: "POST",
      data: data
    })
  }
 // Comments............
  let commentOnPost = data => {
    return $.ajax({
      url: "/api/comments/",
      type: "POST",
      data: data
    })
  }


  //========================== Event LIsteners ===========================//
  $(document).on("ready", renderPostFeed())

// LogOut...................
  $(".logout").on("click", event => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    window.location.reload();
  })
// Comment...................
  $(".comment").on("click", event => {
    event.preventDefault();
    renderComments();
    
  })
// Post Comment...................
  $(".postComment").on("click", event => {
    event.preventDefault();
    window.localStorage.setItem("comment", res.post_id)
    
  })

// create post............
$(document).on("click", ".create", event => {
    event.preventDefault();
    renderContent("create")
  })

// create post
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