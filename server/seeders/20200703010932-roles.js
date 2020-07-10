/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
      name: 'Administrator',
      description: 'Rol de administrador',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Customer',
      description: 'Rol de cliente',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
}