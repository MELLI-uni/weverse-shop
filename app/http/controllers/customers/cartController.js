function cartController() {
    return {
        cart(req, res) {
            res.render('customers/cart')
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
                let cart = req.session.cart
                
            }
            return res.json({ data: 'All ok' })
        }
    }
}

module.exports = cartController