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
        foreignKey: 'user_id'
      })
      
      this.belongsTo(models.bus, {
        foreignKey: 'bus_id'
      })

      this.hasMany(models.booking_detail, {
        foreignKey: {
          name: 'booking_id',
          type: DataTypes.CHAR(36)
        }
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
    bus_name: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departure: DataTypes.DATEONLY,
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