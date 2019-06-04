const router = require('express').Router()

const searchController = require('./controllers/searchController')

const questionController = require('./controllers/questionController')

const areaController = require('./controllers/areaController')
const specController = require('./controllers/specController')
const symptomController = require('./controllers/symptomController')
const disaeController = require('./controllers/disaeController')

module.exports = () => {

    /* --- SEARCH --- */
    router.get('/', searchController.client_index)
    router.get('/search', searchController.list)
    router.get('/search/searchesByDate/:dates', searchController.list_by_date)
    router.post('/search/create', searchController.create)
    router.post('/search/remove/:id', searchController.remove)
    router.get('/search/symptomsByArea/:id', searchController.symptoms_by_area)
    router.get('/search/disaesBySymptoms/:ids', searchController.disaes_by_symptoms)

    /* --- QUESTION --- */
    router.get('/question', questionController.list)
    router.get('/question/show/:id', questionController.show)
    router.get('/question/create/:disaeId', questionController.create_get)
    router.post('/question/create', questionController.create_post)
    router.post('/question/remove/:id', questionController.remove)

    /* --- AREA --- */
    /* list */
    router.get('/area', areaController.list)
    /* create */
    router.get('/area/create', areaController.create_get)
    router.post('/area/create', areaController.create_post)
    /* update */
    router.get('/area/update/:id', areaController.update_get)
    router.post('/area/update/:id', areaController.update_post)
    /* delete  */
    router.post('/area/remove/:id', areaController.remove)

    /* --- SPEC --- */
    /* list */
    router.get('/spec', specController.list)
    /* create */
    router.get('/spec/create', specController.create_get)
    router.post('/spec/create', specController.create_post)
    /* update */
    router.get('/spec/update/:id', specController.update_get)
    router.post('/spec/update/:id', specController.update_post)
    /* delete  */
    router.post('/spec/remove/:id', specController.remove)

    /* --- SYMPTOM --- */
    /* list */
    router.get('/symptom', symptomController.list)
    /* create */
    router.get('/symptom/create', symptomController.create_get)
    router.post('/symptom/create', symptomController.create_post)
    /* update */
    router.get('/symptom/update/:id', symptomController.update_get)
    router.post('/symptom/update/:id', symptomController.update_post)
    /* delete  */
    router.post('/symptom/remove/:id', symptomController.remove)

    /* --- DISAE --- */
    /* list */
    router.get('/disae', disaeController.list)
    /* show */
    router.get('/disae/show/:id', disaeController.show)
    /* create */
    router.get('/disae/create', disaeController.create_get)
    router.post('/disae/create', disaeController.create_post)
    /* update */
    router.get('/disae/update/:id', disaeController.update_get)
    router.post('/disae/update/:id', disaeController.update_post)
    /* delete  */
    router.post('/disae/remove/:id', disaeController.remove)

    return router
}