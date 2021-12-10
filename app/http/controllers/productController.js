const Product = require('../../models/product')
const moment = require('moment')

function productController() {
    return {
        async index(req, res) {
            const product = await Product.find()
            return res.render('products', { product: product })
        },

        async show(req, res) {
            const product = await Product.findById(req.params.id)
            console.log(product)
            return res.render('singleProduct', { product: product })
        }
    }
}

module.exports = productController