const Order = require('../../../models/order')
const User = require('../../../models/user')
const moment = require('moment')

function orderController() {
    return {
        store(req, res) {
            const { addressFirst, addressSecond, city, state, zipcode, phone, cardnumber, cardname, carddate } = req.body
            if( !addressFirst || !city || !state || !zipcode || !phone ) {
                req.flash('error', 'All fields are required')
                req.flash('addressFirst', addressFirst)
                return res.redirect('/checkout')
            }

            if( !cardnumber || !cardname || !carddate ) {
                req.flash('error', 'All fields are required')
                return res.redirect('/checkout')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                address: {
                    addressFirst,
                    addressSecond,
                    city,
                    state,
                    zipcode,
                    phone
                },
                payment: {
                    cardnumber,
                    cardname, 
                    carddate
                },
            })

            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    req.flash('success', 'Order placed successfully')
                    delete req.session.cart

                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    return res.redirect('/customer/orders')
                }) 
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/checkout')
            })
        },

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            const user = await User.findById(req.params.id)
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', { orders: orders, user: user, moment: moment })
        },

        async show(req, res) {
            const order = await Order.findById(req.params.id)

            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        }
    }
}

module.exports = orderController