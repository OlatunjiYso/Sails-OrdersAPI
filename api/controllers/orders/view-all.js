module.exports = {


  friendlyName: 'View All',


  description: 'Display all orders.',


  exits: {
    success: {
      statusCode: 200,
      description: 'All Orders',
    },
    unauthorized: {
      statusCode: 401,
      description: 'You are not authorized to view all orders',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (input, exits, env) {

    try{
      const myRole = env.req.me.sub.role;
      if(myRole !== 'Administrator') {
        return exits.unauthorized({
          message: `You are not allowed to view all orders`,
        });
      }
      const allOrders = await Order.find().populate('owner');
      return exits.success({
        message: `All orders`,
        allOrders
      });
    } catch(error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }


};
