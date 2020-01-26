
let userId = localStorage.getItem("user");


// render Content based on argument
let renderPosts = content => {
    switch (content) {
      case "myevents":
        // get events made by user from server
        getPostsByUserId(userId).then(events => {
          // then render the components to display on page
          renderMyEvents(events);
        })
        break;
      case "create":
        // render create event components to display on page
        renderCreatePage();
        break;
      case "attending":
        // get events that user is attending from server
        getEventsAttending(userId).then(events => {
          // then render the components to display on a page
          renderEventsAttending(events);
        })
        break;
      default:
        // get all events from server
        getEventInfo().then(events => {
          // then render the components to display on a page
          renderEvents(events);
        })
    }
  }