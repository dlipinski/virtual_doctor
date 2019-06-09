

exports.signin_get = (req, res) => {
    if (req.user) res.redirect('/')
    res.render('login/signin')
}

exports.signup_get = (req, res) => {
    if (req.user) res.redirect('/')
    res.render('login/signup')
}

exports.signout_post = (req, res) => {
    req.logout()
    res.redirect('/')
}