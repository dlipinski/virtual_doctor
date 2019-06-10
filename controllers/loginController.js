

exports.signin_get = (req, res) => {
    if (req.user) res.redirect('/')
    let messages = req.session.messages || []
    req.session.messages = []
    res.render('login/signin', { message: messages[0] })
}

exports.signup_get = (req, res) => {
    if (req.user) res.redirect('/')
    let messages = req.session.messages || []
    req.session.messages = []
    res.render('login/signup', { message: messages[0] })
}

exports.signout_post = (req, res) => {
    req.logout()
    res.redirect('/')
}