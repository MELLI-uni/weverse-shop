const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const announcementController = require('../app/http/controllers/announcementController')

const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {

    app.get('/', homeController().index)
    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)
    app.post('/update-cart', cartController().update)

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)

    app.get('/announcements', announcementController().show)

    app.get('/admin/orders', adminOrderController().index)
}

module.exports = initRoutes