const Announcement = require('../../models/announcement')
const moment = require('moment')

//app.get('/announcement/:id', announcementController().show)

function announcementController() {
    return {
        async index(req, res) {
            const announcement = await Announcement.find()
            return res.render('home', { announcement: announcement, moment: moment })
        },

        async show(req, res) {
            const announcement = await Announcement.findById(req.params.id)
            return res.render('singleAnnouncement', { announcement: announcement })
        }
    }
}

module.exports = announcementController