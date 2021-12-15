const order = require("../../../models/order")
const Order = require('../../../models/order')
const User = require('../../../models/user')
const moment = require('moment')

function orderController() {
    return {
        index(req, res) {
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
               if(req.xhr) {
                   return res.json(orders)
               } else {
                return res.render('admin/orders')
               }
           })
        },

        async show(req, res) {
            const order = await Order.findById(req.params.id)
            const user = await User.findById(order.customerId)
            return res.render('admin/singleOrder', { order, user: user, moment })
        }
    }
}

module.exports = orderController