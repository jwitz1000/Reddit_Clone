module.exports = function(sequelize, DataTypes) {
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