/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    "GET /": "home/index",
    'POST /users/register': 'user/register',
    'POST /users/login': 'user/login',

    'GET /orders/mine': 'orders/view-mine',
    'GET /orders/all': 'orders/view-all',
    'POST /orders/new': 'orders/add-new',
    'PATCH /orders/confirmation/:order_id': 'orders/confirm',


};
