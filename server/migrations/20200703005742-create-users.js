'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true      
    },
    firstname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    }
  }),  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
