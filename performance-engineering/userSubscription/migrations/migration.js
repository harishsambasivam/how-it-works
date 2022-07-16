'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
  },

  async down (queryInterface, Sequelize) {
     queryInterface.sequelize.query('DROP EXTENSION pgcrypto;')
  }
};
