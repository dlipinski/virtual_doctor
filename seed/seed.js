
const Area = require('../models/areaModel')
const Spec = require('../models/specModel')
const Symptom = require('../models/symptomModel')
const Disae = require('../models/disaeModel')

const User = require('../models/userModel')

const Question = require('../models/questionModel')
const Answer = require('../models/answerModel')

const mongoose = require('mongoose')
const bCrypt = require('bcrypt-nodejs')



mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true }, () => {

    mongoose.connection.db.dropDatabase()

    /* --- AREA --- */
    let legs = new Area({ name: 'Nogi' })
    legs.save()
    let arms = new Area({ name: 'Ręce' })
    arms.save()
    let head = new Area({ name: 'Głowa' })
    head.save()
    let corps = new Area({ name: 'Tułów' })
    corps.save()
    let general = new Area({ name: 'Ogólne' })
    general.save()
    let skin = new Area({ name: 'Skóra' })
    skin.save()

    /* --- SPEC --- */
    let ogolny = new Spec({ name: 'Lekarz ogólny' })
    ogolny.save()
    let kardiolog = new Spec({ name: 'Kardiolog' })
    kardiolog.save()
    let noga =  new Spec({ name: 'Nogażysta' })
    noga.save()
    let reka =  new Spec({ name: 'Rękista' })
    reka.save()

    /* --- SYMPTOM --- */
    /* legs */
    let legs_hurt = new Symptom({ name: 'Ból', area: legs})
    legs_hurt.save()
    let legs_swollowing = new Symptom({ name: 'Obrzęk', area: legs})
    legs_swollowing.save()
    let legs_contractions = new Symptom({ name: 'Skurcze', area: legs})
    legs_contractions.save()
    /* arms */
    let arms_hurt = new Symptom({ name: 'Ból', area: arms })
    arms_hurt.save()
    let arms_swollowing = new Symptom({ name: 'Obrzęk', area: arms })
    arms_swollowing.save()
    let arms_contractions = new Symptom({ name: 'Skurcze', area: arms })
    arms_contractions.save()
    /* head */
    let head_very_hurt = new Symptom({ name: 'Ostry ból', area: head })
    head_very_hurt.save()
    let head_hurt = new Symptom({ name: 'Ból', area: head })
    head_hurt.save()
    let head_ear_hurt = new Symptom({ name: 'Ból ucha', area: head })
    head_ear_hurt.save()
    /* corps */
    let corps_belly_hurt = new Symptom({ name: 'Ból brzucha', area: corps })
    corps_belly_hurt.save()
    let corps_chest_hurt = new Symptom({ name: 'Ból w klatce', area: corps })
    corps_chest_hurt.save()
    let corps_belly_smelly = new Symptom({ name: 'Wzdęcia', area: corps })
    corps_belly_smelly.save()
    /* general */
    let general_temp = new Symptom({ name: 'Temperatura pow. 37.7', area: general })
    general_temp.save()
    let general_mood = new Symptom({ name: 'Złe samopoczucie', area: general })
    general_mood.save()
    let general_cough = new Symptom({ name: 'Kaszel', area: general })
    general_cough.save()
    let general_nausea = new Symptom({ name: 'Nudności', area: general })
    general_nausea.save()
    let general_muscle = new Symptom({ name: 'Obolałe mięśnie', area: general })
    general_muscle.save()
    /* skin */
    let skin_rash = new Symptom({ name: 'Wysypka', area: skin })
    skin_rash.save()
    let skin_itch = new Symptom({ name: 'Swędzenie', area: skin })
    skin_itch.save()

    /* DISAE */
    let grypa = new Disae({
        name: 'Grypa',
        description: 'Poważne wirusowe zakażenie dróg oddechowych',
        spec: ogolny,
        symptoms: [general_temp, general_mood, general_muscle, general_cough],
        propability:  2
    })
    let zatrucie = new Disae({
        name: 'Zatrucie pokarmowe',
        description: 'Coś Ci zaszkodziło.',
        spec: ogolny,
        symptoms: [corps_belly_hurt, corps_belly_smelly, general_mood],
        propability:  2
    })
    let uraz_nogi = new Disae({
        name: 'Uraz nogi',
        description: 'Udaj się do szpitala na rtg.',
        spec: noga,
        symptoms: [legs_hurt, legs_swollowing],
        propability:  1
    })
    let uraz_ręki = new Disae({
        name: 'Uraz ręki',
        description: 'Udaj się do szpitala na rtg.',
        spec: reka,
        symptoms: [arms_hurt, arms_swollowing],
        propability:  1
    })
    let naciagnieta_noga = new Disae({
        name: 'Naciągnięty mięsień nogi',
        description: 'Trzymaj obolałe miejsce w ciepłym.',
        spec: noga,
        symptoms: [legs_hurt],
        propability:  1
    })
    let naciagnieta_reka = new Disae({
        name: 'Naciągnięty mięsień ręki',
        description: 'Trzymaj obolałe miejsce w ciepłym.',
        spec: reka,
        symptoms: [arms_hurt],
        propability:  1
    })
    let zla_dieta = new Disae({
        name: 'Zła dieta',
        description: 'Zastanów się nad trybem  życia i dietą.',
        spec: ogolny,
        symptoms: [arms_contractions, legs_contractions, general_mood],
        propability:  1
    })
   

    /* USERS */
    let admin = new User({
        username: 'admin',
        password: createHash('admin'),
        role: 'admin'
    })
    admin.save()

    let user1 = new User({
        username: 'user1',
        password: createHash('user1'),
    })
    user1.save()

    let user2 = new User({
        username: 'user2',
        password: createHash('user2')
    })
    user2.save()

    let doctors = {}
    ;[ogolny, kardiolog, noga, reka].forEach( (spec, index) => {
        let doctor = new User({
            username: 'doctor' + index,
            password: createHash('doctor'),
            role: 'doctor',
            realName: 'doctor realname ' + index,
            spec: spec
        })
        doctor.save()
        doctors[spec.id] = doctor
    })
    

    /* QUESTIONS + ANSWERS */
    ;[grypa, zatrucie, uraz_nogi, uraz_ręki, naciagnieta_noga, naciagnieta_reka, zla_dieta].forEach( (disae, index) => {
        for (let i=0; i<10; i++) {
            let question = new Question({
                name: `${ disae.name } > name-${ i }`,
                content: `content-${ i }-${ disae.name }`
            })
            question.user = index % 2 === 0 ? user1 : user2
            for (let j=0; j<10; j++) {
                let answer = new Answer({
                    content: `${ question.name } > content-${ j }`,
                    ratingCount: 10,
                    ratingSum: (j+1)*10
                })
                answer.user = doctors[disae.spec.id]
                answer.question = question
                answer.save()
            }
            question.disae = disae
            question.save()
        }
        disae.save()
    })

})


const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
