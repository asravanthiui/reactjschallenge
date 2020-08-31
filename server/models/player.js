'use strict';
const {
  Model
} = require('sequelize');
const sequelizeSoftDelete = require('sequelize-soft-delete')

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.Location, {foreignKey: 'id', as: 'locations'})
    }
  };
  Player.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    deleted: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    }
  }, {
    defaultScope: {
      where: {
        deleted: 0
      }
    },
    sequelize,
    modelName: 'Player',
  });

  const options = {field: 'deleted', deleted: 1}
  sequelizeSoftDelete.softDelete(Player, options)

  return Player;
};