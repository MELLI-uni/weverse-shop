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
    app.post('/delete-cart', cartController().delete)

    app.get('/products', productController().index)
    app.get('/products/:id', productController().show)
    app.get('/addproduct', admin, productController().addProductPage)
    app.post('/addproduct', admin, productController().addProduct)

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    app.get('/checkout', cartController().checkout)

    app.get('/announcements', announcementController().index)
    app.get('/announcements/:id', announcementController().show)
    app.get('/addannouncement', admin, announcementController().addAnnouncePage)
    app.post('/addannouncement', admin, announcementController().addAnnounce)

    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
}

module.exports = initRoutes