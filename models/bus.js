'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.booking, {
        foreignKey: {
          name: 'bus_id',
          type: DataTypes.CHAR(36)
        },
        as: 'bus_booking'
      })
    }
  }
  bus.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    name: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departure: DataTypes.DATEONLY,
    price: DataTypes.INTEGER,
    total_seat: DataTypes.INTEGER,
    available_seat: DataTypes.INTEGER,
    booked_seat: DataTypes.JSON,
    image_url: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'bus',
  });
  return bus;
};