// var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
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
//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };

//   User.addHook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(
//       user.password,
//       bcrypt.genSaltSync(10),
//       null
//     );
//   });
//   return User;
// };
