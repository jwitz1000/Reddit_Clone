module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    up_vote: DataTypes.BOOLEAN,
    down_vote: DataTypes.BOOLEAN
  });

  Vote.associate = function(models) {
    Vote.belongsTo(models.Post, {
      onDelete: "cascade"
    });
    Vote.belongsTo(models.User, {
      onDelete: "cascade"
    });
  };
  return Vote;
};
