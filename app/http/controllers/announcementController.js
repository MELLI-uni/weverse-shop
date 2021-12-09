const Announcement = require('../../models/announcement')
const moment = require('moment')

//app.get('/announcement/:id', announcementController().show)

function announcementController() {
    return {
        async index(req, res) {
            const announcement = await Announcement.find().sort( { createdAt: -1 } )
            return res.render('announcements', { announcement: announcement, moment: moment })
        },

        async show(req, res) {
            const announcement = await Announcement.findById(req.params.id)
            // announcement.content = announcement.content.replace(/\n/g, "<br>");
            return res.render('singleAnnouncement', { announcement: announcement, moment: moment })
        },

        async testIndex(req, res) {
            const announcement = await Announcement.find().sort( { createdAt: -1 } )
            return res.render('admin/updateAnnouncement', { announcement: announcement, moment: moment })
        }
    }
}

module.exports = announcementController