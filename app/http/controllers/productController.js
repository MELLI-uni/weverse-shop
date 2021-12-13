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
        },

        addProductPage(req, res) {
            res.render('admin/addProduct')
        },

        async addProduct(req, res) {
            const { name, image, price, description, information }   = req.body
            // Validate request 
            if(!name || !image || !price || !description ) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('image', image)
                req.flash('price', price)
                req.flash('description', description)
                req.flash('information', information)
                return res.redirect('/addProduct')
            }

            const product = new Product({
                name,
                image,
                price,
                description,
                information
            })

            product.save().then((product) => {
                // Login
                return res.redirect('/products')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/addproduct')
            })
        }
    }
}

module.exports = productController