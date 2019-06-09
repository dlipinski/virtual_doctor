const router = require('express').Router()

const loginController = require('./controllers/loginController')

const userController = require('./controllers/userController')

const searchController = require('./controllers/searchController')

const questionController = require('./controllers/questionController')
const answerController = require('./controllers/answerController')

const areaController = require('./controllers/areaController')
const specController = require('./controllers/specController')
const symptomController = require('./controllers/symptomController')
const disaeController = require('./controllers/disaeController')

module.exports = (passport) => {

    /* --- LOGIN --- */
    router.get('/signin', loginController.signin_get)
	router.post('/signin', passport.authenticate('signin', {
		successRedirect: '/',
		failureRedirect: 'signin',
    }))
    router.get('/signout', loginController.signout_post)
	router.get('/signup', loginController.signup_get)
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
	}))

    /* --- USER --- */
    /* list */
    router.get('/user', isAuthenticated, isAdmin, userController.list)
    /* account */
    router.get('/account', isAuthenticated, isUserOrDoctor, userController.show)
    /* show */
    router.get('/show/:id', userController.show)
    /* showDoctor */
    router.get('/showDoctor/:id', userController.show_doctor)
    /* update */
    router.post('/user/update', isAuthenticated, isUserOrDoctor, userController.update)
    /* set/unset doctor */
    router.get('/user/setUnsetDoctor/:id', isAuthenticated, isAdmin, userController.set_unset_doctor)
    /* delete */
    router.post('/user/remove/:id', isAuthenticated, isAdmin, userController.remove)

    /* --- SEARCH --- */
    /* UI */
    router.get('/', searchController.client_index)
    /* list */
    router.get('/search', isAuthenticated, isAdmin, searchController.list)
    router.get('/search/searchesByDate/:dates', searchController.list_by_date)
    /* create */
    router.post('/search/create', searchController.create)
    /* remove */
    router.post('/search/remove/:id', isAuthenticated, isAdmin, searchController.remove)
    /* ~api */
    router.get('/search/symptomsByArea/:id', searchController.symptoms_by_area)
    router.get('/search/disaesBySymptoms/:ids', searchController.disaes_by_symptoms)

    /* --- QUESTION --- */
    /* list */
    router.get('/question', isAuthenticated, isAdmin, questionController.list)
    /* show */
    router.get('/question/show/:id', questionController.show)
    /* create */
    router.get('/question/create/:disaeId', isAuthenticated, isUser, questionController.create_get)
    router.post('/question/create', isAuthenticated, isUser, questionController.create_post)
    /* delete */
    router.post('/question/remove/:id', isAuthenticated, isAdmin, questionController.remove)
    /* my questions */
    router.get('/userQuestions', isAuthenticated, isUser, questionController.my_questions)
    /* user questions */
    router.get('/userQuestions', isAuthenticated, isUser, questionController.my_questions)
    /* doctor waiting questions */
    router.get('/waitingQuestions', isAuthenticated, isDoctor, questionController.waiting_questions)

    /* --- ANSWER --- */
    /* create */
    router.post('/answer/create/', isAuthenticated, isDoctor, answerController.create_post)
    /* rate */
    router.post('/answer/rate/:id', isAuthenticated, isUser, answerController.rate)
    /* doctor answers */
    router.get('/doctorAnswers', isAuthenticated, isDoctor, answerController.my_answers)

    /* --- AREA --- */
    /* list */
    router.get('/area', isAuthenticated, isAdmin, areaController.list)
    /* create */
    router.get('/area/create', isAuthenticated, isAdmin, areaController.create_get)
    router.post('/area/create', isAuthenticated, isAdmin, areaController.create_post)
    /* update */
    router.get('/area/update/:id', isAuthenticated, isAdmin, areaController.update_get)
    router.post('/area/update/:id', isAuthenticated, isAdmin, areaController.update_post)
    /* delete  */
    router.post('/area/remove/:id', isAuthenticated, isAdmin, areaController.remove)

    /* --- SPEC --- */
    /* list */
    router.get('/spec', isAuthenticated, isAdmin, specController.list)
    /* create */
    router.get('/spec/create', isAuthenticated, isAdmin, specController.create_get)
    router.post('/spec/create', isAuthenticated, isAdmin, specController.create_post)
    /* update */
    router.get('/spec/update/:id', isAuthenticated, isAdmin, specController.update_get)
    router.post('/spec/update/:id', isAuthenticated, isAdmin, specController.update_post)
    /* delete  */
    router.post('/spec/remove/:id', isAuthenticated, isAdmin, specController.remove)

    /* --- SYMPTOM --- */
    /* list */
    router.get('/symptom', isAuthenticated, isAdmin, symptomController.list)
    /* create */
    router.get('/symptom/create', isAuthenticated, isAdmin, symptomController.create_get)
    router.post('/symptom/create', isAuthenticated, isAdmin, symptomController.create_post)
    /* update */
    router.get('/symptom/update/:id', isAuthenticated, isAdmin, symptomController.update_get)
    router.post('/symptom/update/:id', isAuthenticated, isAdmin, symptomController.update_post)
    /* delete  */
    router.post('/symptom/remove/:id', isAuthenticated, isAdmin, symptomController.remove)

    /* --- DISAE --- */
    /* list */
    router.get('/disae', isAuthenticated, isAdmin, disaeController.list)
    /* show */
    router.get('/disae/show/:id', disaeController.show)
    /* create */
    router.get('/disae/create', isAuthenticated, isAdmin, disaeController.create_get)
    router.post('/disae/create', isAuthenticated, isAdmin, disaeController.create_post)
    /* update */
    router.get('/disae/update/:id', isAuthenticated, isAdmin, disaeController.update_get)
    router.post('/disae/update/:id', isAuthenticated, isAdmin, disaeController.update_post)
    /* delete  */
    router.post('/disae/remove/:id', isAuthenticated, isAdmin, disaeController.remove)

    return router
}

const isAuthenticated =  (req, res, next) => {
	if (req.isAuthenticated())
		return next()
	res.redirect('/signin')
}

const isUser = (req, res, next) => {
    if (req.user.role === 'user')
        return next()
    res.redirect('/')
}

const isDoctor = (req, res, next) => {
    if (req.user.role === 'doctor')
        return next()
    res.redirect('/')
}

const isUserOrDoctor = (req, res, next) => {
    if (req.user.role === 'user' || req.user.role === 'doctor')
        return next()
    res.redirect('/')
}

const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin')
        return next()
    res.redirect('/')
}
