module.exports = {


  friendlyName: 'Add new',


  description: 'Add new Order',


  inputs: {
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
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'Order placed',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits, env) {

    try {
      const { description, origin, destination, delivered } = inputs;
      const owner = env.req.me.sub.id;
      const order = await Order.create({ description, origin, destination, delivered, owner })
      .fetch();
      return exits.success({
        message: `Your order has been placed successfully`,
        order
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
    return;

  }


};
