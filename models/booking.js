'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.CHAR(36)
        }
      })
      
      this.belongsTo(models.bus, {
        foreignKey: 'bus_id'
      })
    }
  }
  booking.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    travel_name: DataTypes.STRING,
    total_seat: DataTypes.INTEGER,
    seat_number: DataTypes.JSON,
    total_price: DataTypes.INTEGER,
    expired_date: DataTypes.DATE,
    status: DataTypes.STRING,
    /* user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bus_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      references: {
        model: 'buses',
        key: 'id'
      }
    }, */
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};