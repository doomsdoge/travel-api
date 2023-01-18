'use strict';
const {
  UUIDV4
} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.DATEONLY
      },
      price: {
        type: Sequelize.INTEGER
      },
      total_seat: {
        type: Sequelize.INTEGER
      },
      available_seat: {
        type: Sequelize.INTEGER
      },
      booked_seat: {
        type: Sequelize.JSON
      },
      image_url: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buses');
  }
};