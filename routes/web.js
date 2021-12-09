const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const productController = require('../app/http/controllers/productController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
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

    app.get('/products', productController().index)
    app.get('/products/:id', productController().show)

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    app.get('/announcements', announcementController().index)
    app.get('/announcements/:id', announcementController().show)
    app.get('/announcementsagain', announcementController().testIndex)

    app.get('/admin/orders', adminOrderController().index)
    app.post('/admin/order/status', statusController().update)
}

module.exports = initRoutes