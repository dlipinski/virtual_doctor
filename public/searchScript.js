document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initAreaRestCall()
    initSymptomsRestCall()
    initSearchButton()
}

const initAreaRestCall = () => {
    let disaeContainer = document.querySelector('#disaeContainer')
    disaeContainer.innerHTML = ''
    let areaPicker = document.querySelector('#area')
    areaPicker.addEventListener('change', () => {
        let areaId = [...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].value
        if (areaId !== '0')
            getSymptomsByArea(areaId)
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
const initSearchButton = () => {
    let searchButton = document.querySelector('#searchButton')
    let symptomsPicker = document.querySelector('#symptoms')
    searchButton.addEventListener('click', () => {
        document.querySelector('#disaesCard').style['display'] = 'block'
        getDisaesBySymptoms([...symptomsPicker.querySelectorAll('option')].filter(o => o.selected).map(o => o.value))
    })
}
const initSymptomsRestCall = () => {
    let symptomsPicker = document.querySelector('#symptoms')
    let searchButton = document.querySelector('#searchButton')
    symptomsPicker.addEventListener('change', () => {
        if ([...symptomsPicker.querySelectorAll('option')].filter(o => o.selected).length > 0) {
            searchButton.style['display'] = 'block'
        } else {
            searchButton.style['display'] = 'none'
        }
    })
}

const getDisaesBySymptoms = symptomsIds => {
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