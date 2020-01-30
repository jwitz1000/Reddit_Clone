module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { onDelete: "cascade" });
    Comment.belongsTo(models.Post, { onDelete: "cascade" });
  };

  return Comment;
};
