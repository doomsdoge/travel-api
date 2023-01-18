'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.booking, {
        foreignKey: 'user_id'
      })
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate :{
        isEmail: {
          msg: 'Email not valid'
        }
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      
      /* isAlphanumeric: {
        args: true,
        msg: "Password must contain alphabet and numbers only"
      },
      len: {
        args: [6,10],
        msg: 'Password must between 6-10 character long'
      } */
      
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};