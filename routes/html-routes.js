// var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app, path) {
  // send default page to all routes that are undefined
  // app.get("/*", (req, res) => {
  //   res.sendFile("/views/post.html", {
  //     root: path.join(__dirname, "../public")
  //   });
  // });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });

  app.get("/posts/:post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/singlePost.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/createPost.html"));
  });

  app.get("/subs/:sub", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/subs.html"));
  });
};
