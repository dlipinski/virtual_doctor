const Area = require('../models/areaModel')


exports.list = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('area', { areas, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.create_get = (req, res) => {
    res.render('area/create', { username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
}

exports.create_post = (req, res) => {
    let area = new Area()
    area.name = req.body.name
    area.save((err) => {
        if (err) console.log(err)
        res.redirect('/area')
    })
}

exports.update_get = (req, res) => {
    Area.findById(req.params.id)
    .exec((err, area) => {
        if (err) console.log(err)
        res.render('area/update', { area, username: req.user ? req.user.username : undefined, role: req.user ? req.user.role : undefined })
    })
}

exports.update_post = (req, res) => {
    Area.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, area) => {
                if (err) console.log(err)
                res.redirect('/area')
            }
    )
}

exports.remove = (req, res) => {
    Area.findOneAndRemove(
        { _id: req.params.id },
        (err, area) => {
            if (err) console.log(err)
            res.redirect(`/area`)
        }
    )       
}