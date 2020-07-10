'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true      
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Roles')
};
