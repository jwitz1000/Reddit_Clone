var express = require("express");
var path = require("path");


var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require("./routes/comment-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/sub-api-routes.js")(app);
require("./routes/vote-api-routes.js")(app);

require("./routes/html-routes.js")(app, path);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    require("./seeds.js")();
  });
});

