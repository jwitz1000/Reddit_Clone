// var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: { type: DataTypes.STRING, allowNull: true },
    last_name: { type: DataTypes.STRING, allowNull: true }
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    User.belongsToMany(models.Sub, {
      through: "UserSub"
    });
  };
  return User;
};