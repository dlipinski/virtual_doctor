const Spec = require('../models/specModel')


exports.list = (req, res) => {
    Spec.find()
        .exec((err, specs) => {
            if (err) console.log(err)
            res.render('spec', { specs })
        })
}

exports.create_get = (req, res) => {
    res.render('spec/create')
}

exports.create_post = (req, res) => {
    let spec = new Spec()
    spec.name = req.body.name
	spec.save((err) => {
        if (err) console.log(err)
        res.redirect('/spec')
    })	
}

exports.update_get = (req, res) => {
    Spec.findById(req.params.id)
    .exec((err, spec) => {
        if (err) console.log(err)
        res.render('spec/update', { spec })
    })
}

exports.update_post = (req, res) => {
    Spec.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, spec) => {
                if (err) console.log(err)
                res.redirect('/spec')
            }
    )
}

exports.remove = (req, res) => {
    Spec.findOneAndRemove(
        { _id: req.params.id },
        (err, spec) => {
            if (err) console.log(err)
            res.redirect(`/spec`)
        }
    )       
}