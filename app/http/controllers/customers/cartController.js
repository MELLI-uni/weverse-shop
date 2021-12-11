const { json } = require("express")
const User = require('../../../models/user')

function cartController() {
    return {
        cart(req, res) {
            res.render('customers/cart')
        },

        async checkout(req, res) {
            const user = await User.findById(req.user._id)
            res.render('customers/checkout', { user: user })
        },

        update(req, res) {
            // let cart = {
            //     items: {
            //         merchId: { item: merchObject, qty: 0},
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty })
        },

        delete(req, res) {
            let cart = req.session.cart
            let item = req.body.item._id

            cart.totalQty = cart.totalQty - req.body.qty
            cart.totalPrice = cart.totalPrice - (req.body.qty * req.body.item.price)
            delete cart.items[item]

            if(Object.keys(cart.items).length === 0){
                delete req.session.cart
            }

            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController