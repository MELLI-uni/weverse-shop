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

        addAnnouncePage(req, res) {
            res.render('admin/updateAnnouncement')
        },

        async addAnnounce(req, res) {
            const { title, content }   = req.body
            // Validate request 
            if(!title || !content) {
                req.flash('error', 'All fields are required')
                req.flash('title', title)
                req.flash('content', content)
                return res.redirect('/addannouncement')
            }

            const announcement = new Announcement({
                title,
                content
            })

            announcement.save().then((announcement) => {
                // Login
                return res.redirect('/announcements')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/addannouncement')
            })
        }
    }
}

module.exports = announcementController