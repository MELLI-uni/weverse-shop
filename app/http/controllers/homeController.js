const Announcement = require('../../models/announcement')
const Product = require('../../models/product')
const moment = require('moment')

function homeController() {
    return {
        async index(req, res) {
            const merch = await Product.find()
            const announcement = await Announcement.find()
            return res.render('home', { merch: merch, announcement: announcement, moment: moment })
        }
    }
}

module.exports = homeController