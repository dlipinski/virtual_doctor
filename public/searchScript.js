document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initAreaRestCall()
    initSymptomsRestCall()
}

const initAreaRestCall = () => {
    let disaeContainer = document.querySelector('#disaeContainer')
    disaeContainer.innerHTML = ''
    let areaPicker = document.querySelector('#area')
    areaPicker.addEventListener('change', () => {
        getSymptomsByArea([...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].value)
    })
   
}

const getSymptomsByArea = areaId => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            fillSymptoms(JSON.parse(xhr.responseText))
        }
    })
    xhr.open('GET', `/symptomsByArea/${areaId}` , true)
    xhr.send()
}

const fillSymptoms = symptoms => {
    let symptomsPicker = document.querySelector('#symptoms')
    symptomsPicker.innerHTML = ''
    symptoms.forEach(symptom => {
        let option = document.createElement('option')
        option.innerHTML = symptom.name
        option.value = symptom._id
        symptomsPicker.appendChild(option)
    })
    document.querySelector('#symptomsGroup').style['display'] = 'block'
    $('#symptoms').selectpicker('refresh')
}

const initSymptomsRestCall = () => {
    let symptomsPicker = document.querySelector('#symptoms')
    symptomsPicker.addEventListener('change', () => {
        getDisaesBySymptom([...symptomsPicker.querySelectorAll('option')].filter(o => o.selected)[0].value)
    })
}

const getDisaesBySymptom = symptomsIds => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            fillDisaes(JSON.parse(xhr.responseText))
        }
    })
    xhr.open('GET', `/disaesBySymptoms` , true)
    xhr.send(JSON.stringify({ symptoms: symptomsIds}))
}


const fillDisaes = disaes => {
    let disaeContainer = document.querySelector('#disaeContainer')
    disaeContainer.innerHTML = ''
    disaes.forEach(disae => {
        console.log(disae)
        disaeContainer.innerHTML += disaeCard(disae)
    })
}

const disaeCard = disae => {
   return `
   <div class='card' style='width: 30%; display: inline-block;margin: 10px;'>
    <div class='card-header'>
        ${disae.name} (${disae.spec.name})
    </div>
    <div class='card-body'>
        ${disae.description}
    </div>
   </div>
   `
}