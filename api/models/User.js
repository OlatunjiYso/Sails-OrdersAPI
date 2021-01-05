/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      defaultsTo: 'user',
    },
    orders: {
      collection: 'order',
      via: 'owner'
    }
  },
  customToJSON: function () {
    return _.omit(this, ["password"]);
  },
  beforeCreate: async function (values, proceed) {
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },

};

