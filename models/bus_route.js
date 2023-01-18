'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bus_route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.bus, {
        foreignKey: 'bus_id'
      })
    }
  }
  bus_route.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departure: DataTypes.DATEONLY,
    total_seat: DataTypes.INTEGER,
    class: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bus_route',
  });
  return bus_route;
};