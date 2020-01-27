var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");
var path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/comment-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/html-routes.js")(app, path);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    // require("./seeds.js")()
    console.log("App listening on PORT " + PORT);
  });
});


