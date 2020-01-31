module.exports = function(sequelize, DataTypes) {
  var moment = require("moment");
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
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

  Post.associate = function(models) {
    Post.belongsTo(models.User, { onDelete: "cascade" });
    Post.belongsTo(models.Sub, { onDelete: "cascade" });
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    Post.hasMany(models.Vote, {
      onDelete: "cascade"
    });
  };

  return Post;
};
