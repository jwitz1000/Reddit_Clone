module.exports = function(sequelize, DataTypes) {
  var Sub = sequelize.define("Sub", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Sub.associate = function(models) {
    Sub.belongsToMany(models.User, {
      through: "UserSub"
    });
    Sub.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Sub;
};