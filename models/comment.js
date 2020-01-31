module.exports = function(sequelize, DataTypes) {
  var moment = require("moment");

  var Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    createdAt: {
      type: DataTypes.DATE,
      //note here this is the guy that you are looking for
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "MMMM Do YYYY, h:mm a"
        );
      }
    }
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { onDelete: "cascade" });
    Comment.belongsTo(models.Post, { onDelete: "cascade" });
  };

  return Comment;
};
