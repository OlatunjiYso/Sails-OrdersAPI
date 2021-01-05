module.exports = {


  friendlyName: 'View mine',


  description: 'Display "Mine" page.',


  exits: {
    success: {
      statusCode: 200,
      description: 'Orders',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (input, exits, env) {

    try{
      const myId = env.req.me.sub.id;
      const myOrders = await Order.find({
        owner: myId
      });
      return exits.success({
        message: `Your orders`,
        myOrders
      });
    } catch(error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }


};
