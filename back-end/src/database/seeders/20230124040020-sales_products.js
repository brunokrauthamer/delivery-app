'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'sales_products',
      [
        { sale_id: 1, product_id: 2, quantity: 2 },
        { sale_id: 1, product_id: 3, quantity: 1 },
        { sale_id: 2, product_id: 1, quantity: 1 },
        { sale_id: 2, product_id: 2, quantity: 1 },
        { sale_id: 3, product_id: 1, quantity: 3 },
        { sale_id: 3, product_id: 2, quantity: 1 },
        { sale_id: 4, product_id: 1, quantity: 2 },
        { sale_id: 4, product_id: 2, quantity: 2 },
        { sale_id: 4, product_id: 3, quantity: 1 },

      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};
