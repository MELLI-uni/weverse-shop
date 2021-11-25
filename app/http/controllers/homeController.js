const Product = require('../../models/product')

function homeController() {
    return {
        async index(req, res) {
            const merch = await Product.find()
            console.log(merch)
            return res.render('home', { merch: merch })
        }
    }
}

module.exports = homeController