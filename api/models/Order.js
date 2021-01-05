/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "orders",
  attributes: {
    description: {
      type: 'string',
      required: true,
    },
    origin: {
      type: 'string',
      required: true,
    },
    destination: {
      type: 'string',
      required: true,
    },
    delivered: {
      type: 'boolean',
      defaultsTo: false,
    }, 
    owner: {
      model: 'user'
    },
  },

};

