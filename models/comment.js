module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      targetKey: "id"
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      },
      targetKey: "id"
    });
  };

  return Comment;
};
