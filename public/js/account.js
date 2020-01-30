// Dependencies................
let userIdForButtons = localStorage.getItem("user");

// setting name in nav bar top right
if (userIdForButtons) {
  $.ajax({
    url: "/api/users/" + userIdForButtons,
    type: "GET"
  }).then(res => {
    let userButton = $("#dropdownMenuButton").text(res.user_name);
  });
}

let post = $(".post");

//listener for signup button
$("#signUp").on("click", event => {
  event.preventDefault();

  let firstName = $("#recipient-firstName");
  let lastName = $("#recipient-lastName");
  let userName = $("#recipient-UserName");
  let passWord = $("#recipient-password");

  if (firstName.val().trim().length < 1) {
    firstName.focus();
  } else if (lastName.val().trim().length < 1) {
    lastName.focus();
  } else if (userName.val().trim().length < 1) {
    userName.focus();
  } else if (passWord.val().trim().length < 1) {
    passWord.focus();
  }

  let user = {
    user_name: userName.val().trim(),
    password: passWord.val().trim(),
    first_name: firstName.val().trim(),
    last_name: lastName.val().trim()
  };

  //validation that user name doesnt exist
  $.ajax({
    url: "/api/users/name/" + user.user_name,
    type: "GET"
  }).then(res => {
    console.log(res);
    if (res) {
      console.log("account already exists");
    } else {
      $.ajax({
        url: "/api/users",
        type: "POST",
        data: user
      }).then(res => {
        console.log(res);
        if (res) {
          // user successfully created account, so do the following
          window.localStorage.setItem("user", res.id);
          $("#exampleModal2").empty();
          window.location.reload();
        } else {
          // user failed to registered, so do the following
          console.log("registration failed");
          $("#recipient-UserName").val("");
        }
      });
    }
  });
});

// event listener for login button
$(document).on("click", "#login", event => {
  event.preventDefault();
  let userName = $("#recipient-UserName1");
  let passWord = $("#recipient-password1");
  if (userName.val().trim().length < 1) {
    userName.focus();
  } else if (passWord.val().trim().length < 1) {
    passWord.focus();
  } else {
    // set user data to send to server
    let user = {
      // BOLD changed to unique id
      user_name: $("#recipient-UserName1").val(),
      password: $("#recipient-password1").val()
    };
    console.log(user);
    // make a Get request to server for validating user credentials
    $.ajax({
      url: "/api/users/" + user.user_name + "/pass/" + user.password,
      type: "Get"
    }).then(res => {
      if (res) {
        // user validated, so do the following
        console.log("logged in");
        window.localStorage.setItem("user", res.id);
        $("#exampleModal1").empty();
        window.location.reload();
      } else {
        // server validation failed, so do the following
        console.log("login failed");
        $("#recipient-password").val("");
      }
    });
  }
});

// event listenener for logout
$(document).on("click", "#logOut", event => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
});

//event listener for home button
$(document).on("click", ".homeBtn", event => {
  window.location.href = "/";
});

// ARMAN
//event listener for search button
$(document).on("click", "#searchBtn", event => {
  event.preventDefault();

  let searchSub = $("#searchSub").val();
  console.log(searchSub);
  $.ajax({
    url: "/api/subs/name/" + searchSub,
    type: "GET"
  }).then(result => {
    if (result) {
      post.empty().append($("<hr>"));
      let subLink = $("<div>").html(
        `Click to go to <a class = subLink id =${result.id} href='/subs/${result.title}'>${result.title} 
        </a>`
      );
      post.append(subLink);
    }
  });
});
// ARMAN

// allowing user to create subreddit
$(document).on("click", "#createSub", event => {
  let potentialSubName = $("#potentialSubName").val();
  console.log(potentialSubName);
  let data = {
    title: potentialSubName
  };
  //check if sub exists
  $.ajax({
    url: "/api/subs/name/" + potentialSubName,
    type: "GET"
  }).then(result => {
    if (result) {
      //update this to display error to user
      console.log("already exists");
    } else {
      //create sub
      $.ajax({
        url: "/api/subs",
        type: "POST",
        data: data
      }).then(result => {
        console.log(result);
        console.log("success");
        window.location.href = "/";
      });
    }
  });
});
