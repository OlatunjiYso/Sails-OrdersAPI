module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm orders.',


  inputs: {


  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Order confirmed',
    },
    unauthorized: {
      statusCode: 401,
      description: 'You are not authorized to confirm this order',
    },
    notFound: {
      statusCode: 401,
      description: 'You are not authorized to confirm this order',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits, env) {

    try {
      const req = env.req;
      const myId = req.me.sub.id;
      const orderId = req.params.order_id;

      const order = await Order.findOne({ id: orderId });
      if (!order) {
        return exits.notFound({
          message: 'found no order with specified id'
        })
      }
      if (order.owner !== myId) {
        return exits.unauthorized({
          message: 'you are not permitted to confirm this order'
        })
      }
      const updatedOrder = await Order.updateOne({ id: orderId })
        .set({
          delivered: true
        });

      return exits.success({
        message: 'Marked as delivered!',
        updatedOrder
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }


};
