const Area = require('../models/areaModel')


exports.list = (req, res) => {
    Area.find()
    .exec((err, areas) => {
        if (err) console.log(err)
        res.render('area', { areas })
    })
}

exports.create_get = (req, res) => {
    res.render('area/create')
}

exports.create_post = (req, res) => {
    let area = new Area()
    area.name = req.body.name
    try {
		area.save()
		res.redirect('/area')
	} catch (err) {
		console.log(err)
	}
}

exports.update_get = (req, res) => {
    Area.findById(req.params.id)
    .exec((err, area) => {
        if (err) console.log(err)
        res.render('area/update', { area })
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