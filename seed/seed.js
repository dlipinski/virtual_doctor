
const Area = require('../models/areaModel')
const Spec = require('../models/specModel')
const Symptom = require('../models/symptomModel')
const Disae = require('../models/disaeModel')

const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true }, () => {
    mongoose.connection.db.dropDatabase()

    /* AREA */
    let head = new Area({ name: 'głowa' })
    head.save()
    let tors = new Area({ name: 'tors' })
    tors.save()
    let arm = new Area({ name: 'ręka' })
    arm.save()
    let leg = new Area({ name: 'noga' })
    leg.save()

    /* SPEC */
    let ogolny = new Spec({ name: 'Lekarz ogólny' })
    ogolny.save()
    let kardiolog = new Spec({ name: 'Kardiolog' })
    kardiolog.save()
    let noga =  new Spec({ name: 'Nogażysta' })
    noga.save()
    let reka =  new Spec({ name: 'Rękista' })
    reka.save()


    /* SYMPTOM */
    let head_pain1 = new Symptom({ name: 'bół głowy', area: head})
    head_pain1.save()
    let head_pain2 = new Symptom({ name: 'pulsowanie skroni', area: head})
    head_pain2.save()
    let tors_pain1 = new Symptom( { name: 'ból serca', area: tors})
    tors_pain1.save()
    let tors_pain2 = new Symptom( { name: 'ból brzucha', area: tors})
    tors_pain2.save()
    let leg_pain1 = new Symptom( { name: 'ból pod kolanem', area: leg})
    leg_pain1.save()

    /* DISAE */
    let migrena = new Disae({ name: 'migrena', spec: ogolny, symptoms: [head_pain1, head_pain2], propability:  2})
    migrena.save()
    let guz = new Disae({ name: 'guz mózgu', spec: ogolny, symptoms: [head_pain1], propability:  0})
    guz.save()
    let mig = new Disae({ name: 'migotanie przedsionków', spec: kardiolog, symptoms: [tors_pain1], propability:  0})
    mig.save()
    let bieg = new Disae({ name: 'biegunka', spec: ogolny, symptoms: [tors_pain2], propability:  2})
    bieg.save()
    let zyl = new Disae({ name: 'żylaki', spec: noga, symptoms: [leg_pain1], propability:  1})
    zyl.save()

})

setTimeout(() => {
    process.exit()
    console.log('Seeded')
},2000)

